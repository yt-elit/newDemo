apiready = function(){
	gei();
}

function gei(){
	document.getElementById("dengluzhanghao").innerText	=	session('dengluzhanghao');
	document.getElementById("zhiwei").innerText	=	session('zhiwei');
	document.getElementById("lianxiren").innerText	=	session('lianxiren');
	document.getElementById("lianxidianhua").innerText	=	session('lianxidianhua');
	document.getElementById("dizhi").innerText	=	session('dizhi');
	document.getElementById("youxiang").innerText	=	session('youxiang');
	document.getElementById("chuanzhenhao").innerText	=	session('chuanzhenhao');
}

function xiugaitouxiang(){
	var op = {'name':'shangchuantouxiang','html':'shangchuantouxiang.html'};
	
	ow(op);
}

function xiugai(name){
	
	var msg	=	'';
	
	switch ( name ){
		case 'dengluzhanghao':
			msg	=	'修改登录账号';
			break;
		case 'zhiwei':
			msg	=	'修改名称';
			break;
		case 'lianxiren':
			msg	=	'修改联系人';
		
			break;
			
		case 'lianxidianhua':
			msg	=	'修改联系电话';
		
			break;
		case 'dizhi':
			msg	=	'修改地址';
		
			break;
		case 'chuanzhenhao':
			msg	=	'修改传真号';
		
			break;
		case 'youxiang':
			msg	=	'修改邮箱';
		
			break;
		default:
			break;
	}
	
	
	mui.prompt('','',msg,['确认','取消'],function(e){
		if( e.index == 1 ){
			
		}else{
			
			tijiao(name,e.value);
		
			linshihuancun(name,e.value);
		}
		
		
	});
}

//临时缓存，用于回调成功后，直接修改
function linshihuancun(name,value){
	linshiname	=	name;
	linshivalue	=	value;
}

function tijiao(name,value){
	
	var dengluzhanghao	=	'';
	var zhiwei			=	'';
	var lianxiren		=	'';
	var lianxidianhua	=	'';
	var dizhi			=	'';
	var chuanzhenhao	=	'';
	var youxiang		=	'';
	
	switch ( name ){
		case 'dengluzhanghao':
			dengluzhanghao	=	value;
			break;
		case 'zhiwei':
			zhiwei	=	value;
			break;
		case 'lianxiren':
			lianxiren	=	value;
			break;
		case 'lianxidianhua':
			lianxidianhua	=	value;
			break;
		case 'dizhi':
			dizhi	=	value;
			break;
		case 'chuanzhenhao':
			chuanzhenhao	=	value;
			break;
		case 'youxiang':
			youxiang	=	value;
			break;
		default:
			break;
	}
	
	var shuju	=	{
						'account'	:dengluzhanghao,
						'title'		:	zhiwei,
						'name'		:	lianxiren,
						'phone'	:	lianxidianhua,
						'address'			:	dizhi,
						'chuanzhen'	:	chuanzhenhao,
						'email'		:	youxiang,
					};
	var dizhi	=	'/def/User/updateuser';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

function chuli(data){
	
	if( data.code != 200 ){
		tishi(data.msg);
		return false;
	}
	
	session(linshiname,linshivalue);
	
	gei();
	
}
