# rx-check

> Pharmacy price scrapper

Simple script for checking prices of [a bunch](https://github.com/alebelcor/rx-check/blob/main/src/selectors.ts) of pharmacy's online stores.

## Usage

1. Clone repo
2. Add a config file in `config/`, e.g. `config/foo.ts`
    - Export a `urls` with a list of URLs (`string[]`) to check
    - Export a `name` with a drug name (`string`, optional)
    - Export a `sku` with a SKU code (`string`, optional)
    - [Example](https://gist.github.com/alebelcor/fc4ad7c3cf5cb97c6eac91119297d458)
3. Check prices, e.g. `pnpm dev --rx foo`
    - Results will be output in the terminal
