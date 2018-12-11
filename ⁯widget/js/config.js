var SiteUrl = "http://"+window.location.host+"/shop";//"http://v5./shop";
//var ApiUrl = "http://"+window.location.host+"/mobile";//"http://v5./mobile";
var ApiUrl = "https://kmhd.bxsc666.cn/mobile";//"http://v5./mobile";
var pagesize = 10;
var WapSiteUrl = "http://"+window.location.host+"/wap";//"http://v5./wap";
var IOSSiteUrl = "http://"+window.location.host+"/app.ipa";//"http://v5./app.ipa";
var AndroidSiteUrl = "http://"+window.location.host+"/app.apk";//"http://v5./app.apk";

//var sysType = 'wx';
var sysType = 'android';


// auto url detection
//(function() {
//  var m = /^(https?:\/\/.+)\/wap/i.exec(location.href);
//  if (m && m.length > 1) {
//      SiteUrl = m[1] + '/shop';
//      ApiUrl = m[1] + '/mobile';
//      WapSiteUrl = m[1] + '/wap';
//  }
//})();



var apiUrl	=	'https://kmhd.bxsc666.cn/tp.php';
var hUrl	=	'https://kmhd.bxsc666.cn';		//	打开网页地址URL
var upUrl	=	'http://publichehe.bxsc666.cn/tp.php';//上传图片
var tupianUrl = apiUrl + '/app/index.php?i=1&c=entry&do=picture&m=hulu_like' ; // 图片入库URL
var uId = 1;//我的ID
var yingyan_id=204444;
//var apiUrl	=	'http://192.168.2.247';
//var apiUrl	=	'http://139.129.213.138';
var dengdaichaoshi	=	20000;					//	等待超时时间
var dengdaitishi	=	'';			//	等待提示
var chaoshitishi	=	'网络不通畅，请重试！';	//	超时提示
var kongtishi		=	'无内容';				//	数据为空的时候提示
var cur_page		=	0;						//	分页默认起始数
var curpage			=	1;						//	分页默认起始数
var nian			=	'2017';
var db_name			=	'msxdb';				//	本地数据库名

var biaoqingzongshu = 64;//本地表情数量

var frame_time = 100;//窗口动画过度时间

var donghua = 'from_right';//窗口打开方向


//页面返回按钮
function msxBack(){
	if(sysType == 'wx'){
		history.go(-1);
	}else{
			api.setStatusBarStyle({ style: 'dark' });
		
		api.closeWin();
	}
}

//个人中心页面返回按钮
function msxBackMember(){
	if(sysType == 'wx'){
		history.go(-1);
	}else{
		api.closeWin();
	}
}

//返回首页
function backHome(){
	if(sysType == 'wx'){
		location.href = WapSiteUrl + '/mokuai1/shouye.html';
	}else{
		api.closeToWin({
		    name: 'root'
		});
	}
}


var userid		=	session('useridhex');
var username	=	session('usernamehex');

// 请求的数据
function getSendData(options) {
	
	userid		=	session('useridhex');
	username	=	session('usernamehex');
	
	var data = {
		'userid': userid,
		'username': username,
		'is_app':1,
		'curpage' : curpage
	};
	
	if( msxgetCookie('key') && msxgetCookie('key') != 0 ){
		data.key = msxgetCookie('key');
	}
	
	for(var key in options) {
		data[key] = options[key];
	}
	return data;
}


// 获取get参数
function geiGet(name,url_str)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     
     if( !url_str ){
	    var r = window.location.search.substr(1).match(reg);
     }else{
     	var r = url_str.match(reg);
     }
     
     if(r!=null)return  r[2]; return null;
}



/*	获取时间戳
 * 
 *	<input type="date" id="dom" />
 * 	<script>
 * 		getshijianchuo('#dom');
 * 	</script>
 * 
 * */
function getshijianchuo(dom){
	var	time_date	=	$(dom).val();
	var timestamp = Date.parse(new Date(time_date));
	timestamp = timestamp / 1000;
	if( !timestamp ){
		return false;
	}
	return timestamp;
}

/*获取手机分辨率
 * */
function msxWulifenbianlv(){
	var wuli_gao = window.screen.height * window.devicePixelRatio;
	var wuli_kuan = window.screen.width * window.devicePixelRatio;
}


/*	获取时间戳
 * 
 *	<input type="date" id="dom" />
 * 	<script>
 * 		getshijianchuo('#dom');
 * 	</script>
 * 
 * */
function msxGetTime(){
	var timestamp = Date.parse(new Date());
	timestamp = timestamp / 1000;
	if( !timestamp ){
		return false;
	}
	return timestamp;
}


function msxaddCookie(name,value,expireHours){
	session(name,value);
}

function msxgetCookie(name){
	var k = session(name);
	return k;
}

function msxdelCookie(name){//删除cookie
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=msxgetCookie(name);
	if(cval!=null) document.cookie= name + "="+cval+"; path=/;expires="+exp.toGMTString();
}

/*
 * 打开分享页面
 */
function fenxiangyemian(op){
	
	window.event.stopPropagation();
	
	
	
	var houzhui = '';
	if( !op ) {
		houzhui = '&type=zhuye&id=0';
	}else{
		if( op.type ){
			houzhui = houzhui + '&type='+op.type;
		}
		if( op.id ){
			houzhui = houzhui + '&id='+op.id;
		}
	}
	
	
	
	api.openFrame({
	    name: 'fenxiangyemian',
	    url: 'widget://mokuai1/fenxiangtanchuang.html?a=b'+houzhui, 
	   	animation: {
			type: 'movein', //动画类型（详见动画类型常量）
			subType: "from_bottom", //动画子类型（详见动画子类型常量）
			duration: frame_time //动画过渡时间，默认300毫秒
		},
	});


//	var MNActionButton = api.require('MNActionButton');
//MNActionButton.open({
//  layout: {
//      row:1,
//      col: 4,
//      rowSpacing: 5,
//      colSpacing: 10,
//      offset: 0
//  },
//  animation: true,
//  autoHide: true,
//  styles: {
//      maskBg: '',
//      bg: '#fff',
//      cancelButton: {
//          size: 44,
//          bg: '#fff',
//          icon: 'widget://image/quxiao.png'
//      },
//      item: {
//          titleColor: '#888',
//          titleHighlight: 'dd2727',
//          titleSize: 12
//      },
//      indicator: {
//          color: '#c4c4c4',
//          highlight: '#9e9e9e'
//      }
//  },
//  items: [{
//      icon: 'widget://images/f1.png',
//      title: '微信好友'
//  }, {
//      icon: 'widget://images/f2.png',
//      title: '朋友圈'
//  }, {
//      icon: 'widget://images/f3.png',
//      title: '菜单项3'
//  }, {
//      icon: 'widget://images/f4.png',
//      title: '菜单项4'
//  }]
//}, function(ret) {
//  if (ret) {
//      console.log(JSON.stringify(ret));
//  }
//});

}

/*
 * 打开图片浏览器
 * img_arr  图片数组
 * index    当前打开的索引
 */
function msxDakaitupian( img_arr,index ){
	
	
	
	if( sysType == 'wx' ){
		
	}else{
		
		var shuzu = img_arr.join(',');
			shuzu = encodeURIComponent( encodeURIComponent( shuzu ) );
		
		api.openWin({
		    name: 'tupianliulanqi-w',
		    url: 'widget://zhimakaimen-tupianliulanqi.html?shuzu='+shuzu + '&index='+index, 
		   	animation: {
				type: 'none', //动画类型（详见动画类型常量）
				subType: "none", //动画子类型（详见动画子类型常量）
				duration: 0 //动画过渡时间，默认300毫秒
			},
		});
	}
	
	

}

/*
 * 打开视频播放器
 * urls 视频地址
 */
function msxDakaishipin(urls){
	if( sysType == 'wx' ){
		
	}else{
		
//		urls = encodeURIComponent( encodeURIComponent( urls ) );
//		
//		api.openWin({
//		    name: 'shipinliulanqi-w',
//		    url: 'widget://zhimakaimen-shipinliulanqi.html?urls='+urls, 
//		   	animation: {
//				type: 'none', //动画类型（详见动画类型常量）
//				subType: "none", //动画子类型（详见动画子类型常量）
//				duration: 0 //动画过渡时间，默认300毫秒
//			},
//		});

		api.openVideo({
		    url: urls
		});

	}
}


/**
 * 动态加载css文件
 * @param css_filename css文件路径
 */
