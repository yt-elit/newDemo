apiready = function(){
	gei();
}

function gei(){
	var nianfen		=	geiGet('nianfen',false);
	var id		=	geiGet('id',false);
	var shengId		=	geiGet('shengId',false);
	
	var shuju	=	{'year':nianfen,'id':id,'areaid':shengId};
	var dizhi	=	'/def/DataCount/city_user';
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

function shujutongjichangjia4(shengId){
	var nianfen	=	geiGet('nianfen',false);
	
		id	=	geiGet('id',false);
	
	var op = {name:'shujutongjichangjia4-w',html:'shujutongjichangjia4-w.html?shengId='+shengId+'&nianfen='+nianfen+'&id='+id};
	ow(op);
}

