chrome.runtime.onInstalled.addListener(() => {
    console.log('Installed ')
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let cssfile = "./css/inject_styles.css" //default styles
    let jsfile = "./scripts/inject_script.js" //default js

    if (changeInfo.status === 'complete' && /^https:\/\/evisionweb.utech.edu.jm/.test(tab.url)) {

        //inject JQUERY
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["./scripts/jquery.min.js"]
        })
            .then(() => {
                console.log("injected JQUERY")

                //inject BOOTSTRAP JS
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["./scripts/bootstrap.min.js"]
                })
                    .then(() => {
                        console.log("injected BOOTSTRAP JS")
                        
                        //inject BOOTSTRAP CSS
                        chrome.scripting.insertCSS({
                            target: { tabId: tabId },
                            files: ["./css/bootstrap.min.css"]
                        })
                            .then(() => {
                                console.log("injected BOOTSTRAP CSS")
                            })
                            .catch(err => {
                                console.log(err)
                            })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
        
        
        // INJECT THE APPROPRIATE CSS AND JS FILES BASED ON THE PAGE WE ARE ON
        //THIS IS THE LOGIN PAGE
        if (tab.url == "https://evisionweb.utech.edu.jm/sipr/sits.urd/run/siw_lgn" || tab.url == "https://evisionweb.utech.edu.jm/sipr/sits.urd/run/SIW_LGN") {
            cssfile = "./css/loginpage.css"
            jsfile = "./scripts/loginpage.js"
        }
        //THIS IS THE DOB VERIFY PAGE
        else if (tab.url == "https://evisionweb.utech.edu.jm") {
            cssfile = "./css/inject_styles.css"
            jsfile = "./scripts/loginpage.js"
        }

        //inject appropriate CSS into page
        chrome.scripting.insertCSS({
            target: { tabId: tabId },
            files: [cssfile]
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
            files: [jsfile]
        })
            .then(() => {
                console.log("injected JS")
            })
            .catch(err => {
                console.log(err)
            })
    }
    
})