function msxloadCss(css_filename) {
    var link = document.createElement('link');
    link.setAttribute('type', 'text/css');
    link.setAttribute('href', css_filename);
    link.setAttribute('href', css_filename);
    link.setAttribute('rel', 'stylesheet');
    css_id = document.getElementById('auto_css_id');
    if (css_id) {
        document.getElementsByTagName('head')[0].removeChild(css_id);
    }
    document.getElementsByTagName('head')[0].appendChild(link);
}
/**
 * 动态加载js文件
 * @param script_filename js文件路径
 */
function msxloadJs(script_filename) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', script_filename);
    script.setAttribute('id', 'auto_script_id');
    script_id = document.getElementById('auto_script_id');
    if (script_id) {
        document.getElementsByTagName('head')[0].removeChild(script_id);
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}


//对象转成URL请求参数格式
function qingqiucanshu(param, key, encode) {
  if(param==null) return '';
  var paramStr = '';
  var t = typeof (param);
  if (t == 'string' || t == 'number' || t == 'boolean') {
    paramStr += '&' + key + '=' + ((encode==null||encode) ? encodeURIComponent(param) : param);
  } else {
    for (var i in param) {
      var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
      paramStr += qingqiucanshu(param[i], k, encode);
    }
  }
  return paramStr;
};

//	通用网络请求
function ajax(op){
	var www		=	wangluozhuangtai();
//	console.log(www);
	if(!www){
		return false;
	}
	
//	var apis	=	apiUrl + op.dizhi;
//	var datas 	= getSendData(op.shuju);
//	var wenjian	=	op.wenjian || '' ;
//	var qingqiufangshi	=	wenjian==''?'get':'post';
//	
//	if( op.method ){
//		qingqiufangshi	=	op.method;
//	}
	
	
	// 调试用
//	var hehe	=	qingqiucanshu(datas);
//	die( apis + '?a=b' + hehe );
		
//		if( sysType ){
			jajax(op);
//		}else{
//			
//			api.ajax({
//			    url: apis,
//			    method : qingqiufangshi,
//			    timeout : dengdaichaoshi/1000,
//			    data: {
//			        values: datas,
//			        files : wenjian,
//				   },
//			}, function(ret, err) {
//			
//					die(ret);
//					die(err);
//			
//				    if (ret) {
//			        	eval( op.func + '(ret)' );
//				    } else {
//			        	eval( op.func + '(err)' );
//				    }
//			});
//			
//		}
		
}

//	通用Jquery网络请求
function jajax(op){
//	var www		=	wangluozhuangtai();
//	if(!www){
//		return false;
//	}
	
	var apis	=	op.dizhi;
	var datas 	= getSendData(op.shuju);
//	var datas 	= op.shuju;
	var qingqiufangshi	= 'get';
	
	if( op.dataType ){
		qingqiufangshi	=	op.dataType;
	}
	
	
	// 调试用
	var hehe	=	qingqiucanshu(datas);
	
//	die( apis  + hehe );


	if( op.type == 1 ){//上传文件
		$.ajaxFileUpload({
	        url				:	apiUrl + op.dizhi,  
	        secureuri		:	false,//是否启用安全机制  
	        fileElementId	:	op.fileid,//file的id  
	        dataType		: 	'json',//返回的类型  
	        data			: 	datas,
	        success: function (ret) {//调用成功时怎么处理  
				die(ret);
	        	eval( op.func + '(ret)' );
	        } 
	    }); 
	}else{
		$.ajax({
		    url: apis,
		    dataType : 'json',
		    type : qingqiufangshi,
		    data: datas,
		    success : function(ret){
//		    	die(ret)
				if( ret.code != '200' ){
					cl();
//					tishi(ret.datas.error);
					return false;
				}

				eval( op.func + '(ret.datas)' );
		    },
		    error : function(ret){
		    	eval( op.func + '(ret.datas)' );
		    }
		});
	}
		
}

//	通用打开窗口
function ow(op){
	api.openWin({
	    name: op.name,
	    url: op.html,
	   	animation: {
			type: 'none', //动画类型（详见动画类型常量）
			subType: "none", //动画子类型（详见动画子类型常量）
			duration: 0 //动画过渡时间，默认300毫秒
		},
	});
}

/*
 * 是否登录
 */
function msxIsLogIn(){
	if( msxgetCookie('key')  && msxgetCookie('key') != 0 ){
		return true;
	}else{
		return false;
	}
}
/*
 * 检查是否登录，如果未登录，打开登录窗口
 */
function msxCL(){
	if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	return true;
}

/*
 * 打开新窗口时，判断是否登录，未登录的情况，去登录
 * */
function login_k(html,name,maopao){
	if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	k(html,name,maopao);
}

/*
 * 去登录
 */
function msxqudenglu(){
	k('mokuai1/denglu.html','denglu');
}


/*
 * 通用打开窗口
 * html		要打开的html路径
 * name		APP子窗口名称标识
 * maopao	点击事件禁止冒泡
 * 
 * 
 * */
function k(html,name,maopao){
//	location.href = html;

	if(arguments[2]==true){
		window.event.stopPropagation();
	}
	
	
	
	if(sysType == 'wx'){
		location.href = WapSiteUrl + '/' + html;
	}else{
		
		html = encodeURIComponent( encodeURIComponent(html) );
		

		if(name=='denglu'){
			donghua = 'from_top';
		}else{
			donghua = 'from_right';
		}
		
		api.openWin({
		    name: name,
		    url: 'widget://zhimakaimen.html?urls='+html, 
		   	animation: {
				type: 'movein', //动画类型（详见动画类型常量）
				subType: donghua, //动画子类型（详见动画子类型常量）
				duration: frame_time //动画过渡时间，默认300毫秒
			},
		});
	}
	
	
	
	
}



/*
 * 通用打开窗口（X5模式）
 * html		要打开的html路径
 * name		APP子窗口名称标识
 * maopao	点击事件禁止冒泡
 * 
 * 
 * */
function kk(html,name,maopao){
	
	
//	location.href = html;

	if(arguments[2]==true){
		window.event.stopPropagation();
	}
	
	
	
	if(sysType == 'wx'){
		location.href = html;
	}else{
		
		html = encodeURIComponent( encodeURIComponent(html) );
		
		
		api.openWin({
		    name: name,
		    url: 'widget://zhimakaimenx5.html?urls='+html, 
		   	animation: {
				type: 'movein', //动画类型（详见动画类型常量）
				subType: "from_right", //动画子类型（详见动画子类型常量）
				duration: frame_time //动画过渡时间，默认300毫秒
			},
		});
	}
	
	
	
	
}


/*
 * 打开商品详情
 */
function shangpinxiangqing(goods_id){
	
	if( sysType == 'wx' ){
		location.href = WapSiteUrl + '/tmpl/product_detail.html?goods_id='+goods_id;
	}else{
		var houzhui = '&goods_id='+goods_id;
	
	
		api.openWin({
		    name: 'shangpinxiangqing-w',
		    url: 'widget://shangpinxiangqing.html?a=b'+houzhui, 
		   	animation: {
				type: 'movein', //动画类型（详见动画类型常量）
				subType: "from_right", //动画子类型（详见动画子类型常量）
				duration: frame_time //动画过渡时间，默认300毫秒
			},
		});
	}
	
}

/*
 * 打开登录框
 */
function msxlogin(){
	
	api.openWin({
	    name: 'login-w',
	    url: 'widget://mokuai1/denglu.html', 
	   	animation: {
			type: 'movein', //动画类型（详见动画类型常量）
			subType: "from_bottom", //动画子类型（详见动画子类型常量）
			duration: frame_time-50 //动画过渡时间，默认300毫秒
		},
	});
}


/*
 * 通用打开嵌套窗口
 * */
function zhimakaimentupian(html,title){
	var z = encodeURIComponent(html);
	
	
	if(sysType=='wx'){
		location.href = WapSiteUrl+'/zhimakaimen-tupian.html?type=tupian&urls='+ z ;
	}else{
		api.openWin({
		    name: 'dakaitupian',
		    url: 'widget://zhimakaimen-tupian.html?title='+title+'&urls='+z, 
		   	animation: {
				type: 'movein', //动画类型（详见动画类型常量）
				subType: "from_right", //动画子类型（详见动画子类型常量）
				duration: frame_time //动画过渡时间，默认300毫秒
			},
		});

	}
}


