apiready = function(){
	ms();
}

function tijiaojubao(){
	
	var qiyemingcheng	=	document.getElementById("qiyemingcheng").value;
	var	qiyemingchengchangdu	=	qiyemingcheng.length;
	
	var gongchengmingcheng	=	document.getElementById("gongchengmingcheng").value;
	var	gongchengmingchengchangdu	=	gongchengmingcheng.length;
	
	var gongchengdizhi	=	document.getElementById("gongchengdizhi").value;
	var	gongchengdizhichangdu	=	gongchengdizhi.length;
	
	var yigongjitai	=	document.getElementById("yigongjitai").value;
	var	yigongjitaichangdu	=	yigongjitai.length;
	
	var chanpinbianma	=	document.getElementById("chanpinbianma").value;
	var	chanpinbianmachangdu	=	chanpinbianma.length;
	
	if( qiyemingchengchangdu < 2 ){
		mui.alert('','请正确输入企业名称');
		return false;
	}
	
	if( gongchengmingchengchangdu < 2 ){
		mui.alert('','请正确输入工程名称');
		return false;
	}
	
	if( gongchengdizhichangdu < 2 ){
		mui.alert('','请正确输入工程地址');
		return false;
	}
	
	if( yigongjitai < 1 ){
		mui.alert('','请正确输入台数');
		return false;
	}
	
	if( chanpinbianmachangdu < 8 ){
		mui.alert('','请正确输入产品编码');
		return false;
	}


	document.getElementById("jubaoanniu").setAttribute('disabled','disabled');
	
	setTimeout(function() {
		document.getElementById("jubaoanniu").removeAttribute('disabled');
	}, 3000);
	
	
	var shuju	=	{'name':qiyemingcheng,'site':gongchengmingcheng,'siteaddr':gongchengdizhi,'num':yigongjitai,'products':chanpinbianma};
	var dizhi	=	'/def/message/jiaHuoFanKui';
	var func	=	'tijiaochenggong';
	var op		=	{'dizhi':dizhi,'shuju':shuju,'func':func};
	
	ajax(op);
	
	
}

//提交成功
function tijiaochenggong(data){
	if( data.code == 200 ){
		setTimeout(function() {
			cw();
		}, 2000);
	}
	mui.alert('',data.msg);
}