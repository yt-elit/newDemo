apiready = function(){
	gei();
}

function gei(){
	var dizhi	=	'/def/Fangban/provincefanglist';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func};
	
	ajax(op);
	ol();
}

function chuli(data){
	var html	=	template.render('list-tp',data);
	document.getElementById("list-box").innerHTML = html;
	cl();
}

function chakanfangbanxinxi(id){
	var op = {name:'chakanfangbanxinxi-w',html:'chakanfangbanxinxi-w.html?id='+id};
	ow(op);
}
function fangbanliebiao2(name){
	
	var shengname	=	encodeURI( encodeURI( name ) );
	
	var op = {name:'fangbanliebiao2-w',html:'fangbanliebiao2-w.html?sheng='+shengname};
	ow(op);
}
