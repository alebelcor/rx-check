export const PRICE_SELECTORS_BY_DOMAIN = [
  { domain: "amanda.com.mx", selector: ".summary .price .amount" },
  { domain: "amazon.com.mx", selector: ".apex-core-price-identifier .a-offscreen" },
  { domain: "benavides.com.mx", selector: ".price" },
  { domain: "bodegaaurrera.com.mx", selector: '[itemprop="price"]' },
  { domain: "caretobeauty.com", selector: ".product-view__price--final-price" },
  { domain: "centrodrma.com", selector: ".product-price-current" },
  { domain: "cityderm.mx", selector: ".summary .price ins .amount bdi" },
  { domain: "claroshop.com", selector: '[class^="stylesShopData_priceSale__"]' },
  { domain: "costco.com.mx", selector: ".product-price-amount sip-format-price" },
  { domain: "cruzrosa.mx", selector: ".product-price--original" },
  {
    domain: "cuiderma.com",
    selector: ".product__block--product-header-inner .product__price [data-price]",
  },
  { domain: "curitek.com", selector: ".summary .price .amount .int-ck" },
  { domain: "derma.shop", selector: '[itemprop="price"]' },
  { domain: "dermabalance.com.mx", selector: ".summary .price .amount bdi" },
  { domain: "dermaexpress.com.mx", selector: "[data-product-price]" },
  { domain: "dermamedic.com.mx", selector: ".summary .price .amount bdi" },
  { domain: "dermamedina.com", selector: ".product__price-and-ratings [data-price]" },
  { domain: "dermatica.com.mx", selector: ".product-detail .price .amount" },
  { domain: "dermocutanea.com", selector: '[data-hook="product-prices-wrapper"] [data-wix-price]' },
  { domain: "evaderm.com.mx", selector: "product-meta .price-list .price" },
  { domain: "fahorro.com", selector: ".product-info-main .price-box .price" },
  { domain: "farmaciaalicia.com.mx", selector: ".product-block .price" },
  { domain: "farmaciacoyoacan.com", selector: ".price__regular .price-item" },
  {
    domain: "farmaciacutem.com",
    selector:
      ".rtin-price-area .price ins .amount bdi, .rtin-price-area .price :not(del) .amount bdi",
  },
  { domain: "farmaciagloria.mx", selector: '.current-price [itemprop="price"]' },
  {
    domain: "farmaciaherrera.com.mx",
    selector: ".product-info__price .price__default .price__current",
  },
  { domain: "farmaciaproderma.com", selector: ".summary .price .amount bdi" },
  { domain: "farmaciasanisidro.mx", selector: ".price .amount bdi" },
  { domain: "farmaciasbazar.com", selector: ".precio" },
  {
    domain: "farmaciasespecializadas.com",
    selector: ".product-info-main .price-final_price .price",
  },
  {
    domain: "farmaciasfleming.mx",
    selector:
      ".wpb-content-wrapper .wpb_wrapper .price > .amount bdi, .wpb-content-wrapper .wpb_wrapper .price :not(del) .amount bdi",
  },
  {
    domain: "farmaciasguadalajara.com",
    selector: '[itemprop="price"], .product-info-main-section .sales .value',
  },
  { domain: "farmaciasanjorge.com", selector: ".price--highlight" },
  { domain: "farmaciasanpablo.com.mx", selector: ".priceTotal" },
  { domain: "farmaleal.com.mx", selector: ".price .price-item" },
  {
    domain: "farmatodo.com.mx",
    selector: '[class*="--sku-selector"] [class*="-currencyContainer"]',
  },
  { domain: "farmasmart.com", selector: "#main div > span.tw-sr-only" },
  { domain: "farmavrim.com.mx", selector: ".price .price-item" },
  { domain: "frenchbeautyhub.com", selector: ".product__price span .visually-hidden" },
  { domain: "heb.com.mx", selector: ".price" },
  { domain: "isdin.com", selector: '[data-testid="price-component"] [data-testid="titleElement"]' },
  {
    domain: "klyns.mx",
    selector: ".vtex-product-price-1-x-sellingPriceValue .vtex-product-price-1-x-currencyContainer",
  },
  { domain: "liverpool.com.mx", selector: ".a-product__paragraphDiscountPrice" },
  {
    domain: "mecdermafarmacia.com",
    selector: ".price__regular .price-item.price-item--regular",
  },
  { domain: "perfumesclub.com.mx", selector: ".totalMT2" },
  { domain: "prixz.com", selector: ".price .amount bdi" },
  { domain: "sanapiel.com.mx", selector: ".product-info-price .price__regular .price-item" },
  { domain: "sanborns.com.mx", selector: '[class^="stylesDataPrice_pPrice__"]' },
  { domain: "sears.com.mx", selector: ".pPrice" },
  { domain: "sephora.com.mx", selector: ".price-box" },
  { domain: "skingroupstore.mx", selector: "[data-product-price]" },
  { domain: "skinsensepharma.com", selector: ".product-price" },
  { domain: "skn.com.mx", selector: ".current-price" },
  { domain: "sweetcare.com", selector: ".pvp" },
  { domain: "vidafarmacias.com", selector: ".product-prices .price" },
  { domain: "walmart.com.mx", selector: '[itemprop="price"]' },
  { domain: "wecarepharma.mx", selector: ".price__current .money" },
  { domain: "yza.mx", selector: ".large-price" },
] as const;

export function getPriceSelector(hostname: string) {
  const match = PRICE_SELECTORS_BY_DOMAIN.find(({ domain }) => hostname.includes(domain));

  if (!match) {
    throw new Error(`No selector found for: ${hostname}`);
  }

  return match.selector satisfies (typeof PRICE_SELECTORS_BY_DOMAIN)[number]["selector"];
}
