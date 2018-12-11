isLogIn();

apiready	=	function(){
	ms();
	shouye();
//	getHome();
//	xialashuaxin();
	systemType();
}

function shouye(){
	var op = {};
	op.name = 'huodong-f';
	op.html	=	hUrl + '/app/index.php?i=1&c=entry&do=active&m=hulu_like';
	op.yh	=	0;
	op.mgb	=	50;
	
	of(op);
}

function getHome(){
	var	dizhi		=	'/def/Homepage/index';
	var op		=	{dizhi:dizhi,func:'setHome'};
	ajax(op);
}

var jianyilist;
function setHome(rs){
	if( rs.code != 200 ){
		return false;
	}
	var data		=	rs.data;
	
	var bannerhtml	=	template.render( 'banner-list-tp' , data );
	document.getElementById("banner-list").innerHTML	=	bannerhtml;
	document.getElementById("gonggaogongshi").innerHTML	=	data.notice;
	document.getElementById("gonggaogongshi").setAttribute('onclick','neirongxiangqing('+data.notice_id+')');
	
	
	var jianyihtml	=	template.render( 'jianyi-list-tp' , data );
	document.getElementById("jianyi-list").innerHTML	=	jianyihtml;
	jianyilist		=	data.yijian;
	
	//	不加轮播图不动
	var slider	=	mui("#silid");
	slider.slider({
		interval: 2000
	});
	
	ms();
}

//发表建议
function jianyi(){
	mui.prompt('','','为了更好，请您吐槽',['确认','取消'],function(e){
		if(e.index == 0){
			
			var jianyineirong	=	document.getElementById("jianyineirong").value;
			var	jianyichangdu	=	jianyineirong.length;
			if( jianyichangdu < 10 ){
				mui.alert('','内容太少了');
			}else{
				tijiaojianyi(jianyineirong);
			}
		}
	},'div');
	document.querySelector('.mui-popup-input').innerHTML='<textarea id="jianyineirong" row="2" placeholder="输入吐槽内容"></textarea>';
}

//提交建议
function tijiaojianyi(neirong){
	var dizhi	=	'/def/Homepage/tucao';
	var shuju	=	{'content':neirong};
	var func	=	'tijiaochenggong';
	var op		=	{'dizhi':dizhi,'shuju':shuju,'func':func};
	
	ajax(op);
}
//提交成功
function tijiaochenggong(data){
	mui.toast(data.msg);
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

//手动搜索
function sousuo(){
	
	var neirong	=	document.getElementById("sousuoneirong").value;
	
	if( neirong.length != 15 ){
//		mui.alert('','请输入15位的编码！');
		tishi('请输入15位的编码！');
		return false;
	}
	
	youkechaxun(neirong);
	
}


//扫码
function saoma(){
	var scanner = api.require('scanner');
	scanner.open(function(ret, err) {
	    if (ret.eventType == 'success') {
	        
	        var neirong	=	geiGet( 'keywords' , ret.msg);
	        
	        youkechaxun(neirong);
	    }
	});
}

//跳转到查询页面
function youkechaxun(search){
//	var op		=	{'name':'youkechaxun-w','html':'youkechaxun-w.html?search='+search};
	
	ow(op);
}

function isLogIn(){
	var isLogIn		=	session('isLogIn');
	
	if( isLogIn == 1 ){
//		document.getElementById("denglu").style.display	=	'none';
	}else{
//		document.getElementById("denglu").style.display	=	'block';
	}
}


//统一已登录脚本操作
function login(){
	
}


function jianyixiangqing(key){
	mui.alert(jianyilist[key].Title,' ');
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
		getHome();
	});
}

function systemType(){
	var systemType = api.systemType;
	session('systemType',systemType);
}
