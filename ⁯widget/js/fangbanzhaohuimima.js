apiready = function(){
	
}

function gei(){
	var fname	=	document.getElementById("fname").value;
//	var xinmima	=	document.getElementById("xinmima").value;
//	var querenxinmima	=	document.getElementById("querenxinmima").value;
//	var yanzhengma	=	document.getElementById("yanzhengma").value;
	
	if( fname.length < 4 ){
		mui.alert('','请输入账号！');
		return false;
	}
//	if( yanzhengma.length < 4 ){
//		mui.alert('','请输入验证码！');
//		return false;
//	}
//	if( xinmima.length < 6 ){
//		mui.alert('','请输入新密码！');
//		return false;
//	}
//	if( xinmima != querenxinmima ){
//		mui.alert('','两次输入的密码不一致！');
//		return false;
//	}
//		xinmima	=	xinmima;
	var shuju	=	{'account':fname/*,'password':xinmima,'repass':querenxinmima,'verify':yanzhengma*/};
	var dizhi	=	'/def/Log/email_forget';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

function chuli(data){
	
	mui.alert('',data.msg,['确认'],function(e){
		if( data.code == 200 ){
			setTimeout(function() {
				cw();
			}, 0);
		}
	});
	
//	mui.toast(data.msg);
//	if( data.code == 200 ){
//		setTimeout(function() {
//			cw();
//		}, 1000);
//	}else{
//		
//	}

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
	var fname	=	document.getElementById("fname").value;
	
	var shuju	=	{'phone':fname};
	var dizhi	=	'/def/Log/getverify';
	var func	=	'chuliyanzhengma';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

function chuliyanzhengma(rs){
	mui.alert('',rs.msg);
}