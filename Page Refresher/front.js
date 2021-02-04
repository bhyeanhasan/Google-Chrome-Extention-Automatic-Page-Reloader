var alarmClock = {

    onHandler : function(e)
    {
        chrome.tabs.query({active:true, currentWindow: true}, function(tabs)
        {
            let page = tabs[0].id;
            chrome.runtime.sendMessage({todo : page, kok : "baby"});
        });

        chrome.storage.local.get(['time'], function(result) {

            var time = parseFloat(result.time);
            chrome.alarms.create("myAlarm", {delayInMinutes: 0.1, periodInMinutes: time} );
        });

    },

    offHandler : function(e) {
        chrome.alarms.clear("myAlarm");
    },

    setup: function() {
        var a = document.getElementById('alarmOn');
        a.addEventListener('click',  alarmClock.onHandler );
        var a = document.getElementById('alarmOff');
        a.addEventListener('click',  alarmClock.offHandler );
    }
};

document.addEventListener('DOMContentLoaded', function () {
    alarmClock.setup();
});

