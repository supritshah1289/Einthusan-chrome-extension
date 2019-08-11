// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      var activeTab = tabs[0];
      // sends message to scripts.js file
      // activeTab contains all the details about the current active tab. Like url and other metadata
      console.log(tabs, "Tabs");
      chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action","url":activeTab});
    });
  });
  
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      if( request.message === "open_new_tab" ) {
        chrome.tabs.create({"url": request.url});
      }
    }
  );