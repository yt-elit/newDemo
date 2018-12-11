apiready = function(){
	gei();
}
var linshishengname;
function gei(){
	var sheng		=	geiGet('sheng',false);
		
		sheng	=	decodeURI (decodeURI( sheng ));
		
		linshishengname	=	sheng;
		
	var shuju	=	{'sheng':sheng};
	var dizhi	=	'/def/Fangban/rfb_zjy_pronvice';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
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

function zhijianyuanliebiao3(name,Pid){
	
	
	if( Pid > 0 ){	//	地区
		var shi		=	encodeURI( encodeURI(name) );
	}else{			//	省级
		var shi		=	encodeURI( encodeURI('地级市') );
	}
	var sheng	=	encodeURI( encodeURI( linshishengname ));
	
	var op = {name:'zhijianyuanliebiao3-w',html:'zhijianyuanliebiao3-w.html?sheng='+sheng+'&shi='+shi};
	ow(op);
}
