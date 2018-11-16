function corp_info(corpGraphId){
	// nav();
	fresh();
	$("#corp_info").addClass("current"); 
	nav2();
	console.log(corpGraphId);
	$.ajax({
		type: "get",
		url: "http://118.24.43.47:8089/corp",
		data: {graphId: corpGraphId},
		dataType: "json",
		success: function (data) {		
			console.log("succeed");	
			const format = (x) => (x == null || x == "" || x == "None") ? "未公开" : x;
			setTimeout(function(){
				card=createBasicInfo(
					data.id,
					data.name,
					data.type,
					data.legal_person,
					data.reg_capt,
					data.reg_date,
					data.startDate,
					data.stopDate,
					data.reg_auth,
					data.checkDate,
					data.state,
					data.address,
					data.field
					);
				
				$("#result").append(card);
				$(card).animate({opacity:1},200);
				addBackBtn();
			},150);
			setTimeout(function(){
				card=createCorpController(data.name);
				$("#result").append(card);
				$(card).animate({opacity:1},200);
			},300);
			setTimeout(function(){
				card=createException(data.name);
				$("#result").append(card);
				$(card).animate({opacity:1},200);
			},450);
			setTimeout(function(){
				card=createChange(data.name);
				$("#result").append(card);
				$(card).animate({opacity:1},200);
			},600);
		}
	});
}

function createBasicInfo(id,name,type,legal_person,reg_capt,
	reg_date,start_date,stop_date,reg_auth,check_date,state,address,field){
	c_card=$('<div class="card-company" style="opacity:1"> <table class="table corp-info"><tbody></tbody></div>');
	c_id=$('<tr><td><b>统一社会信用代码：</b><span id="id">'+id+'</span></td></tr>');
	c_name=$('<tr><td><b>企业名称：</b><span id="id">'+name+'</span></td></tr>');
	c_type=$('<tr><td><b>类型：</b><span id="id">'+type+'</span></td></tr>');
	c_legal_person=$('<tr><td><b>法定代表人：</b><span id="id">'+legal_person+'</span></td></tr>');
	c_reg_capt=$('<tr><td><b>注册资本：</b><span id="id">'+reg_capt+'</span></td></tr>');
	c_reg_date=$('<tr><td><b>成立日期：</b><span id="id">'+reg_date+'</span></td></tr>');
	c_start_date=$('<tr><td><b>营业期限至：</b><span id="id">'+start_date+'</span></td></tr>');
	c_stop_date=$('<tr><td><b>营业期限至：</b><span id="id">'+stop_date+'</span></td></tr>');
	c_reg_auth=$('<tr><td><b>登记机关：</b><span id="id">'+reg_auth+'</span></td></tr>');
	c_check_date=$('<tr><td><b>核准日期：</b><span id="id">'+check_date+'</span></td></tr>');
	c_state=$('<tr><td><b>登记状态：</b><span id="id">'+state+'</span></td></tr>');
	c_address=$('<tr><td><b>住所：</b><span id="id">'+address+'</span></td></tr>');
	c_field=$('<tr><td><b>经营范围：</b><span id="id">'+field+'</span></td></tr>');
	
	$(c_card).append('<h5 class="card-title">基本信息</h5>');
    $(c_card).append(c_id);
    $(c_card).append(c_name);
    $(c_card).append(c_type);
    $(c_card).append(c_legal_person);
    $(c_card).append(c_reg_capt);
	$(c_card).append(c_start_date);
	$(c_card).append(c_stop_date);
	$(c_card).append(c_reg_auth);
	$(c_card).append(c_state);
	$(c_card).append(c_address);
	$(c_card).append(c_field);

    return c_card;
}

function createCorpController(name){
	c_card=$('<div class="card-company" style="opacity:1"> <table class="table corp-info"><tbody></tbody></div>');
	$(c_card).append('<h5 class="card-title">股权结构</h5>');

	return c_card;
}

function createException(name){
	c_card=$('<div class="card-company" style="opacity:1"> <table class="table corp-info"><tbody></tbody></div>');
	$(c_card).append('<h5 class="card-title">经营异常</h5>');

	return c_card;
}

function createChange(name){
	c_card=$('<div class="card-company" style="opacity:1"> <table class="table corp-info"><tbody></tbody></div>');
	$(c_card).append('<h5 class="card-title">变更信息</h5>');

	return c_card;
}