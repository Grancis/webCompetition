_card_cnt=1;

function sleep(n) { 
    var start = new Date().getTime();
    while (true) if (new Date().getTime() - start > n) break;
}  

function initScroll(){
    cards=$(".card");
    $.each(cards, function (i, obj) { 
         $(obj).removeClass("scroll-transition");
    });
    c_beside_hidden_right=$(".card-beside-hidden-right")[0];
    $(c_beside_hidden_right).addClass("card-beside-hidden-left");
    $(c_beside_hidden_right).removeClass("card-beside-hidden-right");
}

function initScrollReverse(){
    cards=$(".card");
    $.each(cards, function (i, obj) { 
         $(obj).removeClass("scroll-transition");
    });
    c_beside_hidden_left=$(".card-beside-hidden-left")[0];
    $(c_beside_hidden_left).addClass("card-beside-hidden-right");
    $(c_beside_hidden_left).removeClass("card-beside-hidden-left");
}

function cardScroll(){

    cards=$(".card");
    $.each(cards, function (i, obj) { 
        $(obj).addClass("scroll-transition");
   });
    
    c_center=$(".card-center")[0];
    c_beside_left=$(".card-beside-left")[0];
    c_beside_right=$(".card-beside-right")[0];
    c_beside_hidden_left=$(".card-beside-hidden-left")[0];

    $(c_center).removeClass("card-center");
    $(c_center).removeAttr("onmouseover");
    $(c_center).removeAttr("onmouseout");
    $(c_center).addClass("card-beside card-beside-right");

    $(c_beside_right).removeClass("card-beside-right");
    $(c_beside_right).addClass("card-beside-hidden-right");
    
    $(c_beside_left).removeClass("card-beside card-beside-left");
    $(c_beside_left).addClass("card-center");
    $(c_beside_left).attr("onmouseover","stopScroll()");
    $(c_beside_left).attr("onmouseout","startScroll()");

    $(c_beside_hidden_left).addClass("card-beside-left");
    $(c_beside_hidden_left).removeClass("card-beside-hidden-left");
    
    cnt_pre=_card_cnt;    
    _card_cnt=_card_cnt+1;
    if (_card_cnt>4){
        _card_cnt=1;
    }
    
    $("#bar-"+cnt_pre).removeClass("bar-active");
    $("#bar-"+_card_cnt).addClass("bar-active");

}

function cardScrollReverse(){
    cards=$(".card");
    $.each(cards, function (i, obj) { 
        $(obj).addClass("scroll-transition");
   });
    
    c_center=$(".card-center")[0];
    c_beside_left=$(".card-beside-left")[0];
    c_beside_right=$(".card-beside-right")[0];
    c_beside_hidden_right=$(".card-beside-hidden-right")[0];

    $(c_center).removeClass("card-center");
    $(c_center).removeAttr("onmouseover");
    $(c_center).removeAttr("onmouseout");
    $(c_center).addClass("card-beside card-beside-left");

    $(c_beside_left).removeClass("card-beside-left");
    $(c_beside_left).addClass("card-beside-hidden-left");
    
    $(c_beside_right).removeClass("card-beside card-beside-right");
    $(c_beside_right).addClass("card-center");
    $(c_beside_right).attr("onmouseover","stopScroll()");
    $(c_beside_right).attr("onmouseout","startScroll()");

    $(c_beside_hidden_right).addClass("card-beside-right");
    $(c_beside_hidden_right).removeClass("card-beside-hidden-right");
    
    cnt_pre=_card_cnt;    
    _card_cnt=_card_cnt-1;
    if (_card_cnt<1){
        _card_cnt=4;
    }
    $("#bar-"+cnt_pre).removeClass("bar-active");
    $("#bar-"+_card_cnt).addClass("bar-active");
}

var scroll_timer=null;

$(document).ready(function () {
    
    scroll_timer=setInterval("scroller_wrapper()",3000);
});

function scroller_wrapper(){
    initScroll();
    setTimeout("cardScroll()",1);
}

function scroller_wrapper_reverse(){
    initScrollReverse();
    setTimeout("cardScrollReverse()",1);
}

function nextCard(){
    clearInterval(scroll_timer);
    scroller_wrapper();
    scroll_timer=setInterval("scroller_wrapper()",3000);
}

function preCard(){
    clearInterval(scroll_timer);
    scroller_wrapper_reverse();
    scroll_timer=setInterval("scroller_wrapper()",3000);
}

function stopScroll(){
    clearInterval(scroll_timer);
}
function startScroll(){
    scroll_timer=setInterval("scroller_wrapper()",3000);
}