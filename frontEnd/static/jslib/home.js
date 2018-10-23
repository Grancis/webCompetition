_card_cnt=1;
var _scroll_timer=null;
var _width=null;
var _height=null;

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



function scroller_wrapper(){
    initScroll();
    setTimeout("cardScroll()",100);
}

function scroller_wrapper_reverse(){
    initScrollReverse();
    setTimeout("cardScrollReverse()",100);
}

function nextCard(){
    clearInterval(_scroll_timer);
    scroller_wrapper();
    _scroll_timer=setInterval("scroller_wrapper()",2900);
}

function preCard(){
    clearInterval(_scroll_timer);
    scroller_wrapper_reverse();
    _scroll_timer=setInterval("scroller_wrapper()",2900);
}

function stopScroll(){
    clearInterval(_scroll_timer);
}
function startScroll(){
    _scroll_timer=setInterval("scroller_wrapper()",2900);
}



$(window).resize(function(){
    resizeBox();
})

$(document).ready(function () {
    resizeBox();
    _scroll_timer=setInterval("scroller_wrapper()",2900);
});

function resizeBox(){
    _width=$(window).width();
    _height=$(window).height();
    box_body=$(".box-body")[0]
    $(box_body).css({
        "width":_width,
        "height":_height
    });
}