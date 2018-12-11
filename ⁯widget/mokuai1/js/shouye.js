var is_dibula=false;
var show_tishi = '';

session('app_name','北皋楼外楼');

if( sysType == 'wx' ){
	_init();
}else{
	//app准备成功
	apiready = function(){
		
		_init();
		
	}
}



//获取接口参数
function _init(){
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=goods_class&gc_id=1&show_banner=1';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
}

//处理返回数据
function _handle(t){
	
	var data = {};
		data.data = t.class_list;
		
		session('app_name',t.app_name);
		session('lanmu_show',t.lanmu_show);
	$('.logo-title').text(t.app_name);
	
	var html = template.render('list-fenlei',data);//渲染HTML
	document.getElementById("fenlei-box").innerHTML = html;
	
	var banner = {};
		banner.data = t.shouyegonggao;
	var html = template.render('gonggao-tp',banner);//渲染HTML
	document.getElementById("gonggao-box").innerHTML = html;
	
	
	var swiper = new Swiper('.swiper-container', {
		slidesPerView: 2,
	  autoplay: {
	    delay: 3000,
	    disableOnInteraction: false,
	  },
      direction: 'vertical',
      loop : true,
    });
	
	var banner = {};
		banner.data = t.banner_list;
	
	var html = template.render('banner-list',banner);//渲染HTML
	document.getElementById("banner-list-box").innerHTML = html;
	
	//	不加轮播图不动
	var slider	=	mui("#silid");
	slider.slider({
		interval: 10000
	});
	
	get_list();
}



//触发翻页事件
function fanye(){
	window.onscroll = function(fn){
		var i = $(window).scrollTop();
		
		if( i > 100 ){
			$('#fanhuidingbu').show();
		}else{
			$('#fanhuidingbu').hide();
		}
		
		
		
		if(is_dibula){
			return;
		}
	　　if( !_dibu() ){
			cur_page = cur_page + 1;
			return;
	　　}
		if( show_tishi !='' ){
			tishi(show_tishi);
			show_tishi = '';
			is_dibula = true;
			return false;
		}
		//翻页逻辑代码
		curpage++;
		get_list();
	};
}



/*
 * 打开闲置社区
 */
function xianzhi(){
	api.execScript({
	    name: 'root',
	    script: 'dakaishequershou();'
	});
}




msx_shanglashuaxinweizhi = 0;//下拉刷新的条件位置,必须是0,即顶部
msx_shanglashuaxinweizhi_start_y=0;//下拉刷新的起始位置
msx_shanglashuaxin_shangxia_type = 0;//实际下拉高度
msx_shanglashuaxin_is_ok = false;//是否可以触发
msx_shanglashuaxin_tupian_top = -75;//图片默认隐藏高度
msx_shanglashuaxin_tupian_zuida_top = 100;//图片最大下拉高度
msx_shanglashuaxin_is_loading = false;//正在加载中...
$(window).on('scroll',function(){
	msx_shanglashuaxinweizhi = $(this).scrollTop();
})
$(window).on("touchstart", function(e) {
	msx_shanglashuaxinweizhi_start_y = e.originalEvent.changedTouches[0].pageY;
	if( msx_shanglashuaxinweizhi == 0 && !msx_shanglashuaxin_is_loading ){
		msx_shanglashuaxin_is_ok = true;
	}
});
$(window).on("touchmove", function(e) {
	var msx_shanglashuaxinweizhi_move_y = e.originalEvent.changedTouches[0].pageY;//正在移动的位置
	msx_shanglashuaxin_shangxia_type = msx_shanglashuaxinweizhi_move_y - msx_shanglashuaxinweizhi_start_y;
	if( msx_shanglashuaxin_shangxia_type > 0 && msx_shanglashuaxinweizhi == 0 && msx_shanglashuaxin_is_ok && !msx_shanglashuaxin_is_loading ){
		
		if( msx_shanglashuaxin_shangxia_type < msx_shanglashuaxin_tupian_zuida_top ){
			$('#xialashuaxin-box').css('top',msx_shanglashuaxin_shangxia_type);
		}
	}else if(!msx_shanglashuaxin_is_loading){
		msx_shanglashuaxin_is_ok = false;
		$('#xialashuaxin-box').css('top',msx_shanglashuaxin_tupian_top+'px');
	}
});
$(window).on("touchend", function(e) {
	if( msx_shanglashuaxin_shangxia_type >= msx_shanglashuaxin_tupian_zuida_top && msx_shanglashuaxin_is_ok && !msx_shanglashuaxin_is_loading ){
		msx_shanglashuaxin_is_loading = true;
		$('#xialashuaxin-box img').attr('src','../image/xialashuaxin-dongtai.gif');
		
		setTimeout(function() {
			msxshanglashuaxinchushihua();
		}, 2000);
		
	}else if(!msx_shanglashuaxin_is_loading){
		$('#xialashuaxin-box').css('top',msx_shanglashuaxin_tupian_top+'px');
	}
})
function msxshanglashuaxinchushihua(){
	curpage = 1;
	is_dibula = false;
	_init();
	
	var msx_shanglashuaxin_suofangbili = 1;
	var msx_shanglashuaxin_suofang_id = setInterval(function() {
		
		if( msx_shanglashuaxin_suofangbili <= 0.1 ){
			clearInterval(msx_shanglashuaxin_suofang_id);
			msx_shanglashuaxin_is_loading = false;
			msx_shanglashuaxin_is_ok = false;
			$('#xialashuaxin-box').css('top',msx_shanglashuaxin_tupian_top+'px');
			$('#xialashuaxin-box img').attr('src','../image/xialashuaxin-moren.png');	
			$('#xialashuaxin-box img').css('transform','scale(1)');
			$('#xialashuaxin-box img').css('-webkit-transform','scale(1)');
			return false;
		}
		msx_shanglashuaxin_suofangbili = msx_shanglashuaxin_suofangbili - 0.1;
		
		$('#xialashuaxin-box img').css('transform','scale('+msx_shanglashuaxin_suofangbili+')');
		$('#xialashuaxin-box img').css('-webkit-transform','scale('+msx_shanglashuaxin_suofangbili+')');
	}, 24);

}

/*
 * 获取推荐商品列表
 */
function get_list() {
	var param = {};
    param.is_tuijian = 1;
	param.key = geiGet('key',false);
	param.curpage = curpage;
	param.page = 6;
	

    $.getJSON(ApiUrl + '/index.php?act=goods&op=goods_list', param, function(result){
    	if(!result) {
    		result = [];
    		result.datas = [];
    		result.datas.goods_list = [];
    	}
        
        var data = {};
        	data.data = result.datas.goods_list;
        
        var html = template.render('list-tp', data);
        
        if( curpage == 1 ){
        	$("#list-box").html(html);
        	setTimeout(function() {
        		fanye();//绑定翻页事件
        	}, 10);
        }else{
        	$("#list-box").append(html);
        }
        
        if( result.hasmore == false ){
        	show_tishi = '无更多内容!';
        }
        
    });
}

/*
 * 打开商品详情
 */
function open_shangpinxiangqing(goods_id){
	shangpinxiangqing(goods_id)
}

function fanhuidingbu(){
	$(window).scrollTop(0);
}