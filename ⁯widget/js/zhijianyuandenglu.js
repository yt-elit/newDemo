apiready = function(){
	
}

function gei(){
	var zname		=	document.getElementById("zname").value;
	var zmima		=	document.getElementById("zmima").value;
	var zyanzhengma	=	document.getElementById("zyanzhengma").value;
	var status		=	6;
	
	
	var shuju	=	{'account':zname,'password':zmima,'verify':zyanzhengma,'status':status};
	var dizhi	=	'/def/Log/login';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

function chuli(data){
	if( data.code == 200 ){
		mui.alert( '' ,data.msg);
		
		var data = data.data;
		login(data.level,data);
		
		setTimeout(function() {
			
			api.closeToWin({
				name : 'root',
			});
			
		}, 1000);
		
	}else{
		mui.alert( '' ,data.msg);
	}

}


var isFaSong	=	true;

function fasongyanzhengma(dom){
	
	if( !isFaSong ){
		return false;
	}
	
	isFaSong	=	false;
	
	var	linshitime			=	59;
		dom.style.opacity	=	'0.5';
		dom.innerText		=	( linshitime + 1 ) + '秒后重发';
	
	var zhuan	=	setInterval(function() {
		
		if( linshitime < 1 ){
			dom.style.opacity	=	'1';
			dom.innerText		=	'点击发送';
			isFaSong			=	true;
			clearInterval(zhuan);
			return false;
		}else{
			dom.innerText		=	linshitime + '秒后重发';
			linshitime			=	linshitime - 1 ;
			
		}
	}, 1000);
	
	fasong();
}

function fasong(){
	var zname		=	document.getElementById("zname").value;
	var shuju	=	{'phone':zname};
	var dizhi	=	'/def/Log/getverify';
	var func	=	'chuliyanzhengma';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

function chuliyanzhengma(rs){
	mui.toast(rs.msg);
}

function wangjimima(){
	var op	=	{ 'name' : 'zhijianyuanzhaohuimima-w' , 'html' : 'zhijianyuanzhaohuimima-w.html' };
	
	ow(op);
}
