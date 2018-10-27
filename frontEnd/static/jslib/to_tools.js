_page_flag="tools";

function toolsBlockClick(obj){
    clearInterval(_scroll_timer);
    box_body=$(".box-body");
    card_center=$("#card-tools");
    card_beside=$(".card-beside");
    arrow=$(".box-arrow");
    indicate_bar=$(".indicate-bar");
    nav_dot=$("#nav-tools");

    id=null;
    if(obj!==null){
        id=$(obj).attr("id");
    }
    id=$(obj).attr("id");
    caption=$("#card-caption-tools");
    tools_blocks=$(".card-content-tools");

    box_content=$(".box-content");

    /* clear elements */
    clearEleByHide(card_beside);
    clearEle(arrow);
    clearEle(indicate_bar);
    clearEle(caption);
    clearEle(tools_blocks);
    $(card_center).removeAttr("onmouseover");
    $(card_center).removeAttr("onmouseout");
    
    /* rebuild page for tools */
    $("body").css("overflow-y","scroll");   
    $(box_body).addClass("box-body-tools");
    $(card_center).addClass("card-tools-full");
    $(nav_dot).click();
    
}

function toToolsFromNav(){
    // card_tools=$("#card-tools");
    // if(!card_tools.hasClass("card-center")){
    //     $(card_tools).removeClass("card-beside");
    //     $(card_tools).removeClass("card-beside-right");
    //     $(card_tools).removeClass("card-beside-left");
    //     $(card_tools).removeClass("card-beside-hidden-left");
    //     $(card_tools).removeClass("card-beside-hidden-right"); 
    //     clearEleByHide($(".card-center"));
    //     $(card_tools).addClass("card-center");
    //     $(card_tools).removeClass("display_none");
    // }
    // toolsBlockClick(null);
    clearInterval(_scroll_timer);
    card_tools=$('<div class="card-tools"></div>');
    box_body=$(".box-body");
    box_content=$(".box-content");
    $(box_content).children().remove();
    $(box_body).removeClass("box-body-info box-body-project box-body-news");
    $(box_body).addClass("box-body-tools");
    $(box_body).children().remove();
    $(box_body).append(card_tools);
    setTimeout(function(){
        $(card_tools).addClass("card-tools-full");
    },200);
    // setTimeout(function(){
    //     doInitAjax();
    // },1000);
}