apiready = function(){
	gei();
}

function gei(){
	var nianfen		=	geiGet('nianfen',false);
	var id	=	geiGet('id',false);
	
	var shuju	=	{'year':nianfen,'id':id};
	var dizhi	=	'/def/DataCount/province_user';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
}

function chuli(data){
	
	cl();
	var list	=	{};
		list.data	=	data.data.areainfo;
	
	var html	=	template.render('list-tp',list);
	document.getElementById("list-box").innerHTML = html;
}

function shujutongjichangjia3(shengId){
	var nianfen	=	geiGet('nianfen',false);
	
		id	=	geiGet('id',false);
	
	var op = {name:'shujutongjichangjia3-w',html:'shujutongjichangjia3-w.html?shengId='+shengId+'&nianfen='+nianfen+'&id='+id};
	ow(op);
}

