browser.runtime.onInstalled.addListener(details => {
  console.log("previousVersion", details.previousVersion);
});

console.log(`Event Page for Browser Action`);
