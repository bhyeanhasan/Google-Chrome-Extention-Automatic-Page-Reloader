
var alarmClock = {

    onHandler : function(e)
    {
        chrome.tabs.query({active:true, currentWindow: true}, function(tabs)
        {
            let page = tabs[0].id;
            chrome.runtime.sendMessage({todo : page, kok : "baby"});
        });
        var mintime = document.getElementById('min').value;
        var sectime = document.getElementById('sec').value;
        var time = parseInt(mintime)*1.00+(parseInt(sectime)*1.00/60);
        document.getElementById('time').innerHTML = time.toFixed(4);
        chrome.alarms.create("myAlarm", {delayInMinutes: 0.1, periodInMinutes: time} );

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