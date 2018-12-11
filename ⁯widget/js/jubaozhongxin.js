apiready = function(){
	ms();
}

function tijiaojubao(){
	
	var jubaoneirong	=	document.getElementById("jubaoneirong").value;
	var	jubaochangdu	=	jubaoneirong.length;
	
	if( jubaochangdu < 10 ){
		mui.alert('','内容太少了');
	}else{
		document.getElementById("jubaoanniu").setAttribute('disabled','disabled');
		
		setTimeout(function() {
			document.getElementById("jubaoanniu").removeAttribute('disabled');
		}, 3000);
		
		zouni(jubaoneirong);
	}
}

//提交举报
function zouni(neirong){
	
	var yonghuming	=	document.getElementById("yonghuming").value;
	var lianxidianhua	=	document.getElementById("lianxidianhua").value;
	
	var shuju	=	{'content':neirong,'name':yonghuming,'phone':lianxidianhua};
	var dizhi	=	'/def/Homepage/jubao';
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