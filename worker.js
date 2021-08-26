chrome.runtime.onInstalled.addListener(() => {
    console.log('Installed ')

    chrome.storage.local.set({'isExtensionON': true}, function() {
        console.log('Value is set to true');
      });
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    let cssfile = "./css/inject_styles.css" //default styles
    let jsfile = "./scripts/inject_script.js" //default js

    ////////////////
    //CHECK IF EXTENSION IS ENABLED BEFORE INJECTING CODE
    chrome.storage.local.get(['isExtensionON'], result => {

        if (result.isExtensionON && changeInfo.status === 'complete' && /^https:\/\/evisionweb.utech.edu.jm/.test(tab.url)) {

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
                        files: ["./scripts/bootstrap.bundle.min.js"]
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
            if (tab.url == "https://evisionweb.utech.edu.jm/sipr/") {
                //skip the 'click here to login' page
                chrome.tabs.update(undefined, { url: "https://evisionweb.utech.edu.jm/sipr/sits.urd/run/siw_lgn" });
            }
            //THIS IS THE LOGIN PAGE
            else if (tab.url == "https://evisionweb.utech.edu.jm/sipr/sits.urd/run/siw_lgn" ||
                tab.url == "https://evisionweb.utech.edu.jm/sipr/sits.urd/run/SIW_LGN" ||
                tab.url == "https://evisionweb.utech.edu.jm/sipr/sits.urd/run/SIW_PQS")
            {
                cssfile = "./css/loginpage.css"
                jsfile = "./scripts/loginpage.js"
            }
            //THIS IS THE MAIN PAGE
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
    
})