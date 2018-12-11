apiready = function(){
	ms();
	isidyici();
}

function gei(){
	var jiumima	=	document.getElementById("jiumima").value;
	var xinmima	=	document.getElementById("xinmima").value;
	var querenxinmima	=	document.getElementById("querenxinmima").value;
	if( jiumima.length < 6 ){
		mui.alert('','请输入旧密码！');
		return false;
	}
	if( xinmima.length < 6 ){
		mui.alert('','请输入新密码！');
		return false;
	}
	if( xinmima != querenxinmima ){
		mui.alert('','两次输入的密码不一致！');
		return false;
	}
		xinmima	=	xinmima;
	var shuju	=	{'oldpass':jiumima,'password':xinmima,'repass':querenxinmima};
	var dizhi	=	'/def/User/modifypass';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

function chuli(data){
	if( data.code == 200 ){
		
		mui.alert( '' ,'修改成功！');
		
		session('ismodifypass',1);
		
		setTimeout(function() {
			
			cw();
			
		}, 1000);
		
	}else{
		mui.alert( '' ,data.msg);
	}

}

function isidyici(){
	var type	=	session('ismodifypass');
	if( type == 0 ){
		document.getElementById("isdiyici").style.display = 'block';
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
	var yanzhengma	=	document.getElementById("yanzhengma").value;
	var shuju	=	{'yanzhengma':yanzhengma};
	var dizhi	=	'/default/test/fasongyanzhengma';
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
