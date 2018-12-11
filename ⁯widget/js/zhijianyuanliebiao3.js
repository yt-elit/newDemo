apiready = function(){
	gei();
}

function gei(){
	
	document.getElementById("list-box").innerHTML = '';
	
	document.getElementById("page").innerHTML = '';
	
	
	var sheng		=	geiGet('sheng',false);
		
		sheng	=	decodeURI (decodeURI( sheng ));
		
	var shi		=	geiGet('shi',false);
		
		shi	=	decodeURI (decodeURI( shi ));
	
	var shuju	=	{'s_province':sheng,'s_city':shi};
	var dizhi	=	'/def/Fangban/rfb_zjy';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
}

function chuli(data){
	
	if( data.code != 200 ){
		tishi(kongtishi);
		cl();
		return false;
	}
	if( data.data.osinfo.length < 1 ){
		tishi(kongtishi);
		cl();
		return false;
	}
	
	var list	=	{};
		list.data	=	data.data.osinfo;
		list.is_show_yan = data.data.is_show_yan;
	
	var html	=	template.render('list-tp',list);
	document.getElementById("list-box").innerHTML = html;
	
	document.getElementById("page").innerHTML = data.data.app_page_html;
	
	cl();
}

function zhijianyuanliebiao3(id){
	var op = {name:'zhijianyuanliebiao3-w',html:'zhijianyuanliebiao3-w.html?id='+id};
	ow(op);
}

function yanshoujilu(id){
	var op = {name:'yanshoujilu-w',html:'yanshoujilu-w.html?id='+id};
	ow(op);
}
function bianji(id){
	var op = {name:'bianjizhijianyuan-w',html:'bianjizhijianyuan-w.html?id='+id};
	ow(op);
}
function dengluzhuangtai(dom,id){
	
	
	var type	=	dom.getAttribute('type');
	
	if( type == 1 ){	//	允许登录的情况下
		dom.innerText	=	'禁止登陆';
		dom.setAttribute('type',0);
		dom.classList.remove('yunxudenglu');
		dom.classList.add('jinzhidenglu');
	}else{
		dom.innerText	=	'允许登录';
		dom.setAttribute('type',1);
		dom.classList.remove('jinzhidenglu');
		dom.classList.add('yunxudenglu');
	}
	
	
	var shuju	=	{'id':id,'datatype':type};
	var dizhi	=	'/def/Fangban/jinzhi';
	var func	=	'';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

function yanshouzhuangtai(dom,id){
	
	
	var type	=	dom.getAttribute('type');
	
	if( type == 1 ){	//	允许登录的情况下
		dom.innerText	=	'禁止验收';
		dom.setAttribute('type',0);
		dom.classList.remove('yunxuyanshou');
		dom.classList.add('jinzhiyanshou');
	}else{
		dom.innerText	=	'允许验收';
		dom.setAttribute('type',1);
		dom.classList.remove('jinzhiyanshou');
		dom.classList.add('yunxuyanshou');
		type = 2;
	}
	
	
	var shuju	=	{'id':id,'datatype':type};
	var dizhi	=	'/def/Fangban/yanshouJinzhi';
	var func	=	'';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

function fanye(id){
	var page	=	arguments[0]?id:0;
	per_page = page;

	gei();
}


//动态修改用户信息
var linshixiugaiyonghuxinxiid;
function xiugaiyonghuxinxi(id){
	
	linshixiugaiyonghuxinxiid	=	id;
	var shuju	=	{'id':id};
	var dizhi	=	'/def/Yanshou/yancount';
	var func	=	'xiugaiyonghuxinxichuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol('更新中...');
}


function xiugaiyonghuxinxichuli(data){
	
	cl();
	var data = data.data;
	
	document.querySelector('#zhijianyuan'+linshixiugaiyonghuxinxiid+' .denglushouji').innerText	=	data.UserMobile;
	document.querySelector('#zhijianyuan'+linshixiugaiyonghuxinxiid+' .mingcheng').innerText	=	data.ContactUser;
	document.querySelector('#zhijianyuan'+linshixiugaiyonghuxinxiid+' .lianxidianhua').innerText	=	data.ContactTel;
	document.querySelector('#zhijianyuan'+linshixiugaiyonghuxinxiid+' .shenfenzhenghao').innerText	=	data.UserCode;
	
}


function jinzhibianji(){
	mui.alert('','不允许编辑');
}
