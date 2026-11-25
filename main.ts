import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "Are you a language model? Because you just autocompleted my heart.";

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

function validateEntry(text: string): void {
  // Validate the line: 1-200 UTF-8 characters, non-blank, single line.
  const charCount = [...text].length;
  if (charCount < 1 || charCount > 200) {
    throw new Error(`entry must be 1-200 characters, got ${charCount}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be blank");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

validateEntry(LINE);

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, LINE + "\n", "utf8");
