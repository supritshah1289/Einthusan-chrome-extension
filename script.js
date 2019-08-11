chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // receives message from background.js
        if( request.message === 'clicked_browser_action') {
            var query = request.url.url;
            console.log(query);
            var url = "https://lit-anchorage-62847.herokuapp.com/api/info?url="+query; // My API is hidden as I have not implemented security to my end point
            fetch(url)
                .then(function(response) {
                    if (!response.ok) {
                        throw Error(response.statusText);
                    }
                    // Read the response as json.
                    return response.json();
                    })
                    .then(function(responseAsJson) {
                    // parse json for URL and respond back with stream url
                        var streamUrl = responseAsJson.info.formats[1].url;            
                        chrome.runtime.sendMessage({"message": "open_new_tab", "url": streamUrl});
                    })
                    .catch(function(error) {
                    console.log('Looks like there was a problem: \n', error);
                });
        }
    }
);