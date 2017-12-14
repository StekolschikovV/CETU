// chrome.cookies.set({ url: "https://account.chatoptimizer.com/", name: "CookieVar", value: "123", expirationDate: 3600 })




// console.log(chrome)



//     document.cookie = "userName=Vasya";



// document.addEventListener('DOMContentLoaded', function() {
//     var d = new Date();
//     var n = d.toString();
//     chrome.cookies.set({
//         "name": "test",
//         "url": "https://account.chatoptimizer.com/",
//         "value": n
//     }, function (cookie) {
//         console.log(JSON.stringify(cookie));
//         console.log(chrome.extension.lastError);
//         console.log(chrome.runtime.lastError);
//     });
// });
Array.prototype.contains = function (obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

const URL = 'https://account.chatoptimizer.com/'

// chrome.tabs.onUpdated.addListener(function (tabId, changeData, tab) {
// if (changeData.status == 'complete') {



// }

// console.log('+++++++++', tab)
// console.log('+++++++++', tab.id)
// // console.log('+++++++++', tab.url)
// console.log('------', tabId)
// console.log('-----------------', changeData)

// if(tab.url == 'https://account.chatoptimizer.com/' && tab.id == 331){
//     console.log('Это оно')
//     var d = new Date();
//     var n = d.toString();

//     chrome.cookies.set({
//         "name": "authautologin",
//         "url": "https://account.chatoptimizer.com/",
//         "value": 'aaa'
//     }, function (cookie) {})
//     chrome.cookies.set({
//         "name": "session",
//         "url": "https://account.chatoptimizer.com/",
//         "value": 'aaa'
//     }, function (cookie) {})
// } else{
//     console.log('Это не оно')
// }


// chrome.cookies.getAll({}, function (cookies) {
//     console.log('===>', cookies)
// });


// chrome.storage.sync.get(null, function(items) {
//     var allKeys = Object.keys(items);
//     console.log(allKeys);
// });

// webview.request.onBeforeRequest.addListener(
//     function(details) {
//       return {
//         cancel: true
//       };
//     }, {
//       urls: ["*://*/*"],
//       types: ["image", "stylesheet"]
//     }, ["blocking"]
//   );


chrome.tabs.onUpdated.addListener(function (tabId, changeData, tab) {
    if(changeData.status == 'loading'){
        if (tab.url == URL) {
            chrome.storage.sync.get(null, function (items) {
                let allKeys = Object.keys(items)
                let idPage = tab.id.toString()
                // console.log(allKeys, tab.id, allKeys.contains(tab.id.toString()));
                if (!allKeys.contains(tab.id.toString())) {
                    // console.log('в сторе нет')
                    chrome.cookies.get({ "url": URL, "name": 'session' }, function (cookie) {
                        let session = cookie.value
                        chrome.storage.sync.set({ [idPage]: session }, function () {
                            // console.log('сохранил куки в стор session по idPage')
                        })
                    })
                    console.log('-------------------')
                    chrome.cookies.get({ "url": URL, "name": 'authautologin' }, function (cookie) {
                        // console.log( 'authautologin', cookie.value )
                        let authautologin = cookie.value
                        console.log('authautologin: ', authautologin)
                        chrome.storage.sync.set({ [idPage+'authautologin']: authautologin }, function () {
                            console.log('сохранил куки в стор authautologin по idPage')
                        })
                    })
                    console.log('-------------------')
                } else {
                    // console.log('в сторе есть')
                    chrome.storage.sync.get([idPage], function (result) {
                        let session = result[idPage]
                        console.log('получил session из стора', result[idPage][0] + result[idPage][1])
                        chrome.cookies.set({
                            "name": "session",
                            "url": URL,
                            "value": session
                        }, function (cookie) {
                            console.log('записал в куки session')
                        })
                    });
                    let idPageAuthautologin = idPage+'authautologin' 
                    chrome.storage.sync.get([idPageAuthautologin],  (result) => {
                        let r = result[idPageAuthautologin]
                        chrome.cookies.set({
                            "name": "authautologin",
                            "url": URL,
                            "value": r
                        }, function (cookie) {
                            console.log('записал в куки authautologin')
                        })
                    })
                }
            });
        }
    }
})