//通用关闭窗口
function cw(){
	var systemType	=	session('systemType');
	if( systemType == 'ios' ){
		api.closeWin({
			animation : {
						    type:"reveal",         //动画类型（详见动画类型常量）
						    subType:"from_left",//动画子类型（详见动画子类型常量）
						    duration:200         //动画过渡时间，默认300毫秒
						},
		});
	}else{
		api.closeWin();
	}
	
}
//通用打开子窗口
function of(op){
	
	
	var mgb		=	op.mgb?op.mgb:0;
	
	api.openFrame({
		name: op.name,
		url: op.html,
		allowEdit : false,
		rect: {
			x: 0,
			y: op.yh,
			w: 'auto',
			h: 'auto',
			marginBottom: mgb,
		}
	});
	
	html_ms();
	
}

//IOS关闭按钮优化
function html_ms(){
	
	var is_dom = document.querySelector('.mui-icon.mui-icon-left-nav.mui-pull-left');
	if( !is_dom ){
		return false;
	}
	
	document.querySelector('.mui-icon.mui-icon-left-nav.mui-pull-left').setAttribute('tapmode','');
	ms();
}


//打开登选择页
function opendenglu1(){
	var op = {'name':'xuanzedenglu-w','html':'xuanzedenglu-w.html'};
	ow(op);
}

//设置本地村粗
function session(k,v){
	var moren1 = arguments[0];
	var moren2 = arguments[1];
	
	if( moren2 ){
		return localStorage.setItem(k,v);
	}else{
		
		var vv = localStorage.getItem(k);
		
		if( vv == null || vv =='null' ){
			vv = false;
		}
		
		return vv;
	}
}

//统一登录操作
function login(level,data){
	session('useridhex',data.userid);
	session('usernamehex',data.account);
	session('isLogIn',1);
	session('level',level);
	session('Id',data.Id);
	session('isyan',data.isyan);
	
	
	session('lixian_open','0');	//	是否打开过离线验收
	session('lixianIds','0');	//	离线验收ID组：1,2,3,4,5,6
	session('lixianId_zuihou','0');	//	离线验收更新数据的最后ID，用户提交更新请求
	
	if( data.weixin_id == '' || data.weixin_id == 'null' || data.weixin_id == 'Null' || data.weixin_id == 'NULL' ){
		var is_bind_wx	=	0;
	}else{
		var is_bind_wx	=	1;
	}
	
	session('is_bind_wx',is_bind_wx);
	
	switch (level){
		case 10:	//国家防办
			session('lianxiren',data.ContactUser);
			session('zhiwei',data.Title);
			session('lianxidianhua',data.ContactTel);
			session('dengluzhanghao',data.UserMobile);
			session('dizhi',data.Address);
			session('chuanzhenhao',data.chuanzhen);
			session('youxiang',data.Email);
			session('sheng',data.Province);
			session('shi',data.City);
			session('touxiang', data.avatar);
			break;
		case 20:	//省防办
			session('lianxiren',data.ContactUser);
			session('zhiwei',data.Title);
			session('lianxidianhua',data.ContactTel);
			session('dengluzhanghao',data.UserMobile);
			session('dizhi',data.Address);
			session('chuanzhenhao',data.chuanzhen);
			session('youxiang',data.Email);
			session('sheng',data.Province);
			session('shi',data.City);
			session('touxiang', data.avatar);
			
			session('ismodifypass',data.ismodifypass);
			
			break;
		case 30:	//市防办
			session('lianxiren',data.ContactUser);
			session('zhiwei',data.Title);
			session('lianxidianhua',data.ContactTel);
			session('dengluzhanghao',data.UserMobile);
			session('dizhi',data.Address);
			session('chuanzhenhao',data.chuanzhen);
			session('youxiang',data.Email);
			session('sheng',data.Province);
			session('shi',data.City);
			session('touxiang', data.avatar);
			
			session('ismodifypass',data.ismodifypass);
			
			break;
		case 40:	//质监员
			session('lianxiren',data.ContactUser);
			session('zhiwei',data.nicheng);
			session('lianxidianhua',data.ContactTel);
			session('dengluzhanghao',data.UserMobile);
			session('dizhi',data.Address);
			session('chuanzhenhao',data.chuanzhen);
			session('youxiang',data.Email);
			session('sheng',data.Province);
			session('shi',data.City);
			session('touxiang', data.avatar);
			
			session('ismodifypass',data.ismodifypass);
			
			break;
		case 50:	//企业登陆
			session('lianxiren',data.ContactUser);
			session('lianxidianhua',data.ContactTel);
			session('gongsimingzi',data.Company);
			session('touxiang', data.avatar);
			break;
		default:
			break;
	}
	
	api.execScript({
	    name: 'root',
	    script: 'isLogIn();'
	});
	//更新消息数量
	api.execScript({
	    name: 'root',
	    script: 'geixiaoxi();'
	});
	
	
	api.execScript({
		name : 'root',
	    frameName: 'shouye',
	    script: 'isLogIn();'
	});
	//更新消息列表
	api.execScript({
		name : 'root',
	    frameName: 'xiaoxi',
	    script: 'gei();'
	});
	
	//初始化极光推送
	api.execScript({
		name : 'root',
	    script: 'jiguang(' + data.Id + ');',
	});
	
	setTimeout(function() {
			
		api.closeToWin({
			name : 'root',
		});
		//设置【我】为第一页
		api.execScript({
			name : 'root',
		    frameName: 'wo',
		    script: 'gei();'
		});
		
	}, 1000);
}

function truncateTable(){
	var db = api.require('db');
		db.executeSql({
		    name: db_name,
		    sql: 'DROP TABLE t1'
		}, function(ret, err) {
		    if (ret.status) {
		    } else {
//		    	alert('NO');
		    }
		});
}

//统一退出操作
function logout(){
	
	mui.confirm('','确定注销？',['确认','取消'],function(e){
		if(e.index == 0){
			
			truncateTable();
			
			
			var type = localStorage.clear();
			
			
			
			setTimeout(function() {
				api.closeWidget({
					silent:true,
				});
			}, 1000);
		}
	});
	

}

//返回网络状态
function wangluozhuangtai() {
	var type;
		if( sysType == 'wx' ){
			return true;			
		}
		if( sysType == 'android' ){
			return true;			
		}
//      var s = api.connectionType;
//      s = s.toLowerCase();
//      if ((s.indexOf('wifi') != -1) || (s.indexOf('3g') != -1) || (s.indexOf('4g') != -1) || (s.indexOf('2g') != -1)) {	//	有网络
//              type = true;
//      } else {		//	无网络
//             type = false;
//      }
//      if( s == '2g' ){
//      	type = false;
//      }
//      
//      if( s == 'unknown' ){	//	从WIFI切换到4G网络的时候，偶尔会出现这种情况！
//      	type == true;
//      }
//		
//		
//      
//      
//      return type;
}

//获取当前时间
function date() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var h	=	date.getHours();
    var i	=	date.getMinutes();
    var s	=	date.getSeconds();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (h >= 0 && h <= 9) {
        h = "0" + h;
    }
    if (i >= 0 && i <= 9) {
        i = "0" + i;
    }
    if (s >= 0 && s <= 9) {
        s = "0" + s;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + "　" + h + seperator2 + i
            + seperator2 + s;
    return currentdate;
}


/************* 去掉左右指定字符串  ***************/
/*var str = ' Ruchee ';
console.log('xxx' + str.trim() + 'xxx'); // xxxRucheexxx
 
 
// 去除字符串左侧空白
str = ' Ruchee ';
console.log('xxx' + str.trim(' ', 'left') + 'xxx'); // xxxRuchee xxx
 
 
// 去除字符串右侧空白
str = ' Ruchee ';
console.log('xxx' + str.trim(' ', 'right') + 'xxx'); // xxx Rucheexxx
 
 
// 去除字符串两侧指定字符
str = '/Ruchee/';
console.log(str.trim('/')); // Ruchee
 
 
// 去除字符串左侧指定字符
str = '/Ruchee/';
console.log(str.trim('/', 'left')); // Ruchee/
 
 
// 去除字符串右侧指定字符
str = '/Ruchee/';
console.log(str.trim('/', 'right')); // /Ruchee*/
String.prototype.trim = function (char, type) {
  if (char) {
    if (type == 'left') {
      return this.replace(new RegExp('^\\'+char+'+', 'g'), '');
    } else if (type == 'right') {
      return this.replace(new RegExp('\\'+char+'+$', 'g'), '');
    }
    return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
  }
  return this.replace(/^\s+|\s+$/g, '');
};

