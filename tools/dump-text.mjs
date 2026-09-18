// Prints every Italian string that needs audio, as JSON, by loading data.js.
import { readFileSync } from "node:fs";
import vm from "node:vm";
const ctx = {};
vm.runInNewContext(readFileSync(new URL("../data.js", import.meta.url), "utf8") + "\nthis.PHRASES=PHRASES;this.CONVERSATIONS=CONVERSATIONS;this.AUDIO_EXTRA=AUDIO_EXTRA;", ctx);
const texts = new Set();
for (const p of ctx.PHRASES) texts.add(p.it);
for (const c of ctx.CONVERSATIONS) for (const l of c.lines) texts.add(l.it);
for (const t of ctx.AUDIO_EXTRA) texts.add(t);
console.log(JSON.stringify([...texts], null, 0));
