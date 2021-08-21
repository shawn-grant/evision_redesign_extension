let check = document.getElementById('check')
let text = document.getElementById('statustext')

chrome.storage.local.get(['isExtensionON'], result => {
    check.checked = result.isExtensionON

    if (result.isExtensionON) {
        text.innerHTML = "Extension is ON"
        text.style.color='#2196F3'
    }
    else {
        text.innerHTML = "Extension is OFF"
        text.style.color='#888'
    }
  });

check.onclick = () => {
    console.log('click')
    if (check.checked) {
        chrome.storage.local.set({ 'isExtensionON': true }, () => {
            text.innerHTML = "Extension is ON"
            text.style.color='#2196F3'
          });
    }
    else {
        chrome.storage.local.set({ 'isExtensionON': false }, () => {
            text.innerHTML = "Extension is OFF"
            text.style.color='#888'
          });
    }
}