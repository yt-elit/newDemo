apiready = function(){
	gei();
}

function gei(){
	var dizhi	=	'/def/Fangban/rfb_zjy_pronvice_sheng';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func};
	
	ajax(op);
	ol();
}

function chuli(data){
	
	cl();
	var list	=	{};
		list.data	=	data.data.cityinfo;
	
	var html	=	template.render('list-tp',list);
	document.getElementById("list-box").innerHTML = html;
}

function zhijianyuanliebiao2(sheng){
	
		shengname	=	encodeURI( encodeURI( sheng ) );
	
	var op = {name:'zhijianyuanliebiao2-w',html:'zhijianyuanliebiao2-w.html?sheng='+shengname};
	ow(op);
}
