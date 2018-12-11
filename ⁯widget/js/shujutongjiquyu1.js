apiready = function(){
	gei();
}

function gei(){
	var nianfen	=	geiGet('nianfen',false);
	var shuju	=	{'year':nianfen};
	var dizhi	=	'/def/DataCount/rfb_area';
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

function shujutongjiquyu2(sheng){
	var nianfen	=	geiGet('nianfen',false);
	
		shengname	=	encodeURI( encodeURI( sheng ) );
	
	var op = {name:'shujutongjiquyu2-w',html:'shujutongjiquyu2-w.html?sheng='+shengname+'&nianfen='+nianfen};
	ow(op);
}

