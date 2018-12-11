apiready = function(){
	gei();
}
function gei(){
	
	document.getElementById("duanbiaoti").innerText	=	session('sheng') + '防办';
	
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
	sheng = encodeURI( encodeURI( sheng ) );
	var op = {name:'zhijianyuanliebiao2-w',html:'zhijianyuanliebiao2-w.html?sheng='+sheng};
	ow(op);
}
function fangbanliebiao1(){
	if( !istiao() ){
		return false;
	}
	var sheng	=	session('sheng');
	sheng = encodeURI( encodeURI( sheng ) );
	
	var op = {name:'fangbanliebiao2-w',html:'fangbanliebiao2-w.html?sheng='+sheng};
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


function shujutongjiquyu2(){
	var sheng = encodeURI( encodeURI( session('sheng') ) );
	var op = {name:'shujutongjiquyu2-w',html:'shujutongjiquyu2-w.html?nianfen=2017&sheng='+sheng};
	ow(op);
}

function shujutongjichangjia1(){
	var op = {name:'shujutongjichangjia1-w',html:'shujutongjichangjia1-w.html?nianfen=2017'};
	ow(op);
}
