import type { BrowserContextOptions, LaunchOptions } from "playwright";

// https://playwright.dev/docs/api/class-browsertype#browser-type-launch
export const BROWSER_LAUNCH_OPTIONS = {
  args: [
    // Hides the automation flag so sites can't detect WebDriver via
    // `document.documentElement.getAttribute('webdriver')`.
    "--disable-blink-features=AutomationControlled",

    // Uses /tmp instead of /dev/shm for shared memory; avoids crashes in some
    // Docker/low-memory environments.
    "--disable-dev-shm-usage",

    // Disables the setuid sandbox; often needed when the sandbox is unavailable
    // or causes launch failures.
    "--disable-setuid-sandbox",

    // Runs without the OS sandbox; required in some CI/container environments
    // where sandbox isn't supported.
    "--no-sandbox",

    // Prevents Chrome from showing "Chrome is being controlled by automated test
    // software" infobar.
    "--disable-infobars",

    // Sets the browser window position; can help avoid layout/focus quirks in
    // headless.
    "--window-position=0,0",

    // Ignores SSL certificate errors (e.g. self-signed, expired); use only in
    // trusted/automation contexts.
    "--ignore-certificate-errors",

    // Ignores certificate errors for SPKI (public key) mismatches; complements
    // the flag above.
    "--ignore-certificate-errors-spki-list",

    // Relaxes origin isolation; can reduce fingerprinting differences vs. a
    // normal browser (use with care).
    "--disable-features=IsolateOrigins,site-per-process",

    // Disables same-origin policy and other web security checks; improves
    // compatibility, lowers security.
    "--disable-web-security",

    // Allows private network requests (e.g. from public pages to localhost);
    // needed for some dev/API setups.
    "--disable-features=BlockInsecurePrivateNetworkRequests",
  ],

  headless: true,

  // Prevent Playwright from adding '--enable-automation' to avoid detection of automation by some websites.
  ignoreDefaultArgs: ["--enable-automation"],
} satisfies LaunchOptions;

// https://playwright.dev/docs/api/class-browser#browser-new-context
export const BROWSER_CONTEXT_OPTIONS = {
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36",
  viewport: { width: 1920, height: 1080 },
  locale: "es-MX",
  timezoneId: "America/Mexico_City",
  javaScriptEnabled: true,
  bypassCSP: false,
  extraHTTPHeaders: {
    Accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
    "Accept-Encoding": "gzip, deflate, br, zstd",
    "Accept-Language": "es-MX,es;q=0.9,en-US,en;q=0.8",
    "Cache-Control": "no-cache",
    Dnt: "1",
    Pragma: "no-cache",
    "Sec-Ch-Ua": '"Not:A-Brand";v="99", "Google Chrome";v="145", "Chromium";v="145"',
    "Sec-Ch-Ua-Arch": '"arm"',
    "Sec-Ch-Ua-Bitness": '"64"',
    "Sec-Ch-Ua-Full-Version": '"145.0.7632.117"',
    "Sec-Ch-Ua-Full-Version-List":
      '"Not:A-Brand";v="99.0.0.0", "Google Chrome";v="145.0.7632.117", "Chromium";v="145.0.7632.117"',
    "Sec-Ch-Ua-Mobile": "?0",
    "Sec-Ch-Ua-Model": '""',
    "Sec-Ch-Ua-Platform": '"macOS"',
    "Sec-Ch-Ua-Platform-Version": '"15.7.4"',
    "Sec-Fetch-Dest": "document",
    "Sec-Fetch-Mode": "navigate",
    "Sec-Fetch-Site": "none",
    "Sec-Fetch-User": "?1",
    "Sec-Gpc": "1",
    "Upgrade-Insecure-Requests": "1",
  },
} satisfies BrowserContextOptions;

// Hide navigator.webdriver (most common bot check).
const WEBDRIVER_SCRIPT = `
(function() {
  try {
    const desc = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(navigator), 'webdriver');
    if (desc) {
      Object.defineProperty(navigator, 'webdriver', {
        get: function() { return false; },
        enumerable: true,
        configurable: true
      });
    }
  } catch (e) {}
})();
`;

