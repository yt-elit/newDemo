
var wuli_gao = window.screen.height * window.devicePixelRatio;


var to_member_id = geiGet('to_member_id',false);
var member_id		=	session('member_id');
var member_avatar = session('member_avatar');
var msg_type = 1;//消息类型
var to_member_avatar;//对方的头像

var goods_id = geiGet('goods_id',false);



if( goods_id ){
	fasongshangpin(goods_id);
}

if( sysType == 'wx' ){
	
	_init();
}else{
	//app准备成功
	apiready = function(){
		api.execScript({
			name : 'danliao',
		    script: 'imhuitui();'
		});
		
		
		_init();
	}
}

/*
 * 发送商品
 */
function fasongshangpin(goods_id){
	fasong(goods_id,5);
}


//发送消息
function fasong(html,types){
		var params = {};
			params = {'member_id':member_id,'to_member_id':to_member_id,'neirong':html,'type':types};
		if( types == 3 ){
			params.lng = param_lng;
			params.lat = param_lat;
		}
		
		if( types == 6 ){
			params.img = suolvetu;
		}
		
		if( types == 7 ){
			params.luyinshichang = luyinshichang;
		}
		
		var shuju	=	params;
		var dizhi	=	ApiUrl + '/index.php?act=im&op=send';
		var func	=	'fasongchuli';
		var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
		ajax(op);
}
	
function fasongchuli(t){
	cl();
}

var is_dibula = false;
fanye();//绑定翻页事件
//获取接口参数
function _init(){
	var shuju	=	{'member_id':member_id,'to_member_id':to_member_id,'reset':1};
		var dizhi	=	ApiUrl + '/index.php?act=im&op=lunxun';
		var func	=	'_handle';
		var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
		ajax(op);
}

var gengzaoxiaoxi_id=0;//查看更早消息用
//处理返回数据
function _handle(t){
	to_member_avatar = t.to_member_info.member_avatar;
	$('#to_member_name').text(t.to_member_info.member_nickname);
	
	if( t.list.length == 10 ){
		$('.chakangengzaoxiaoxi').show();
		gengzaoxiaoxi_id = t.list[0].id;
	}
	
	xuanranliebiao(t);
	lunxun();
}

//获取接口参数
function chakangengzaoxiaoxi(){
	
	$('.chakangengzaoxiaoxi').hide();
	
	var shuju	=	{'member_id':member_id,'to_member_id':to_member_id,'gengzaoxiaoxi':1,'xiaoxi_id':gengzaoxiaoxi_id};
		var dizhi	=	ApiUrl + '/index.php?act=im&op=lunxun';
		var func	=	'chakangengzaoxiaoxichuli';
		var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
		ajax(op);
}


var dingbu_jishi_id;
//处理返回数据
function chakangengzaoxiaoxichuli(t){

	
	if( t.list.length == 0 ){
		return false;
	}
	
	
	
	var data = {};
		data.data = t.list;
		data.member_avatar = member_avatar;
		data.member_id = member_id;
		data.to_member_id = to_member_id;
		data.to_member_avatar = to_member_avatar;
		data.hehe = 1;
		
	var html = template.render('list-tp',data);
	$('#J__chatMsgList').prepend(html);
	
	$('#J__chatMsgList').css('visibility','hidden');
	
	
	chushihuatupian();
}
/*
 * 
 */
