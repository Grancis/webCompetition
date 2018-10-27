$(function(){
    var menu = $("#menu");
    var defWidth = menu.find(".current").innerWidth();
    var defLeft = menu.find(".current").position().left;
    menu.css({backgroundPositionX: defLeft});
    menu.find("li").hover(function(){
        $(".current").removeClass("highlight"); 
        var index = $(this).index();
        var curLeft = $(this).position().left;
        var curWidth = menu.find("li").eq(index).outerWidth();
        var menuLeft = curLeft + (curWidth/2) -50;
        menu.stop().animate({backgroundPositionX:menuLeft},300);

    },function(){
        menu.stop().animate({backgroundPositionX:defLeft},300);
        $(".current").addClass("highlight"); 
    })
});

function refreash(){
    $("#result").empty();
    $("#result").append('<div id="project-template" class="card"><div class="card-block"><h5 class="card-title"></h5><p class="card-text"></div></div>');
    var curid = $(".current").attr("id");
    $("#"+curid).removeClass("current");
    $("#"+curid).removeClass("highlight");
}

function Wowgo(){
    refreash();
    $("#wowgo").addClass("current"); 
    $(".current").addClass("highlight"); 
    var project_template = $("#project-template");
    var result = $("#result");
    var graph1 = project_template.clone();
    setTimeout(function(){
        graph1.find(".card-text").text("2016年户外徒步登山类出行人数已高达1600万，预计2020年我国户外运动总产值将达4000亿，赢来户外市场的爆发期。但是，从2014-2016年，中国户外行业共发生失踪、失联事故1700余起，由此产生的搜救成本3000余万元。然而找路难、危险多、无信号、易失联等难题，无一不阻拦着户外行业的发展。Wowgo我行提供国内唯一的规范化线路体系、精准导航无网通讯的客户端、基于物联网技术的智能监控系统，是国内首家标准化户外信息和安全服务的提供。");
        graph1.css("opacity","0");
		result.append(graph1);
		graph1.animate({opacity:1},1000);
    }, 500 * 0);
    var graph2 = project_template.clone();
     setTimeout(function(){
        var graph2 = project_template.clone();
        graph2.find(".card-title").text("国内唯一的规范化线路体系");
        graph2.find(".card-text").text("wowgo创造性的开发了全国首个标准化专业线路采绘系统：关键位置精准打点，户外信息专业标注，图文结合精确户外导航。线路由300人的专业户外线路采集团队实地采集绘制。每条线路包含百余处必备户外线路信息，可大幅降低户外出行专业门槛。我们现已上架西南片区30条路线方案，预计一年内以300条专业户外线路覆盖全中国。我们已与年游客量超百万的四姑娘景区达成正式合作，开创规范化专业路线新时代。");
        graph2.css("opacity","0");
		result.append(graph2);
		graph2.animate({opacity:1},1000);
    }, 500 * 1);
    var graph3 = project_template.clone();
     setTimeout(function(){
        var graph3 = project_template.clone();
        graph3.find(".card-title").text("精准导航无网通讯的客户端");
        graph3.find(".card-text").text("作为国内首款依托北斗导航系统的大型民用项目，wowgo已与北斗民用领域占额70%的成都国星通信签订了双向通讯使用的排他性协议，是中国首家覆盖无人区的户外服务平台。wowgo保证用户在没有手机信号的环境下，依旧可以导航定位，双向通讯，让徒步再无无人区。");
        graph3.css("opacity","0");
		result.append(graph3);
		graph3.animate({opacity:1},1000);
    }, 500 * 2);
    var graph4 = project_template.clone();
     setTimeout(function(){
        var graph4 = project_template.clone();
        graph4.find(".card-title").text("基于物联网技术的智能监控系统");
        graph4.find(".card-text").text("对于急需确保游客安全的景区和俱乐部，wowgo我行自主研发了全国首个大型北斗民用后台监测系统。通过wowgo后台监测系统，景区和俱乐部能实时定位游客地理位置、运动轨迹、安全状态，并发送偏离提示、后台报警、高反提醒等。现在该系统已于全国十大徒步高地之一的四姑娘山风景区使用171天，总监控65736人次，为景区节省搜救费用300余万元。");
        graph4.css("opacity","0");
		result.append(graph4);
		graph4.animate({opacity:1},1000);
    }, 500 * 3);
    var graph5 = project_template.clone();
     setTimeout(function(){
        var graph5 = project_template.clone();
        graph5.find(".card-text").text("基于此，我行平台将收取C端用户高端定制路线下载费用和北斗设备租赁费用；对具有巨大流量的俱乐部和景区端收取安全监测系统出售和维护升级费用。目前我们已经与全国90家户外俱乐部签订合作，并在年游客流量超百万的四姑娘景区正式投入使用。团队创始人刘勇，国际顶级户外探险家，户外奥斯卡“金冰镐”奖唯一的华人评委，他以最权威的户外经验指导线路开发，并以其在户外界的影响力为本项目提供极大的IP价值。\n wowgo我行，全球首创的智慧平台，给中国户外带来前所未有的安全与自由！");
        graph5.css("opacity","0");
		result.append(graph5);
		graph5.animate({opacity:1},1000);
    }, 500 * 4);
    project_template.remove();

    

    

    
   
}

function DoctorCan(){
    refreash();
    $("#doctorCan").addClass("current"); 
    $(".current").addClass("highlight"); 
    var project_template = $("#project-template");
    var result = $("#result");
    var graph1 = project_template.clone();
    setTimeout(function(){
        graph1.find(".card-text").text("中薪国际商业保理（深圳）有限公司是一家专注于保障农民工群体工资支付的社会科技企业，公司以“科技+产业+金融+公益”的创新战略打造薪公益平台，致力于让天下没有难领的薪水。平台基于“智能SaaS薪酬结算系统”，运用智能合约、融合支付、实名认证等7大核心技术，实现工资直接由发薪专户发放到农民工工资卡，解决工程建设领域中层层分包导致的欠薪风险；同时通过连接银行、保理公司等金融机构为企业提供“薪酬垫付服务”，资金流向可追溯，解决信息不对称问题，帮助企业更好获取专项融资授信，克服资金周转难题，保障按时足额发薪。");
        graph1.css("opacity","0");
		result.append(graph1);
		graph1.animate({opacity:1},1000);
    }, 500 * 0);
    var graph2 = project_template.clone();
     setTimeout(function(){
        var graph2 = project_template.clone();
        graph2.find(".card-text").text("已拥有16项软著权，并获得1000 万元天使轮融资，与中国银联、平安银行、光大银行、南通二建、中崇集团、国民技术、第一财经等多家机构达成战略合作。截止2018年8月累计发薪人次达119万，结算金额超过33亿元，薪酬垫付金额近10亿元。高度响应国务院“2020年农民工薪资基本无拖欠”的战略目标，是欠薪问题的根治性方案，保障劳有所得，用薪守护千万农民家庭幸福生活。");
        graph2.css("opacity","0");
		result.append(graph2);
		graph2.animate({opacity:1},1000);
    }, 500 * 1);
    project_template.remove();
}
