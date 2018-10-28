

function projectBlockClick(project_id){
    toProjectFromNav(project_id);

}

function toProjectFromNav(project_id){
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
    initProject(project_id);

}

function creatProjectBar(){
    box_row=$('<div class="row" id="row-nav"></div>');
    nav_box=$('<div class="nav-box"></div>');
    nav_line=$('<div class="nav-line"></div>');
    e_ul=$('<ul id="menu"></ul>');
    li_wowgo=$('<li id="wowgo" class="current"><a onclick="Wowgo()">Wowgo</a></li>');
    li_doctorCan=$('<li id="doctorCan"><a onclick="DoctorCan()">Doctor Can 肿瘤智库</a></li>');
    li_surgery=$('<li id="surgery"><a onclick="Surgery()">可视化脊柱微创手术导航</a></li>');
    li_salary=$('<li id="salary"><a onclick="Salary()">薪公益</a></li>');
    li_hospital=$('<li id="hospital"><a onclick="Hospital()">飞行医院</a></li>');

    $(e_ul).append(li_wowgo);
    $(e_ul).append(li_doctorCan);
    $(e_ul).append(li_surgery);
    $(e_ul).append(li_salary);
    $(e_ul).append(li_hospital);
    $(nav_box).append(nav_line);
    $(nav_box).append(e_ul);
    box_row.append(nav_box);
    // $(box_row).append(nav_box);

    return box_row;
}


function initProject(pro_id){
    $("body").css("overflow-y","scroll");   
    box_content=$(".box-content");
    nav_box=creatProjectBar();
    $(box_content).append(nav_box);
    box_result=$('<div id="result"></div>');
    $(box_content).append(box_result);
        if(pro_id=="wowgo"){
                Wowgo();
        }
        else if(pro_id=="doctorCan"){
                DoctorCan();
        }
        else if(pro_id=="surgery"){
                Surgery();
        }
        else if(pro_id=="hospital"){
                Hospital();
        }
        else if(pro_id=="salary"){
                Salary();
        }
        else{
           ;
        }
}





