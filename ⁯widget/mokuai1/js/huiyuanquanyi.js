if( sysType == 'wx' ){
	_init();
}else{
	//app准备成功
	apiready = function(){
		_init();
	}
}
var is_dibula = false;
fanye();//绑定翻页事件
//获取接口参数
function _init(){
	
	if( !msxIsLogIn() ){
		novip();
		return false;
	}
	
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=index';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

//处理返回数据
function _handle(t){
	
	if( t.member_info.is_huiyuan == 1 ){
		isvip();
	}else{
		novip();
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
 * 购买会员 - 请求参数
 * type  1 微信     2 微信
 */
function goumaihuiyuan(type){
	if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	
	
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=payvip';
	var func	=	'goumaihuiyuanchuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	
}

/*
 * 购买请求处理
 */
function goumaihuiyuanchuli(t){
	msxWxPay(t.return,3);
}

/*
 * 购买处理
 */
function goumai(){
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=goumaihuiyuan';
	var func	=	'goumaichuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	ajax(op);
}
function goumaichuli(t){
	
	msxaddCookie('is_vip',1);
	
	k('mokuai1/zhifuchenggong.html','zhifuchengong');
	isvip();
}

/*
 * 如果是VIP的话
 */
function isvip(){
	$('#weixinzhifu').hide();
	$('#zhifubaozhifu').hide();
	$('#goumaifangshi').text('您是VIP');
}

/*
 * 如果不是VIP的话
 */
function novip(){
	$('#weixinzhifu').show();
	$('#zhifubaozhifu').show();
	$('#goumaifangshi').text('购买方式');
}