var dengdaitypeid;
//加载等待框
function ol(tishi,type){
	
	if( type != 1 ){
		if( sysType == 'wx' ){
			return true;
		}
	
		if( sysType == 'android' ){
			return true;
		}
	}
	
	var tishititle	=	tishi || dengdaitishi;
	if( sysType == 'wx' ){
		return true;
	}else{
		api.showProgress({    
			style: 'default',    
			animationType: 'fade',    
			title: tishititle,    
			text: '',    
			modal: true	//	true 页面不可点击   false  页面可操作
		});
	
		dengdaitypeid = setTimeout(function() {
			ChaoshitishiFunc();
		}, dengdaichaoshi);
	}
}

function ChaoshitishiFunc(){
	api.toast({
	    msg: chaoshitishi,
	    duration: 2000,
	    location: 'middle'
	});
	cl();
}

//关闭等待框
function cl(){
	if( sysType == 'wx' ){
		
	}else{
		clearTimeout(dengdaitypeid);
		api.hideProgress();
	}
}

//通用提示
function tishi(msg){
	
	if( sysType == 'wx' ){
		alert(msg);
	}else{
		api.toast({
		    msg: msg,
		    duration: 2000,
		    location: 'middle'
		});
	}
	
}

//
function ms(){
	api.parseTapmode();
}

//查看JSON数据
function die(data){
	console.log(JSON.stringify(data));
}

//确认图片是否存在
function isImg(url){
            var xmlHttp ;  
        if (window.ActiveXObject)  
         {  
          xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");  
         }  
         else if (window.XMLHttpRequest)  
         {  
          xmlHttp = new XMLHttpRequest();  
         }   
        xmlHttp.open("Get",url,false);  
        xmlHttp.send();  
        if(xmlHttp.status==404)  
        return false;  
        else  
        return true;
}


/* 极光推送 
 * 
 * 1，先上传SVN
 * 2，然后生成自定义LOAD
 * 3，如果还是不行，云编译一个测试版本，然后再自定义生成LOAD
 * */
var ajpush = {
	mokuai: null,
	init: function(bieming) { //	初始化
		
		ajpush.mokuai = api.require('ajpush');
		ajpush.mokuai.init(function(ret) {
			
			if(ret && ret.status) {
				ajpush.regBieMing(bieming);
				ajpush.getId();
				ajpush.dianJi();
//				ajpush.jianTing();
			}
		});
	},
	regBieMing: function(bieming) { //	设置别名和标签组
		
		
		var param = {
			alias: bieming,
			tags: ['hehedata']
		};
		ajpush.mokuai.bindAliasAndTags(param, function(ret) {
			var statusCode = ret.statusCode;
		});
	},
	getId: function() {
		ajpush.mokuai.getRegistrationId(function(ret) { //	获取设备的ID
			var registrationId = ret.id;
		});
	},
	jianTing : function(){	//	发送消息才管用，发送通知没用
		ajpush.mokuai.setListener(
		    function(ret,err) {
		         var id = ret.id;
		         var title = ret.title;
		         var content = ret.content;
		         var extra = ret.extra;
		         alert(content);
		    }
		);
	},
	dianJi: function() { //	监听事件
		
		
		api.addEventListener({
			name: 'appintent'
		}, function(ret, err) {
			
			var push = ret.appParam.ajpush;
			var id = push.id;
			var title = push.title;
			var content = push.content;
			var extra = push.extra;
			
			
			//更新消息列表
			api.execScript({
				name : 'root',
			    frameName: 'xiaoxi',
			    script: 'gei();'
			});
			//更新消息数量
			api.execScript({
			    name: 'root',
			    script: 'geixiaoxi();'
			});
			if( extra.type == 1 ){	//	跳转到消息内容
			
				//更新消息为已读
				api.execScript({
					name : 'root',
				    frameName: 'xiaoxi',
				    script: 'shezhiyidu('+ extra.jump_id +');'
				});
			
				var op = {name:'.html/xiaoxineirong-w',html:'./html/xiaoxineirong-w.html?id='+extra.jump_id};
				ow(op);
			}

		});
	},
};
/* //极光推送 */

/*  长按事件  */
//(function(w){
//      var eventFun = {
//              touchstart:function(e){
//                       e.preventDefault(); 
//                       var et = e.touches[0];
//                       this.startX = et.pageX;
//                       this.startY = et.pageY;
//                       longTap(this);
//                      
//                      
//              },
//              touchmove:function(e){
//                      var listener = this.listener;
//                      var et = e.touches[0];
//                       this.endX = et.pageX;
//                       this.endY = et.pageY;
//                       if(Math.abs(this.endX - this.startX) > 10 || Math.abs(this.endY - this.startY) > 10){
//                              clearTimeout(listener.longTap.longTimeOutId);
//                       }
//                      
//              
//              },
//              touchend:function(e){
//                      var changedTouches = e.changedTouches;
//                      var isFirst = false;
//                      for(var i=0,len=changedTouches.length;i<len;i++){
//                              if(changedTouches[i].identifier == 0){
//                                      isFirst = true;
//                                      break;
//                              }
//                      }
//                      if(!isFirst){
//                              return
//                      }
//                      e.preventDefault(); 
//                      var listener = this.listener;
//                      clearTimeout(listener.longTap.longTimeOutId);
//                      var listener = this.listener;
//              
//                      
//                      
//              },
//              touchcancel:function(e){
//                      var listener = this.listener;
//                      clearTimeout(listener.longTap.longTimeOutId);
//              }
//      
//      
//      }
//      var touchName = ['touchstart','touchmove','touchend','touchcancel'];
//      var bind = function(view){
//              view.listener = {};
//              for(var i in touchName){
//                      view.addEventListener(touchName[i],eventFun[touchName[i]],false)
//              }
//      
//      }
//      
//      var longTap = function(view){
//              var listener = view.listener;
//              if(!listener.longTap ){
//                      return;
//              }
//              listener.longTap.longTimeOutId = setTimeout(function(){
//                      var call = listener.longTap.callbacks;
//                      for(var i in call){
//                              call[i]&&call[i].call(view);
//                      }
//              },800);
//              
//      }
//      
//      window.on = function(view,name,callback){
//              if(!view.listener){
//                      bind(view);
//              }
//              var listener = view.listener || {};
//              if(!listener[name]){
//                      listener[name] = {
//                              callbacks:[]
//                      }
//              }
//              var evt = listener[name] ;
//              evt.callbacks.push(callback);
//              
//              
//      };
//      
//      
//      /*
//       * 使用方法: 直接引进html文件就能出发长安事件
//       * 
//       */
//// 		on(document,'longTap',function(){
////              alert(this);
////      });
////      on(document,'longTap',function(){
////              alert('长按2');
////      });
////      on(document,'longTap',function(){
////              alert('长按3');
////      });
//      
//      
//})(window);



/* 微信操作
 * 
 * */


//获取OPENID		type 1 绑定	2 登陆
function getOpenId(type){
	var wx = api.require('wx');
		wx.isInstalled(function(ret, err) {
		    if (ret.installed) {
//		        alert("当前设备已安装微信客户端");


					wx.auth({
					}, function(ret, err) {
					    if (ret.status) {
					        var call_code = ret.code;
					        
					        wx.getToken({
							    code: call_code
							}, function(ret, err) {
							    if (ret.status) {
							    	
							    	var accessToken = ret.accessToken;
							    	var openId = ret.openId;
							    	wx.getUserInfo({
									    accessToken: accessToken,
									    openId: openId
									}, function(ret, err) {
									    if (ret.status && ret.unionid.length > 10) {
											if( type == 1 ){
												bindWx(ret);
											}else{
												msxWxLoginAjax(ret);
											}
									        
									        
									    } else {
									       alert('授权失败，请重试！！！');
									    }
									});
									
									
							    } else {
//							        alert(err.code);
									alert('授权失败，请重试！！');
							    }
							});
					        
					    } else {
//					        alert(err.code);
							alert('授权失败，请重试！');


					    }
					});
					
					

		    } else {
		        alert('当前设备未安装微信客户端');
		    }
		});
	
}


