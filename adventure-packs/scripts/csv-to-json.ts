import fs from "node:fs";
import path from "node:path";

// TODO: Replace with your CSV parsing of places, activities, and bingo using a CSV library
// This is a stub showing where to put your conversion logic.

function writeJson(file: string, data: unknown) {
  const out = path.join(process.cwd(), "public", "data", file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify(data, null, 2));
  console.log("Wrote", out);
}

async function main() {
  // Replace with real conversion
  writeJson("places.json", []);
  writeJson("activities.json", []);
  writeJson("bingo.json", []);
}

main();