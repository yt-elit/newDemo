apiready = function(){
	getNeirongxiangqing();
}

function getNeirongxiangqing(){
	var dizhi	=	'/def/message/detail';
	var id		=	geiGet('id',false);
	var shuju	=	{'id':id};
	var func	=	'setNeirongxiangqing';
	var op		=	{'dizhi':dizhi,'shuju':shuju,'func':func};
	
	ajax(op);
	ol();
}

function setNeirongxiangqing(data){
	
	cl();
	
	var data	=	data.data;
	
	document.getElementById("biaoti").innerHTML		=	data.title;
	document.getElementById("time").innerHTML		=	data.addtime;
	document.getElementById("neirong").innerHTML	=	data.content;
}
