chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    // Define blocked URL patterns (ad servers)
    const blockedDomains = ["ads.example.com", "trackers.example.com"];

    // Check if the requested URL matches one of the blocked domains
    const blockRequest = blockedDomains.some(domain => details.url.includes(domain));

    return { cancel: blockRequest }; // Block the request if it matches
  },
  { urls: ["<all_urls>"] },  // Match all URLs
  ["blocking"]  // Block the request
);


// Sample filter list, you can expand this with more ad-serving domains or tracking URLs
const adFilters = [
  "*://*.doubleclick.net/*",
  "*://*.google-analytics.com/*",
  "*://*.adservice.google.com/*",
  "*://*.ads.example.com/*",
  "*://*.example-ad.com/*"
];

// Add filtering rules to block the listed URLs
chrome.declarativeNetRequest.updateDynamicRules({
  addRules: adFilters.map((pattern, index) => ({
    id: index + 1,
    action: { type: 'block' },
    condition: { urlFilter: pattern }
  })),
  removeRuleIds: adFilters.map((_, index) => index + 1)
});
