apiready = function(){
	ms();
	gei();
}
function gei(){
	
	var touxiang	=	session('touxiang');
	document.getElementById("touxiang").src	=	touxiang;
	document.getElementById("mingzi").innerText	=	session('lianxiren');
	document.getElementById("zhiwei").innerText	=	session('zhiwei');
	document.getElementById("lianxidianhua").innerText	=	session('lianxidianhua');
}

function bianjiziliao(){
	var op = {name:'bianjiziliao-w',html:'bianjiziliao-w.html'};
	ow(op);
}

function yanshoujilu(){
	var op = {name:'yanshoujilu-w',html:'yanshoujilu-w.html'};
	ow(op);
}
function xiugaimima(){
	var op = {name:'xiugaimima-w',html:'xiugaimima-w.html'};
	ow(op);
}
function zhijianyuanliebiao(){
	var op = {name:'zhijianyuanliebiao1-w',html:'zhijianyuanliebiao1-w.html'};
	ow(op);
}
function fangbanliebiao1(){
	var op = {name:'fangbanliebiao1-w',html:'fangbanliebiao1-w.html'};
	ow(op);
}
function tianjiazhijianyuan(){
	var op = {name:'tianjiazhijianyuan-w',html:'tianjiazhijianyuan-w.html'};
	ow(op);
}
function yanshouchanpin(){
	
	var wangluo	=	wangluozhuangtai();
	
	if( wangluo ){
		var op = {name:'yanshouchanpin-w',html:'yanshouchanpin-w.html'};
		ow(op);
	}else{
		huancunbianma();
	}
	
}
function huancunbianma(){
	var op = {name:'huancunbianma-w',html:'huancunbianma-w.html'};
	ow(op);
}

function shujutongjiquyu1(){
	var op = {name:'shujutongjiquyu1-w',html:'shujutongjiquyu1-w.html?nianfen=2017'};
	ow(op);
}

function shujutongjichangjia1(){
	var op = {name:'shujutongjichangjia1-w',html:'shujutongjichangjia1-w.html?nianfen=2017'};
	ow(op);
}
