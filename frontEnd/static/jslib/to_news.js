_news_page=0;
_pre_scroll=null;
_load_flag=true;
function newsBlockClick(obj){
    clearInterval(_scroll_timer);
    box_body=$(".box-body");
    card_center=$("#card-news");
    card_beside=$(".card-beside");
    arrow=$(".box-arrow");
    indicate_bar=$(".indicate-bar");
    nav_dot=$("#nav-news");

    id=$(obj).attr("id");
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
    // $(box_content).append(createSearch());
    setTimeout("doInitAjax()",100);
    setTimeout(function(){
        $("#"+id).click();
    },200)
}

function createArticle(obj){
    _load_flag=false;
    id=$(obj).attr("id");

    if($("#article_"+id)){
        $("#article_"+id).remove();
    }
    if($(".btn-close")){
        $.each($(".btn-close"), function (indexInArray, item) { 
             $(item).remove();
        });
    }
    
    d_close=createBtnClose();

    box=$(".box-content");
    box_article=null;
    $.ajax({
        type: "get",
        url: "http://118.24.43.47:8089/news?id=" + id,
        dataType: "json",
        success: function(data){
            box_article=$('<div class="box-article" id="article_'+id+'"'+'>'+'</div>');
            d_caption=$('<h3 class="card-inside-news-caption">'+data.title+'</h3>');
            d_time=$('<span class="card-inside-news-time">'+(new Date(data.time).toLocaleDateString())+'</span>')
            d_article=$('<div class="article">'+data.content+'</div>');
            $(box_article).append(d_caption);
            $(box_article).append(d_time);
            $(box_article).append(d_article);

            $(box_article).addClass("article-block");
            $(box).append(box_article);
            $(box).append(d_close);
        }
    });
    setTimeout("showNews()",100);
}

function showNews(){
    $(box_article).addClass("article-block-full");
    _pre_scroll=$(window).scrollTop();
    $(box_article).css("top",_pre_scroll);
    // toTop();
}



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
                 $(news_block).attr("onclick","createArticle(this)");
                 $(box).append(news_block);
            });
        }
    });
    $(box_content).append(createToTop());
    _news_page+=1;
}

function doLoadingMore(){
    offset=(_news_page-1)*9;
    $.ajax({
        type:"get",
        url:"http://118.24.43.47:8089/news_sel_page?offset="+offset+"&limit=6",
        dataType:"json",
        success:function(data){
            _news_page+=1;
            cnt=0;
            box=$(".box-content")[0];
            $.each(data, function (index, item) { 
                cnt+=1;
                img_loc=cnt;
                while(img_loc>3){
                    img_loc=img_loc-3;
                }
                time=new Date(item.time).toLocaleDateString();
                news_block=createNewsBlock(item.id,img_loc,item.title,time,item.previewContent,item.previewImage);
                 $(news_block).addClass("news-block");
                 $(news_block).removeAttr("onclick");
                 $(news_block).attr("onclick","createArticle(this)");
                 $(box).append(news_block);
            });
        }
    })
}

function closeArticle(id){
    _load_flag=true;
    box_article=$("#article_"+id);
    d_close=$(".btn-close")[0];
    $(d_close).addClass("clear-box");
    $(box_article).addClass("clear-box");
    $('html, body').animate({scrollTop: _pre_scroll}, 500);
}

function controlBtnTop(order){
    btn_top=$(".btn-top")[0];
    if (order=="show"){
        $(btn_top).removeClass("clear-box");
    }
    else if(order=="hide"){
        $(btn_top).addClass("clear-box");
    }
}

function toTop(){
    $('html, body').animate({scrollTop: $('#box-content').offset().top}, 500);
    controlBtnTop("hide");
}

function createToTop(){
    d_top=$('<div class="btn-article btn-top clear-box" onclick="toTop()"></div>');
    d_icon_top=$('<span class="glyphicon glyphicon-arrow-up"></span>');
    $(d_top).append(d_icon_top);

    return d_top;
}

function createBtnClose(){
    d_close=$('<div class="btn-article btn-close btn-close-article" onclick="closeArticle('+id+')"'+'></div>');
    d_icon_close=$('<span class="glyphicon glyphicon-remove"></span>');
    $(d_close).append(d_icon_close);

    return d_close;
}

/*监控scroll以显示top按钮 */
$(window).scroll(function(){
    scroll_t=$(window).scrollTop();
    win_h=$(window).height();
    box_content=$("#box-content");
    // box_h=$(box_content).height()+0.25*_height;
    doc_h=$(document).height();
    if($(box_content).scrollTop()<(scroll_t-300)){
        controlBtnTop("show");
    }
    else{
        controlBtnTop("hide");
    }
    if(_load_flag){
        if($(".box-article")){
        $(".box-article").remove()
        }
        doc_h=$(document).height();
    }
    if(scroll_t+win_h>=doc_h){
        if(_load_flag){
            // console.log("loading...");
            doLoadingMore();
        }
        else
           ;
    }
})
