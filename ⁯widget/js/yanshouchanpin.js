apiready = function(){
	
	//	如果是缓存页面过来的，直接查询
	var ishuancun	=	geiGet('huancun',false);
	if( ishuancun == 1 ){
		setTimeout(function() {
			huancun();
		}, 200);
	}else if(ishuancun == 2){
		setTimeout(function() {
			lixianyanshou();
		}, 200);
	}else if(ishuancun == 3){
		lixianyanshou2();
	}
	
	ms();
}

function huancun(){
	
	var shuju	=	session('huancunbianma');
	shuju		=	shuju.split(',');
	var neirong	=	'';
	for ( var i = 0 ; i < shuju.length ; i++ ) {
		var linshi	=	shuju[i].split('|');
		neirong		=	neirong + linshi[0] + '-';
	}
	
	neirong = neirong.trim('-');
	
	document.getElementById("chazhaoshurukuang").value	=	neirong;
	
	gei(1,neirong);
}

function lixianyanshou(){
	var neirong	=	geiGet('neirong',false);
	
	document.getElementById("chazhaoshurukuang").value	=	neirong;
	
	gei(1,neirong);
}

function lixianyanshou2(){
	
	document.getElementsByName('type')[0].checked=false;
	document.getElementsByName('type')[1].checked=true;
	
	var neirong	=	session('linshigongchengmingcheng2');
	
	document.getElementById("chazhaoshurukuang").value	=	neirong;
	
	gei(2,neirong);
}



function chazhao(page){
	
	document.getElementById("chazhaoshurukuang").blur();
	
	if(page == 0){
		per_page = page;
	}
	
	var type	=	document.getElementsByName('type');
	var neirong	=	document.getElementById("chazhaoshurukuang").value;
	
	if( neirong.length < 1 ){
		mui.alert('','请输入查找内容！');
		return false;
	}
	
	
	for (var i = 0 ; i < type.length ; i++) {
		if( type[i].checked ){
			type	=	type[i].value;
		}
	}
	
	
	
	gei(type,neirong,1);
	
}

function gei(type,neirong){
	
	document.getElementById("list-box").innerHTML 	= 	'';
	document.getElementById("page").innerHTML		=	'';
	
	ol();
	if( type == 1 ){
		var shuju	=	{
							'ProductNumber':neirong,
							'type' : 1,
						};
	}else if( type == 3 ){
		var shuju	=	{
							'guanlian':neirong,
							'type' : 3,
						};
		
		if( neirong.length != 15 ){
			cl();
			alert('请输入15位产品编码！');
			return false;
		}
		
		
	}else{
		var shuju	=	{
							'SitesAddr':neirong,
							'type' : 2,
						};
	}
	var dizhi	=	'/def/Yanshou/search';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

function chuli(data){
	if( data.code != 200 ){
		tishi('网络出错，请重试！');
		cl();
		return false;
	}
	if( data.data.osinfo.length < 1 ){
		tishi(data.msg);
		cl();
		return false;
	}
	var list		=	{};
		list.data	=	data.data.osinfo;
		list.isyan	=	data.data.isyan;
		
	var html		=	template.render('list-tp',list);
	document.getElementById("list-box").innerHTML 	= 	html;
	document.getElementById("page").innerHTML		=	data.data.app_page_html;
	cl();
	ms();
}


var linshidom;
var linshiid;
function yanshou(dom,id){
	
	linshidom		=	dom;
	linshiid		=	id;
	mui.confirm('','确认验收？',['确认','取消'],function(e){
		if(e.index==0){
			yanshoutijiao(id);
		}
	});
	
}

function yanshoutijiao(id){
	var shuju	=	{
						'id':id,
					};
	var dizhi	=	'/def/Yanshou/yanshou';
	var func	=	'tijiaochuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
}
function tijiaochuli(data){
	if(data.code!=200){
		tishi(data.msg);
		return false;
	}
	tishi(data.msg);
	chenggongchuli();
	cl();
}

function chenggongchuli(){
	document.getElementById("type"+linshiid).classList.add('yiyanshou');
	document.getElementById("type"+linshiid).innerText	=	'已验收';
	linshidom.remove();
}


//扫码
function saoma(){
	per_page = 0;
	var scanner = api.require('scanner');
	scanner.open(function(ret, err) {
	    if (ret.eventType == 'success') {
	        
	        var neirong	=	geiGet( 'keywords' , ret.msg);
	        
	        document.getElementById("chazhaoshurukuang").value	=	neirong;
	        
	        gei(1,neirong);
	    }
	});
}

function fanye(id){
	var page	=	arguments[0]?id:0;
	per_page = page;

	chazhao();
}

function jinzhiyanshou(){
	mui.alert('','您的账号无权限验收！');
}

function qingchuneirong(){
	document.getElementById("chazhaoshurukuang").value	=	'';
}

function huoqujiaodian(){
	document.getElementById("chazhaoshurukuang").focus();
}
