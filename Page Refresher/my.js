$(document).ready(function () {

    var off = $('.off');
    var on = $('.on');
    var bb = $('.bb');
    var alter = $('.alter');
    var minup = $('.minup');
    var mindn = $('.mindn');
    var secup = $('.secup');
    var secdn = $('.secdn');


    off.hide();
    alter.hide();
    on.hide();
    bb.hide();

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





    chrome.storage.local.get(['min','sec'], function(result) {

        document.getElementById('min').value = 0;
        document.getElementById('sec').value = 10;

        if(result.min != undefined )
        {
            document.getElementById('min').value = result.min;

        }
        if(result.sec != undefined)
        {
            document.getElementById('sec').value = result.sec;
        }

    });



    chrome.storage.local.get(['is'], function(result) {
        if(result.is == true)
        {
            off.show();
            alter.show();
            off.one('click', clickoff);
        }
        else if (result.is == false)
        {
            on.show();
            bb.show();
            on.one('click', clickon);
        }
        else {
            chrome.storage.local.set({'is': false}, function() {});
            on.show();
            bb.show();
        }
    });

    on.one('click', clickon);

    function clickon() {
        on.hide();
        off.show();
        bb.hide();
        alter.show();
        chrome.storage.local.set({'is': true}, function() {});
        let min = document.getElementById("min").value;
        let sec = document.getElementById("sec").value;
        if(min == undefined) min = 0;
        if(sec == undefined) sec = 10;
        chrome.storage.local.set({'min': min, 'sec': sec}, function() {});
        off.one('click', clickoff);
    }

    function clickoff() {
        off.hide();
        on.show();
        bb.show();
        alter.hide();
        chrome.storage.local.set({'is': false}, function() {});

        on.one('click', clickon);
    }
});

