const getBrowserVersion = (
  userAgentString: string,
  browserName: string,
): number | undefined => {
  // Only gets major version
  const versionString = userAgentString.match(
    new RegExp(browserName + "/(\\d+)"),
  );

  if (!versionString || versionString.length > 2) return;

  // Second element is capture group (first element is entire match)
  return parseInt(versionString[1]);
};

export type BrowserName =
  | "firefox"
  | "chrome"
  | "safari"
  | "internet-explorer"
  | "opera"
  | "samsung-internet"
  | "microsoft-edge-legacy"
  | "microsoft-edge-chromium"
  | "unknown";

export const getBrowserInfo = (
  userAgent: string,
): { name: BrowserName; version?: number } => {
  // Based on: https://developer.mozilla.org/en-US/docs/Web/API/Window/navigator#example_1_browser_detect_and_return_a_string
  // and: https://www.geeksforgeeks.org/how-to-detect-the-user-browser-safari-chrome-ie-firefox-and-opera-using-javascript/
  if (userAgent.includes("Firefox")) {
    return {
      name: "firefox",
      version: getBrowserVersion(userAgent, "Firefox"),
    };
  } else if (userAgent.includes("SamsungBrowser")) {
    return {
      name: "samsung-internet",
      version: getBrowserVersion(userAgent, "SamsungBrowser"),
    };
  } else if (userAgent.includes("Opera") || userAgent.includes("OPR")) {
    return {
      name: "opera",
      version: getBrowserVersion(userAgent, "OPR"),
    };
  } else if (userAgent.includes("MSIE") || userAgent.includes("rv:")) {
    return {
      name: "internet-explorer",
      version: getBrowserVersion(userAgent, "MSIE"),
    };
  } else if (userAgent.includes("Edge")) {
    return {
      name: "microsoft-edge-legacy",
      version: getBrowserVersion(userAgent, "Edge"),
    };
  } else if (userAgent.includes("Edg")) {
    return {
      name: "microsoft-edge-chromium",
      version: getBrowserVersion(userAgent, "Edg"),
    };
  } else if (userAgent.includes("Chrome")) {
    return {
      name: "chrome",
      version: getBrowserVersion(userAgent, "Chrome"),
    };
  } else if (userAgent.includes("Safari")) {
    return {
      name: "safari",
      version: getBrowserVersion(userAgent, "Version"),
    };
  } else {
    return { name: "unknown" };
  }
};

type MinimumCompatibleVersion = number;
type BrowserCompatibility =
  | "compatible"
  | "incompatible"
  | MinimumCompatibleVersion;

// Based on: https://caniuse.com/?search=text-wrap on 22/02/24
const textWrapCompatible: { [E in BrowserName]: BrowserCompatibility } = {
  "microsoft-edge-chromium": 114,
  "samsung-internet": 23,
  chrome: 114,
  firefox: 121,
  opera: 100,
  safari: 18,
  "internet-explorer": "incompatible",
  "microsoft-edge-legacy": "incompatible",
  unknown: "incompatible",
};

export const checkBrowserTextWrapCompatible = (userAgent: string): boolean => {
  const browser = getBrowserInfo(userAgent);

  const compatibility = textWrapCompatible[browser.name];

  if (compatibility == "compatible") {
    return true;
  } else if (compatibility == "incompatible") {
    return false;
  } else if (!!browser.version) {
    return browser.version >= compatibility;
  } else {
    return false;
  }
};
