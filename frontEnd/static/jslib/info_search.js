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
    box_search=$('<div class="card-content box-search box-search-info box-search-info-full" id="box-search-info"></div>');
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
        window.sessionStorage.keyword = s_keyword;
    }
    else{
        searchKeyword=$('input[name="corpname"]').val();
        window.sessionStorage.keyword = searchKeyword;
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
                        card=createCompanyBlock(item.graphId,item.name,item.type,item.reg_auth,item.id,item.state,item.reg_date);
                        $(box_content).append(card);
                        $(card).animate({opacity:1},500);
                    },250*cnt);
                 }
                 else{
                    setTimeout(function(){
                        card=createCompanyBlock(item.graphId,item.name,item.type,item.reg_auth,item.id,item.state,item.reg_date);
                        $(box_content).append(card);
                        $(card).animate({opacity:1},500);
                    },250*10);
                 }

            });
        }
    });
}

function loadMoreInfo(graphId){
    box_content=$(".box-content");
    box_content.empty();
    initModule(graphId);
}

function createCompanyBlock(graphId,name,type,reg_auth,id,state,reg_date){
    b_card=$('<div class="card-company" style="opacity:1;" onclick="loadMoreInfo(&quot;'+graphId+'&quot;)"'+'></div>');
    /* onclick 事件待添加 */
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

/* 监控scroll以显示 top btn  控制搜索框的显示*/
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


/************************* */
function createModuleBar(graphId){
    box_row=$('<div class="row" id="row-nav"></div>');
    nav_box=$('<div class="nav-box" style="margin-left:-190px"></div>');
    nav_line=$('<div class="nav-line-2"></div>');
    e_ul=$('<ul id="menu"></ul>');
    li_corp_info=$('<li id="corp_info" class="current"><a onclick="corp_info('+graphId+')">基本信息</a></li>');
    li_investment=$('<li id="investment"><a onclick="investment('+graphId+')">投资族谱</a></li>');
    li_position=$('<li id="position"><a onclick="position('+graphId+')">任职族谱</a></li>');
    li_corperation=$('<li id="corperation"><a onclick="corperation('+graphId+')">企业族谱</a></li>');

    $(e_ul).append(li_corp_info);
    $(e_ul).append(li_investment);
    $(e_ul).append(li_position);
    $(e_ul).append(li_corperation);
    $(nav_box).append(nav_line);
    $(nav_box).append(e_ul);
    box_row.append(nav_box);

    return box_row;
}


function initModule(graphId){
    $("body").css("overflow-y","scroll");   
    box_content=$(".box-content");
    nav_box=createModuleBar(graphId);
    $(box_content).append(nav_box);
    box_result=$('<div id="result"></div>');
    $(box_content).append(box_result);
    addToTopBtn(box_content);
    corp_info(graphId);
}


function createBackBtn(){
    d_back=$('<div class="btn-back btn-article" onclick="goBack()"></div>');
    d_icon_back=$('<img class="img-responsive" src="./static/image/arrow-right.png">');
    $(d_back).append(d_icon_back);

    return d_back;
}


function addBackBtn(){
    console.log(addBackBtn);
    box_go_back=createBackBtn();
    $('#result').append(box_go_back);
    setTimeout(() => {
        $(box_go_back).css("opacity",0.92);
    }, 800);
}

function goBack(){
    console.log("goBack");
    $('#box-content').empty();
    box_search=createInfoSearch();
    $('#box-content').append(box_search);
    keyword = window.sessionStorage.keyword;
    console.log("keyword: " + keyword);
    infoSearchClickFull(keyword);
}

function nav2() {
	var $liCur = $(".nav-box ul li.current"),
	curP = $liCur.position().left,
	curW = $liCur.outerWidth(true),
	$slider = $(".nav-line-2"),
	$targetEle = $(".nav-box ul li a"),
	$navBox = $(".nav-box");
	console.log($liCur.attr("id"));
	console.log(curP);
	$liCur.unbind();
	$slider.unbind();
	$targetEle.unbind();
	$navBox.unbind();
	$slider.stop(true, true).animate({
		"left":curP,
		"width":curW
	});
	$targetEle.mouseenter(function () {
		var $_parent = $(this).parent(),
		_width = $_parent.outerWidth(true),
		posL = $_parent.position().left;
		console.log(posL);
		$slider.stop(true, true).animate({
			"left":posL,
			"width":_width
		}, "fast");
	});
	$navBox.mouseleave(function (cur, wid) {
		cur = curP;
		wid = curW;
		console.log(cur);
		$slider.stop(true, true).animate({
			"left":cur,
			"width":wid
		}, "fast");
	});
}

function fresh(){
	$("#result").empty();
	console.log("result clear");
   var curid = $(".current").attr("id");
    $("#"+curid).removeClass("current");
	
}