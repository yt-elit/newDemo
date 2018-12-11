apiready = function(){
	gei();
}

function gei(){
	
	document.getElementById("list-box").innerHTML	=	'';
	document.getElementById("page").innerHTML	=	'';
	
	var id		=	geiGet('id',false);
	var shuju	=	{'id':id};
	var dizhi	=	'/def/Yanshou/yan_log';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
}

function chuli(data){
	
	if( data.code !=200 ){
		tishi(data.msg);
		cl();
		return false;
	}
	if( data.data.list < 1 ){
		tishi(kongtishi);
	}
	
	var list	=	{};
		list.data	=	data.data.list;
	var html	=	template.render('list-tp',list);
	document.getElementById("list-box").innerHTML = html;
	
	document.getElementById("page").innerHTML	=	data.data.app_page_html;
	
	cl();
}

function fanye(id){
	var page	=	arguments[0]?id:0;
	per_page = page;

	gei();
}