//获取OPENID		type 1 绑定	2 登陆
function getQQOpenId(type){
	var qq = api.require('QQPlus');
	qq.installed(function(ret, err) {
	    if (ret.status) {
	        
	        
	        qq.login(function(ret, err) {
			    if(ret.status){
			    	
			    	var openid = ret.openId;
			    	
			    	
			    	qq.getUserInfo(function(ret, err) {
					    if (ret.status) {
					    	
					    	var info = ret.info;
					    	if( (typeof info) == 'string' ){
					    		info = JSON.parse(ret.info);
					    	}
					    	info.openid = openid;
					    	info.unionid = openid;
					    	
					    	
					    	if( type == 1 ){
								bindQQ(info); 
							}else{
								msxQQLoginAjax(info);
							}
					    	
					        
					    } else {
					        alert('授权失败，请重试！');
					    }
					});
			    	
			    	
			    }else{
			    	alert('授权失败，请重试！');
			    }
			});
	        
	        
	    } else {
	       alert('当前设备未安装QQ客户端');
	    }
	});
	
}


function wodejiami(code)  
{    
   var c=String.fromCharCode(code.charCodeAt(0)+code.length);  
   for(var i=1;i<code.length;i++){  
   c+=String.fromCharCode(code.charCodeAt(i)+code.charCodeAt(i-1));  
   }  
   return escape(c);  
}  


// 绑定微信 - 提交
function bangdingweixin(openid){
	var is_bind_wx	=	session('is_bind_wx');
	if(is_bind_wx  == 1 ){
		tishi('此帐号已绑定微信账号！如需更改，请联系管理员！');
		return false;
	}
	
	getOpenId(1);
}

/*
 * 绑定微信
 */
function bindWx(op){
	
	
	var shuju	=	{'type':'wx','sex':op.sex,'openid':op.openid,'unionid':op.unionid,'nickname':op.nickname,'headimgurl':op.headimgurl};
		var dizhi	=	ApiUrl + '/index.php?act=login&op=bind';
		var func	=	'bangdingweixinchuli';
		var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
		
		ajax(op);
		ol('',1)
}

/*
 * 绑定QQ
 */
function bindQQ(op){
	
	var shuju	=	{'type':'qq','sex':op.gender,'openid':op.openid,'unionid':op.unionid,'nickname':op.nickname,'headimgurl':op.figureurl_qq_2};
		var dizhi	=	ApiUrl + '/index.php?act=login&op=bind';
		var func	=	'bangdingqqchuli';
		var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
		
		ajax(op);
		ol('',1)
}



//微信登录	-	触发
function wxdl(){
	getOpenId(2);
}

// 微信登陆	-	逻辑
function weixindenglu(openid){
	
	var openid	=	wodejiami(openid);
	
	var shuju	=	{'openid':openid};
	var dizhi	=	'/def/Log/weichat_login';
	var func	=	'weixindengluchuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol('登录中...');
}

function weixindengluchuli(data){
	
	cl();
	
	if( data.code == 200 ){
		mui.alert( '' ,data.msg);
		
		var data = data.data;
		login(data.level,data);
		
		setTimeout(function() {
			
			api.closeToWin({
				name : 'root',
			});
			
		}, 1000);
		
	}else{
		mui.alert( '' ,data.msg);
	}
}



function qiehuandaohangka(idname){
	api.closeToWin({
	    name: 'root'
	});
	var btn	=	document.getElementById(idname);
	mui.trigger(btn,'tap');
	$('.mui-tab-item').removeClass('mui-active');
	$('#'+idname).addClass('mui-active');
}


//	通用打开窗口
function shangchuantupian(op){
	api.openFrame({
	    name: op.name,
	    url: op.html,
	    bgColor:'rgba(255, 255, 255, 0.5)',
	    rect : {
                                        x : 0,
                                        y : 0,
                                        w : 'auto',
                                        h : 'auto'
                                },
	   	animation: {
			type: 'none', //动画类型（详见动画类型常量）
			subType: "from_right", //动画子类型（详见动画子类型常量）
			duration: 11 //动画过渡时间，默认300毫秒
		},
	});
}


//规划路线 1 打车   2 骑行
function msx_guihualuxian(op){
	
	
	var output = "从上地到西单驾车需要";
	
	var searchComplete = function (results){
		if (riding.getStatus() != BMAP_STATUS_SUCCESS){
			return ;
		}
		var plan = results.getPlan(0);
		
//		output += plan.getDuration(true) + "\n";                //获取时间
//		output += "总路程为：" ;
//		output += plan.getDistance(true) + "\n";             //获取距离

//		msx_zongshijian = plan.getDuration(false);
//		msx_zongjuli = plan.getDistance(false);
		
	}
	if( op.type == 2 ){
		var riding = new BMap.RidingRoute(map, {
	    renderOptions: { 
		        map: map, 
		        autoViewport: true 
		   },
		   onSearchComplete: searchComplete,
			onPolylinesSet: function(t){  
//				console.log(t.length);
				
//				console.log(t[0].getPolyline());
//				t[0].getPolyline().setStrokeColor("#000000");
				
			},
			onMarkersSet : function(t){
//				console.log(t.length);
//				console.log( t[0].marker.enableDragging() );
			}
		});
	}else if(op.type ==1){
		var riding = new BMap.DrivingRoute(map, {
	    renderOptions: { 
		        map: map, 
		        autoViewport: true 
		   },
		   onSearchComplete: searchComplete,
			onPolylinesSet: function(){
			}
		});
	}
	
	
	var start = new BMap.Point(op.msx_start_lng, op.msx_start_lat);
	var end = new BMap.Point(op.msx_end_lng, op.msx_end_lat);
	
	
	riding.search(start, end);

}


/*滚动条到底部的计算*/
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


//调用该函数判断是否已经到了底部
function _dibu(){
	
	if(   getScrollTop() + getWindowHeight() + 1 == getScrollHeight() || getScrollTop() + getWindowHeight() == getScrollHeight()  ){
		return true;
	}
	
	return false;

}

/* //调用该函数判断是否已经到了底部 */



/*
 * 切换底栏
 */
function qiehuandilan(index){
	api.execScript({
		name : 'root',
	    script: 'qiehuanyemian(' + index + ');',
	});
}

/*
 * 个人中心
 */
function msxGerenzhuye(member_id){
	window.event.stopPropagation();
	k('mokuai1/gerenzhuye.html?id='+member_id,'gerenzhuye');
}

/*
 * 
 */
function msxliaotian(){
	msxIm(1,goods_id);
}


/*
 * 打开IM信息
 */
function msxIm(to_member_id,goods_id){
	
	
	if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	
	var houzhui = '?to_member_id=1';
	
	if( arguments[1] ){
		houzhui = houzhui + '&goods_id='+goods_id;
	}
	
	if( session('member_id') == 1 ){//admin打开的
		api.openWin({
		    name: 'msxIm',
		    url: 'widget://im_win.html', 
		   	animation: {
				type: 'movein', //动画类型（详见动画类型常量）
				subType: donghua, //动画子类型（详见动画子类型常量）
				duration: frame_time //动画过渡时间，默认300毫秒
			},
		});
	}else{//其他人打开的
		k('im/danliao.html'+houzhui,'danliao');
		
	}
}


/*
 * im红点操作
 */
function msximhongdian(type){
	if(type == 1){
		$('.im-hongdian').show();
	}else{
		$('.im-hongdian').hide();
	}
}


/*
 * 微信登录 - 唤起
 */
function msxWxLogin(){
	getOpenId(2);
}

/*
 * QQ登录 - 唤起
 */
function msxQQLogin(){
	getQQOpenId(2);
}

/*
 * 绑定微信
 */
function msxBindWeixin(){
	getOpenId(1);
}

/*
 * 绑定QQ
 */
function msxBindQQ(){
	getQQOpenId(1);
}

/*
 * 微信登录 - 逻辑
 */
function msxWxLoginAjax(op){
	var shuju	=	{'type':'wx','sex':op.sex,'openid':op.openid,'unionid':op.unionid,'nickname':op.nickname,'headimgurl':op.headimgurl};
		var dizhi	=	ApiUrl + '/index.php?act=login&op=login';
		var func	=	'msxWxLoginAjaxchuli';
		var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
		
		ajax(op);
		ol('',1)
		
}
function msxWxLoginAjaxchuli(t){
	cl();
		
	if( t.error ){
		return false;
	}
	
	msxaddCookie('key',t.key);
	msxaddCookie('member_id',t.member_id);
	
	
	api.execScript({
		name : 'root',
	    frameName: 'wode',
	    script: "login();"
	});
	
	
	tishi('登录成功！');
	
	setTimeout(function() {
		msxBack();
	}, 2000);
}

