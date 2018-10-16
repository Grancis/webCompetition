_card_cnt=1;

function cardScroll(){
    // c_info=$("#card-info");
    // c_news=$("#card-news");
    // c_project=$("#card-project");
    // c_tools=$("#card-tools");
    c_center=$(".card-center")[0];
    c_beside_left=$(".card-beside-left")[0];
    c_beside_right=$(".card-beside-right")[0];
    c_beside_hidden=$(".card-beside-hidden")[0];

    $(c_center).removeClass("card-center");
    $(c_center).addClass("card-beside card-beside-right");
    $(c_beside_right).removeClass("card-beside-right");
    $(c_beside_right).addClass("card-beside-hidden");
    $(c_beside_left).removeClass("card-beside card-beside-left");
    $(c_beside_left).addClass("card-center");
    $(c_beside_hidden).removeClass("card-beside-hidden");
    $(c_beside_hidden).addClass("card-beside-left");
    
    cnt_pre=_card_cnt;    
    _card_cnt=_card_cnt+1;
    if (_card_cnt>4){
        _card_cnt=1;
    }
    if (cnt_pre==0){cnt_pre=4}
    $("#bar-"+cnt_pre).removeClass("bar-active");
    $("#bar-"+_card_cnt).addClass("bar-active");
}

$(document).ready(function () {
    scroll_timer=setInterval("cardScroll()",3000);
});

function test(){
    
    
}