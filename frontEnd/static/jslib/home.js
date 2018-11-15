_card_cnt=1;
var _scroll_timer=null;
var _width=null;
var _height=null;
var _scroll_top=null;
var _page_flag="index";

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
    locateNavBar();
})

$(document).ready(function () {
    resizeBox();
    _scroll_timer=setInterval("scroller_wrapper()",2900);
    doNewsAjax();
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
function locateNavBar(){
    if(_page_flag=="tools"){
        w_box_content=$("#box-content").width();
        navbar_1=$(".nav-box-tools-1");
        navbar_2=$(".nav-box-tools-2");
        b_result_t=$("#result-tools");
        w_navbar_1=$(navbar_1).width();
        w_navbar_2=$(navbar_2).width();
        w_b_result=$(b_result_t).width();
        $(navbar_1).css("margin-left",(w_box_content-w_navbar_1)/2);
        $(navbar_2).css("margin-left",(w_box_content-w_navbar_2)/2);
        $(b_result_t).css("margin-left",(w_box_content-w_b_result)/2);

    }
}
function createNewsBlock(id,img_loc,caption,time,resume,img){
    card_content=$('<div class="card-content card-content-news" onclick="newsBlockClick(this)" id="'+id+'">'+'</div>');
    box_caption=$('<h3 class="card-inside-news-caption">'+caption+'</h2>');
    box_time=$('<span class="card-inside-news-time">'+time+'</span>');
    box_resume=$('<div class="card-inside-news-resume">'+resume+'</div>');
    box_img=$('<img class="card-inside-news-img img-responsive" src="'+img+'"'+'>');

    if(img_loc==1){
        $(card_content).append(box_caption);
        $(card_content).append(box_time);
        $(card_content).append(box_resume);
        $(card_content).append(box_img);
    }
    else if(img_loc==2){
        $(card_content).append(box_caption);
        $(card_content).append(box_time);
        $(card_content).append(box_img);
        $(card_content).append(box_resume);
    }
    else if(img_loc==3){
        $(card_content).append(box_caption);
        $(card_content).append(box_time);
        $(card_content).append(box_resume);
        $(card_content).append(box_img);
    }

    return card_content;
}

function doNewsAjax(){
    $.ajax({
        type:"get",
        url: "http://118.24.43.47:8089/news_preview?N=6",
        dataType: "json",
        success: function(data){
            cnt=0;
            box_1=$(".box-news-content-1")[0];
            box_2=$(".box-news-content-2")[0];
            $(box_2).children().remove();
            $(box_1).children().remove();
            $.each(data, function (index, item) { 
                 cnt+=1;
                 img_loc=cnt;
                 while(img_loc>3){
                    img_loc=img_loc-3;
                }
                 time=new Date(item.time).toLocaleDateString()
                 news_block=createNewsBlock(item.id,img_loc,item.title,time,item.previewContent,item.previewImage);
                 if(cnt>3){
                    if(cnt==4){
                        $(news_block).addClass("clear-margin-left");
                    }
                     $(box_2).append(news_block);
                 }
                 else{
                     if(cnt==1){
                         $(news_block).addClass("clear-margin-left");
                     }
                     $(box_1).append(news_block);
                 }
            });
        }
    })

}

function changeNewsPage(dic){
    box_1=$(".box-news-content")[0];
    box_2=$(".box-news-content")[1];
    bar_active=$(".bar-news-active")[0];
    bar=$(".bar-news:not(.bar-news-active)");
    if(dic=="right"){
        $(box_1).addClass("box-news-content-1-hidden");
        $(box_2).removeClass("box-news-content-2-hidden");
    }
    else{
        $(box_2).addClass("box-news-content-2-hidden");
        $(box_1).removeClass("box-news-content-1-hidden");
    }
    $(bar_active).removeClass("bar-news-active");
    $(bar).addClass("bar-news-active");
}


function clearEle(objs){
    $.each(objs, function (index, item) { 
         $(item).fadeOut();
        $(item).remove();
        //  setTimeout(function(){
        //     ;
        //  },500);
    });
}

function clearEleByHide(objs){
    $.each(objs, function (index, item) { 
         $(item).addClass("display_none");
        
    });
}

function createToTop(){
    d_top=$('<div class="btn-top btn-article" onclick="toTop()"></div>');
    d_icon_top=$('<img class="img-responsive" src="./static/image/arrow-top.png">');
    $(d_top).append(d_icon_top);

    return d_top;
}

function controlBtnTop(order){
    btn_top=$(".btn-top")[0];
    if (order=="show"){
        $(btn_top).addClass("no-shrinking");
    }
    else if(order=="hide"){
        $(btn_top).removeClass("no-shrinking");
    }
}

function addToTopBtn(obj){
    box_to_top=createToTop();
    $(obj).append(box_to_top);
    setTimeout(() => {
        $(box_to_top).css("opacity",0.92);
    }, 800);
}

// $("form#box-search-info").submit(function (e) { 
//     e.preventDefault();
//     infoSearchClick();
//     alert("aaaa");
// });

$(document).keyup(function(event){  
    if(event.keyCode ==13){  
      if(_page_flag=="index"||_page_flag=="info"){
          company_name=$('input[name="corpname"]').val();
          if(company_name==""){;}
          else{
              if(_page_flag=="index"){
                infoSearchClick();
              }
              else{
                infoSearchClickFull();
              }
          }
      }
    }  
  });    