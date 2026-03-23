// fix all selectors that don't have two parts
export const PRICE_SELECTORS_BY_DOMAIN = [
  { domain: "amanda.com.mx", selector: ".summary .price .amount" },
  { domain: "amazon.com.mx", selector: ".apex-core-price-identifier .a-offscreen" },
  { domain: "benavides.com.mx", selector: ".price-final_price .price" },
  { domain: "caretobeauty.com", selector: ".product-view__price--final-price" },
  { domain: "centrodrma.com", selector: ".product-price-current" },
  { domain: "clickderma.com.mx", selector: ".block-price .element-price" },
  {
    domain: "cityderm.mx",
    selector: ".summary .price ins .amount > bdi, .summary .price > .amount > bdi",
  },
  { domain: "claroshop.com", selector: '[class^="stylesShopData_priceSale__"]' },
  {
    domain: "costco.com.mx",
    selector: ".price-after-discount .you-pay-value, .product-price-amount sip-format-price",
  },
  { domain: "cruzrosa.mx", selector: ".product-price--original" },
  {
    domain: "cuiderma.com",
    selector: ".product__block--product-header-inner .product__price [data-price]",
  },
  {
    domain: "curitek.com",
    selector: ".summary .price ins .amount > bdi, .summary .price > .amount > bdi",
  },
  { domain: "derma.shop", selector: '[itemprop="price"]' },
  {
    domain: "dermabalance.com.mx",
    selector: ".summary .price ins .amount > bdi, .summary .price > .amount > bdi",
  },
  {
    domain: "dermatologicocountry.com",
    selector: ".et_pb_module .price ins .amount > bdi, .et_pb_module .price > .amount > bdi",
  },
  { domain: "dermaexpress.com.mx", selector: "[data-product-price]" },
  {
    domain: "dermamedic.com.mx",
    selector: ".summary .price ins .amount > bdi, .summary .price > .amount > bdi",
  },
  { domain: "dermamedina.com", selector: ".product__price-and-ratings [data-price]" },
  {
    domain: "dermatica.com.mx",
    selector: ".product-detail .price > .amount, .product-detail .price > ins > .amount",
  },
  { domain: "dermayeo.com", selector: ".ProductMeta .Price" },
  { domain: "derma-zona.com", selector: '.js_product [itemprop="price"]' },
  { domain: "dermocutanea.com", selector: '[data-hook="product-prices-wrapper"] [data-wix-price]' },
  {
    domain: "emeritafarmacias.com",
    selector: ".price > ins > .amount > bdi, .price > .amount > bdi",
  },
  { domain: "evaderm.com.mx", selector: ".product-meta .price-list .price" },
  { domain: "fahorro.com", selector: ".product-info-main .price-box .price" },
  {
    domain: "farmaciallceutica.com.mx",
    selector: ".price > ins > .amount > bdi, .price > .amount > bdi",
  },
  { domain: "farmaciaalicia.com.mx", selector: ".product-block .price" },
  { domain: "farmaciacoyoacan.com", selector: ".price__regular .price-item" },
  {
    domain: "farmaciacutem.com",
    selector: ".rtin-price-area .price ins .amount > bdi, .rtin-price-area .price > .amount > bdi",
  },
  {
    domain: "farmaciadechila.com",
    selector:
      ".product-information-inner .price ins .amount > bdi, .product-information-inner .price > .amount > bdi",
  },
  { domain: "farmaciagloria.mx", selector: '.current-price [itemprop="price"]' },
  {
    domain: "farmaciaherrera.com.mx",
    selector: ".product-info__price .price__default .price__current",
  },
  {
    domain: "farmaciaproderma.com",
    selector: ".summary .price ins .amount > bdi, .summary .price > .amount > bdi",
  },
  {
    domain: "farmaciasanisidro.mx",
    selector:
      ".elementor-widget-container .price ins .amount > bdi, .elementor-widget-container .price > .amount > bdi",
  },
  { domain: "farmaciasbazar.com", selector: ".precio" },
  { domain: "farmaciasdelnino.mx", selector: 'form[name="frmdetalle"] .oferta' },
  {
    domain: "farmaciasespecializadas.com",
    selector: ".product-info-main .price-final_price .price",
  },
  {
    domain: "farmaciasfleming.mx",
    selector: ".wd-single-price .price ins .amount > bdi, .wd-single-price .price > .amount > bdi",
  },
  {
    domain: "farmaciasguadalajara.com",
    selector: ".product-info-main-section .sales",
  },
  {
    domain: "farmaciahospitalsatelite.com",
    selector:
      ".elementor-jet-single-price .price ins .amount > bdi, .elementor-jet-single-price .price > .amount > bdi",
  },
  { domain: "farmaciasmedina.com", selector: ".product-details .new-price" },
  {
    domain: "farmaciasanjorge.com",
    selector: ".product-form .price-list :is(.price--highlight, .price)",
  },
  { domain: "farmaciasanpablo.com.mx", selector: ".priceTotal" },
  { domain: "farmaleal.com.mx", selector: ".price__sale .price-item--last" },
  {
    domain: "farmatodo.com.mx",
    selector:
      '[class*="--sku-selector"] [class*="-price_sellingPriceContainer"] [class*="-currencyContainer"]',
  },
  { domain: "farmasmart.com", selector: "#main div > span.tw-sr-only" },
  { domain: "farmavrim.com.mx", selector: ".price__sale .price-item--last" },
  { domain: "frenchbeautyhub.com", selector: ".product__price span .visually-hidden" },
  { domain: "heb.com.mx", selector: ".price" },
  { domain: "isdin.com", selector: '[data-testid="price-component"] [data-testid="titleElement"]' },
  {
    domain: "klyns.mx",
    selector: '[class*="-sellingPriceValue"]',
  },
  { domain: "laherrera.mx", selector: ".product-price .price__current" },
  {
    domain: "ledermafarmacia.com",
    selector: ".summary .price ins .amount > bdi, .summary .price > .amount > bdi",
  },
  { domain: "liverpool.com.mx", selector: ".a-product__paragraphDiscountPrice" },
  {
    domain: "mecdermafarmacia.com",
    selector: ".price__regular .price-item.price-item--regular",
  },
  {
    domain: "openfarma.mx",
    selector: ".product__info-block :is(.price__sale, .price__regular) .price-item",
  },
  { domain: "perfumesclub.com.mx", selector: ".totalMT2" },
  { domain: "prodermica.com.mx", selector: ".product-price .new-price" },
  {
    domain: "prixz.com",
    selector: ".summary .price ins .amount > bdi, .summary .price > .price-discount .amount > bdi",
  },
  { domain: "probemedic.mx", selector: "[data-price-amount] .price" },
  {
    domain: "promedicfarmasj.com",
    selector: ".summary-inner .price ins .amount > bdi, .summary-inner .price > .amount > bdi",
  },
  { domain: "sanapiel.com.mx", selector: ".product-info-price .price__regular .price-item" },
  { domain: "sanborns.com.mx", selector: '[class^="stylesDataPrice_pPrice__"]' },
  { domain: "sfe.com.mx", selector: ".detail-price .money" },
  { domain: "sears.com.mx", selector: '.pPrice, [class*="_pPrice"]' },
  { domain: "sephora.com.mx", selector: ".price-box" },
  { domain: "skingroupstore.mx", selector: "[data-product-price]" },
  { domain: "skinsensepharma.com", selector: ".product-price" },
  { domain: "skn.com.mx", selector: ".current-price" },
  {
    domain: "storeboehringer.com",
    selector: ".md\\:w-\\[25\\%\\] .md\\:block .bold.text-xl.text-green-500",
  },
  { domain: "sweetcare.com", selector: ".pvp" },
  { domain: "topicrem.mx", selector: "[data-price] [data-sale-price]" },
  { domain: "vidafarmacias.com", selector: ".product-prices .price" },
  { domain: "wecarepharma.mx", selector: ".price__current .money" },
  { domain: "yza.mx", selector: '.price .value:not([content="null"])' },
] as const;

export function getPriceSelector(hostname: string) {
  const match = PRICE_SELECTORS_BY_DOMAIN.find(({ domain }) => hostname.includes(domain));

  if (!match) {
    throw new Error(`No selector found for: ${hostname}`);
  }

  return match.selector satisfies (typeof PRICE_SELECTORS_BY_DOMAIN)[number]["selector"];
}
