apiready = function(){
	gei();
	xialashuaxin();
}

function gei(){
	var dizhi	=	'/def/info/index';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func};
	
	ajax(op);
}

function chuli(data){
	
	if( data.code != 200 ){
		return false;
	}
	
	var data	=	data.data;
	
	document.getElementById("gonggaogongshi").setAttribute('onclick', isType( data[4].type ) +'('+data[4].id+')' );
	
	
	document.getElementById("zuzhijiagou").setAttribute('onclick', isType( data[0].type ) +'('+data[0].id+')' );
	
	
	document.getElementById("qiyechengnuoshu").setAttribute('onclick', isType( data[1].type ) +'('+data[1].id+')' );
	
	
	document.getElementById("zilvgongyue").setAttribute('onclick', isType( data[2].type ) +'('+data[2].id+')' );
	
	
	document.getElementById("guanyuxiehui").setAttribute('onclick', isType( data[3].type ) +'('+data[3].id+')' );
	
	
	document.getElementById("hangyezixun").setAttribute('onclick', isType( data[5].type ) +'('+data[5].id+')' );
	
	
	document.getElementById("shichangweiquan").setAttribute('onclick', isType( data[6].type ) +'('+data[6].id+')' );
	
	
	document.getElementById("falvfagui").setAttribute('onclick', isType( data[7].type ) +'('+data[7].id+')' );
	
	
	document.getElementById("jiahuozhenbie").setAttribute('onclick', isType( data[8].type ) +'('+data[8].id+')' );
	
	
	document.getElementById("dajialiucheng").setAttribute('onclick', isType( data[9].type ) +'('+data[9].id+')' );
	
	document.getElementById("yijianjianyi").setAttribute('onclick', isType( data[10].type ) +'('+data[10].id+')' );
	
	ms();

}

function isType(id){
	if( id == 2 ){
		return 'xinxiliebiao';
	}else{
		return 'neirongxiangqing';
	}
}

//点击看信息列表
function xinxiliebiao(id){
	if( id == 0 ){
		return false;
	}
	
	var op = {name:'xinxiliebiao-w',html:'xinxiliebiao-w.html?id='+id};
	
	ow(op);
}

//点击看详情
function neirongxiangqing(id){
	
	if( id == 0 ){
		return false;
	}
	
	var op = {name:'xinxineirong-w',html:'xinxineirong-w.html?id='+id};
	
	ow(op);
}

//举报中心
function jubaozhongxin(){
	var op = {name:'jubaozhongxin-w',html:'jubaozhongxin-w.html'};
	
	ow(op);
}


function xialashuaxin(){
	api.setRefreshHeaderInfo({
	    loadingImg: 'https://www.baidu.com/img/bd_logo1.png',
	    bgColor: '#ccc',
	    textColor: '#fff',
	    textDown: '下拉刷新...',
	    textUp: '松开刷新...',
	    textLoading: '加载中...',
	    showTime : false,
	}, function(ret, err) {
	    //在这里从服务器加载数据，加载完成后调用api.refreshHeaderLoadDone()方法恢复组件到默认状态
		api.refreshHeaderLoadDone();
		gei();
	});
}