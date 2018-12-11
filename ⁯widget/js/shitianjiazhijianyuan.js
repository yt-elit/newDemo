gei();
apiready = function(){
}

function gei(){
	
	document.getElementById("yi").innerText	=	session('sheng');
	document.getElementById("er").innerText	=	session('shi');
	
}

function tijiao(){
	
	var id 		=	geiGet('id',false);
	
	var denglushouji	=	document.getElementById("denglushouji").value;
	var denglumima		=	document.getElementById("denglumima").value;
	var lianxiren		=	document.getElementById("lianxiren").value;
	var lianxidianhua	=	document.getElementById("lianxidianhua").value;
	var shenfenzheng	=	document.getElementById("shenfenzheng").value;
	var yi				=	document.getElementById("yi").innerText;
	var er				=	document.getElementById("er").innerText;
	
	if( denglushouji.length < 1 ){
		mui.alert('','请输入登陆手机号！');
		return false;
	}
	if( denglumima.length < 6 ){
		mui.alert('','请输入密码！');
		return false;
	}
	
	if( lianxiren.length < 1 ){
		mui.alert('','请输入联系人！');
		return false;
	}
	
	if( lianxidianhua.length < 1 ){
		mui.alert('','请输入联系电话！');
		return false;
	}
	
	if( shenfenzheng.length < 1 ){
		mui.alert('','请输入身份证号！');
		return false;
	}
	
	if( yi == '请选择' ){
		mui.alert('','请选择所在区域！');
		return false;
	}
	
	var shuju	=	{
						'id':id,
						'UserMobile':denglushouji,
						'UserPass':denglumima,
						'ContactUser':lianxiren,
						'ContactTel':lianxidianhua,
						'UserCode':shenfenzheng,
						'Province':yi,
						'City':er,
					};
	var dizhi	=	'/def/Fangban/add_zjy';
	var func	=	'tijiaochuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
}

function tijiaochuli(data){
	cl();
	
	if( data.code == 200 ){
		mui.alert('','添加成功！');
		setTimeout(function() {
			cw();
		}, 1000);
		
		return false;
	}
	
	mui.alert('',data.msg);
}