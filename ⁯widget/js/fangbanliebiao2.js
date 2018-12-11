apiready = function(){
	gei();
}

function gei(){
	var sheng		=	geiGet('sheng',false);
		sheng	=	decodeURI( decodeURI( sheng ) );
	var shuju	=	{'province':sheng};
	var dizhi	=	'/def/Fangban/cityfanglist';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
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

function yanshoujilu(id){
	var op 		=	{'name':'yanshoujilu-w','html':'yanshoujilu-w.html?id='+id};
	
	ow(op);
}
