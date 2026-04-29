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
    // remove potential sibling/descendant elements polluting the price container
    const toRemoveSelectors = [
      '[class*="stylesDataPrice_contDiscount__"]',
      ".antes",
      ".contDiscount",
      ".old-price",
      ".undefined",
    ];

    for (const className of toRemoveSelectors) {
      const toRemove = element.querySelector(className);

      if (toRemove) {
        element.removeChild(toRemove);
      }
    }

    let priceText = (element.textContent ?? "").trim();

    // If there are decimals and more than two, keep only the first two after the decimal point
    priceText = priceText.replace(/(\.\d{2})\d+/, "$1").trim();

    priceText = priceText.replaceAll("MXN", "").trim();

    // Replace `,00` suffix with `.00` to avoid parsing errors
    priceText = priceText.replace(/,00$/, ".00").trim();

    // Remove non-numeric characters
    priceText = priceText.replace(/[^0-9.]/g, "").trim();

    // Parse the price
    const price = Number.parseFloat(priceText);

    if (!Number.isNaN(price) && price > 0) {
      return price;
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
