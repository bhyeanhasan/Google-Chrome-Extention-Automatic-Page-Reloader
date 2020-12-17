let page_id = 0;

chrome.runtime.onMessage.addListener(messageReceived);

function messageReceived(msg)
{
    page_id = msg.todo;
}

chrome.alarms.onAlarm.addListener(function(alarm) {

    chrome.tabs.reload(page_id);

});