/*
 * QQ登录 - 逻辑
 */
function msxQQLoginAjax(op){
	var shuju	=	{'type':'qq','sex':op.gender,'openid':op.openid,'unionid':op.unionid,'nickname':op.nickname,'headimgurl':op.figureurl_qq_2};
		var dizhi	=	ApiUrl + '/index.php?act=login&op=login';
		var func	=	'msxQQLoginAjaxchuli';
		var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
		
		ajax(op);
		ol('',1)
		
}
function msxQQLoginAjaxchuli(t){
	cl();
		
	if( t.error ){
		return false;
	}
	
	msxaddCookie('key',t.key);
	msxaddCookie('member_id',t.member_id);
	
	
	api.execScript({
		name : 'root',
	    frameName: 'wode',
	    script: "login();"
	});
	
	
	tishi('登录成功！');
	
	setTimeout(function() {
		msxBack();
	}, 2000);
}





/*
 * 分享逻辑
 */
function msxFenxiang(op){
	var type 	= 	op.type;
	var id		=	op.id;
	var index	=	op.index;
	
	
	var shuju	=	{'type':type,'id':id,'index':index,'curpage':1};
	var dizhi	=	ApiUrl + '/index.php?act=index&op=fenxiang';
	var func	=	'msxFenxiangchuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol('',1);
}
function msxFenxiangchuli(t){
	cl();
	
	console.log( JSON.stringify(t) );
	
	var rs		=	t.rs;
	
	
	var img 	= rs.img;
	var title 	= rs.title;
	var content = rs.content;
	var http_url= rs.http_url;
	var type	= rs.type;
	var id		= rs.id;
	var index	= rs.index;
	
	var file_path = 'fs://';
	var file_name = 'test'+type+id+'.png';
	var suolvtu = file_path + file_name;
	
	
	if( index == 1 || index == 2 ){//微信分享
		var weixin_type = 'timeline';
		if( index == 1 ){
			weixin_type = 'session';
		}
		
		api.imageCache({
		    url: img
		}, function(ret, err) {
			
			if( ret.status ){
			    var urls = ret.url;
			    
			    if( index == 1 || index == 2 ){
			    	
				    var imageFilter = api.require('imageFilter');
						imageFilter.compress({
						    img: urls,
						    size : {
						    	w : 100,
						    	h : 100
						    },
						    save : {
						    	imgPath : file_path,
						    	imgName : file_name
						    }
						},function( ret, err ){     
						    if( ret.status ){
						    	var wx = api.require('wx');
						    		wx.shareWebpage({
						    			apiKey: '',
						    		    scene: weixin_type,
						    		    title: title,
						    		    description: content,
						    		    thumb: suolvtu,
						    		    contentUrl: http_url
						    		}, function(ret, err) {
						    			
						    			fenxiangyemianguanbi();
		//				    		    if (ret.status) {
		//				    		        alert('分享成功');
		//				    		    } else {
		//				    		        alert(err.code);
		//				    		    }
		
						    		});
						    }else{
						    	alert('缩略图生成失败!!');
						    }
						});
			    	
			    	
			    }
			}else{
				alert('缩略图生成失败!');
			}
		});
		
	}else if( index == 3 || index == 4  ){//QQ分享
		var qq_type = 'QFriend';
		if( index == 4 ){
			qq_type = 'QZone';
		}
		
		var qq = api.require('QQPlus');
			qq.shareNews({
			    url: http_url,
			    title: title,
			    description: content,
			    imgUrl: img,
			    type : qq_type
			},function(ret,err){
			  	
			    fenxiangyemianguanbi();
			});
		
	}
	
	
	
}

/*
 * 关闭分享页面
 */
function fenxiangyemianguanbi(){
	api.closeFrame();
}


/*
 * 分享闲置
 */
function fenxiangxianzhi(id){
	var op = {};
		op.id = id;
		op.type = 'xianzhi';
	fenxiangyemian(op);
}

/*
 * 分享闲置
 */
function fenxiangzhuli(id){
	
	if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	
	var op = {};
		op.id = id;
		op.type = 'zhuli';
	fenxiangyemian(op);
}

/*
 * 分享发现
 */
function fenxiangfaxian(id){
	var op = {};
		op.id = id;
		op.type = 'faxian';
	fenxiangyemian(op);
}

/*
 * 分享商品
 */
function fenxiangshangpin(id){
	var op = {};
		op.id = id;
		op.type = 'shangpin';
	fenxiangyemian(op);
}

/*
 * 预览图片
 */
function msxyulantupian(dom,index){
	window.event.stopPropagation();
	var is_video = false;
	var video_path = '';
	var img_arr = [];
	$(dom).parent().find('img').each(function(){
		var path = $(this).attr('src');
		img_arr.push(path);
		video_path = $(this).attr('data-video');
		if( video_path ){
			is_video = true;
			return false;
		}
	});
	
	
	if( is_video ){
		msxDakaishipin(video_path);
	}else{
		msxDakaitupian(img_arr,index);
	}
	
}

/*
 * 定位
 */
function msxdingwei(){
	var bmLocation = api.require('bmLocation');
	bmLocation.configManager({
	    accuracy: 'device_sensors',
	    coordinateType:'BMK09LL',
	    locationTimeout: 10,
	});
	
	bmLocation.singleLocation({
	    reGeocode: false,
	    netWorkState: false
	}, function(ret) {
	    var sta = ret.status;
	    if (sta) {
	    	
	    	session('lng',ret.location.longitude);
			session('lat',ret.location.latitude);
			session('city_name',ret.reGeo.district);
	    	
	    } else {
//	        api.alert({ msg: '发生错误' });
	    }
	});
	
}

/*
 * 二维码
 */
function msxQrcode(){
	window.event.stopPropagation();
	var FNScanner = api.require('FNScanner');
		FNScanner.open({
		    autorotation: true
		}, function(ret, err) {
		    if (ret) {
//		        alert(JSON.stringify(ret));
		    } else {
//		        alert(JSON.stringify(err));
		    }
		});
	
}



/*
 * 微信支付
 */
function msxWxPay(op,type){
	
	if( sysType == 'wx' ){
		return false;
	}
	
	
	
	var wxPay = api.require('wxPay');
		wxPay.payOrder({
		    apiKey: '',
		    orderId: op.prepayid,
		    mchId: op.partnerid,
		    nonceStr: op.noncestr,
		    timeStamp: op.timestamp,
		    package: op.package,
		    sign: op.sign
		}, function(ret, err) {
		    if (ret.status) {
		        
		        if( type == 1 ){
		        	openshiwudingdan()
		        }else if(type==2){
		        	shuaxinshiwudingdan()
		        }else if(type==3){
		        	api.execScript({
					    name: 'huiyuanquanyi',
						frameName: 'zhimakaimen',
					    script: 'goumai();'
					});
		        }else if(type==4){
		        	api.execScript({
					    name: 'danliao',
						frameName: 'zhimakaimen',
					    script: 'dashangchuli();'
					});
		        }else if(type==5){
		        	api.execScript({
					    name: 'pintuan_list',
						frameName: 'zhimakaimen',
					    script: 'zhifuchenggong();'
					});
		        }
		    } else {
//		        alert(err.code);
		    }
		});
}

/*
 * 支付成功,刷新实物订单
 */
function shuaxinshiwudingdan(){
	api.execScript({
	    name: 'order_list',
		frameName: 'zhimakaimen',
	    script: 'zhifuchenggong();'
	});
}

/*
 * 支付成功,打开实物订单
 */
function openshiwudingdan(){
	api.execScript({
	    name: 'root',
	    script: 'qiehuanyemian('+5+');'
	});
	k('tmpl/member/order_list.html','order_list');
	
	setTimeout(function() {
		api.closeWin({
		    name: 'shangpinxiangqing-w',
		    animation : {
			    type:"none",                //动画类型（详见动画类型常量）
			    subType:"none",       //动画子类型（详见动画子类型常量）
			    duration:1                //动画过渡时间，默认300毫秒
			}
		});
		api.closeWin({
		    name: 'byu1',
		    animation : {
			    type:"none",                //动画类型（详见动画类型常量）
			    subType:"none",       //动画子类型（详见动画子类型常量）
			    duration:1                //动画过渡时间，默认300毫秒
			}
		});
	}, 1000);
	
	
	

}












