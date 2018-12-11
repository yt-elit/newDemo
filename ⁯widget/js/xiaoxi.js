document.getElementById("tianchong").style.height	=	document.getElementById("header").offsetHeight + 'px';

//是否全选;
var isquanxuan	=	0;

//是否编辑模式
var isbianjimoshi = 0;

var page_size;

apiready = function(){
	gei();
	xialashuaxin();
}

function gei(){
	
	document.getElementById("list-box").innerHTML = '';
	
	var dizhi	=	'/def/message/index';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func};
	
	ajax(op);
}

function chuli(data){
	
	cl();
	if( per_page == 0 ){
		zanwuxianshi();
	}
	if( data.code != 200 ){
		return false;
	}
	
	if( data.data.info.length < 1 ){
		return false;
	}
	
	var list	=	{};
		list.data	=	data.data.info;
	
	var listHtml	=	template.render( 'list-tp' , list );
	
	document.getElementById("list-box").innerHTML	=	listHtml;
	
	page_size = data.data.pagesize;
	
	zanwuxianshi();
}


//点击看详情
function xiaoxineirong(dom,id){
	if( isbianjimoshi == 1 ){
		return false;
	}
	
	if( id == 0 ){
		return false;
	}
	
	var op = {name:'xiaoxineirong-w',html:'xiaoxineirong-w.html?id='+id};
	
	dom.classList.add('yidu');
	
	ow(op);
}

function bianji(){
	isbianjimoshi = 1;
	
	document.getElementById("bianji").style.display = 'none';
	document.getElementById("title").style.display	=	'none';
	document.getElementById("quanxuan").style.display = 'inline-block';
	document.getElementById("quxiao").style.display	=	'inline-block';
	document.getElementById("shanchu").style.display	=	'inline-block';
	
	var list	=	document.querySelectorAll('.mui-table-view-cell');
	for (var i = 0 ; i < list.length ; i++) {
		list[i].classList.add('bianjimoshi');
	}
	
}

function quxiao(){
	
	isbianjimoshi = 0;
	isquanxuan = 0;
	document.getElementById("bianji").style.display = 'inline-block';
	document.getElementById("title").style.display	=	'inline-block';
	document.getElementById("quanxuan").style.display = 'none';
	document.getElementById("quxiao").style.display	=	'none';
	document.getElementById("shanchu").style.display	=	'none';
	
	var list	=	document.querySelectorAll('.mui-table-view-cell');
	for (var i = 0 ; i < list.length ; i++) {
		list[i].classList.remove('bianjimoshi');
	}
	
	//	取消已选择按钮
	var yixuanze	=	document.querySelectorAll('input[name=radio1]:checked');
	
	for (var i = 0 ; i < yixuanze.length ; i++) {
		yixuanze[i].checked = false;
	}
	
	xuanzela();
}

function xuanzela(){
	var shuliang	=	xuanzeshu();
	document.getElementById("shuliang").innerText	=	shuliang;
}

function xuanzeshu(){
	var shuliang	=	document.querySelectorAll('input[name=radio1]:checked').length;
	return shuliang;
}


function quanxuan(){
	var yixuanze	=	document.querySelectorAll('input[name=radio1]');
	
	if( !isquanxuan ){
		isquanxuan = 1;
		for (var i = 0 ; i < yixuanze.length ; i++) {
			yixuanze[i].checked = true;
		}
	}else{
		isquanxuan = 0;
		for (var i = 0 ; i < yixuanze.length ; i++) {
			yixuanze[i].checked = false;
		}
	}
	xuanzela();
}

function shanchu(){
	var shuliang	=	xuanzeshu();
	
	if( shuliang == 0 ){
		return false;
	}
	
	tijiao();
}


function tijiao(){
	
	var yixuanze	=	document.querySelectorAll('input[name=radio1]:checked');
	
	var arr	=	[];
	
	for (var i = 0 ; i < yixuanze.length ; i++) {
		arr[i] = yixuanze[i].value;
	}
	
	ids	=	arr.join(',');
	
	var shuju	=	{'ids':ids};
	var dizhi	=	'/def/message/delete';
	var func	=	'tijiaochuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol('正在删除...');
}

