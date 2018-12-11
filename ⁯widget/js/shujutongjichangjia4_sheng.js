apiready = function(){
	gei();
}

function gei(){
	
	document.getElementById("list-box").innerHTML	=	'';
	document.getElementById("page").innerHTML	=	'';
	
	var nianfen		=	geiGet('nianfen',false);
	var id			=	geiGet('id',false);
	var shengId		=	geiGet('shengId',false);
	
	var shuju	=	{'year':nianfen,'id':id,'cityid':shengId};
	var dizhi	=	'/def/DataCount/shengGetShiDetail';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
}

function chuli(data){
	
	cl();
	var list	=	{};
		list.data	=	data.data.orderinfo;
	
	if( !list.data.length ){
		tishi(kongtishi);
		return false;
	}
	
	var html	=	template.render('list-tp',list);
	document.getElementById("list-box").innerHTML = html;
	
	document.getElementById("page").innerHTML	=	data.data.app_page_html;
	
}

function shujutongjiquyu3(sheng){
	var nianfen	=	geiGet('nianfen',false);
	
		shengname	=	encodeURI( encodeURI( sheng ) );
	
	var op = {name:'shujutongjiquyu3-w',html:'shujutongjiquyu3-w.html?sheng='+shengname+'&nianfen='+nianfen};
	ow(op);
}

function fanye(id){
	var page	=	arguments[0]?id:0;
	per_page = page;

	gei();
}