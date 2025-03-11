const injectSpacingAllyScript = (type, file, button) => chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length) {
        chrome.scripting[type]({ target: { tabId: tabs[0].id }, files: [file] });
        button.disabled = true;
    }
});

document.getElementById("inject-css-spacingally").addEventListener("click", function() {
    injectSpacingAllyScript('insertCSS', 'SpacingsAlly/styles.css', this);
});

document.getElementById("inject-js-spacingally").addEventListener("click", function() {
    injectSpacingAllyScript('executeScript', 'SpacingsAlly/script.js', this);
});
