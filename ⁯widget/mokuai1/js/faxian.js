var fenlei_id = geiGet('fenlei_id',false);
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
function _init(type){
	if( type == 1 ){
		curpage=1;
		is_dibula = false;
		$(document).scrollTop(0);
	}
	
	var params = {};

	if(fenlei_id){
		params.class_id = fenlei_id;
	}
	
	var shuju	=	params;
	var dizhi	=	ApiUrl + '/index.php?act=circle_o&op=getlist';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	
	if( curpage != 1 ){
		ol('',1);
	}
	
}

//处理返回数据
function _handle(t){
	cl();
	var data = {};
		data.data = t.list;
	
	var html = template.render('list-tp',data);//渲染HTML
	
	if( curpage == 1 ){
		$('#list-box').html(html);
	}else{
		$('#list-box').append(html);
	}
	
	
	fanye();//绑定翻页事件
	
	
	if( data.data.length < 1 ){
		is_dibula = true;
		tishi('暂无新内容！');
	}
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
		
		if( is_dibula ){
			return false;
		}
	　　if( !_dibu() ){
			return;
	　　}
		//翻页逻辑代码
		curpage++;
		_init();
	
	};
}

/*
 * 点赞
 */
function dianzan(dom){
	window.event.stopPropagation();
	
		if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	
	//点赞样式切换
	var type = $(dom).attr('data-type');
	if( type=='1' ){//撤销点赞
		$(dom).attr('data-type',0);
		$(dom).find('img').attr('src','ziyuan/faxian-zan.png');
		$(dom).next().removeClass('dianzan-text1').addClass('dianzan-text0').text(function(i,e){
			var i = Number(e);
				i = i - 1;
			return i;
		});
	}else{
		$(dom).attr('data-type',1);
		$(dom).find('img').attr('src','ziyuan/faxian-zanactive.png');
		$(dom).next().removeClass('dianzan-text0').addClass('dianzan-text1').text(function(i,e){
			var i = Number(e);
				i = i + 1;
			return i;
		});
	}
	
	var to_member_id = $(dom).attr('data-member-id');
	var biao_id = $(dom).attr('data-id');
	
	var shuju	=	{'to_member_id':to_member_id,'biao_id':biao_id};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=dianzan';
	var func	=	'_handle_dianzan';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
	
}

function _handle_dianzan(t){
	
}

/*
 * 收藏
 */
function shoucang(dom){
	window.event.stopPropagation();
	
		if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	
	if( !msxCL() ){
		return false;
	}
	
	//收藏样式切换
	var type = $(dom).attr('data-type');
	if( type=='1' ){//撤销收藏
		$(dom).attr('data-type',0);
		$(dom).find('img').attr('src','ziyuan/faxian-shoucang.png');
		$(dom).next().removeClass('shoucang-text1').addClass('shoucang-text0').text(function(i,e){
			var i = Number(e);
				i = i - 1;
			return i;
		});
	}else{
		$(dom).attr('data-type',1);
		$(dom).find('img').attr('src','ziyuan/faxian-shoucangactive.png');
		$(dom).next().removeClass('shoucang-text0').addClass('shoucang-text1').text(function(i,e){
			var i = Number(e);
				i = i + 1;
			return i;
		});
	}
	
	var to_member_id = $(dom).attr('data-member-id');
	var biao_id = $(dom).attr('data-id');
	
	var shuju	=	{'to_member_id':to_member_id,'biao_id':biao_id};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=shoucang';
	var func	=	'_handle_shoucang';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
	
}

function _handle_shoucang(t){
	
}



/*
 * 关注
 */
function guanzhu(dom){
	window.event.stopPropagation();
	
		if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	
	//关注样式切换
	var type = $(dom).attr('data-type');
	if( type=='1' ){//撤销关注
		$(dom).attr('data-type',0);
		$(dom).find('img').attr('src','ziyuan/faxian-guanzhu.png');
		$(dom).next().removeClass('guanzhu-text1').addClass('guanzhu-text0').text(function(i,e){
			var i = Number(e);
				i = i - 1;
			return i;
		});
	}else{
		$(dom).attr('data-type',1);
		$(dom).find('img').attr('src','ziyuan/faxian-guanzhuactive.png');
		$(dom).next().removeClass('guanzhu-text0').addClass('guanzhu-text1').text(function(i,e){
			var i = Number(e);
				i = i + 1;
			return i;
		});
	}
	
	var to_member_id = $(dom).attr('data-member-id');
	var biao_id = $(dom).attr('data-id');
	
	var shuju	=	{'to_member_id':to_member_id,'biao_id':biao_id};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=guanzhu';
	var func	=	'_handle_guanzhu';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
	
}

function _handle_guanzhu(t){
	
}





function fanhuidingbu(){
	$(window).scrollTop(0);
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
	_init(1);
	
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
 * 发布主题
 */
function fabuzhuti(){
	api.actionSheet({
		title : '',
		cancelTitle : '取消',
		buttons : ['图文', '短视频']
	}, function(ret, err) {
		if (ret) {
			var i = ret.buttonIndex;
			
			if( i == 1 ){
				login_k('mokuai1/fabuzhuti.html?type=1&fenlei_id='+geiGet('fenlei_id',false),'fabuzhuti');
			}else if(i == 2){
				login_k('mokuai1/fabuzhuti2.html?type=2&fenlei_id='+geiGet('fenlei_id',false),'fabuzhuti2');
			}
			
		}
	});
}
