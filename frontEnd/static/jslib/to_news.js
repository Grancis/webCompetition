function newsBlockClick(obj){
    clearInterval(_scroll_timer);
    box_body=$(".box-body");
    card_center=$(".card-center")[0];
    card_beside=$(".card-beside");
    arrow=$(".box-arrow");
    indicate_bar=$(".indicate-bar");
    nav_dot=$("#nav-news");

    caption=$("#card-caption-news");
    news_switcher=$(".card-news-switch");
    news_blocks=$(".card-content-news");

    box_content=$(".box-content");

    /* clear elements */
    clearEle(card_beside);
    clearEle(arrow);
    clearEle(indicate_bar);
    clearEle(caption);
    clearEle(news_switcher);
    clearEle(news_blocks);
    $(card_center).removeAttr("onmouseover");
    $(card_center).removeAttr("onmouseout");
    
    /* rebuild page for news */
    $("body").css("overflow-y","scroll");   
    $(box_body).addClass("box-body-news");
    $(card_center).addClass("card-news-full");
    $(nav_dot).click();
    $(box_content).append(createSearch());
    setTimeout("doInitAjax()",100)

    

}

function createArticle(){}

function createSearch(){
    box_search=$('<div class="card-content box-search box-search-news" id="box-search-news"></div>');
    e_input=$('<input class="search-input" id="search-input-news">');
    e_btn=$('<div class="search-btn" id="search-btn-info" onclick="newsSearchClick()"></div>');
    e_icon=$('<span class="glyphicon glyphicon-search"></span>');

    $(e_btn).append(e_icon);
    box_search.append(e_input);
    box_search.append(e_btn);

    return box_search;
}

function doInitAjax(){
    $.ajax({
        type:"get",
        url: "http://118.24.43.47:8089/news_preview?N=9",
        dataType: "json",
        success: function(data){
            cnt=0;
            box=$(".box-content")[0];
            $.each(data, function (index, item) { 
                 cnt+=1;
                 img_loc=cnt;
                 while(img_loc>3){
                     img_loc=img_loc-3;
                 }
                 time=new Date(item.time).toLocaleDateString()
                 news_block=createNewsBlock(item.id,img_loc,item.title,time,item.previewContent,item.previewImage);
                 $(news_block).addClass("news-block");
                 $(news_block).removeAttr("onclick");
                 $(news_block).attr("onclick","showNews()");
                 $(box).append(news_block);
            });
        }
    })
}