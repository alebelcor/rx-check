# rx-check

> Pharmacy price scrapper

## Usage

1. Clone repo
2. Add a config file in `config/`, e.g. `config/foo.ts`
    - Export a `urls` with a list of URLs (string[]) to check
    - Export a `name` with a drug name (string, optional)
    - Export a `sku` with a SKU code (string, optional)
3. Check prices, e.g. `pnpm dev --rx foo`
    - Results will be output in the terminal
