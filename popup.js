// chrome.webRequest.onBeforeSendHeaders.addListener(function(details){
//     var headers = details.requestHeaders,
//     blockingResponse = {};
  
//     for( var i = 0, l = headers.length; i < l; ++i ) {
//       window.alert("Checking headers");
//       if( headers[i].name == 'Cookie' ) {
//          headers[i].value = 'twid=notsecret';
//          window.alert("Cookie Changed");
//          console.log(headers[i].value);
//          break;
//       }
//     }
  
//     blockingResponse.requestHeaders = headers;
//     return blockingResponse;
//   },
//   {urls: [ "<all_urls>" ]},['requestHeaders','blocking']);



chrome.tabs.getSelected(null,function(tab) {
    console.log('---->', tab.id)
});


// chrome.webRequest.onBeforeSendHeaders.addListener(
//     function(details) {
//       for (var i = 0; i < details.requestHeaders.length; ++i) {
//         if (details.requestHeaders[i].name === 'User-Agent') {
//           details.requestHeaders.splice(i, 1);
//           break;
//         }
//       }
//       return {requestHeaders: 'ssssssssssssssss'};
//     },
//     {urls: ["<all_urls>"]},
//     ["blocking", "requestHeaders"]);


chrome.cookies.getAll({}, function (cookies) {
    console.log('===>', cookies)
});

// chrome.cookies.set({
//     "name": "AAAAAAAAAAAAAAAAAA",
//     "url": "https://account.chatoptimizer.com/",
//     "value": "DBBBBBBBBB1"
// }, function (cookie) {
//     console.log(JSON.stringify(cookie));
//     console.log(chrome.extension.lastError);
//     console.log(chrome.runtime.lastError);
// });