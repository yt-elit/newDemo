apiready = function(){
	gei();
}
function gei(){
	
	document.getElementById("duanbiaoti").innerText = session('shi')+'防办';
	
	var touxiang	=	session('touxiang');
	document.getElementById("touxiang").src	=	touxiang;
	document.getElementById("mingzi").innerText	=	session('lianxiren');
	document.getElementById("zhiwei").innerText	=	session('zhiwei');
	document.getElementById("lianxidianhua").innerText	=	session('lianxidianhua');
}

function bianjiziliao(){
	if( !istiao() ){
		return false;
	}
	var op = {name:'bianjiziliao-w',html:'bianjiziliao-w.html'};
	ow(op);
}

function yanshoujilu(){
	if( !istiao() ){
		return false;
	}
	var op = {name:'yanshoujilu-w',html:'yanshoujilu-w.html'};
	ow(op);
}
function xiugaimima(){
	var op = {name:'xiugaimima-w',html:'xiugaimima-w.html'};
	ow(op);
}
function zhijianyuanliebiao(){
	if( !istiao() ){
		return false;
	}
	var sheng	=	session('sheng');
	var shi		=	session('shi');
	
		sheng	=	encodeURI( encodeURI( sheng ) );
		shi	=	encodeURI( encodeURI( shi ) );
	
	var op = {name:'zhijianyuanliebiao3-w',html:'zhijianyuanliebiao3-w.html?sheng='+sheng+'&shi='+shi};
	ow(op);
}
function fangbanliebiao1(){
	if( !istiao() ){
		return false;
	}
	var id	=	session('id');
	var op = {name:'fangbanliebiao2-w',html:'fangbanliebiao2-w.html?id='+id};
	ow(op);
}
function tianjiazhijianyuan(){
	if( !istiao() ){
		return false;
	}
	var op = {name:'tianjiazhijianyuan-w',html:'tianjiazhijianyuan-w.html'};
	ow(op);
}
function yanshouchanpin(){
	if( !istiao() ){
		return false;
	}
	
	var wangluo	=	wangluozhuangtai();
	
	if( wangluo ){
		var op = {name:'yanshouchanpin-w',html:'yanshouchanpin-w.html'};
		ow(op);
	}else{
		huancunbianma();
	}
	
}
function huancunbianma(){
	if( !istiao() ){
		return false;
	}
	var op = {name:'huancunbianma-w',html:'huancunbianma-w.html'};
	ow(op);
}

function istiao(){
	var type	=	session('ismodifypass');
	if( type == 0 ){
		xiugaimima();
		return false;
	}else{
		return true;
	}
}

function shujutongjiquyu3(){
	var sheng = encodeURI( encodeURI( session('shi') ) );
	var op = {name:'shujutongjiquyu3-w',html:'shujutongjiquyu3-w.html?nianfen=2017&sheng='+sheng};
	ow(op);
}