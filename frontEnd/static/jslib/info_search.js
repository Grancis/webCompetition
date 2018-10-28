_scroll_up=0;
_scroll_down_cnt=0;
_scroll_up_cnt=0;
function infoSearchClick(){
    _page_flag="info";
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
    clearEleByHide(card_beside);
    clearEle(arrow);
    clearEle(indicate_bar);
    clearEle(caption);
    $(card_center).removeAttr("onmouseover");
    $(card_center).removeAttr("onmouseout");
    // $(card_center).addClass("card-info-transition");

    /* rebuild page for info */
    $("body").css("overflow-y","scroll");   
    $(box_body).addClass("box-body-info");
    $(card_center).addClass("card-info-full");
    $(box_search).addClass("box-search-info-full");
    $(btn_search).removeAttr("onClick");
    $(btn_search).attr("onClick","infoSearchClickFull()");
    $(nav_dot).click();

    /* do initial */
    box_content=$(".box-content");
    box_toTop=createToTop();
    $(box_content).append(box_toTop);
    searchKeyword = $('input[name="corpname"]').val();
    setTimeout(function(){
        $(box_search).remove();
    box_search=createInfoSearch();
    $(box_content).append(box_search);
    $(box_search).css("transition-duration","0.3s");
    if(searchKeyword==""){;}
    else{
        $('input[name="corpname"]').val(searchKeyword);
       
    }
    },1000)
    setTimeout(() => {
        if(searchKeyword!=""){
            infoSearchClickFull(searchKeyword);
        }
    }, 500);
    // $(box_search).css("transition","tranform 1s");

}



function toInfoFromNav(){
    _page_flag="info";
    $("body").css("overflow-y","scroll");
    clearInterval(_scroll_timer);
    card_info=$('<div class="card-info"></div>');
    box_body=$(".box-body");
    box_content=$(".box-content");
    $(box_content).children().remove();
    $(box_body).removeClass("box-body-news box-body-project box-body-tools");
    $(box_body).addClass("box-body-info");
    $(box_body).children().remove();
    $(box_body).append(card_info);
    box_search=createInfoSearch()
    $(box_content).append(box_search);
    $(box_search).css("transition-duration","0.3s");
    box_toTop=createToTop();
    $(box_content).append(box_toTop);
    
    setTimeout(function(){
        $(card_info).addClass("card-info-full");
        $(box_search).addClass("box-search-info-full");
        addToTopBtn(box_content);
    },200);
    
    // setTimeout(function(){
    //     doInitAjax();
    // },1000);
}

function createInfoSearch(){
    box_search=$('<form class="card-content box-search box-search-info box-search-info-full" id="box-search-info"></form>');
    e_input=$('<input class="search-input" id="search-input-info" name="corpname" placeholder="搜索公司名">');
    e_btn=$('<div class="search-btn" id="search-btn-info" onclick="infoSearchClickFull()"></div>');
    e_icon=$('<span class="glyphicon glyphicon-search"></span>');

    $(e_btn).append(e_icon);
    box_search.append(e_input);
    box_search.append(e_btn);

    return box_search;
}



/* do search */
function infoSearchClickFull(s_keyword){
    var searchKeyword = null;
    if(s_keyword){
        searchKeyword=s_keyword;
    }
    else{
        searchKeyword=$('input[name="corpname"]').val();
    }
    var searchURL = "http://118.24.43.47:8089/search?keyword="+searchKeyword;
    // var searchData = {keyword: searchKeyword};
    // console.log(searchKeyword);
    // console.log(searchURL);
    //加载搜索结果
    box_content=$('.box-content');
    cards=$(".card-company");
    clearEle(cards);
    $.ajax({
        type : 'get',
        url : searchURL,
        dataType : 'json',
        success : function(data) {
            cnt=0;
            $.each(data, function (index, item) { 
                 cnt+=1;
                 if(item.irgOpts){
                     item.name=item.name+"【该公司被列入经营异常名录】";
                 }
                 if(cnt<10){
                    setTimeout(function(){
                        card=createCompanyBlock(item.name,item.type,item.reg_auth,item.id,item.state,item.reg_date);
                        $(box_content).append(card);
                        $(card).animate({opacity:1},500);
                    },250*cnt);
                 }
                 else{
                    setTimeout(function(){
                        card=createCompanyBlock(item.name,item.type,item.reg_auth,item.id,item.state,item.reg_date);
                        $(box_content).append(card);
                        $(card).animate({opacity:1},500);
                    },250*10);
                 }

            });
        }
    });
}

function createCompanyBlock(name,type,reg_auth,id,state,reg_date,){
    b_card=$('<div class="card-company" style="opacity:1;" onclick=""></div>');
    h_title=$('<h5 class="card-title company_name">'+name+'</h5>');
    p_type=$('<p class="tpye">'+type+'</p>');
    p_reg_auth=$('<p class="reg_auth">'+reg_auth+'</p>');
    p_id=$('<p class="id">'+id+'</p>');
    p_state=$('<p class="state">'+state+'</p>');
    p_reg_date=$('<p class="reg_date">'+reg_date+'</p>');

    $(b_card).append(h_title);
    $(b_card).append(p_type);
    $(b_card).append(p_reg_auth);
    $(b_card).append(p_id);
    $(b_card).append(p_state);
    $(b_card).append(p_reg_date);

    return b_card;
}

/* 监控scroll以显示 top btn */
$(window).scroll(function(){
    if(_page_flag=="info"){
        scroll_t=$(window).scrollTop();
        _pre_scroll=scroll_t;
        if(scroll_t<_scroll_up){
            _scroll_up_cnt=_scroll_up_cnt+(_scroll_up-scroll_t);
            
            _scroll_down_cnt=0;
        }
        if(scroll_t>_scroll_up){
            _scroll_down_cnt=_scroll_down_cnt+(scroll_t)-_scroll_up;
            _scroll_up_cnt=0;
        }
        if(_scroll_down_cnt>300){
            $(".box-search-info-full").addClass("clear-box");
        }
        if(_scroll_up_cnt>300||scroll_t==0){
            $(".box-search-info-full").removeClass("clear-box");
        }
        _scroll_up=scroll_t;
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
        
    }
})