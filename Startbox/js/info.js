function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r){
        var keyword = decodeURI(r[2]);
    }
    return keyword;
}

$(document).ready(function(){		
    $('.return-top').hide();	
	$('#slide').scroll(function(){
        var scroTop = $('#slide').scrollTop();
		if(scroTop>100){
			$('.return-top').fadeIn(500);
		}else{
			$('.return-top').fadeOut(500);
		}
    });
		    	
	$('.return-top').click(function(){
		$("#slide").animate({scrollTop:0},"fast");
	});
});

function search(){
    $("#result").append('<div id="corp-template" class="card"><div class="card-block"><h5 class="card-title company_name" href=""></h5><p class="card-text type">公司类型：</p><p class="card-text reg_auth">注册机关：</p><p class="card-text id">统一社会信用代码：</p><p class="card-text state">经营状态：</p><p class="card-text reg_date">成立日期：</p></div></div>');
}
$(function() {
    searchKeyword = getQueryString("corpname");
    $("#corpname").val(searchKeyword);
    var searchURL = "http://118.24.43.47:8089/search";
    var searchData = {keyword: searchKeyword};
    console.log(searchKeyword);
    console.log(searchURL);
    //加载搜索结果
    search();
    var corp_template = $("#corp-template");
    $.ajax({
        type : 'get',
        url : searchURL,
        data: searchData,
        dataType : 'json',
        success : function(data) {
            var result = $("#result");
            const format = (x) => (x == null || x == "" || x == "None") ? "未公开" : x;
            var i = 0;

            for (var start = 0; start < data.length; start++) {
            	setTimeout(function(){
            		var corp = corp_template.clone();
					var irgs = data[i].irgOpts;
					if(!irgs){
						corp.find(".company_name").text(data[i].name);
					}
					else{
						corp.find(".company_name").text(data[i].name + "【该公司被列入经营异常名录】");
					}

					corp.find(".type").text("公司类型：" + format(data[i].type));
					corp.find(".reg_auth").text("注册机关：" + format(data[i].reg_auth));
					corp.find(".id").text("统一社会信用代码：" + format(data[i].id));
					corp.find(".state").text("经营状态：" + format(data[i].state));
					corp.find(".reg_date").text("成立日期：" + format(data[i].reg_date));
					corp.click(function(){
						Basic_info(data[i].graphId);
						Invest_info(data[i].graphId);
					});
					corp.css("opacity","0");
					result.append(corp);
					corp.animate({opacity:1},1000);
					i++;
            	}, 500 * start);             
            }
            corp_template.remove();
        }
    });
});



function refreash(){

	$("#result").css("display","none");
    $("#basic_card").css("display","none");
    $("#invest_card").css("display","none");
    $("#position_card").css("display","none");
    $("#family_card").css("display","none");
    
    var curid = $(".current").attr("id");
    $("#"+curid).removeClass("current");
}


