import CliTable3 from "cli-table3";

import type { Result } from "./types";
import type { Page } from "playwright";
import { createSimulatedReferer } from "./setup";
import { getPriceSelector } from "./selectors";

export function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function extractPrice(selector: string) {
  const element = document.querySelector(selector);

  if (element) {
    const priceText = (element.textContent ?? "").trim();

    // $1,234.56 MXN
    // $1,234 MXN
    // $1,234.56
    // $1,234
    // 1,234.56 MXN
    // 1,234 MXN
    // MXN $1,234.56
    // MXN $1,234
    // MXN 1,234.56
    // MXN 1,234
    // $1234.56 MXN
    // $1234 MXN
    // $1234.56
    // $1234
    // 1234.56 MXN
    // 1234 MXN
    // MXN $1234.56
    // MXN $1234
    // MXN 1234.56
    // MXN 1234
    const priceRegex = /(?:MXN\s+)?\$?(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?(?:\s+MXN)?/g;

    let matches: RegExpExecArray | null;

    while ((matches = priceRegex.exec(priceText)) !== null) {
      const price = Number.parseFloat(matches[0].replace(/[^0-9.]/g, ""));

      if (!Number.isNaN(price) && price > 0) {
        return price;
      }
    }
  }

  return undefined;
}

export function formatPrice(price: number | undefined) {
  return price != null && price > 0
    ? new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(price)
    : "N/A";
}

export async function getResult(page: Page, url: string) {
  try {
    const response = await page.goto(url, {
      referer: createSimulatedReferer(url),
      waitUntil: "load",
    });

    if (!response?.ok()) {
      console.error(`Response not OK for ${url}.`);
      return { url, price: undefined };
    }

    const selector = getPriceSelector(new URL(url).hostname);

    const price = await page.evaluate(extractPrice, selector);

    return { url, price };
  } catch (error) {
    console.error(`Unexpected error while getting result for ${url}:`, error);
    return { url, price: undefined };
  }
}

export function getPrettyResults(results: Result[]) {
  const table = new CliTable3({
    head: ["Price", "URL"],
    style: {
      head: [],
    },
    wordWrap: true,
  });

  for (const result of results) {
    table.push([formatPrice(result.price), result.url]);
  }

  return table;
}

export function processResults(results: Result[]) {
  return [...results].sort((a, b) => {
    const aVal = a.price != null && a.price > 0 ? a.price : Infinity;
    const bVal = b.price != null && b.price > 0 ? b.price : Infinity;

    return aVal - bVal;
  });
}
