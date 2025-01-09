function checkTabUrl(tab) {
    if (tab.url && tab.url.startsWith('https://discord.com/')) {
        chrome.action.enable(tab.id);
    } else {
        chrome.action.disable(tab.id);
    }
}
  
chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.get(activeInfo.tabId, (tab) => {
        checkTabUrl(tab);
    });
});
  
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url) {
        checkTabUrl(tab);
    }
});
  
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
        checkTabUrl(tabs[0]);
    }
});
  