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
		'per_page' : per_page
	};
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


function msxaddCookie(name,value,expireHours){
	var cookieString=name+"="+escape(value)+"; path=/";
	//判断是否设置过期时间
	if(expireHours>0){
		var date=new Date();
		date.setTime(date.getTime()+expireHours*3600*1000);
		cookieString=cookieString+";expires="+date.toGMTString();
	}
	document.cookie=cookieString;
}

function msxgetCookie(name){
	var strcookie=document.cookie;
	var arrcookie=strcookie.split("; ");
	for(var i=0;i<arrcookie.length;i++){
	var arr=arrcookie[i].split("=");
	if(arr[0]==name)return unescape(arr[1]);
	}
	return null;
}

function msxdelCookie(name){//删除cookie
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval=getCookie(name);
	if(cval!=null) document.cookie= name + "="+cval+"; path=/;expires="+exp.toGMTString();
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
	if(!www){
		return false;
	}
	
	
	
	var apis	=	apiUrl + op.dizhi;
	var datas 	= getSendData(op.shuju);
	var wenjian	=	op.wenjian || '' ;
	var qingqiufangshi	=	wenjian==''?'get':'post';
	
	if( op.method ){
		qingqiufangshi	=	op.method;
	}
	
	
	// 调试用
	var hehe	=	qingqiucanshu(datas);
	die( apis + '?a=b' + hehe );
	
	
	if( op.type == 1 ){	//	启用ajaxupload模式
		
		$.ajaxFileUpload({
	        url				:	apis,  
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
		
		api.ajax({
		    url: apis,
		    method : qingqiufangshi,
		    timeout : dengdaichaoshi/1000,
		    data: {
		        values: datas,
		        files : wenjian,
			   },
		}, function(ret, err) {
			
				die(ret);
				die(err);
			
			    if (ret) {
		        	eval( op.func + '(ret)' );
			    } else {
		        	eval( op.func + '(err)' );
			    }
		});
	}
}

//	通用Jquery网络请求
function jajax(op){
//	var www		=	wangluozhuangtai();
//	if(!www){
//		return false;
//	}
	
	
	var apis	=	apiUrl + op.dizhi;
//	var datas 	= getSendData(op.shuju);
	var datas 	= op.datas;
	var qingqiufangshi	= 'get';
	
	if( op.dataType ){
		qingqiufangshi	=	op.dataType;
	}
	
	
	// 调试用
	var hehe	=	qingqiucanshu(datas);
//	die( apis + '?a=b' + hehe );
		
		$.ajax({
		    url: apis,
		    dataType : 'json',
		    type : qingqiufangshi,
		    data: datas,
		    success : function(ret){
//		    	die(ret)
				eval( op.func + '(ret)' );
		    }
				
		});
}

//	通用打开窗口
function ow(op){
	api.openWin({
	    name: op.name,
	    url: op.html,
	   	animation: {
			type: 'movein', //动画类型（详见动画类型常量）
			subType: "from_right", //动画子类型（详见动画子类型常量）
			duration: 200 //动画过渡时间，默认300毫秒
		},
	});
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
		return localStorage.getItem(k);
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
        var s = api.connectionType;
        s = s.toLowerCase();
        if ((s.indexOf('wifi') != -1) || (s.indexOf('3g') != -1) || (s.indexOf('4g') != -1) || (s.indexOf('2g') != -1)) {	//	有网络
                type = true;
        } else {		//	无网络
               type = false;
        }
        if( s == '2g' ){
        	type = false;
        }
        
//      if( s == 'unknown' ){	//	从WIFI切换到4G网络的时候，偶尔会出现这种情况！
//      	type == true;
//      }
        
        
        return type;
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
function ol(tishi){
	
	var tishititle	=	tishi || dengdaitishi;
	
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
	clearTimeout(dengdaitypeid);
	api.hideProgress();
}

//通用提示
function tishi(msg){
	api.toast({
	    msg: msg,
	    duration: 2000,
	    location: 'middle'
	});
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
//							        alert(JSON.stringify(ret));
									
									var openid	=	ret.openId;
									
									if( type == 1 ){
										bindWx(openid);
									}else{
										weixindenglu(openid);
									}
									
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

function bindWx(openid){
	
	ol('正在绑定中...');
	var openid	=	wodejiami(openid);
	
	var shuju	=	{'openid':openid};
	var dizhi	=	'/def/User/weichat_bind';
	var func	=	'bangdingweixinchuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

// 绑定微信 - 回调处理
function bangdingweixinchuli(data){
	cl();
	tishi( data.msg );
	if( data.code == 200 ){
		session('is_bind_wx',1);
	}
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

function wxFenxiang(){
	
	api.imageCache({
	    url: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2124134380,2727099961&fm=111&gp=0.jpg'
	}, function(ret, err) {
	    var urls = ret.url;
	    var wx = api.require('wx');
	    	wx.shareWebpage({
	    	    apiKey: '',
	    	    scene: 'timeline',
	    	    title: '测试标题',
	    	    description: '我是一个卖报的小行家',
	    	    thumb: urls,
	    	    contentUrl: 'http://www.ccadh.com'
	    	}, function(ret, err) {
	    	    if (ret.status) {
	    	        alert('分享成功');
	    	    } else {
	    	        alert(err.code);
	    	    }
	    	});
	    
	});
	
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