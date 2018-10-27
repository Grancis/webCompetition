function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if(r){
        var keyword = decodeURI(r[2]);
    }
    return keyword;
}
$(document).ready(function(){
  $("#submitbtn").click(function(){
    $("#result").slideDown("slow");
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
					corp.find(".company_name").attr("href", "/basic_info.html?graphId="+data[i].graphId+"&name="+data[i].name);
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
					corp.css("opacity","0");
					result.append(corp);
					corp.animate({opacity:1},1000);
					i++;
            	}, 500 * start);             
            }
            corp_template.remove();
            function hello(){
            	alert("hello");
            }
            function add(i){
            	

            }
        }
    });
});

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