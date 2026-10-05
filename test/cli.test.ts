import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

test("missing --rx in a non-interactive run exits with config guidance", () => {
  const result = spawnSync(process.execPath, ["--import", "tsx", "src/index.ts"], {
    cwd: projectRoot,
    encoding: "utf8",
  });

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Interactive terminal required/);
  assert.match(result.stderr, /adimod400/);
});
