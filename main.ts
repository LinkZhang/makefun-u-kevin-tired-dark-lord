// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes the monologue to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Node 22, stdlib only, no network. Deterministic: same bytes every run.
//
// The speaker: a curse-broker with a backlog of 412 unfiled curses, whose
// grand scheme is turning the king's gold to lead — and who now alphabetises
// instead of cursing bloodlines. The tiredness is never announced: it lives
// in the pauses ("still — still sitting"), the trailing thoughts ("the quill
// keeps... the quill keeps drying out"), and the caught slip ("And me. No —
// not me. The ink."). The sting lands in the last line: the villain who
// sells eternal curses doesn't read his own small print either.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const SENTENCES = [
  "You're here for a curse? Join the queue.",
  "Four hundred and twelve unfiled, and the king's gold-to-lead one is still — still sitting on my desk since spring.",
  "I used to curse whole bloodlines before breakfast. Now I... I alphabetise.",
  "The scheme hasn't changed: the crown, the vault, the little lead coins in his pocket, clink, clink, all winter.",
  "Only the quill keeps... the quill keeps drying out. And the ink. And me. No — not me. The ink.",
  "Sit down, hero. The form's in the second drawer. Tick the box that says eternal.",
  "Everyone ticks eternal. Nobody reads the small print. I don't either.",
];

const text = SENTENCES.join(" ") + "\n";

// Gate self-checks, from the competition's RULES.txt:
// entry.txt must be UTF-8 text of 1 to 600 characters, not only whitespace,
// and the monologue should stay near 100 words.
const body = text.trim();
const words = body.split(/\s+/).length;
const chars = [...body].length;
if (words < 90 || words > 110) {
  throw new Error(`word count ${words} is not near 100`);
}
if (chars < 1 || chars > 600) {
  throw new Error(`char count ${chars} outside 1-600`);
}
if (!body) {
  throw new Error("entry is only whitespace");
}
// The brief forbids the villain simply saying he is weary: the tiredness
// must be felt in rhythm and deflection, never announced. Guard that none
// of the plain announcements slipped into the text.
const ANNOUNCED = ["tired", "weary", "exhausted", "sleepy", "fatigued"];
for (const word of ANNOUNCED) {
  if (new RegExp(`\\b${word}\\b`, "i").test(body)) {
    throw new Error(`entry announces tiredness with "${word}"`);
  }
}
// Deflection, not declaration, is the mechanism: the villain starts a
// sentence that would admit the toll ("And me.") and immediately corrects
// himself ("No — not me. The ink."), so the weariness leaks out through
// the retraction instead of being stated. A monologue that reads as one
// breath of speakable dialogue must also be a single paragraph: no
// embedded newlines and no blank lines inside the body.
if (body.includes("\n")) {
  throw new Error("entry is not a single paragraph");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${words} words, ${chars} chars)`);
