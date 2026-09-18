/* Survival Italian — SRS review, phrase library, conversations, TTS. */
(() => {
  "use strict";

  // ---------- Helpers ----------
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.from(document.querySelectorAll(s));
  const utf8 = new TextEncoder();
  function hashText(str) {
    let h = 0x811c9dc5;
    for (const b of utf8.encode(str)) { h ^= b; h = Math.imul(h, 0x01000193) >>> 0; }
    return h.toString(16).padStart(8, "0");
  }
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  function relTime(ts) {
    const diff = ts - Date.now();
    const m = Math.round(diff / 60000);
    if (m < 60) return `in ${Math.max(1, m)} min`;
    const h = Math.round(m / 60);
    if (h < 36) return `in ${h} h`;
    const d = Math.round(h / 24);
    return `in ${d} day${d === 1 ? "" : "s"}`;
  }
  let toastTimer;
  function toast(msg) {
    let el = $("#toast");
    if (!el) {
      el = document.createElement("div"); el.id = "toast";
      el.style.cssText = "position:fixed;left:50%;bottom:90px;transform:translateX(-50%);background:#222;color:#fff;padding:10px 16px;border-radius:10px;font-size:14px;z-index:20";
      document.body.appendChild(el);
    }
    el.textContent = msg; el.hidden = false;
    clearTimeout(toastTimer); toastTimer = setTimeout(() => el.hidden = true, 2500);
  }

  // ---------- Storage ----------
  const LS_PROGRESS = "si.progress.v1";
  const LS_SETTINGS = "si.settings.v1";
  const DAY = 24 * 60 * 60 * 1000;

  const defaults = { direction: "en", newPerDay: 10, autoplay: true, rate: 0.85, voice: "", audio: "diego" };
  let settings = load(LS_SETTINGS, defaults);
  // progress: { cards: { id: {ease, interval, due, reps, lapses} }, newLog: { "YYYY-MM-DD": n } }
  let progress = load(LS_PROGRESS, { cards: {}, newLog: {} });

  function load(key, fallback) {
    try { const v = JSON.parse(localStorage.getItem(key)); return v ? { ...fallback, ...v } : { ...fallback }; }
    catch { return { ...fallback }; }
  }
  function save() {
    try {
      localStorage.setItem(LS_PROGRESS, JSON.stringify(progress));
      localStorage.setItem(LS_SETTINGS, JSON.stringify(settings));
    } catch { /* private mode: progress just won't persist */ }
  }
  const todayKey = () => new Date().toISOString().slice(0, 10);
  const catById = Object.fromEntries(CATEGORIES.map((c) => [c.id, c]));
  const phraseById = Object.fromEntries(PHRASES.map((p) => [p.id, p]));

  // ---------- TTS ----------
  // iOS mutes speech synthesis with the ring/silent switch unless the page is
  // in "playback" audio mode (what music apps use). Ask for it via the
  // AudioSession API where available, and also play a short silent clip
  // before speaking, which flips older versions into playback mode.
  const SILENT_WAV = "data:audio/wav;base64,UklGRvQHAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YdAHAACAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgA==";
  let unlockAudio = null;
  function setupAudioSession() {
    try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch { /* ignore */ }
    unlockAudio = new Audio(SILENT_WAV);
    unlockAudio.setAttribute("playsinline", "");
    unlockAudio.preload = "auto";
  }
  function primeAudio() {
    if (!unlockAudio) setupAudioSession();
    try { unlockAudio.currentTime = 0; const p = unlockAudio.play(); if (p && p.catch) p.catch(() => {}); } catch { /* ignore */ }
  }

  const tts = {
    voices: [],
    allVoices: [],
    refresh() {
      if (!("speechSynthesis" in window)) return;
      this.allVoices = speechSynthesis.getVoices();
      this.voices = this.allVoices.filter((v) => /^it([-_]|$)/i.test(v.lang));
    },
    load() { this.refresh(); fillVoiceSelect(); },
    // iOS lists compact and premium variants under the same name; the
    // voiceURI (e.g. com.apple.voice.premium.it-IT.Alice) tells them apart.
    quality(v) {
      const u = (v.voiceURI + " " + v.name).toLowerCase();
      if (/premium|siri/.test(u)) return 3;
      if (/enhanced|neural|natural|wavenet/.test(u)) return 2;
      if (/google/.test(u)) return 1;
      return 0;
    },
    label(v) {
      const q = this.quality(v);
      let tag = q === 3 ? "Premium" : q === 2 ? "Enhanced" : "";
      // Fall back to the distinguishing part of the voice id so two voices
      // with the same name (e.g. compact vs downloaded "Alice") stay tellable.
      if (!tag) {
        const m = /voice\.([a-z]+)\./i.exec(v.voiceURI || "");
        if (m && m[1].toLowerCase() !== "compact") tag = m[1];
        else if (this.voices.filter((o) => o.name === v.name).length > 1) tag = "standard";
      }
      return v.name + (tag ? ` (${tag})` : "") + (v.localService === false ? " · online" : "");
    },
    pick() {
      if (settings.voice) {
        const v = this.allVoices.find((v) => v.voiceURI === settings.voice);
        if (v) return v;
      }
      return [...this.voices].sort((a, b) => this.quality(b) - this.quality(a))[0] || null;
    },
    // ---- Recorded neural audio (generated at deploy time, see tools/gen_audio.py) ----
    manifest: null,        // { diego: [hash...], isabella: [...] } or null if not deployed
    manifestLoaded: false,
    player: null,
    async loadManifest() {
      try {
        const r = await fetch("audio/manifest.json", { cache: "no-cache" });
        this.manifest = r.ok ? await r.json() : null;
      } catch { this.manifest = null; }
      this.manifestLoaded = true;
    },
    hasClip(text) {
      const v = settings.audio;
      return !!(this.manifest && this.manifest[v] && this.manifest[v].includes(hashText(text)));
    },
    clipUrl(text) { return `audio/${settings.audio}/${hashText(text)}.mp3`; },
    speak(text, opts = {}) {
      if (settings.audio !== "device" && this.hasClip(text)) this.playClip(text, opts);
      else this.speakDevice(text, opts);
    },
    playClip(text, { onend, onstart } = {}) {
      this.stop();
      const a = new Audio(this.clipUrl(text));
      a.setAttribute("playsinline", "");
      a.playbackRate = Math.min(1.1, Math.max(0.8, (Number(settings.rate) || 0.85) + 0.15));
      a.preservesPitch = true;
      if (onstart) a.onplay = onstart;
      a.onended = () => { if (this.player === a) this.player = null; if (onend) onend(); };
      a.onerror = () => { if (this.player === a) this.player = null; this.speakDevice(text, { onend, onstart }); };
      this.player = a;
      const p = a.play();
      if (p && p.catch) p.catch(() => this.speakDevice(text, { onend, onstart }));
    },
    // Fetch every clip for the chosen voice so the service worker caches it for offline use.
    async downloadAll(progress) {
      const list = (this.manifest && this.manifest[settings.audio]) || [];
      let done = 0;
      const chunk = 6;
      for (let i = 0; i < list.length; i += chunk) {
        await Promise.all(list.slice(i, i + chunk).map((h) =>
          fetch(`audio/${settings.audio}/${h}.mp3`).then(() => { done += 1; progress(done, list.length); }).catch(() => {})));
      }
      return done;
    },
    current: null, // keep a reference: some engines drop utterances that get garbage-collected
    speakDevice(text, { onend, onstart } = {}) {
      if (!("speechSynthesis" in window)) { toast("No speech support in this browser"); return; }
      const synth = speechSynthesis;
      primeAudio();
      if (!this.voices.length) this.refresh(); // iOS populates voices lazily
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "it-IT";
      const v = this.pick();
      if (v) u.voice = v;
      u.rate = Number(settings.rate) || 0.85;
      u.volume = 1;
      if (onstart) u.onstart = onstart;
      u.onend = () => { if (this.current === u) this.current = null; if (onend) onend(); };
      u.onerror = (e) => {
        if (e.error !== "interrupted" && e.error !== "canceled") toast("Audio error: " + (e.error || "unknown"));
        if (onend) onend();
      };
      this.current = u;
      const go = () => { if (synth.paused) synth.resume(); synth.speak(u); };
      // Safari on iOS silently drops an utterance queued right after cancel();
      // only cancel when something is actually playing, and give it a beat.
      if (synth.speaking || synth.pending) { synth.cancel(); setTimeout(go, 80); } else go();
    },
    stop() {
      this.current = null;
      if (this.player) { this.player.onended = null; this.player.onerror = null; this.player.pause(); this.player = null; }
      if ("speechSynthesis" in window) speechSynthesis.cancel();
    },
  };
  if ("speechSynthesis" in window) {
    tts.load();
    speechSynthesis.onvoiceschanged = () => tts.load();
  }
  tts.loadManifest();

  // ---------- SRS (SM-2 flavoured) ----------
  function cardState(id) {
    return progress.cards[id] || null;
  }
  function isDue(id, now = Date.now()) {
    const s = cardState(id);
    return s && s.due <= now;
  }
  function newAllowedToday() {
    return Math.max(0, Number(settings.newPerDay) - (progress.newLog[todayKey()] || 0));
  }
  function grade(id, g) {
    // g: 0 again, 1 hard, 2 good, 3 easy
    const now = Date.now();
    let s = cardState(id);
    if (!s) {
      s = { ease: 2.5, interval: 0, due: now, reps: 0, lapses: 0 };
      progress.newLog[todayKey()] = (progress.newLog[todayKey()] || 0) + 1;
    }
    if (g === 0) {
      s.reps = 0; s.lapses += 1; s.interval = 0;
      s.ease = Math.max(1.3, s.ease - 0.2);
      s.due = now + 10 * 60 * 1000; // see it again in ~10 min (or this session)
    } else {
      if (s.reps === 0) s.interval = g === 1 ? 1 : g === 2 ? 1 : 3;
      else if (s.reps === 1) s.interval = g === 1 ? 2 : g === 2 ? 4 : 7;
      else s.interval = Math.round(s.interval * (g === 1 ? 1.2 : g === 2 ? s.ease : s.ease * 1.4));
      s.interval = Math.max(1, s.interval);
      s.ease = Math.max(1.3, s.ease + (g === 1 ? -0.15 : g === 3 ? 0.15 : 0));
      s.reps += 1;
      s.due = now + s.interval * DAY;
    }
    progress.cards[id] = s;
    save();
  }
  function intervalLabel(id, g) {
    const s = cardState(id);
    if (g === 0) return "10 min";
    let iv;
    if (!s || s.reps === 0) iv = g === 1 ? 1 : g === 2 ? 1 : 3;
    else if (s.reps === 1) iv = g === 1 ? 2 : g === 2 ? 4 : 7;
    else iv = Math.round(s.interval * (g === 1 ? 1.2 : g === 2 ? s.ease : s.ease * 1.4));
    iv = Math.max(1, iv);
    return iv === 1 ? "1 day" : iv < 30 ? `${iv} days` : `${Math.round(iv / 30)} mo`;
  }

  // Build today's queue: due reviews first (oldest due first), then new cards in content order.
  function buildQueue() {
    const now = Date.now();
    const due = PHRASES.filter((p) => isDue(p.id, now))
      .sort((a, b) => cardState(a.id).due - cardState(b.id).due);
    const fresh = PHRASES.filter((p) => !cardState(p.id)).slice(0, newAllowedToday());
    return [...due, ...fresh];
  }

  // ---------- Review UI ----------
  let queue = [];
  let current = null;
  let revealed = false;
  let frontLang = "en";

  function renderStats() {
    const now = Date.now();
    const due = PHRASES.filter((p) => isDue(p.id, now)).length;
    const learned = Object.keys(progress.cards).length;
    const fresh = Math.min(newAllowedToday(), PHRASES.length - learned);
    $("#review-stats").innerHTML = `
      <div class="stat due"><b>${due}</b><span>Due</span></div>
      <div class="stat new"><b>${fresh}</b><span>New today</span></div>
      <div class="stat learned"><b>${learned}</b><span>Seen</span></div>
      <div class="stat"><b>${PHRASES.length}</b><span>Total</span></div>`;
    const badge = $("#due-badge");
    badge.hidden = due === 0;
    badge.textContent = due;
  }

  function startReview() {
    queue = buildQueue();
    nextCard();
  }
  function nextCard() {
    renderStats();
    current = queue.shift() || null;
    revealed = false;
    if (!current) { renderEmpty(); return; }
    frontLang = settings.direction === "mix" ? (Math.random() < 0.5 ? "en" : "it") : settings.direction;
    renderCard();
  }
  function renderEmpty() {
    const learned = Object.keys(progress.cards).length;
    const nextDue = Object.values(progress.cards).map((s) => s.due).filter((d) => d > Date.now()).sort()[0];
    const when = nextDue ? relTime(nextDue) : "—";
    $("#review-area").innerHTML = `
      <div class="empty">
        <h3>All caught up 🇮🇹</h3>
        <p>${learned === 0 ? "Tap below to start learning." : `Next card due ${when}.`}</p>
        ${learned < PHRASES.length ? `<button class="secondary" id="learn-more">Learn 5 extra new cards</button>` : ""}
        <p class="muted" style="margin-top:20px">Or browse the Phrases and Talk tabs to practise with audio.</p>
      </div>`;
    const btn = $("#learn-more");
    if (btn) btn.onclick = () => {
      queue = PHRASES.filter((p) => !cardState(p.id)).slice(0, 5);
      // Don't count bonus cards against the daily allowance.
      progress.newLog[todayKey()] = Math.max(0, (progress.newLog[todayKey()] || 0) - 5);
      nextCard();
    };
  }
  function renderCard() {
    const p = current;
    const isNew = !cardState(p.id);
    const front = frontLang === "en" ? p.en : p.it;
    const back = frontLang === "en" ? p.it : p.en;
    const cat = catById[p.cat];
    $("#review-area").innerHTML = `
      <div class="card ${isNew ? "new-card" : ""}" id="card">
        <div class="cat-tag">${cat.emoji} ${cat.name}</div>
        <div class="label">${frontLang === "en" ? "Say in Italian" : "What does it mean?"}</div>
        <div class="front">${esc(front)}</div>
        ${frontLang === "it" ? `<button class="play-btn small" data-say="${esc(p.it)}">🔊 Listen</button>` : ""}
        ${revealed ? `
          <div class="back">${esc(back)}</div>
          <button class="play-btn" data-say="${esc(p.it)}">🔊 Play</button>
          ${p.note ? `<div class="note">${esc(p.note)}</div>` : ""}
        ` : `<div class="hint">Tap to reveal</div>`}
      </div>
      ${revealed ? `
      <div class="grades">
        <button class="again" data-g="0">Again<small>${intervalLabel(p.id, 0)}</small></button>
        <button class="hard" data-g="1">Hard<small>${intervalLabel(p.id, 1)}</small></button>
        <button class="good" data-g="2">Good<small>${intervalLabel(p.id, 2)}</small></button>
        <button class="easy" data-g="3">Easy<small>${intervalLabel(p.id, 3)}</small></button>
      </div>` : `<button class="reveal-btn" id="reveal">Show answer</button>`}`;

    const reveal = () => {
      if (revealed) return;
      revealed = true;
      renderCard();
      if (settings.autoplay) tts.speak(p.it);
    };
    $("#card").onclick = (e) => { if (!e.target.closest("[data-say]")) reveal(); };
    const rb = $("#reveal"); if (rb) rb.onclick = reveal;
    $$("#review-area [data-g]").forEach((b) => b.onclick = () => {
      const g = Number(b.dataset.g);
      grade(p.id, g);
      if (g === 0) queue.push(p); // repeat within this session
      tts.stop();
      nextCard();
    });
  }

  // ---------- Phrases UI ----------
  let activeCat = "all";
  function renderPhrases() {
    $("#category-list").innerHTML =
      `<button class="chip ${activeCat === "all" ? "active" : ""}" data-cat="all">All</button>` +
      CATEGORIES.map((c) => `<button class="chip ${activeCat === c.id ? "active" : ""}" data-cat="${c.id}">${c.emoji} ${c.name}</button>`).join("");
    $$("#category-list .chip").forEach((b) => b.onclick = () => { activeCat = b.dataset.cat; renderPhrases(); });

    const list = activeCat === "all" ? PHRASES : PHRASES.filter((p) => p.cat === activeCat);
    $("#phrase-list").innerHTML = list.map((p) => {
      const s = cardState(p.id);
      const status = !s ? "Not started" : s.due <= Date.now() ? "Due now" : `Next: ${relTime(s.due)}`;
      return `<div class="phrase">
        <div class="txt">
          <div class="it">${esc(p.it)}</div>
          <div class="en">${esc(p.en)}</div>
          ${p.note ? `<div class="note">${esc(p.note)}</div>` : ""}
          <div class="status">${status}</div>
        </div>
        <button class="play-btn small" data-say="${esc(p.it)}" aria-label="Play">🔊</button>
      </div>`;
    }).join("");
  }

  // ---------- Numbers UI ----------
  function renderNumbers() {
    const row = (label, it, wide) => `
      <div class="num-row" data-say="${esc(it)}">
        <span class="n">${esc(label)}</span><span class="w">${esc(it)}</span><span class="s">🔊</span>
      </div>`;
    $("#numbers-ref").innerHTML =
      NUMBER_SECTIONS.map((sec) => `
        <div class="num-section">
          <h3>${esc(sec.title)}</h3>
          <p class="note">${esc(sec.note)}</p>
          <div class="num-grid">${sec.rows.map((n) => row(n.toLocaleString("it-IT"), numberToItalian(n))).join("")}</div>
        </div>`).join("") +
      NUMBER_EXAMPLES.map((sec) => `
        <div class="num-section">
          <h3>${esc(sec.title)}</h3>
          <p class="note">${esc(sec.note)}</p>
          <div class="num-grid wide">${sec.rows.map((r) => row(r.label, r.it)).join("")}</div>
        </div>`).join("");
    updateConverter();
  }
  function updateConverter() {
    const raw = $("#num-input").value.replace(/[^0-9]/g, "");
    const out = $("#num-output");
    if (!raw) { out.textContent = "0 – 999 999"; out.classList.add("empty"); return; }
    const words = numberToItalian(raw);
    out.classList.remove("empty");
    out.textContent = words || "Too big — try up to 999 999";
  }

  // ---------- Conversations UI ----------
  let activeConvo = null;
  let showEn = true;
  let playing = false;
  function renderConvos() {
    if (!activeConvo) {
      $("#convo-detail").innerHTML = "";
      $("#convo-list").innerHTML = CONVERSATIONS.map((c) => `
        <div class="convo-card" data-id="${c.id}">
          <h3>${esc(c.title)}</h3>
          <p>${esc(c.where)} · ${c.lines.length} lines</p>
        </div>`).join("");
      $$(".convo-card").forEach((el) => el.onclick = () => { activeConvo = el.dataset.id; renderConvos(); });
      return;
    }
    const c = CONVERSATIONS.find((x) => x.id === activeConvo);
    $("#convo-list").innerHTML = "";
    $("#convo-detail").innerHTML = `
      <div class="head">
        <button class="back-btn" id="convo-back">‹ All</button>
        <h2>${esc(c.title)}</h2>
        <button class="play-btn small" id="play-all">${playing ? "⏹ Stop" : "▶ Play all"}</button>
        <label class="toggle-en"><input type="checkbox" id="toggle-en" ${showEn ? "checked" : ""}> English</label>
      </div>
      <p class="muted" style="margin-top:0">${esc(c.where)}. Tap any bubble to hear it.</p>
      ${c.lines.map((l, i) => `
        <div class="line ${l.who}">
          <div class="bubble" data-i="${i}" data-say="${esc(l.it)}">
            <div class="who">${l.who === "you" ? "You" : "Them"}</div>
            <div class="it">${esc(l.it)}</div>
            ${showEn ? `<div class="en">${esc(l.en)}</div>` : ""}
          </div>
        </div>`).join("")}`;
    $("#convo-back").onclick = () => { stopAll(); activeConvo = null; renderConvos(); };
    $("#toggle-en").onchange = (e) => { showEn = e.target.checked; renderConvos(); };
    $("#play-all").onclick = () => playing ? stopAll() : playAll(c);
  }
  function playAll(c) {
    playing = true;
    $("#play-all").textContent = "⏹ Stop";
    let i = 0;
    const step = () => {
      if (!playing || i >= c.lines.length) { stopAll(); return; }
      const bubble = $(`.bubble[data-i="${i}"]`);
      $$(".bubble.speaking").forEach((b) => b.classList.remove("speaking"));
      if (bubble) { bubble.classList.add("speaking"); bubble.scrollIntoView({ block: "center", behavior: "smooth" }); }
      const text = c.lines[i].it;
      i += 1;
      tts.speak(text, { onend: () => setTimeout(step, 500) });
    };
    step();
  }
  function stopAll() {
    playing = false;
    tts.stop();
    $$(".bubble.speaking").forEach((b) => b.classList.remove("speaking"));
    const btn = $("#play-all"); if (btn) btn.textContent = "▶ Play all";
  }

  // ---------- Settings ----------
  function fillVoiceSelect() {
    const sel = $("#opt-voice");
    if (!sel) return;
    tts.refresh(); // voices can appear after a download while the page is open
    const opt = (v) => `<option value="${esc(v.voiceURI)}" ${settings.voice === v.voiceURI ? "selected" : ""}>${esc(tts.label(v))}${/^it/i.test(v.lang) ? "" : ` [${esc(v.lang)}]`}</option>`;
    const others = tts.allVoices.filter((v) => !tts.voices.includes(v));
    sel.innerHTML = `<option value="">Auto (best available)</option>` +
      `<optgroup label="Italian">${tts.voices.map(opt).join("")}</optgroup>` +
      (others.length ? `<optgroup label="Other languages">${others.map(opt).join("")}</optgroup>` : "");
    $("#voice-status").textContent = !("speechSynthesis" in window)
      ? "This browser has no speech support."
      : tts.voices.length ? `${tts.voices.length} Italian voice${tts.voices.length > 1 ? "s" : ""} available.`
      : "No Italian voice found yet. On iPhone: Settings → Accessibility → Spoken Content → Voices → Italian to download one.";
    const best = tts.pick();
    if (best && tts.quality(best) < 2) {
      $("#voice-status").textContent += " For much better audio, download a Premium voice: Settings → Accessibility → Spoken Content → Voices → Italian.";
    }
  }
  function fillAudioStatus() {
    const el = $("#audio-status");
    const m = tts.manifest;
    if (!tts.manifestLoaded) { el.textContent = "Checking for recorded audio…"; return; }
    if (!m) { el.textContent = "Recorded audio not available on this copy; using the device voice."; return; }
    const n = (m[settings.audio] || []).length;
    el.textContent = settings.audio === "device"
      ? "Using the phone's built-in voice."
      : `${n} recorded clips available. Download them once to use offline.`;
  }
  function openSettings() {
    $("#opt-direction").value = settings.direction;
    $("#opt-audio").value = settings.audio;
    fillAudioStatus();
    $("#opt-newperday").value = String(settings.newPerDay);
    $("#opt-autoplay").checked = !!settings.autoplay;
    $("#opt-rate").value = String(settings.rate);
    fillVoiceSelect();
    $("#settings").hidden = false;
  }
  function closeSettings() {
    settings.direction = $("#opt-direction").value;
    settings.audio = $("#opt-audio").value;
    settings.newPerDay = Number($("#opt-newperday").value);
    settings.autoplay = $("#opt-autoplay").checked;
    settings.rate = Number($("#opt-rate").value);
    settings.voice = $("#opt-voice").value;
    save();
    $("#settings").hidden = true;
    if (currentScreen === "review") startReview();
  }

  // ---------- Navigation ----------
  let currentScreen = "review";
  const titles = { review: "Review", phrases: "Phrases", numbers: "Numbers", convos: "Conversations" };
  function showScreen(name) {
    stopAll(); tts.stop();
    currentScreen = name;
    $$(".screen").forEach((s) => s.classList.toggle("active", s.id === `screen-${name}`));
    $$(".tab").forEach((t) => t.classList.toggle("active", t.dataset.screen === name));
    $("#screen-title").textContent = titles[name];
    window.scrollTo(0, 0);
    if (name === "review") startReview();
    if (name === "phrases") renderPhrases();
    if (name === "numbers") renderNumbers();
    if (name === "convos") renderConvos();
  }

  // ---------- Wire up ----------
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-say]");
    if (btn && !playing) { e.stopPropagation(); tts.speak(btn.dataset.say); }
  });
  $$(".tab").forEach((t) => t.onclick = () => showScreen(t.dataset.screen));
  $("#num-input").addEventListener("input", updateConverter);
  $("#num-play").onclick = () => { const w = numberToItalian($("#num-input").value.replace(/[^0-9]/g, "")); if (w) tts.speak(w); };
  $("#num-input").addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); $("#num-play").click(); $("#num-input").blur(); } });
  $("#settings-btn").onclick = openSettings;
  $("#opt-audio").onchange = (e) => { settings.audio = e.target.value; save(); fillAudioStatus(); };
  $("#download-audio").onclick = async (e) => {
    const btn = e.currentTarget;
    if (!tts.manifest || settings.audio === "device") { toast("No recorded audio to download"); return; }
    btn.disabled = true;
    const n = await tts.downloadAll((d, t) => { btn.textContent = `Downloading… ${d}/${t}`; });
    btn.textContent = `✓ ${n} clips saved for offline`;
    setTimeout(() => { btn.disabled = false; btn.textContent = "⬇ Download all audio for offline"; }, 4000);
  };
  $("#test-voice").onclick = () => {
    const sample = "Buongiorno! Un caffè, per favore.";
    const v = tts.pick();
    $("#voice-status").textContent = settings.audio !== "device" && tts.hasClip(sample)
      ? `Playing recorded clip (${settings.audio})…`
      : v ? `Playing with device voice: ${tts.label(v)} (${v.lang})…`
      : "No Italian voice reported by this browser; trying default voice…";
    tts.speak(sample, {
      onstart: () => { $("#voice-status").textContent += " ▶ speaking"; },
      onend: () => { $("#voice-status").textContent += " ✓ done"; },
    });
  };
  $("#close-settings").onclick = closeSettings;
  $("#settings").addEventListener("click", (e) => { if (e.target.id === "settings") closeSettings(); });
  $("#reset-progress").onclick = () => {
    if (confirm("Reset all review progress? This can't be undone.")) {
      progress = { cards: {}, newLog: {} }; save(); closeSettings();
    }
  };

  setupAudioSession();
  document.addEventListener("touchend", primeAudio, { once: true, passive: true });
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
  showScreen("review");
})();