// Mask Chrome automation / CDP (window.chrome.runtime).
const CHROME_RUNTIME_SCRIPT = `
(function() {
  if (!window.chrome) window.chrome = {};
  if (!window.chrome.runtime) {
    window.chrome.runtime = {
      connect: function() { return {}; },
      sendMessage: function() { return Promise.resolve(); },
      id: undefined,
      onMessage: { addListener: function() {} },
      onConnect: { addListener: function() {} }
    };
  }
})();
`;

// Plugins length (real Chrome has plugins).
const PLUGINS_SCRIPT = `
(function() {
  try {
    Object.defineProperty(navigator, 'plugins', {
      get: function() {
        const plugins = [];
        for (let i = 0; i < 3; i++) {
          plugins.push({
            name: 'Chrome PDF Plugin',
            filename: 'internal-pdf-viewer',
            description: 'Portable Document Format'
          });
        }
        plugins.length = 3;
        plugins.item = function(i) { return this[i] || null; };
        plugins.namedItem = function(n) {
          for (let i = 0; i < this.length; i++) if (this[i].name === n) return this[i];
          return null;
        };
        return plugins;
      },
      enumerable: true,
      configurable: true
    });
  } catch (e) {}
})();
`;

// Languages (match Accept-Language).
const LANGUAGES_SCRIPT = `
(function() {
  try {
    Object.defineProperty(navigator, 'languages', {
      get: function() { return ['es-MX', 'es', 'en']; },
      enumerable: true,
      configurable: true
    });
  } catch (e) {}
})();
`;

// Platform consistency (macOS for our UA).
const PLATFORM_SCRIPT = `
(function() {
  try {
    Object.defineProperty(navigator, 'platform', {
      get: function() { return 'MacIntel'; },
      enumerable: true,
      configurable: true
    });
  } catch (e) {}
})();
`;

// Hardware concurrency (typical desktop).
const HARDWARE_SCRIPT = `
(function() {
  try {
    Object.defineProperty(navigator, 'hardwareConcurrency', {
      get: function() { return 8; },
      enumerable: true,
      configurable: true
    });
  } catch (e) {}
})();
`;

// WebGL vendor/renderer (common fingerprint).
const WEBGL_SCRIPT = `
(function() {
  try {
    const getParam = WebGLRenderingContext.prototype.getParameter;
    WebGLRenderingContext.prototype.getParameter = function(param) {
      if (param === 37445) return 'Intel Inc.';
      if (param === 37446) return 'Intel Iris OpenGL Engine';
      return getParam.apply(this, arguments);
    };
  } catch (e) {}
})();
`;

// Permissions query (avoid automation-specific behavior).
const PERMISSIONS_SCRIPT = `
(function() {
  try {
    const orig = navigator.permissions.query;
    navigator.permissions.query = function(params) {
      if (params.name === 'notifications') return Promise.resolve({ state: 'prompt', onchange: null });
      return orig.apply(this, arguments);
    };
  } catch (e) {}
})();
`;

const INIT_SCRIPTS = [
  WEBDRIVER_SCRIPT,
  CHROME_RUNTIME_SCRIPT,
  PLUGINS_SCRIPT,
  LANGUAGES_SCRIPT,
  PLATFORM_SCRIPT,
  HARDWARE_SCRIPT,
  WEBGL_SCRIPT,
  PERMISSIONS_SCRIPT,
] as const;

export function createInitScript() {
  return INIT_SCRIPTS.join("\n");
}

export function createSimulatedReferer(url: string) {
  const fallback = "https://www.google.com/";

  const hostname = new URL(url).hostname;

  const parts = hostname.split(".");
  if (parts.length < 2) {
    return fallback;
  }

  const domain = parts.slice(-2).join(".");
  if (/^[\d.]+$/.test(domain) || domain === "localhost") {
    return fallback;
  }

  const site = parts[parts.length - 2] ?? "";
  return `https://www.google.com/search?q=${encodeURIComponent(site)}`;
}
