apiready = function(){
	gei();
}

function gei(){
	var nianfen	=	geiGet('nianfen',false);
	var shuju	=	{'year':nianfen};
	var dizhi	=	'/def/DataCount/rfb_company';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
}

function chuli(data){
	
	cl();
	var list	=	{};
		list.data	=	data.data.userinfo;
	
	var html	=	template.render('list-tp',list);
	document.getElementById("list-box").innerHTML = html;
}

function shujutongjichangjia2(id,title){
	
	session('shujutongjilinshiqiyemingcheng',title);
	
	var nianfen	=	geiGet('nianfen',false);
	var op = {name:'shujutongjichangjia2-w',html:'shujutongjichangjia2-w.html?id='+id+'&nianfen='+nianfen};
	ow(op);
}

