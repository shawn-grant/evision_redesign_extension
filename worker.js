chrome.runtime.onInstalled.addListener(() => {
    console.log('Installed ')

    // chrome.storage.local.set({
    //     "name": "Shawn"
    // })

    // chrome.storage.local.get('name', data => {
        
    // })
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
        //inject CSS into page
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: ["./inject_styles.css"]
        })
            .then(() => {
                console.log("injected CSS")
            })
            .catch(err => {
                console.log(err)
            })
        
        //inject javascript into page
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./inject_script.js"]
        })
            .then(() => {
                console.log("injected JS")
            })
            .catch(err => {
                console.log(err)
            })
    }
    
})