/*************************************************************/
;(function () {
	'use strict';

	/**
	 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
	 *
	 * @codingstandard ftlabs-jsv2
	 * @copyright The Financial Times Limited [All Rights Reserved]
	 * @license MIT License (see LICENSE.txt)
	 */

	/*jslint browser:true, node:true*/
	/*global define, Event, Node*/


	/**
	 * Instantiate fast-clicking listeners on the specified layer.
	 *
	 * @constructor
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	function FastClick(layer, options) {
		var oldOnClick;

		options = options || {};

		/**
		 * Whether a click is currently being tracked.
		 *
		 * @type boolean
		 */
		this.trackingClick = false;


		/**
		 * Timestamp for when click tracking started.
		 *
		 * @type number
		 */
		this.trackingClickStart = 0;


		/**
		 * The element being tracked for a click.
		 *
		 * @type EventTarget
		 */
		this.targetElement = null;


		/**
		 * X-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartX = 0;


		/**
		 * Y-coordinate of touch start event.
		 *
		 * @type number
		 */
		this.touchStartY = 0;


		/**
		 * ID of the last touch, retrieved from Touch.identifier.
		 *
		 * @type number
		 */
		this.lastTouchIdentifier = 0;


		/**
		 * Touchmove boundary, beyond which a click will be cancelled.
		 *
		 * @type number
		 */
		this.touchBoundary = options.touchBoundary || 10;


		/**
		 * The FastClick layer.
		 *
		 * @type Element
		 */
		this.layer = layer;

		/**
		 * The minimum time between tap(touchstart and touchend) events
		 *
		 * @type number
		 */
		this.tapDelay = options.tapDelay || 200;

		/**
		 * The maximum time for a tap
		 *
		 * @type number
		 */
		this.tapTimeout = options.tapTimeout || 700;

		if (FastClick.notNeeded(layer)) {
			return;
		}

		// Some old versions of Android don't have Function.prototype.bind
		function bind(method, context) {
			return function() { return method.apply(context, arguments); };
		}


		var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
		var context = this;
		for (var i = 0, l = methods.length; i < l; i++) {
			context[methods[i]] = bind(context[methods[i]], context);
		}

		// Set up event handlers as required
		if (deviceIsAndroid) {
			layer.addEventListener('mouseover', this.onMouse, true);
			layer.addEventListener('mousedown', this.onMouse, true);
			layer.addEventListener('mouseup', this.onMouse, true);
		}

		layer.addEventListener('click', this.onClick, true);
		layer.addEventListener('touchstart', this.onTouchStart, false);
		layer.addEventListener('touchmove', this.onTouchMove, false);
		layer.addEventListener('touchend', this.onTouchEnd, false);
		layer.addEventListener('touchcancel', this.onTouchCancel, false);

		// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
		// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
		// layer when they are cancelled.
		if (!Event.prototype.stopImmediatePropagation) {
			layer.removeEventListener = function(type, callback, capture) {
				var rmv = Node.prototype.removeEventListener;
				if (type === 'click') {
					rmv.call(layer, type, callback.hijacked || callback, capture);
				} else {
					rmv.call(layer, type, callback, capture);
				}
			};

			layer.addEventListener = function(type, callback, capture) {
				var adv = Node.prototype.addEventListener;
				if (type === 'click') {
					adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
						if (!event.propagationStopped) {
							callback(event);
						}
					}), capture);
				} else {
					adv.call(layer, type, callback, capture);
				}
			};
		}

		// If a handler is already declared in the element's onclick attribute, it will be fired before
		// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
		// adding it as listener.
		if (typeof layer.onclick === 'function') {

			// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
			// - the old one won't work if passed to addEventListener directly.
			oldOnClick = layer.onclick;
			layer.addEventListener('click', function(event) {
				oldOnClick(event);
			}, false);
			layer.onclick = null;
		}
	}

	/**
	* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
	*
	* @type boolean
	*/
	var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;

	/**
	 * Android requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;


	/**
	 * iOS requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;


	/**
	 * iOS 4 requires an exception for select elements.
	 *
	 * @type boolean
	 */
	var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);


	/**
	 * iOS 6.0-7.* requires the target element to be manually derived
	 *
	 * @type boolean
	 */
	var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);

	/**
	 * BlackBerry requires exceptions.
	 *
	 * @type boolean
	 */
	var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;

	/**
	 * Determine whether a given element requires a native click.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element needs a native click
	 */
	FastClick.prototype.needsClick = function(target) {
		switch (target.nodeName.toLowerCase()) {

		// Don't send a synthetic click to disabled inputs (issue #62)
		case 'button':
		case 'select':
		case 'textarea':
			if (target.disabled) {
				return true;
			}

			break;
		case 'input':

			// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
			if ((deviceIsIOS && target.type === 'file') || target.disabled) {
				return true;
			}

			break;
		case 'label':
		case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
		case 'video':
			return true;
		}

		return (/\bneedsclick\b/).test(target.className);
	};


	/**
	 * Determine whether a given element requires a call to focus to simulate click into element.
	 *
	 * @param {EventTarget|Element} target Target DOM element
	 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
	 */
	FastClick.prototype.needsFocus = function(target) {
		switch (target.nodeName.toLowerCase()) {
		case 'textarea':
			return true;
		case 'select':
			return !deviceIsAndroid;
		case 'input':
			switch (target.type) {
			case 'button':
			case 'checkbox':
			case 'file':
			case 'image':
			case 'radio':
			case 'submit':
				return false;
			}

			// No point in attempting to focus disabled inputs
			return !target.disabled && !target.readOnly;
		default:
			return (/\bneedsfocus\b/).test(target.className);
		}
	};


	/**
	 * Send a click event to the specified element.
	 *
	 * @param {EventTarget|Element} targetElement
	 * @param {Event} event
	 */
	FastClick.prototype.sendClick = function(targetElement, event) {
		var clickEvent, touch;

		// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
		if (document.activeElement && document.activeElement !== targetElement) {
			document.activeElement.blur();
		}

		touch = event.changedTouches[0];

		// Synthesise a click event, with an extra attribute so it can be tracked
		clickEvent = document.createEvent('MouseEvents');
		clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		clickEvent.forwardedTouchEvent = true;
		targetElement.dispatchEvent(clickEvent);
	};

	FastClick.prototype.determineEventType = function(targetElement) {

		//Issue #159: Android Chrome Select Box does not open with a synthetic click event
		if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
			return 'mousedown';
		}

		return 'click';
	};


	/**
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.focus = function(targetElement) {
		var length;

		// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
		if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month' && targetElement.type !== 'email') {
			length = targetElement.value.length;
			targetElement.setSelectionRange(length, length);
		} else {
			targetElement.focus();
		}
	};


	/**
	 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
	 *
	 * @param {EventTarget|Element} targetElement
	 */
	FastClick.prototype.updateScrollParent = function(targetElement) {
		var scrollParent, parentElement;

		scrollParent = targetElement.fastClickScrollParent;

		// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
		// target element was moved to another parent.
		if (!scrollParent || !scrollParent.contains(targetElement)) {
			parentElement = targetElement;
			do {
				if (parentElement.scrollHeight > parentElement.offsetHeight) {
					scrollParent = parentElement;
					targetElement.fastClickScrollParent = parentElement;
					break;
				}

				parentElement = parentElement.parentElement;
			} while (parentElement);
		}

		// Always update the scroll top tracker if possible.
		if (scrollParent) {
			scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
		}
	};


	/**
	 * @param {EventTarget} targetElement
	 * @returns {Element|EventTarget}
	 */
	FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {

		// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
		if (eventTarget.nodeType === Node.TEXT_NODE) {
			return eventTarget.parentNode;
		}

		return eventTarget;
	};


	/**
	 * On touch start, record the position and scroll offset.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchStart = function(event) {
		var targetElement, touch, selection;

		// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
		if (event.targetTouches.length > 1) {
			return true;
		}

		targetElement = this.getTargetElementFromEventTarget(event.target);
		touch = event.targetTouches[0];

		if (deviceIsIOS) {

			// Only trusted events will deselect text on iOS (issue #49)
			selection = window.getSelection();
			if (selection.rangeCount && !selection.isCollapsed) {
				return true;
			}

			if (!deviceIsIOS4) {

				// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
				// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
				// with the same identifier as the touch event that previously triggered the click that triggered the alert.
				// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
				// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
				// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
				// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
				// random integers, it's safe to to continue if the identifier is 0 here.
				if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
					event.preventDefault();
					return false;
				}

				this.lastTouchIdentifier = touch.identifier;

				// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
				// 1) the user does a fling scroll on the scrollable layer
				// 2) the user stops the fling scroll with another tap
				// then the event.target of the last 'touchend' event will be the element that was under the user's finger
				// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
				// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
				this.updateScrollParent(targetElement);
			}
		}

		this.trackingClick = true;
		this.trackingClickStart = event.timeStamp;
		this.targetElement = targetElement;

		this.touchStartX = touch.pageX;
		this.touchStartY = touch.pageY;

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			event.preventDefault();
		}

		return true;
	};


	/**
	 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.touchHasMoved = function(event) {
		var touch = event.changedTouches[0], boundary = this.touchBoundary;

		if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
			return true;
		}

		return false;
	};


	/**
	 * Update the last position.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchMove = function(event) {
		if (!this.trackingClick) {
			return true;
		}

		// If the touch has moved, cancel the click tracking
		if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
			this.trackingClick = false;
			this.targetElement = null;
		}

		return true;
	};


	/**
	 * Attempt to find the labelled control for the given label element.
	 *
	 * @param {EventTarget|HTMLLabelElement} labelElement
	 * @returns {Element|null}
	 */
	FastClick.prototype.findControl = function(labelElement) {

		// Fast path for newer browsers supporting the HTML5 control attribute
		if (labelElement.control !== undefined) {
			return labelElement.control;
		}

		// All browsers under test that support touch events also support the HTML5 htmlFor attribute
		if (labelElement.htmlFor) {
			return document.getElementById(labelElement.htmlFor);
		}

		// If no for attribute exists, attempt to retrieve the first labellable descendant element
		// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
		return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
	};


	/**
	 * On touch end, determine whether to send a click event at once.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onTouchEnd = function(event) {
		var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;

		if (!this.trackingClick) {
			return true;
		}

		// Prevent phantom clicks on fast double-tap (issue #36)
		if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
			this.cancelNextClick = true;
			return true;
		}

		if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
			return true;
		}

		// Reset to prevent wrong click cancel on input (issue #156).
		this.cancelNextClick = false;

		this.lastClickTime = event.timeStamp;

		trackingClickStart = this.trackingClickStart;
		this.trackingClick = false;
		this.trackingClickStart = 0;

		// On some iOS devices, the targetElement supplied with the event is invalid if the layer
		// is performing a transition or scroll, and has to be re-detected manually. Note that
		// for this to function correctly, it must be called *after* the event target is checked!
		// See issue #57; also filed as rdar://13048589 .
		if (deviceIsIOSWithBadTarget) {
			touch = event.changedTouches[0];

			// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
			targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
			targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
		}

		targetTagName = targetElement.tagName.toLowerCase();
		if (targetTagName === 'label') {
			forElement = this.findControl(targetElement);
			if (forElement) {
				this.focus(targetElement);
				if (deviceIsAndroid) {
					return false;
				}

				targetElement = forElement;
			}
		} else if (this.needsFocus(targetElement)) {

			// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
			// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
			if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
				this.targetElement = null;
				return false;
			}

			this.focus(targetElement);
			this.sendClick(targetElement, event);

			// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
			// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
			if (!deviceIsIOS || targetTagName !== 'select') {
				this.targetElement = null;
				event.preventDefault();
			}

			return false;
		}

		if (deviceIsIOS && !deviceIsIOS4) {

			// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
			// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
			scrollParent = targetElement.fastClickScrollParent;
			if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
				return true;
			}
		}

		// Prevent the actual click from going though - unless the target node is marked as requiring
		// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
		if (!this.needsClick(targetElement)) {
			event.preventDefault();
			this.sendClick(targetElement, event);
		}

		return false;
	};


	/**
	 * On touch cancel, stop tracking the click.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.onTouchCancel = function() {
		this.trackingClick = false;
		this.targetElement = null;
	};


	/**
	 * Determine mouse events which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onMouse = function(event) {

		// If a target element was never set (because a touch event was never fired) allow the event
		if (!this.targetElement) {
			return true;
		}

		if (event.forwardedTouchEvent) {
			return true;
		}

		// Programmatically generated events targeting a specific element should be permitted
		if (!event.cancelable) {
			return true;
		}

		// Derive and check the target element to see whether the mouse event needs to be permitted;
		// unless explicitly enabled, prevent non-touch click events from triggering actions,
		// to prevent ghost/doubleclicks.
		if (!this.needsClick(this.targetElement) || this.cancelNextClick) {

			// Prevent any user-added listeners declared on FastClick element from being fired.
			if (event.stopImmediatePropagation) {
				event.stopImmediatePropagation();
			} else {

				// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
				event.propagationStopped = true;
			}

			// Cancel the event
			event.stopPropagation();
			event.preventDefault();

			return false;
		}

		// If the mouse event is permitted, return true for the action to go through.
		return true;
	};


	/**
	 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
	 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
	 * an actual click which should be permitted.
	 *
	 * @param {Event} event
	 * @returns {boolean}
	 */
	FastClick.prototype.onClick = function(event) {
		var permitted;

		// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
		if (this.trackingClick) {
			this.targetElement = null;
			this.trackingClick = false;
			return true;
		}

		// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
		if (event.target.type === 'submit' && event.detail === 0) {
			return true;
		}

		permitted = this.onMouse(event);

		// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
		if (!permitted) {
			this.targetElement = null;
		}

		// If clicks are permitted, return true for the action to go through.
		return permitted;
	};


	/**
	 * Remove all FastClick's event listeners.
	 *
	 * @returns {void}
	 */
	FastClick.prototype.destroy = function() {
		var layer = this.layer;

		if (deviceIsAndroid) {
			layer.removeEventListener('mouseover', this.onMouse, true);
			layer.removeEventListener('mousedown', this.onMouse, true);
			layer.removeEventListener('mouseup', this.onMouse, true);
		}

		layer.removeEventListener('click', this.onClick, true);
		layer.removeEventListener('touchstart', this.onTouchStart, false);
		layer.removeEventListener('touchmove', this.onTouchMove, false);
		layer.removeEventListener('touchend', this.onTouchEnd, false);
		layer.removeEventListener('touchcancel', this.onTouchCancel, false);
	};


	/**
	 * Check whether FastClick is needed.
	 *
	 * @param {Element} layer The layer to listen on
	 */
	FastClick.notNeeded = function(layer) {
		var metaViewport;
		var chromeVersion;
		var blackberryVersion;
		var firefoxVersion;

		// Devices that don't support touch don't need FastClick
		if (typeof window.ontouchstart === 'undefined') {
			return true;
		}

		// Chrome version - zero for other browsers
		chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (chromeVersion) {

			if (deviceIsAndroid) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// Chrome 32 and above with width=device-width or less don't need FastClick
					if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}

			// Chrome desktop doesn't need FastClick (issue #15)
			} else {
				return true;
			}
		}

		if (deviceIsBlackBerry10) {
			blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);

			// BlackBerry 10.3+ does not require Fastclick library.
			// https://github.com/ftlabs/fastclick/issues/251
			if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
				metaViewport = document.querySelector('meta[name=viewport]');

				if (metaViewport) {
					// user-scalable=no eliminates click delay.
					if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
						return true;
					}
					// width=device-width (or less than device-width) eliminates click delay.
					if (document.documentElement.scrollWidth <= window.outerWidth) {
						return true;
					}
				}
			}
		}

		// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
		if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		// Firefox version - zero for other browsers
		firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];

		if (firefoxVersion >= 27) {
			// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896

			metaViewport = document.querySelector('meta[name=viewport]');
			if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
				return true;
			}
		}

		// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
		// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
		if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
			return true;
		}

		return false;
	};


	/**
	 * Factory method for creating a FastClick object
	 *
	 * @param {Element} layer The layer to listen on
	 * @param {Object} [options={}] The options to override the defaults
	 */
	FastClick.attach = function(layer, options) {
		return new FastClick(layer, options);
	};


	if (typeof define === 'function' && typeof define.amd === 'object' && define.amd) {

		// AMD. Register as an anonymous module.
		define(function() {
			return FastClick;
		});
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = FastClick.attach;
		module.exports.FastClick = FastClick;
	} else {
		window.FastClick = FastClick;
	}
}());


try{
	ios_click
}catch(e){
     document.addEventListener('DOMContentLoaded',function() {

     FastClick.attach(document.body);

   },false);
}
