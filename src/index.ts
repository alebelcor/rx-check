import { readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import meow from "meow";
import { chromium } from "playwright";

import { BROWSER_CONTEXT_OPTIONS, BROWSER_LAUNCH_OPTIONS, createInitScript } from "./setup";
import { getPrettyResults, delay, getResult, processResults } from "./utils";
import type { Result } from "./types";

type Config = {
  name?: string;
  sku?: string;
  urls: string[];
};

const CONFIG_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "config");

function getConfigIds() {
  return readdirSync(CONFIG_DIR)
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".d.ts"))
    .map((f) => f.replace(/\.ts$/, ""))
    .sort();
}

async function loadConfig(id: string) {
  if (!CONFIG_IDS.includes(id)) {
    throw new Error(`Unknown config: ${id}`);
  }

  const module = await import(join(CONFIG_DIR, `${id}.ts`));

  return module;
}

const CONFIG_IDS = getConfigIds();

const cli = meow(
  `
	Usage
	  $ rx-check --rx <id>

	Options
	  --rx, -r  (required)  [choices: ${CONFIG_IDS.join(", ")}]

	Examples
	  $ rx-check --rx l125
`,
  {
    importMeta: import.meta,
    flags: {
      rx: {
        type: "string",
        shortFlag: "r",
        choices: CONFIG_IDS,
      },
    },
  },
);

async function main() {
  const rx = cli.flags.rx;

  if (rx === undefined || rx === "" || !CONFIG_IDS.includes(rx)) {
    cli.showHelp(1);
    return;
  }

  const config: Config = await loadConfig(rx);

  const browser = await chromium.launch(BROWSER_LAUNCH_OPTIONS);

  const context = await browser.newContext(BROWSER_CONTEXT_OPTIONS);
  await context.addInitScript(createInitScript());

  const page = await context.newPage();

  // Enable to see logs from the page in development mode.
  // if (process.env.NODE_ENV === "development") {
  //   page.on("console", (msg) => {
  //     console.log(`[page] ${msg.text()}`);
  //   });
  // }

  const results: Result[] = [];

  try {
    for (const url of config.urls) {
      await delay(1_500);

      results.push(await getResult(page, url));
    }
  } catch (error) {
    console.error(`Unexpected error while getting all results:`, error);
  } finally {
    await context.close();
    await browser.close();
  }

  const processedResults = processResults(results);

  if (config.name) {
    console.log(config.name);
  }

  if (config.sku) {
    console.log("\nSKU: " + config.sku);
  }

  console.log("\n" + getPrettyResults(processedResults).toString());
}

main();
