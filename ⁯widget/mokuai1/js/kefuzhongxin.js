var is_dibula = false;
if( sysType == 'wx' ){
	_init();
}else{
	//app准备成功
	apiready = function(){
		_init();
	}
}
//fanye();//绑定翻页事件
//获取接口参数
function _init(){
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=article&op=kefuzhongxin';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
	
	var data = {};
		data.data = t.hot_list;
	
	var html = template.render('remen-tp',data);//渲染热门
	
	$('#remen-box').html(html);
	
		data.data = t.list;
	
	var html = template.render('wenti-tp',data);//渲染热门
	
	$('#wenti-box').html(html);
	
	$('#zixunrexian').attr('href','tel:'+t.zixunrexian);
	
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

