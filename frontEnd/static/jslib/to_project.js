

function projectBlockClick(obj){
    _page_flag="project";
    clearInterval(_scroll_timer);
    box_body=$(".box-body");
    card_center=$("#card-project");
    card_beside=$(".card-beside");
    arrow=$(".box-arrow");
    indicate_bar=$(".indicate-bar");
    nav_dot=$("#nav-project");

    id=null;
    if(obj!==null){
        id=$(obj).attr("id");
    }
    id=$(obj).attr("id");
    caption=$("#card-caption-project");
    project_blocks=$(".card-content-project");

    box_content=$(".box-content");

    /* clear elements */
    clearEle(card_beside);
    clearEle(arrow);
    clearEle(indicate_bar);
    clearEle(caption);
    clearEle(project_blocks);
    $(card_center).removeAttr("onmouseover");
    $(card_center).removeAttr("onmouseout");
    
    /* rebuild page for project */
    $("body").css("overflow-y","scroll");   
    $(box_body).addClass("box-body-project");
    $(card_center).addClass("card-project-full");
    $(nav_dot).click();
    $(box_content).children().remove();
    
}

function toProjectFromNav(){
    _page_flag="project";
    clearInterval(_scroll_timer);
    card_project=$('<div class="card-project"></div>');
    box_body=$(".box-body");
    box_content=$(".box-content");
    $(box_content).children().remove();
    $(box_body).removeClass("box-body-info box-body-news box-body-tools");
    $(box_body).addClass("box-body-project");
    $(box_body).children().remove();
    $(box_body).append(card_project);
    setTimeout(function(){
        $(card_project).addClass("card-project-full");
    },200);
    /* full the box-content */
}