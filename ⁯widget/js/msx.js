function geishijian(){
	return new Date().getTime();
}

var tztime = geishijian();

function check_xcx_click(){
	//插件BUG，避免一次点击两次
	var time = geishijian();
	var shijiancha = time - tztime;
	if( shijiancha  < 1000 ){
		return false;
	}
	tztime = time;
	return true;
}

function pintuanfenxiang(param){
	var op	=	{};
	
	op.type	=	1;
	op.href	=	'/pages/fenxiang/pintuan/pintuan?'+param;
	xcxOw(op);
}

function fanlifenxiang(dom){
	
	var param	=	dom.getAttribute('data-url');
	
	var op	=	{};
	op.type	=	1;
	op.href	=	'/pages/fenxiang/fenxiao/fenxiao?'+param;
	
	xcxOw(op);
}

function xcxOw(op){
	
	if( !check_xcx_click() ){
		return;
	}
	
	var href	=	op.href;
	
	if( op.type == 0 ){
		wx.miniProgram.navigateBack({
			delta : op.wx_back
		});
	}else if(op.type == 1){
		wx.miniProgram.navigateTo({
			url : href,
		});
		return;
	}
}

function setwxhrefs(op){
	var xiaochengxuurl = '/pages/wanneng/wanneng?wannengurl='+WapSiteUrl+op.houzhui;
	document.getElementById(op.id).setAttribute('wx-hrefs',xiaochengxuurl);
}

function msx_checklogin(dom) {
	alert(1);
	var op = {};
	if(is_c_type == 'wapHH') {
		tiaozhuan(dom,op);
	} else if(is_c_type == 'wap') {
		var key	=	getCookie('key');
		
		if( !key ){
			op.hrefs = '../login_mobile/login_mobile';
		}else{
			op.hrefs = dom.getAttribute('wx-hrefs');
		}
		tiaozhuan(dom,op);
		
	}
}

//
//function xcxOw(dom){
//	//插件BUG，避免一次点击两次
//	var time = geishijian();
//	var shijiancha = time - tztime;
//	if( shijiancha  < 1000 ){
//		return;
//	}
//	tztime = time;
//	var op = {};
//	op.hrefs = dom.getAttribute('wx-href');
//	tiaozhuan(dom,op);
//}

function tz2(op){
	//插件BUG，避免一次点击两次
	var time = geishijian();
	var shijiancha = time - tztime;
	if( shijiancha  < 1000 ){
		return;
	}
	tztime = time;
		tiaozhuan(op,op);
}


function tiaozhuan(dom, op) {
	var href 	= dom.getAttribute('wx-href');
	
	if( 0 ){
		wx.miniProgram.navigateBack({
			delta : op.wx_back
		});
	}else{
		wx.miniProgram.navigateTo({
			url : href,
		});
		return;
	}
}

function neitiaozhuan(dom){
	var hrefs = dom.getAttribute('hrefs');
	location.replace(hrefs);
}