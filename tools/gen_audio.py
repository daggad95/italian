"""Generate MP3 audio for every Italian string using Microsoft neural voices (edge-tts).

Usage: node tools/dump-text.mjs > texts.json && python tools/gen_audio.py texts.json
Writes audio/<voice>/<fnv1a-hash>.mp3 and audio/manifest.json. Existing files are kept.
The FNV-1a hash here must match hashText() in app.js.
"""
import asyncio, json, os, sys, time
import edge_tts

VOICES = {"diego": "it-IT-DiegoNeural", "isabella": "it-IT-IsabellaNeural"}
ROOT = os.path.join(os.path.dirname(__file__), "..", "audio")
CONCURRENCY = 4

def fnv1a(s: str) -> str:
    h = 0x811C9DC5
    for b in s.encode("utf-8"):
        h ^= b
        h = (h * 0x01000193) & 0xFFFFFFFF
    return f"{h:08x}"

async def synth(sem, voice_id, text, path):
    async with sem:
        for attempt in range(4):
            try:
                await edge_tts.Communicate(text, voice_id, rate="-10%").save(path)
                if os.path.getsize(path) > 0:
                    return True
            except Exception as e:  # noqa: BLE001
                print(f"  retry {attempt+1} for {text!r}: {e}", file=sys.stderr)
                await asyncio.sleep(2 * (attempt + 1))
        print(f"FAILED: {text!r}", file=sys.stderr)
        if os.path.exists(path):
            os.remove(path)
        return False

async def main(texts):
    sem = asyncio.Semaphore(CONCURRENCY)
    manifest = {}
    for key, voice_id in VOICES.items():
        d = os.path.join(ROOT, key)
        os.makedirs(d, exist_ok=True)
        jobs, have = [], []
        for t in texts:
            h = fnv1a(t)
            p = os.path.join(d, h + ".mp3")
            if os.path.exists(p) and os.path.getsize(p) > 0:
                have.append(h)
            else:
                jobs.append((t, h, p))
        print(f"{key}: {len(have)} cached, {len(jobs)} to generate")
        t0 = time.time()
        results = await asyncio.gather(*(synth(sem, voice_id, t, p) for t, h, p in jobs))
        have += [h for (t, h, p), ok in zip(jobs, results) if ok]
        print(f"{key}: done in {time.time()-t0:.0f}s, {len(have)} files")
        manifest[key] = sorted(have)
    with open(os.path.join(ROOT, "manifest.json"), "w") as f:
        json.dump(manifest, f)
    missing = sum(len(texts) - len(v) for v in manifest.values())
    if missing:
        print(f"WARNING: {missing} clips missing", file=sys.stderr)

if __name__ == "__main__":
    with open(sys.argv[1]) as f:
        asyncio.run(main(json.load(f)))