function Basic_info(corpGraphId){
	refreash();
	$("#basic").addClass("current"); 
    nav();
	$.ajax({
		type: "get",
		url: "http://118.24.43.47:8089/corp",
		data: {graphId: corpGraphId},
		dataType: "json",
		success: function (data) {			
			$("#namanana").css("display","block");
			$("#basic_card").css("display","block");
			const format = (x) => (x == null || x == "" || x == "None") ? "未公开" : x;
			console.log(data.name);
			// TODO: 将返回的数据添加至页面
			// 基本信息
			$("#id").text(data.id); $("#basicInfoName").text(data.name);
			$('#type').text(data.type); $("#legal_person").text(data.legal_person);
			$('#reg_date').text(data.reg_date); $('#reg_auth').text(data.reg_auth);
			$('#checkDate').text(data.checkDate); $('#state').text(data.state);
			$('#address').text(data.address); $('#field').text(data.field);
			$('#startDate').text(data.startDate); $('#stopDate').text(data.stopDate);
			$('#reg_capt').text(data.reg_capt);

			// 股东信息
			$('#corpController').text(data.corpController);
			var shareholders = data.shareholders;
			var shareholder_template = $(".shareholder-template");
			for (var i = 0; i < shareholders.length; i++) {
				var sh = shareholders[i];
				var shareholder = shareholder_template.clone();
				shareholder.children("#sh_no").text(i+1);
				shareholder.children("#sh_bf_name").text(sh.sh_name);
				shareholder.children("#sh_bf_type").text(sh.sh_type);
				shareholder.find("a").attr("onclick", "showDetail("+i+")");
				$("#shareholder-list").append(shareholder);
			}
			shareholder_template.remove();

			// 经营异常信息
			var irgs = data.irgOpts;
			var irg_template = $('.irg-template');
//                  TODO: 在该企业后面加上（该企业被列入经营异常目录）
			for (var i = 0; i < irgs.length; i++) {
				var irgOpt = irgs[i];
				var irg = irg_template.clone();
				irg.children(".irgNo").text(i+1);
				irg.children(".irgReason").text(irgOpt.irgReason);
				irg.children(".irgDate").text(irgOpt.irgDate);
				irg.children(".deIrgReason").text(irgOpt.deIrgReason);
				irg.children(".deIrgDate").text(irgOpt.deIrgDate);
				irg.children(".deIrgAuth").text(irgOpt.deIrgAuth);
				$("#irg-list").append(irg);
			}
			irg_template.remove();

			// 添加链接
			$('#basic-a').attr("href", "info.html?graphId=" + data.graph_id + "&name=" + data.name);
			$('#inverstment-a').attr("href", "investment.html?graphId=" + data.graph_id + "&name=" + data.name);
			$('#staff-a').attr("href", "staff.html?graphId=" + data.graph_id + "&name=" + data.name);
			$('#corp-a').attr("href", "corp.html?graphId=" + data.graph_id + "&name=" + data.name);

		}
	});
}

function Invest_info(graphId){
	load_relation_graph(3);

    function load_relation_graph(num){
        document.getElementById("curlayer").innerHTML = num; //更新显示层数的数字
        d3.select("body").select("svg") //清空SVG中的内容
            .selectAll('*')
            .remove();
        var max_layer = num;
        var img_w = 24;
        var img_h = 32;
        var svg = d3.select("body").select("svg"),
            width = +svg.attr("width"),
            height = +svg.attr("height");

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().distance(300).strength(0.3))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 4));

