apiready = function(){
	gei();
}

function gei(){
	var id 		=	geiGet('id',false);
	var shuju	=	{'id':id};
	var dizhi	=	'/def/Yanshou/yancount';
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
	
	if( !data.data.Id ){
		tishi(kongtishi);
		cl();
		return false;
	}
	
	var data = data.data;
	
	var sheng	=	data.Province;
	var shi		=	data.City;
		shi		=	shi.replace('省级质监员','');
	
	document.getElementById("quyu").innerHTML = sheng + shi + '防办';
	document.getElementById("dengluzhanghao").innerHTML = data.UserMobile;
	document.getElementById("lianxiren").innerHTML = data.ContactUser;
	document.getElementById("lianxidianhua").innerHTML = data.ContactTel;
	document.getElementById("lianxidizhi").innerHTML = data.Address;
	document.getElementById("yanshoushuliang").innerHTML = data.yancount;
	
	if( data.isyan == 1 ){
		document.getElementById("shezhiquanxian").innerText = '允许验收';
		document.getElementById("shezhiquanxian").classList.add('yunxuyanshou');
	}else{
		document.getElementById("shezhiquanxian").innerText = '禁止验收';
		document.getElementById("shezhiquanxian").classList.add('jinzhiyanshou');
	}
	
	cl();

}

function yanshoujilu(){
	var id		=	geiGet('id',false);
	var op 		=	{'name':'yanshoujilu-w','html':'yanshoujilu-w.html?id='+id};
	
	ow(op);
}

function yanshouzhuangtai(dom){
	
	var id		=	geiGet('id',false);
	
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