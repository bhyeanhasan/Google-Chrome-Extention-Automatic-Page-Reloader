$(document).ready(function () {

    var off = $('.off');
    var on = $('.on');
    var bb = $('.bb');
    var alter = $('.alter');
    var minup = $('.minup');
    var mindn = $('.mindn');
    var secup = $('.secup');
    var secdn = $('.secdn');

    alter.hide();
    bb.hide();

    chrome.storage.local.get(['is'], function(result) {

        if(result.is == true)
        {
            alter.show();
            off.one('click', clickoff);
        }
        else if (result.is == false)
        {
            bb.show();
            on.one('click', clickon);
        }
        else {
            chrome.storage.local.set({'is': false}, function() {});
            bb.show();
            on.one('click', clickon);
        }

    });

    chrome.storage.local.get(['min','sec'], function(result) {

        document.getElementById('min').value = 0;           //jodi min age save na thake
        document.getElementById('sec').value = 10;          //jodi sec age save na thake

        if(result.min != undefined )
        {
            document.getElementById('min').value = result.min;
        }
        if(result.sec != undefined)
        {
            document.getElementById('sec').value = result.sec;
        }

        let mintime = document.getElementById('min').value;
        let sectime = document.getElementById('sec').value;
        let time = parseInt(mintime)*1.00+(parseInt(sectime)*1.00/60);
        chrome.storage.local.set({'time': time}, function() {});

    });

    chrome.storage.local.get(['time'], function(result) {

        document.getElementById('time').innerHTML = result.time.toFixed(4);
        
    });

    minup.click(function()
    {
        let old = document.getElementById('min').value;
        let ok = parseInt(old)+1;
        ok = ok%70;
        document.getElementById('min').value = ok;
    });

    mindn.click(function (){
        let old = document.getElementById('min').value;
        let ok = parseInt(old)-1;
        if(ok<0) ok = 0;
        document.getElementById('min').value = ok;
    });

    secup.click(function()
    {
        let old = document.getElementById('sec').value;
        let ok = parseInt(old)+10;
        ok = ok%70;
        document.getElementById('sec').value = ok;
    });

    secdn.click(function()
    {
        let old = document.getElementById('sec').value;
        let ok = parseInt(old)-10;
        if(ok<0) ok = 0;
        document.getElementById('sec').value = ok;
    });


    on.one('click', clickon);

    function clickon() {
        bb.hide();
        alter.show();
        chrome.storage.local.set({'is': true}, function() {});
     
        mintime = document.getElementById('min').value;
        sectime = document.getElementById('sec').value;
        var time = parseInt(mintime)*1.00+(parseInt(sectime)*1.00/60);
        chrome.storage.local.set({'time': time}, function() {});
        chrome.storage.local.set({'min': mintime, 'sec': sectime}, function() {});

        chrome.storage.local.get(['time'], function(result) {

            document.getElementById('time').innerHTML = result.time.toFixed(4);
            
        });

        off.one('click', clickoff);
    }

    function clickoff() {
        bb.show();
        alter.hide();
        chrome.storage.local.set({'is': false}, function() {});

        on.one('click', clickon);
    }
});

