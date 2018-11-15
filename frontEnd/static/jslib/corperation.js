function corperation(corpGraphId){
	// nav();
	fresh();
	$("#corperation").addClass("current"); 
	nav2();
	console.log(corpGraphId);
    // setTimeout(function(){
    //     var card=createInv();
    //     $("#result").append(card);
    //     $(card).animate({opacity:1},200);
    // },200);
    // setTimeout(function(){
    //     load_relation_graph(2, corpGraphId);
    // },250);
    var card=createCor();
    $("#result").append(card);   
    setTimeout(function(){
         load_relation_graph3(3, corpGraphId);
    },250);
}


function createCor(){
	c_card=$('<div class="card-company" style="opacity:1;width:900px"></div>');
	$(c_card).append('<h5 class="card-title">企业族谱</h5>');
    $(c_card).append('<svg width="800" height="500"></svg>');
    
	return c_card;
}



function load_relation_graph3(num, graphId){
    // document.getElementById("curlayer").innerHTML = num; //更新显示层数的数字
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
        .force("link", d3.forceLink().distance(180).strength(0.5))
        .force("charge", d3.forceManyBody())
        .force("center", d3.forceCenter(width / 2, height / 4));

    d3.json("http://118.24.43.47:8089/corp-map?graphId="+graphId, function(error, graph) {
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
            .style("font-size","13px");

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
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        node.append("title")
            .text(function(d) { return "企业统一社会信用代码：" + d.id; });

        edges_text.append("title")
            .text(function(d) {
                if(d[2] == "股东" || d[2] == "合伙人")
                    return "认缴金额：" + d[5] + "\n实际认缴金额：" + d[6] + "\n认缴方式：" + d[7] + "\n认缴日期：" + d[8] + "\n实际认缴日期：" + d[9];
                else
                    return null;
            });

        var nodes_text = svg.selectAll(".nodetext")
            .data(nodes)
            .enter()
            .append("text")
            .attr("class","nodetext")
            .style("font-size","12px")
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
