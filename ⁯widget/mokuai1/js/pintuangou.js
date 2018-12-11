//app准备成功
apiready = function(){



	
	
	
	
}
_init();
fanye();//绑定翻页事件
//获取接口参数
function _init(){
	var shuju	=	{'is_pintuan':1};
	var dizhi	=	ApiUrl + '/index.php?act=goods&op=goods_list';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
	
	var data = {};
		data.data = t.goods_list;
	
	var html = template.render('list-tp',data);//渲染HTML
	$('#list-box').append(html);
	
	if( data.data.length == 0 ){
		tishi('暂无拼团信息！');
	}
	
}



//触发翻页事件
function fanye(){
	window.onscroll = function(fn){
		var hh = getScrollTop();
		console.log(hh);
	　　if( !_dibu() ){
			return;
	　　}
		//翻页逻辑代码
		curpage++;
		_init();
	
	};
}

