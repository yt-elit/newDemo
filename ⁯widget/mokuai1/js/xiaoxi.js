//app准备成功
apiready = function(){
}
var is_dibula = false;
_init();
//fanye();//绑定翻页事件
//获取接口参数
function _init(){
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=getmsgcount';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
	
	var data = {};
		data = t;
		
	document.getElementById("zan_and_shoucang").innerText = data.zan_and_shoucang;
	document.getElementById("pinglun_and_aite").innerText = data.pinglun_and_aite;
	document.getElementById("guanzhu").innerText = data.guanzhuliang;
	document.getElementById("xitongxiaoxi").innerText = data.xitongxiaoxiliang;
	document.getElementById("sixinliang").innerText = data.sixinliang;
	
	
	api.execScript({
		name : 'root',
	    frameName: 'wode',
	    script: "login();"
	});
	
	
	
//	var data = {};
//		data.data = t;
//	
//	var html = template.render('list-tp',data);//渲染HTML
//	
//	if( curpage == 1 ){
//		$('#list-box').html(html);
//	}else{
//		$('#list-box').append(html);
//	}
//	
//	if( data.data.length < 1 ){
//		is_dibula = true;
//	}
}

/*
 * 轮训
 */
lunxun();
function lunxun(){
	setInterval(function(){
		_init();
	},4444);
}



//触发翻页事件
function fanye(){
	window.onscroll = function(fn){
		if( is_dibula ){
			return false;
		}
	　　if( !_dibu() ){
			return;
	　　}
		//翻页逻辑代码
		
	
	};
}

/*
 * 打开私信
 */
function dakaisixin(){
	msxIm();
//	api.openWin({
//	    name: 'msxIm',
//	    url: 'widget://im_win.html', 
//	   	animation: {
//			type: 'movein', //动画类型（详见动画类型常量）
//			subType: donghua, //动画子类型（详见动画子类型常量）
//			duration: frame_time //动画过渡时间，默认300毫秒
//		},
//	});
}
