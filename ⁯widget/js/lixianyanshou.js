apiready = function(){
	
	ms();
	
	//	如果是缓存页面过来的，直接查询
	var ishuancun	=	geiGet('huancun',false);
	if( ishuancun == 1 ){
		setTimeout(function() {
			huancun();
		}, 200);
	}
	
	
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



function chazhao(page){
	
	document.getElementById("chazhaoshurukuang").blur();
	
	if(page == 0){
		per_page = page;
	}
	
	var type	=	document.getElementsByName('type');
	var neirong	=	document.getElementById("chazhaoshurukuang").value;
	for (var i = 0 ; i < type.length ; i++) {
		if( type[i].checked ){
			type	=	type[i].value;
		}
	}
	
	if( neirong.length < 11 && type==1 ){
		mui.alert('','请输入15位完整编码或11位数字编码！');
		return false;
	}else if( type==2 && neirong.length < 1 ){
		mui.alert('','请输入工程名称！');
		return false;
	}
	
	
	
	gei(type,neirong);
	
}

function gei(type,neirong){
	
	document.getElementById("list-box").innerHTML 	= 	'';
	
	ol();
	if( type == 1 ){
		var sql	=	'SELECT * FROM t1 WHERE bianma LIKE "%'+neirong+'%" ORDER BY zhuangtai ASC';
	}else{
		var sql	=	'SELECT * FROM t1 WHERE gongchengmingcheng LIKE "%'+neirong+'%" ORDER BY zhuangtai ASC';
	}
	
	selectTable(sql);
	
}


function selectTable(sqls){
	var db = api.require('db');
		db.selectSql({
		    name: db_name,
		    sql: sqls
		}, function(ret, err) {
			
			cl();
			
		    if (ret.status) {
		    	
//		        alert(JSON.stringify(ret));

				chuli(ret.data);
		    	
		    } else {
		        alert(JSON.stringify(err));
		    }
		});
		
		
}


function chuli(data){
	if( data.length < 1 ){
		
		
		
		var type	=	document.getElementsByName('type');
		for (var i = 0 ; i < type.length ; i++) {
			if( type[i].checked ){
				type	=	type[i].value;
			}
		}
		
		if( type==1 ){
			mui.confirm('','未找到此编码，是否在线查找？',['是','否'],function(e){
				if( e.index == 0 ){
					quyanshou();
				}
			});
		}else{
			mui.confirm('','未找到此工程名称，是否在线查找？',['是','否'],function(e){
				if( e.index == 0 ){
					quyanshou2();
				}
			});
		}
		
		
		
		return false;
	}
	var list		=	{};
		list.data	=	data;
		list.isyan	=	1;
		
	var html		=	template.render('list-tp',list);
	document.getElementById("list-box").innerHTML 	= 	html;
	
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
	
	var s	=	'UPDATE t1 SET zhuangtai=1,miaoshuzhuangtai=1 WHERE id='+id;
	
	var data = {};
	
	var db = api.require('db');
		db.executeSql({
		    name: db_name,
		    sql: s
		}, function(ret, err) {
		    if (ret.status) {
		    	
		    	data.code = 200;
		    	data.msg  = '验收成功！';
		    	
		    	tijiaochuli(data);
		    	
		    } else {
		        
		        
		        data.code = 201;
		    	data.msg  = '验收失败，请重试！';
		        
		    	tijiaochuli(data);
		        
		    }
		});
	
}
function tijiaochuli(data){
	cl();
	
	
	if(data.code!=200){
		tishi(data.msg);
		return false;
	}
	tishi(data.msg);
	chenggongchuli();
}

function chenggongchuli(){
	
	
	var ids	=	session('lixianIds') + ',' + linshiid;
	
	session('lixianIds' , ids );
	
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

function quyanshou(){
	
	var neirong	=	document.getElementById("chazhaoshurukuang").value;
	var op = {name:'yanshouchanpin-w',html:'yanshouchanpin-w.html?huancun=2&neirong='+neirong};
	ow(op);
}

function quyanshou2(){
	
	var neirong	=	document.getElementById("chazhaoshurukuang").value;
	
	session('linshigongchengmingcheng2',neirong);
	
	var op = {name:'yanshouchanpin-w',html:'yanshouchanpin-w.html?huancun=3'};
	ow(op);
}

function qingchuneirong(){
	document.getElementById("chazhaoshurukuang").value	=	'';
}

function huoqujiaodian(){
	document.getElementById("chazhaoshurukuang").focus();
}