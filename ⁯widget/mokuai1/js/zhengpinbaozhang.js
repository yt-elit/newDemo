var id = geiGet('id',false);

if( sysType == 'wx' ){
	_init();
}else{
	//app准备成功
	apiready = function(){
		_init();
	}
}
//var is_dibula = false;
//fanye();//绑定翻页事件
//获取接口参数
function _init(){
	var shuju	=	{id:id};
	var dizhi	=	ApiUrl + '/index.php?act=gongneng&op=zhengpinbaozhang';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
	
	$('#zixundianhua').attr('href','tel:'+t.zixundianhua);
	
	var data = {};
		data.data = t.list;
	
	var html = template.render('menu-tp',data);
	
	$('#menu').html(html);
	
	var html = template.render('page-tp',data);
	
	$('#page-box').html(html);
	
	
	$('.menu-list').on('click',function(){
		var i = $(this).index();
		$(this).addClass('active').siblings().removeClass('active');
		
		$('.content').hide();
		$('.page'+i).show();
		
	});
	
	
	
//	$('#content').html(t.info.article_content);
	
	
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

