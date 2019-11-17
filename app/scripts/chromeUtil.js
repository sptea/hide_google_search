export default {
  getHostsFromStrage() {
    return new Promise(function(resolve) {
      chrome.storage.local.get("hosts", function(items) {
        resolve(items);
      });
    });
  }
};