//		d3.json("json/relation3.json", function(error, graph) {
        d3.json("http://118.24.43.47:8089/inverst-map?graphId="+graphId, function(error, graph) {
            if (error) throw error;

            var jsonstr="[]";
            var nodes = eval('('+jsonstr+')');  //显示的点
            var curlinks = eval('('+jsonstr+')');  //显示的边

            var initnodes = graph.nodes;
            initnodes.forEach(function(node){
                if(node.layer <= max_layer){
                    nodes.push(node);
                    console.log(node);
                }
            });

            var nodeById = d3.map(initnodes, function(d) { return d.name; }),
                links = graph.edges,
                bilinks = [];


            var linkGroup = {};
            //对连接线进行统计和分组，不区分连接线的方向，只要属于同两个实体，即认为是同一组
            var linkmap = {};


            links.forEach(function(link) {
                if(link.layer < max_layer){
                    var s = link.source = nodeById.get(link.source),
                        t = link.target = nodeById.get(link.target),
                        r = link.relation,
                        linknum = 0,
                        text_pos = 0;
                    var tmplink = [s, t, r, linknum, text_pos, link.subscription, link.actual_subscription, link.method, link.subscp_date, link.actual_subscp_date];
                    var key = link.source.name < link.target.name ? link.source.name+':'+link.target.name: link.target.name+':'+link.source.name;
                    bilinks.push(tmplink);
                    if(!linkmap.hasOwnProperty(key)){
                        linkmap[key] = 0;
                        linkGroup[key]=[];
                    }
                    linkmap[key]++;
                    linkGroup[key].push(tmplink);
                    curlinks.push(link);
                }
            });

            for(var i=0; i<links.length; i++){
                if(links[i].layer >= max_layer) continue;
                console.log(links[i].source, links[i].layer);
                var key = links[i].source.name < links[i].target.name ? links[i].source.name+':'+links[i].target.name: links[i].target.name+':'+links[i].source.name;
                links[i].size = linkmap[key];
                //同一组的关系进行编号
                var group = linkGroup[key];
                //给节点分配编号
                setLinkNumber(group);
            }

            function setLinkNumber(group){
                if(group.length==0) return;
                if(group.length==1){
                    group[0][3] = 0;
                    group[0][4] = 1 / 2;
                    return;
                }
                var maxLinkNumber = group.length%2==0?group.length/2:(group.length-1)/2;

                var startLinkNum = -maxLinkNumber;
                for(var i = 0;i<group.length;i++){
                    group[i][3] = startLinkNum++;
                    group[i][4] = (i + 1) / (group.length + 1);
                }
            }


            var R = 30;
            var link = svg.selectAll(".link")
                .data(bilinks)
                .enter().append("path")
                .attr("class", "link")
                .attr("marker-end", "url(#arrow)" );//根据箭头标记的id号标记箭头

            var edges_text = svg.selectAll(".linetext")
                .data(bilinks)
                .attr("class","linetext")
                .style("stroke","#1874CD")
                .enter().append("text")
                .text(function(d){
                    return d[2]
                })
                .style("font-size","12px");

            var node = svg.selectAll("image")
                .data(nodes.filter(function(d) { return d.name; }))
                .enter()
                .append("image")
                .attr("xlink:href",function(d){
                    return d.image;
                })
                .attr("width",img_w)
                .attr("height",img_h)
                .attr("class", "node")
                .attr("r", 5)
                //      .attr("fill", function(d) { return color(d.group); })
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));

            node.append("title")
                .text(function(d) { return "企业统一社会信用代码：" + d.id; });

            edges_text.append("title")
                .text(function(d) { return "认缴金额：" + d[5] + "\n实际认缴金额：" + d[6] + "\n认缴方式：" + d[7] + "\n认缴日期：" + d[8] + "\n实际认缴日期：" + d[9]});

            var nodes_text = svg.selectAll(".nodetext")
                .data(nodes)
                .enter()
                .append("text")
                .attr("class","nodetext")
                .style("font-size","13px")
                .text(function(d){
                    return d.name;
                });

            simulation
                .nodes(nodes)
                .on("tick", ticked);

            simulation.force("link")
                .links(curlinks);

            function ticked() {
                link.attr("d", positionLink);
                node.attr("transform", positionNode);
                edges_text.attr("x",binode_x);
                edges_text.attr("y",binode_y);
                nodes_text.attr("x",node_x);
                nodes_text.attr("y",node_y);
            }
        });

        function positionLink(d) {
            var sx = d[0].x + 10 + d[3] * 8;
            var sy = d[0].y + 15 + d[3] * 8;
            var tx = d[1].x + 10 + d[3] * 8;
            var ty = d[1].y + 15 + d[3] * 8;
            return "M" + sx + "," + sy
                + " " + tx + "," + ty;
        }

        function binode_x(d) {
            var sx = d[0].x + 10 + d[3] * 8;
            var tx = d[1].x + 10 + d[3] * 8;
            return sx + (tx - sx) * d[4];
        }

        function binode_y(d) {
            var sy = d[0].y + 15 + d[3] * 8;
            var ty = d[1].y + 15 + d[3] * 8;
            return sy + (ty - sy) * d[4];
        }

        function node_x(d) {
            return d.x + 5;
        }

        function node_y(d) {
            return d.y + 39;
        }

        function positionNode(d) {
            return "translate(" + d.x + "," + d.y + ")";
        }

        function dragstarted(d) {
            if (!d3.event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x, d.fy = d.y;
        }

        function dragged(d) {
            d.fx = d3.event.x, d.fy = d3.event.y;
        }

        function dragended(d) {
            if (!d3.event.active) simulation.alphaTarget(0);
            d.fx = null, d.fy = null;
        }
    }
}
function Basic(){
	refreash();
	$("#basic_card").css("display","block");
	$("#basic").addClass("current"); 
    nav();
}
function Invest(){
	refreash();
	$("#invest_card").css("display","block");
	$("#invest").addClass("current"); 
    nav();
}
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