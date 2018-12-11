var is_dibula = false;

setInterval(function(){
	if( session('lanmu_show') == '1' ){
		xianshilanmu();
	}
});

/*
 * 显示隐藏图标，审核用
 */
function xianshilanmu(){
	$('.fenxiaoshouru').show();
}

if( sysType == 'wx' ){
	login();
}else{
	//app准备成功
	apiready = function(){
		login();
	}
}


//获取接口参数
function login(){
	
	
	
	
	if( !msxIsLogIn() ){
		return false;
	}
	
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=index';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
	
	
	var data = {};
	
	
	document.getElementById("yue").innerText = t.member_info2.predepoit;
	document.getElementById("jifen").innerText = t.member_info2.point;
	document.getElementById("touxiang").src = t.member_info.member_avatar;
	document.getElementById("yonghunicheng").innerText = t.member_info.member_nickname;
	
	session('member_name',t.member_info.member_name);
	session('member_avatar',t.member_info.member_avatar);
	
	session('is_shiming',t.member_info.is_shiming);
	
	if( t.member_info.is_huiyuan == 1 ){
		msxaddCookie('is_vip',1);
		document.getElementById("is_huiyuan").style.display = 'block';
	}else{
		document.getElementById("is_huiyuan").style.display = 'none';
		msxaddCookie('is_vip',0);
	}

}

setInterval(function(){
	if( !msxIsLogIn() ){
		return false;
	}
	xiaoxi();
},4444);

/*
 * 获取是否有新消息
 */
function xiaoxi(){
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=getmsgcount';
	var func	=	'xiaoxichuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}
function xiaoxichuli(t){
	if( t.zongshuliang > 0 ){
		$('#xiaoxibiaodian').show();
	}else{
		$('#xiaoxibiaodian').hide();
	}
	
	if( t.is_hongdian == 1 ){
		shezhiimhongdian(1);
	}else{
		shezhiimhongdian(0);
	}
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
 * 打开个人主页,未登录进行登录
 */
function gerenzhuye(dom){
	if( !msxIsLogIn() ){
		k('mokuai1/denglu.html','denglu');
		return false;
	}
	
	
	var member_id = msxgetCookie('member_id');
	
	msxGerenzhuye(member_id);
	
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
	
	login();
	
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
 * 设置IM红点
 */
function shezhiimhongdian(type){
	api.execScript({
		name : 'root',
	    frameName: 'shouye',
	    script: 'msximhongdian('+type+');'
	});
	api.execScript({
		name : 'root',
	    frameName: 'shequshouye',
	    script: 'msximhongdian('+type+');'
	});
	api.execScript({
		name : 'product_list',
	    frameName: 'zhimakaimen',
	    script: 'msximhongdian('+type+');'
	});
}



/*
 * 发表话题
 */
function fabiaohuati(){
	api.actionSheet({
		title : '',
		cancelTitle : '取消',
		buttons : ['图文', '短视频']
	}, function(ret, err) {
		if (ret) {
			var i = ret.buttonIndex;
			
			if( i == 1 ){
				login_k('mokuai1/fabuzhuti.html?type=1','fabuzhuti');
			}else if(i == 2){
				login_k('mokuai1/fabuzhuti2.html?type=2','fabuzhuti2');
			}
			
		}
	});
	
}
