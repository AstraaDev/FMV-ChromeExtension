document.getElementById('init').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;
        
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: () => {
                Function.prototype.constructor = function() {};
            }
        });
    });
});

document.getElementById('inject').addEventListener('click', () => {
    const resource = document.getElementById('resource').value;
    const amount = document.getElementById('amount').value;

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;
        
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: giveInventoryItem,
            args: [resource, parseInt(amount, 10)]
        });
    });
});

function giveInventoryItem(resource, amount) {
    if (typeof window.giveInventoryItem === 'function') {
        window.giveInventoryItem(resource, amount);
    } else {
        console.error('giveInventoryItem function is not defined in the current context.');
    }
}


