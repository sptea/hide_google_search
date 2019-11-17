browser.runtime.onInstalled.addListener(details => {
  console.log("previousVersion", details.previousVersion);
});

browser.browserAction.setBadgeText({});

console.log(`Event Page for Browser Action`);
