function infoSearchClick(){
    clearInterval(_scroll_timer);
    box_body=$(".box-body");
    card_center=$(".card-center")[0];
    card_beside=$(".card-beside");
    arrow=$(".box-arrow");
    indicate_bar=$(".indicate-bar");
    nav_dot=$("#nav-info");

    caption=$("#card-caption-info");
    box_search=$("#box-search-info");
    btn_search=$("#search-btn-info");
    /* clear elements */
    clearEle(card_beside);
    clearEle(arrow);
    clearEle(indicate_bar);
    clearEle(caption);
    $(card_center).removeAttr("onmouseover");
    $(card_center).removeAttr("onmouseout");

    /* rebuild page for info */
    $("body").css("overflow-y","scroll");   
    $(box_body).addClass("box-body-info");
    $(card_center).addClass("card-info-full");
    $(box_search).addClass("box-search-info-full");
    $(btn_search).removeAttr("onClick");
    $(btn_search).attr("onClick","infoSearchClickFull()");
    $(nav_dot).click();
}

function clearEle(objs){
    $.each(objs, function (index, item) { 
        //  $(item).css("left","0px");
         $(item).fadeOut();
         $(item).remove();
    });
}

function infoSearchClickFull(){
    ;
}