/* before script */
function nav() {
	var $liCur = $(".nav-box ul li.current"),
	curP = $liCur.position().left,
	curW = $liCur.outerWidth(true),
	$slider = $(".nav-line"),
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

function refreash(){
    $("#result").empty();
    $("#result").append('<div id="project-template" class="card-row-project"><div class="card-row-project-block"><h5 class="card-row-project-title"></h5><p class="card-row-project-text"></div></div>');
    var curid = $(".current").attr("id");
    $("#"+curid).removeClass("current");
	
}
_time_delay=250;
function Wowgo(){
    refreash();
    $("#wowgo").addClass("current"); 
    nav();
    var project_template = $("#project-template");
    var result = $("#result");
    var graph1 = project_template.clone();
    setTimeout(function(){
        graph1.find(".card-row-project-text").text("2016年户外徒步登山类出行人数已高达1600万，预计2020年我国户外运动总产值将达4000亿，赢来户外市场的爆发期。但是，从2014-2016年，中国户外行业共发生失踪、失联事故1700余起，由此产生的搜救成本3000余万元。然而找路难、危险多、无信号、易失联等难题，无一不阻拦着户外行业的发展。Wowgo我行提供国内唯一的规范化线路体系、精准导航无网通讯的客户端、基于物联网技术的智能监控系统，是国内首家标准化户外信息和安全服务的提供。");
        graph1.css("opacity","1");
		result.append(graph1);
		// graph1.animate({opacity:1},1000);
    }, _time_delay * 0);
    var graph2 = project_template.clone();
     setTimeout(function(){
        var graph2 = project_template.clone();
        graph2.find(".card-row-project-title").text("国内唯一的规范化线路体系");
        graph2.find(".card-row-project-text").text("wowgo创造性的开发了全国首个标准化专业线路采绘系统：关键位置精准打点，户外信息专业标注，图文结合精确户外导航。线路由300人的专业户外线路采集团队实地采集绘制。每条线路包含百余处必备户外线路信息，可大幅降低户外出行专业门槛。我们现已上架西南片区30条路线方案，预计一年内以300条专业户外线路覆盖全中国。我们已与年游客量超百万的四姑娘景区达成正式合作，开创规范化专业路线新时代。");
        graph2.css("opacity","1");
		result.append(graph2);
		// graph2.animate({opacity:1},1000);
    }, _time_delay * 1);
    var graph3 = project_template.clone();
     setTimeout(function(){
        var graph3 = project_template.clone();
        graph3.find(".card-row-project-title").text("精准导航无网通讯的客户端");
        graph3.find(".card-row-project-text").text("作为国内首款依托北斗导航系统的大型民用项目，wowgo已与北斗民用领域占额70%的成都国星通信签订了双向通讯使用的排他性协议，是中国首家覆盖无人区的户外服务平台。wowgo保证用户在没有手机信号的环境下，依旧可以导航定位，双向通讯，让徒步再无无人区。");
        graph3.css("opacity","1");
		result.append(graph3);
		// graph3.animate({opacity:1},1000);
    }, _time_delay * 2);
    var graph4 = project_template.clone();
     setTimeout(function(){
        var graph4 = project_template.clone();
        graph4.find(".card-row-project-title").text("基于物联网技术的智能监控系统");
        graph4.find(".card-row-project-text").text("对于急需确保游客安全的景区和俱乐部，wowgo我行自主研发了全国首个大型北斗民用后台监测系统。通过wowgo后台监测系统，景区和俱乐部能实时定位游客地理位置、运动轨迹、安全状态，并发送偏离提示、后台报警、高反提醒等。现在该系统已于全国十大徒步高地之一的四姑娘山风景区使用171天，总监控65736人次，为景区节省搜救费用300余万元。");
        graph4.css("opacity","1");
		result.append(graph4);
		// graph4.animate({opacity:1},1000);
    }, _time_delay * 3);
    var graph5 = project_template.clone();
     setTimeout(function(){
        var graph5 = project_template.clone();
        graph5.find(".card-row-project-text").text("基于此，我行平台将收取C端用户高端定制路线下载费用和北斗设备租赁费用；对具有巨大流量的俱乐部和景区端收取安全监测系统出售和维护升级费用。目前我们已经与全国90家户外俱乐部签订合作，并在年游客流量超百万的四姑娘景区正式投入使用。团队创始人刘勇，国际顶级户外探险家，户外奥斯卡“金冰镐”奖唯一的华人评委，他以最权威的户外经验指导线路开发，并以其在户外界的影响力为本项目提供极大的IP价值。\n wowgo我行，全球首创的智慧平台，给中国户外带来前所未有的安全与自由！");
        graph5.css("opacity","1");
		result.append(graph5);
		// graph5.animate({opacity:1},1000);
    }, _time_delay * 4);
    project_template.remove();
}

function DoctorCan(){
    refreash();
    $("#doctorCan").addClass("current"); 
    nav();
    var project_template = $("#project-template");
    var result = $("#result");
    var graph1 = project_template.clone();
    setTimeout(function(){
    	graph1.find(".card-row-project-title").text("医疗×认知计算");
        graph1.find(".card-row-project-text").text("Doctor Can肿瘤治库是基于世界级认知计算和超级算力的医疗软件，相当于72科室主任联合会诊，数分钟实现临床决策。数分钟提供肿瘤规范化治疗方案，赋能基层医生治疗。");
        graph1.css("opacity","1");
		result.append(graph1);
		// graph1.animate({opacity:1},1000);
    }, _time_delay * 0);
    var graph2 = project_template.clone();
     setTimeout(function(){
     	graph2.find(".card-row-project-title").text("医院×合作推广");
        graph2.find(".card-row-project-text").text("目前已与华西医院等单位合作，与顶级专家一致率高达99.3%，通过国家绿色通道，一年内可完成CFDA审批，正式投入临床应用。在九家顶级医院推广，1600家医联体深入合作。获CCTV等70余家媒体所报道。");
        graph2.css("opacity","1");
		result.append(graph2);
		// graph2.animate({opacity:1},1000);
    }, _time_delay * 1);
    project_template.remove();
}

function Surgery(){
    refreash();
    $("#surgery").addClass("current"); 
    nav();
    var project_template = $("#project-template");
    var result = $("#result");
    var graph1 = project_template.clone();
    setTimeout(function(){
        graph1.find(".card-row-project-text").text('近年来，世界范围内脊柱退行性疾病患病人群愈加庞大。其中，我国患病人数更是高达2亿，脊柱疾病负担极重。疼痛明显，对患者生活影响巨大。脊柱微创手术因创伤小、恢复快，已成为主流手术方式。但局限的暴露视野，也对医生提出更高的要求。据相关统计，我国可开展脊柱微创手术的医师不超过300人。为解决“脊柱微创手术医生资源与患者基数难以匹配”的困境，华西骨科医师联合世界500强公司前技术、管理人才成立成都嬴锐科技有限公司，致力于脊柱微创手术辅助器械的研发，最终打造脊柱微创领域“培训系统-导航系统-日间手术中心”一体化生态链。');
		graph1.css("opacity","1");
		result.append(graph1);
		// graph1.animate({opacity:1},1000);
    }, _time_delay * 0);
    var graph2 = project_template.clone();
     setTimeout(function(){
        var graph2 = project_template.clone();
        graph2.find(".card-row-project-title").text("核心技术");
        graph2.find(".card-row-project-text").text('独创神经可视化技术，使神经清晰可见；首创定位系统，实现1mm精确定位；原创高仿真图像重建技术，0辐射下实时还原术中场景；基于最大脊柱影像数据库不断优化算法，将为每位患者提供精准治疗；AR技术的应用，对手术视野进行虚拟补充，极大降低手术难度。');
        graph2.css("opacity","1");
		result.append(graph2);
		// graph2.animate({opacity:1},1000);
    }, _time_delay * 1);
    var graph3 = project_template.clone();
     setTimeout(function(){
        var graph3 = project_template.clone();
        graph3.find(".card-row-project-title").text("恩得视—神经可视化脊柱微创手术导航系统");
        graph3.find(".card-row-project-text").text("脊柱微创手术培训系统：培训设备和权威技能培训认证服务，服务于三甲医院需要练习微创手术技术的医生。可提升医院业务水平和服务质量，增加医疗服务供给量；同时有效缩短医生技能学习周期，提高医生手术技能，最终惠及更多患者。");
        graph3.css("opacity","1");
		result.append(graph3);
		// graph3.animate({opacity:1},1000);
    }, _time_delay * 2);
    var graph4 = project_template.clone();
     setTimeout(function(){
        var graph4 = project_template.clone();
        graph4.find(".card-row-project-title").text("基于物联网技术的智能监控系统");
        graph4.find(".card-row-project-text").text("导航系统设备+术前规划将服务于全国二甲及以上医院。导航系统的临床应用将极大提高手术效率、降低手术风险、节约医院的住院床位资源；降低医生射线暴露水平和手术难度；同时也节约患者治疗费用。");
        graph4.css("opacity","1");
		result.append(graph4);
		// graph4.animate({opacity:1},1000);
    }, _time_delay * 3);
    var graph5 = project_template.clone();
     setTimeout(function(){
        var graph5 = project_template.clone();
        graph5.find(".card-row-project-title").text("日间手术中心");
        graph5.find(".card-row-project-text").text("更多优秀手术医生的加入，更先进导航系统的手术应用，提升日间手术中心服务水平，实现了“让病人当天入院、当天出院”的美好愿景。更完善的服务和管理流程，为患者提供最安全、舒适的医疗服务。三大产品的最优组合，让更多患者在更短时间获得最有效治疗。恩得视，让医生更卓越，让患者更安全。神经可视化，手术不用怕！");
        graph5.css("opacity","1");
		result.append(graph5);
		// graph5.animate({opacity:1},1000);
    }, _time_delay * 4);
    project_template.remove();
}

function Salary(){
    refreash();
    $("#salary").addClass("current"); 
    nav();
    var project_template = $("#project-template");
    var result = $("#result");
    var graph1 = project_template.clone();
    setTimeout(function(){
        graph1.find(".card-row-project-text").text("中薪国际商业保理（深圳）有限公司是一家专注于保障农民工群体工资支付的社会科技企业，公司以“科技+产业+金融+公益”的创新战略打造薪公益平台，致力于让天下没有难领的薪水。平台基于“智能SaaS薪酬结算系统”，运用智能合约、融合支付、实名认证等7大核心技术，实现工资直接由发薪专户发放到农民工工资卡，解决工程建设领域中层层分包导致的欠薪风险；同时通过连接银行、保理公司等金融机构为企业提供“薪酬垫付服务”，资金流向可追溯，解决信息不对称问题，帮助企业更好获取专项融资授信，克服资金周转难题，保障按时足额发薪。");
        graph1.css("opacity","1");
		result.append(graph1);
		// graph1.animate({opacity:1},1000);
    }, _time_delay * 0);
    var graph2 = project_template.clone();
     setTimeout(function(){
        var graph2 = project_template.clone();
        graph2.find(".card-row-project-text").text("已拥有16项软著权，并获得1000 万元天使轮融资，与中国银联、平安银行、光大银行、南通二建、中崇集团、国民技术、第一财经等多家机构达成战略合作。截止2018年8月累计发薪人次达119万，结算金额超过33亿元，薪酬垫付金额近10亿元。高度响应国务院“2020年农民工薪资基本无拖欠”的战略目标，是欠薪问题的根治性方案，保障劳有所得，用薪守护千万农民家庭幸福生活。");
        graph2.css("opacity","1");
		result.append(graph2);
		// graph2.animate({opacity:1},1000);
    }, _time_delay * 1);
    project_template.remove();
}

function Hospital(){
    refreash();
    $("#hospital").addClass("current"); 
    nav();
    var project_template = $("#project-template");
    var result = $("#result");
    var graph1 = project_template.clone();
    setTimeout(function(){
        graph1.find(".card-row-project-text").text("中薪国际商业保理（深圳）有限公司是一家专注于保障农民工群体工资支付的社会科技企业，公司以“科技+产业+金融+公益”的创新战略打造薪公益平台，致力于让天下没有难领的薪水。平台基于“智能SaaS薪酬结算系统”，运用智能合约、融合支付、实名认证等7大核心技术，实现工资直接由发薪专户发放到农民工工资卡，解决工程建设领域中层层分包导致的欠薪风险；同时通过连接银行、保理公司等金融机构为企业提供“薪酬垫付服务”，资金流向可追溯，解决信息不对称问题，帮助企业更好获取专项融资授信，克服资金周转难题，保障按时足额发薪。");
        graph1.css("opacity","1");
		result.append(graph1);
		// graph1.animate({opacity:1},1000);
    }, _time_delay * 0);
    var graph2 = project_template.clone();
     setTimeout(function(){
        var graph2 = project_template.clone();
        graph2.find(".card-row-project-text").text("已拥有16项软著权，并获得1000 万元天使轮融资，与中国银联、平安银行、光大银行、南通二建、中崇集团、国民技术、第一财经等多家机构达成战略合作。截止2018年8月累计发薪人次达119万，结算金额超过33亿元，薪酬垫付金额近10亿元。高度响应国务院“2020年农民工薪资基本无拖欠”的战略目标，是欠薪问题的根治性方案，保障劳有所得，用薪守护千万农民家庭幸福生活。");
        graph2.css("opacity","1");
		result.append(graph2);
		// graph2.animate({opacity:1},1000);
    }, _time_delay * 1);
    project_template.remove();
}

// $(window).resize(function(){
//     _width=$(window).width();
//     _height=$(window).height();
//     if(_page_flag=="project"){
//         box_nav=$(".nav-box");
//         nav_box_width=$(box_nav).width();
//         box_left=(_width-nav_box_width)/2;
//         $(box_nav).css("left",box_left);
//     }
// })