apiready = function(){
	ms();
}

function gei(){
	var zname		=	document.getElementById("zname").value;
	var zmima		=	document.getElementById("zmima").value;
	var zyanzhengma	=	document.getElementById("zyanzhengma").value;
	var status		=	2;
	
	
	if( zname.length < 11 || zname.length > 15 ){
		mui.alert('','请输入正确账号！');
		return false;
	}
	if( zmima.length < 6 || zmima.length > 25 ){
		mui.alert('','请输入正确密码！');
		return false;
	}
	if( zyanzhengma.length < 4 || zyanzhengma.length > 6 ){
		mui.alert('','请输入正确验证码！');
		return false;
	}
	
	
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
	var zhanghao	=	document.getElementById("zname").value;
	if( zhanghao.length < 11 || zhanghao.length > 15 ){
		mui.alert('','请输入正确账号！');
		return false;
	}
	
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
