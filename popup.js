const loadedFiles = new Set();

function updateFileMap() {
    const list = document.getElementById("loaded-list");
    document.getElementById("file-map").style.display = 'block';
    list.innerHTML = "";
    loadedFiles.forEach(file => {
        const li = document.createElement("li");
        li.textContent = file;
        list.appendChild(li);
    });
}

function injectCSS() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;
        chrome.scripting.insertCSS({
            target: { tabId: tabs[0].id },
            files: ["public/styles.css"]
        }, () => {
            loadedFiles.add("public/styles.css");
            updateFileMap();
        });
    });
}

function injectJS() {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs.length === 0) return;
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["public/script.js"]
        }, () => {
            loadedFiles.add("public/script.js");
            updateFileMap();
        });
    });
}

document.getElementById("inject-css").addEventListener("click", injectCSS);
document.getElementById("inject-js").addEventListener("click", injectJS);
document.getElementById("inject-both").addEventListener("click", () => {
    injectCSS();
    injectJS();
});