function hehe(){
	var old_top = $('#imid'+gengzaoxiaoxi_id).offset();
	var old_top = old_top.top-90;
	$(".wc__chatMsg-panel").animate({scrollTop: old_top}, 0);
	$('#J__chatMsgList').css('visibility','visible');
//	clearInterval(dingbu_jishi_id);
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
 * 打开相册
 */
function dakaixiangce(){
	
	hidegongnengkuang();
	
	//手机相册选图片
	var obj = api.require('UIMediaScanner');
	obj.open({
		type : 'picture',
		column : 3,
		max : 1,
		sort : {
			key : 'time',
			order : 'desc'
		},
		texts : {
			stateText : '已选择*项',
			cancelText : '取消',
			finishText : '完成'
		},
		styles : {
			bg : '#fff',
			mark : {
				icon : '',
				position : 'bottom_right',
				size : 20
			},
			nav : {
				bg : '#eee',
				stateColor : '#000',
				stateSize : 18,
				cancleBg : 'rgba(0,0,0,0)',
				cancelColor : '#000',
				cancelSize : 18,
				finishBg : 'rgba(0,0,0,0)',
				finishColor : '#000',
				finishSize : 18
			}
		}
	}, function(ret) {
		//将选择的图像进行剪辑
		if (ret.eventType == 'cancel') {
		} else if (ret.list.length > 0) {
			
			var i = ret.list[0];
			
			fasongtupian_1(i.path);
			
		}
	});
	
	
	
}


/*
 * 打开相机
 */
function dakaixiangji(){
	
	hidegongnengkuang();
	
	api.getPicture({
		sourceType : 'camera',
		encodingType : 'png',
		mediaValue : 'pic',
		allowEdit : false,
		quality : 96,
		saveToPhotoAlbum : false
	}, function(ret, err) {
		// 获取拍照图像并剪辑
		if (ret.data!='') {
			fasongtupian_1(ret.data);
		}
	});
}

/*
 * 发送图片第一步  获取图片,展示在内容页,之后上传到服务器
 */
function fasongtupian_1(tupian){
	var list = {};
		list.is_me = 1;
		list.type = 2;
		list.member_avatar = member_avatar;
		list.member_id = member_id;
		list.neirong = tupian;
	
	var t = {};
		t.list = [];
		t.list.push(list);
		xuanranliebiao(t);
		liaotian_todibu();
		
		
		api.ajax({
		    url: apiUrl + '/Home/Public/Upload',
		    method : 'post',
		    report : true,
			cache : 'false',
		    data: {
		        values: {},
		        files : {
		        	filea : tupian
		        },
			   },
		}, function(ret, err) {
				die(ret);
				if( ret.progress == 100 && ret.status == 1 ){
					fasong(ret.body.listData.img,2);
				}
		});
		
		
}

/*
 * 发送位置图片
 */
var param_lng;//发送的坐标lng
var param_lat;//发送的坐标lat
function fasongweizhi(tupian,lng,lat){
	
	
	param_lng = lng;
	param_lat = lat;
	
	var list = {};
		list.is_me = 1;
		list.type = 3;
		list.member_avatar = member_avatar;
		list.member_id = member_id;
		list.neirong = tupian;
		list.lng = param_lng;
		list.lat = param_lat;
	
	var t = {};
		t.list = [];
		t.list.push(list);
		xuanranliebiao(t);
		liaotian_todibu();
		
		fasong(tupian,3);
}



/*
 * 聊天框到底部
 */
var dibu_jishi_id=0;
function liaotian_todibu(){
	clearInterval(dibu_jishi_id);
	dibu_jishi_id = setInterval(function(){
		$(".wc__chatMsg-panel").animate({scrollTop: 444444}, 0);
	},10);
	setTimeout(function() {
		clearInterval(dibu_jishi_id);
	}, 444);
}

/*
 * 功能框隐藏
 */
function hidegongnengkuang(){
	$(".wc__choose-panel").hide();
}


/*
 * 打开位置
 */
function dakaiweizhi(){
	hidegongnengkuang();
	k('im/faburenwu.html','faburenwu');
}


/*
 * 打开地图
 */
function dakaiditu(lng,lat){
	window.event.stopPropagation();
	k('im/dakaiditu.html?lng='+lng+'&lat='+lat,'dakaiditu');
}

var hongbaojine=0;
/*
 * 打开红包
 */
function jianchahongbao(){
	if( hongbaojine < 0.01 ){
		return false;
	}
	
	var shuju	=	{'price':hongbaojine};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=dashang';
	var func	=	'goumaichuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	ajax(op);
	
	
}

function dashangchuli(){
	wcPop.close(bpidx);
	fasonghongbao();
}

function goumaichuli(t){
	msxWxPay(t.return,4);
}

/*
 * 设置红包金额
 */
function shezhihongbaojine(dom){
	var i = $(dom).val();
	hongbaojine = Number(i);
}


/*
 * 发送红包
 */
function fasonghongbao(){
	
	var list = {};
		list.is_me = 1;
		list.type = 4;
		list.member_avatar = member_avatar;
		list.member_id = member_id;
		list.neirong = hongbaojine;
	
	var t = {};
		t.list = [];
		t.list.push(list);
		xuanranliebiao(t);
		liaotian_todibu();
	
	fasong(hongbaojine,4);
}


/*
 * 打开短视频
 */
function dakaiduanshipin(){
	var op = {};
		op.name = 'luxiang-w';
		op.html = '../html/luxiang-w.html';
	ow(op);
}

/*
 * 发送短视频,第一步上传视频文件
 */
var suolvetu;
function fasongduanshipin(neirong,img){
	suolvetu = img;
	var list = {};
		list.is_me = 1;
		list.type = 6;
		list.member_avatar = member_avatar;
		list.member_id = member_id;
		list.neirong = neirong;
		list.img = suolvetu;
	
	var t = {};
		t.list = [];
		t.list.push(list);
		xuanranliebiao(t);
		liaotian_todibu();
	
	
	
	
	api.ajax({
	    url: apiUrl + '/Home/Public/Upload',
	    method : 'post',
	    report : true,
		cache : 'false',
	    data: {
	        values: { type:1 },
	        files : {
	        	filea : neirong
	        },
		   },
	}, function(ret, err) {
			die(ret);
			if( ret.progress == 100 && ret.status == 1){
				fasongsuolvetu(ret.body.listData.img);
			}
	});
	
}

/*
 * 上传视频
 */
var video_path;
function fasongsuolvetu(video_p){
	video_path = video_p;
	api.ajax({
	    url: apiUrl + '/Home/Public/Upload',
	    method : 'post',
	    report : true,
		cache : 'false',
	    data: {
	        values: {},
	        files : {
	        	filea : suolvetu
	        },
		   },
	}, function(ret, err) {
			die(ret);
			if( ret.progress == 100 && ret.status == 1  ){
				suolvetu = ret.body.listData.img;
				fasong(video_path,6);
			}
	});
}


/*
 * 播放视频
 */
function bofangshipin(dom){
	var video = document.getElementById("J__videoPreview");
	
	video.src = $(dom).find("img").attr("videoUrl");
	$(".wc__popup-videoPreview").show();
	if(video.paused){
		video.play();
	}else{
		video.pause();
	}
}

/*
 * 渲染列表
 */
function xuanranliebiao(t){
	
	if( t.list.length == 0 ){
		return false;
	}
	
	var zg = $('.chatMsg-cnt').height();//聊天框总高
	var gdwz = $('.wc__chatMsg-panel').scrollTop();//滚动条位置
	var keshigao = $('.wc__chatMsg-panel').height();//可视高度
	var is_zuixia = false;
	if( zg < gdwz + keshigao ){
		is_zuixia = true;
	}
	
	
	var data = {};
		data.data = t.list;
		data.member_avatar = member_avatar;
		data.member_id = member_id;
		data.to_member_id = to_member_id;
		data.to_member_avatar = to_member_avatar;
		
	var html = template.render('list-tp',data);
	$('#J__chatMsgList').append(html);
	
	
	if( is_zuixia ){//滚动条在最下面的话
		clearInterval(dibu_jishi_id);
		liaotian_todibu();
	}
	
	chushihuatupian();
}

/*
 * 初始化图片
 */
function chushihuatupian(){
	var curIndex = 0, imgPreviewSwiper;
		$("#J__chatMsgList li").off("click", ".picture");
		$("#J__chatMsgList li").on("click", ".picture", function(){
			var html = "",  _src = $(this).find("img").attr("src");

			$("#J__chatMsgList li .picture").each(function(i, item){
				html += '<div class="swiper-slide"><div class="swiper-zoom-container">'+ $(this).html() +'</div></div>';
				if($(this).find("img").attr("src") == _src){
					curIndex = i;
				}
			});
			$(".J__swiperImgPreview .swiper-wrapper").html(html);
			$(".wc__popup-imgPreview").show();

			imgPreviewSwiper = new Swiper('.J__swiperImgPreview',{
				pagination: false,
				paginationClickable: true,
				zoom: true,
				observer: true,
				observeParents: true,
				initialSlide: curIndex
			});
		});
		// 关闭预览
		$(".wc__popup-imgPreview").off("click");
		$(".wc__popup-imgPreview").on("click", function(e){
			var that = $(this);
			imgPreviewSwiper.destroy(true, true);
			$(".J__swiperImgPreview .swiper-wrapper").html('');
			that.hide();
		});
}



/*
 * 返回上一页操作
 */
function huitui(){
	
	api.execScript({
		name : 'msxIm',
	    frameName: 'im_win',
	    script: '_init();'
	});
	
	msxBack();
}



/*
 * 打开录音
 */
function dakailuyin(){
	hidegongnengkuang();
	$('#luyinzhong').show();
	$('#luyinmengban').show();
	api.stopPlay();//首先停止播放
	$('.bofangzhong').attr('src','img/bofangzhong.png');//动画默认
	
	api.startRecord({
	    path: 'fs://a.amr'
	});
}



/*
 * 发送录音
 */
var luyinshichang = 0;
function fasongluyin(){
	
	ol('',1);
	
	$('#luyinzhong').hide();
	$('#luyinmengban').hide();
	
	api.stopRecord(function(ret, err) {
	    if (ret) {
	        var path = ret.path;
	        luyinshichang = ret.duration;
	        if( luyinshichang < 1 ){
	        	luyinshichang = 1;
	        }
	        
	        api.ajax({
			    url: apiUrl + '/Home/Public/Upload',
			    method : 'post',
			    report : true,
				cache : 'false',
			    data: {
			        values: { type:1 },
			        files : {
			        	filea : path
			        },
				   },
			}, function(ret, err) {
					die(ret);
					if( ret.progress == 100 && ret.status == 1  ){
						fasong(ret.body.listData.img,7);
					}
			});
	        
	    }
	});
}

/*
 * 取消录音
 */
function quxiaoluyin(){
	$('#luyinzhong').hide();
	$('#luyinmengban').hide();
	api.stopRecord(function(ret, err) {
	    if (ret) {
	        var path = ret.path;
	        var duration = ret.duration;
	    }
	});
}

/*
 * 播放录音
 */
function bofangluyin(dom){
	api.stopPlay();//首先停止播放
	$('.bofangzhong').attr('src','img/bofangzhong.png');//动画默认
	$(dom).find('img').attr('src','img/bofangzhong.gif');
	
	var id = $(dom).attr('data-id');
	
	var http_path = $(dom).attr('data-src');
	
	var fs_path = 'fs://luyin'+id+'.amr';
	
	api.download({
	    url: http_path,
	    savePath: fs_path,
	    report: true,
	    cache: true,
	    allowResume: true
	}, function(ret, err) {
	    if (ret.state == 1) {
	        //下载成功
	        
	        
			api.startPlay({
			    path: fs_path
			}, function(ret, err) {
			    if (ret) {
		//	        alert('播放完成');
					$(dom).find('img').attr('src','img/bofangzhong.png');
			    } else {
		//	        alert(JSON.stringify(err));
			    }
			});
			
	        
	        
	    } else {
	
	    }
	});
	
	
}