document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("locate-headers-h-track");
    const output = document.getElementById("header-list");
    
    button.addEventListener("click", async () => {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab) return;
        
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: extractHeaders,
        }, (results) => {
            if (results && results[0] && results[0].result) {
                output.innerHTML = results[0].result.map(h => `${cleanHeaders(h)}`).join("\n");
            }
        });
    });
});

function extractHeaders() {
    return Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6"))
        .map(h => h.outerHTML);
}

function cleanHeaders(header) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = header;
    const element = tempDiv.firstElementChild;
    
    if (!element) {
        throw new Error('No valid HTML element found');
    }

    const elementType = element.tagName.toLowerCase(); 
    const textContent = element.textContent || element.innerText;
    return `<div data-element-type="${elementType}" class="h-tracked-${elementType}"><span>${elementType}</span>${textContent.trim()}</div>`;
}

