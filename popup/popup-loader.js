// Opening popup when extension icon is clicked
chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: chrome.runtime.getURL("popup/popup.html"),
    type: "popup",
  });
});