function tijiaochuli(data){
	cl();
	if( data.code != 200 ){
		return false;
	}
	
	//更新消息数量
	api.execScript({
	    name: 'root',
	    script: 'geixiaoxi();'
	});
	
	quxiao();
	yichuliebiao(data.data);
	var shu	=	document.querySelectorAll('.mui-table-view-cell').length;
	zanwuxianshi();
	if( shu == 0 ){
		gei();
	}
}

function yichuliebiao(data){
	for (var i = 0 ; i < data.length ; i ++) {
		document.getElementById("xiaoxi"+data[i]).remove();
	}
}

function zanwuxianshi(){
	var shu	=	document.querySelectorAll('.mui-table-view-cell').length;
	
	if( shu > 0 ){
		document.getElementById("zanwuxiaoxi").style.display = 'none';
	}else{
		document.getElementById("zanwuxiaoxi").style.display = 'block';
	}
}


/* 滚动条到底部 */
function getScrollTop(){
　　var scrollTop = 0, bodyScrollTop = 0, documentScrollTop = 0;
　　if(document.body){
　　　　bodyScrollTop = document.body.scrollTop;
　　}
　　if(document.documentElement){
　　　　documentScrollTop = document.documentElement.scrollTop;
　　}
　　scrollTop = (bodyScrollTop - documentScrollTop > 0) ? bodyScrollTop : documentScrollTop;
　　return scrollTop;
}
function getScrollHeight(){
　　var scrollHeight = 0, bodyScrollHeight = 0, documentScrollHeight = 0;
　　if(document.body){
　　　　bodyScrollHeight = document.body.scrollHeight;
　　}
　　if(document.documentElement){
　　　　documentScrollHeight = document.documentElement.scrollHeight;
　　}
　　scrollHeight = (bodyScrollHeight - documentScrollHeight > 0) ? bodyScrollHeight : documentScrollHeight;
　　return scrollHeight;
}
function getWindowHeight(){
　　var windowHeight = 0;
　　if(document.compatMode == "CSS1Compat"){
　　　　windowHeight = document.documentElement.clientHeight;
　　}else{
　　　　windowHeight = document.body.clientHeight;
　　}
　　return windowHeight;
}

window.onscroll = function(){
	
	if( isbianjimoshi == 1 ){
		return false;
	}
	
　　if( getScrollTop() + getWindowHeight() == getScrollHeight() ){
　　　　fanye();
　　}
};


/* /滚动条到底部 */



function fanye(){
	
	per_page =  per_page + page_size;
	
	var dizhi	=	'/def/message/index';
	var func	=	'fanyechuli';
	var op		=	{'dizhi':dizhi,'func':func};
	
	ajax(op);
	ol();
}

function fanyechuli(data){
	cl();
	if( data.code != 200 ){
		tishi(kongtishi);
		return false;
	}
	
	if( data.data.info.length < 1 ){
		tishi(kongtishi);
		return false;
	}
	
	var list	=	{};
		list.data	=	data.data.info;
	
	var listHtml	=	template.render( 'list-tp' , list );
	
	document.querySelector(".liebiaotianchong").remove();
//	document.getElementById("list-box").innerHTML	=	document.getElementById("list-box").innerHTML + listHtml;
	$api.append(document.getElementById("list-box") , listHtml );
	
}


function shezhiyidu(id){
	
	setTimeout(function() {
		if( id == 0 ){
			return false;
		}
		
		document.getElementById("xiaoxi"+id).classList.add('yidu');
	}, 2000);
	
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
		if( isbianjimoshi == 1 ){
			
		}else{
			//更新消息数量
			api.execScript({
			    name: 'root',
			    script: 'geixiaoxi();'
			});
			per_page = 0;
			gei();
		}
	});
}
