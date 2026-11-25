// The Tired Dark Lord: A 100-Word Villain Monologue
// Writes the monologue to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt).
// Node 22, stdlib only, no network. Deterministic: same bytes every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINES = [
  "Hero. Sit. No, not the throne, the stool. The throne's back snapped in the siege, and the carpenter's on holiday.",
  "You want the amulet? Third drawer. Mind the cursed cutlery.",
  "Twenty years I've kept this mountain. Twenty years of prophecies, of chosen ones knocking before breakfast.",
  "You lot never knock after lunch, do you? Always dawn.",
  "My scheme? It's magnificent. A tax on moonlight. Every werewolf in the valley pays in silver.",
  "And silver, hero, buys silence. Buys sleep.",
  "Take the amulet. Take the sword. Just close the gate behind you.",
  "The draft gets in, and the draft always wins.",
];

const text = LINES.join("\n") + "\n";

const words = text.trim().split(/\s+/).length;
const chars = [...text.trim()].length;
if (words < 90 || words > 110) throw new Error(`word count ${words} is not near 100`);
if (chars < 1 || chars > 600) throw new Error(`char count ${chars} outside 1-600`);
if (!text.trim()) throw new Error("entry is only whitespace");

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), text, "utf8");
console.log(`wrote ${join(outDir, "entry.txt")} (${words} words, ${chars} chars)`);
