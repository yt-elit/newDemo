apiready = function(){
	gei();
}

function gei(){
	var nianfen		=	geiGet('nianfen',false);
	var shengname	=	geiGet('sheng',false);
	
		shengname	=	decodeURI( decodeURI( shengname ) );
	var shuju	=	{'year':nianfen,'Area':shengname};
	var dizhi	=	'/def/DataCount/rfb_city';
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

function shujutongjiquyu3(sheng){
	var nianfen	=	geiGet('nianfen',false);
	
		shengname	=	encodeURI( encodeURI( sheng ) );
	
	var op = {name:'shujutongjiquyu3-w',html:'shujutongjiquyu3-w.html?sheng='+shengname+'&nianfen='+nianfen};
	ow(op);
}

