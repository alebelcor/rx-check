export const PRICE_SELECTORS_BY_DOMAIN = [
  { domain: "amanda.com.mx", selector: ".summary .price .amount" },
  { domain: "benavides.com.mx", selector: ".price" },
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
  { domain: "farmaciacutem.com", selector: ".rtin-price-area .price :not(del) .amount bdi" },
  { domain: "farmaciasfleming.mx", selector: ".wpb_wrapper .price ins .amount bdi" },
  { domain: "farmaciagloria.mx", selector: '.current-price [itemprop="price"]' },
  { domain: "farmaciasguadalajara.com", selector: '[itemprop="price"]' },
  {
    domain: "farmaciaherrera.com.mx",
    selector: ".product-info__price .price__default .price__current",
  },
  {
    domain: "farmaciasespecializadas.com",
    selector: ".product-info-main .price-final_price .price",
  },
  { domain: "farmaciaproderma.com", selector: ".summary .price .amount bdi" },
  { domain: "farmaciasanisidro.mx", selector: ".price .amount bdi" },
  { domain: "farmaciasanpablo.com.mx", selector: ".priceTotal" },
  { domain: "frenchbeautyhub.com", selector: ".product__price span .visually-hidden" },
  { domain: "isdin.com", selector: '[data-testid="price-component"] [data-testid="titleElement"]' },
  {
    domain: "klyns.mx",
    selector: ".vtex-product-price-1-x-sellingPriceValue .vtex-product-price-1-x-currencyContainer",
  },
  {
    domain: "mecdermafarmacia.com",
    selector: ".price__regular .price-item.price-item--regular",
  },
  { domain: "perfumesclub.com.mx", selector: ".totalMT2" },
  { domain: "sanapiel.com.mx", selector: ".product-info-price .price__regular .price-item" },
  { domain: "sanborns.com.mx", selector: '[class^="stylesDataPrice_pPrice__"]' },
  { domain: "sephora.com.mx", selector: ".price-box" },
  { domain: "skn.com.mx", selector: ".current-price" },
  { domain: "skinsensepharma.com", selector: ".product-price" },
  { domain: "skingroupstore.mx", selector: "[data-product-price]" },
  { domain: "sweetcare.com", selector: ".pvp" },
  { domain: "yza.mx", selector: ".large-price" },
] as const;

export function getPriceSelector(hostname: string) {
  const match = PRICE_SELECTORS_BY_DOMAIN.find(({ domain }) => hostname.includes(domain));

  if (!match) {
    throw new Error(`No selector found for: ${hostname}`);
  }

  return match.selector satisfies (typeof PRICE_SELECTORS_BY_DOMAIN)[number]["selector"];
}
