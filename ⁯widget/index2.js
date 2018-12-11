session('lanmu_show','0');
session('lat','0');
session('lng','0');
session('city_name','0');
apiready = function() {

	




	var aa = api.deviceModel;
	var app_margin_top = 24;
	var app_margin_bottom = 0;
	var safeArea = api.safeArea;
	
	alert(JSON.stringify(safeArea));
	
	//	如果是苹果
	if(api.systemType == 'ios') {
		app_margin_top = 20;
		if( safeArea.top > 4 ){
			app_margin_top = safeArea.top;
		}

		if( safeArea.bottom > 4 ){
			app_margin_bottom = safeArea.bottom;
		}

		if( app_margin_top > 40 ){
			app_margin_top = app_margin_top - 10;
		}
	}else{
		if( safeArea.top > 4 ){
			app_margin_top = safeArea.top;
		}

		if( safeArea.bottom > 4 ){
			app_margin_bottom = safeArea.bottom;
		}
		if( app_margin_top > 39 ){
			app_margin_top = app_margin_top - 5;
		}
	}
//123
	session('app-margin-top',app_margin_top);
	session('app-margin-bottom',app_margin_bottom);


	msxdingwei();
	jiazaiduogechuangkou();
	if( session('shouyelunbo')!='1' ){
		jiazailunbo();
	}
}

//加载轮播图
function jiazailunbo(){
	api.openFrame({
				name: 'shouyelunbo',
				url: 'shouyelunbo.html',
				bounces: false,
				scaleEnabled: true,
				rect: {
					x: 0,
					y: 0,
					w: 'auto',
					h: 'auto',
				},
			});
}

//	加载多个窗口
function jiazaiduogechuangkou() {
	
		var headerH = parseInt( session('app-margin-top') );
		var footerH = parseInt( session('app-margin-bottom') );
	
	var frameH = api.winHeight - footerH;

	
			api.setStatusBarStyle({ style: 'dark' });
	api.openFrameGroup({
		name: 'group1',
		scrollEnabled: false,
		background : '#FFF',
		preload : 4,
		rect: {
			x: 0,
			y: headerH,
			w: api.winWidth,
			h: 'auto',
			marginBottom: footerH,
		},
		frames: [{
			name: 'shouye',
			url: './mokuai1/shouye.html',
			vScrollBarEnabled : false,
			bounces : false,
			scaleEnabled: true
		}, {
			name: 'shequshouye',
			url: './mokuai1/shequshouye.html',
			vScrollBarEnabled : false,
			scaleEnabled: true
		}, {
			name: 'mai',
			url: './mokuai1/mai.html',
			bounces : false,
			vScrollBarEnabled : false,
			scaleEnabled: true
		},{
			name: 'faxian',
			url: './mokuai1/faxian.html',
			bounces : false,
			vScrollBarEnabled : false,
			scaleEnabled: true
		}, {
			name: 'wode',
			url: './mokuai1/wode.html',
			vScrollBarEnabled : false,
			scaleEnabled: true
		}]
	}, function(ret, err) {
		var index = ret.index;
//		if( index == 3 ){
//			api.execScript({
//			    name: 'root',
//			    frameName: 'wo',
//			    script: 'gei();'
//			});
//		}else{
//			api.setFrameAttr({
//				name : 'zichuangkou',
//				hidden : true,
//			});
//		}

//		qiehuanyemian(2);


	});
}

/*
 * 切换页面
 */
function qiehuanyemian(xiabiao) {


		api.setFrameGroupIndex({
			name: 'group1',
			index: xiabiao - 1
		});

//		$('.dilanimg-1').attr('src', 'mokuai1/ziyuan/shouye-i.png');
//		$('.dilanimg-2').attr('src', 'mokuai1/ziyuan/gonggao-i.png');
//		$('.dilanimg-3').attr('src', 'mokuai1/ziyuan/woyaomai-i.png');
//		$('.dilanimg-4').attr('src', 'mokuai1/ziyuan/fuwu-i.png');
//		$('.dilanimg-5').attr('src', 'mokuai1/ziyuan/wode-i.png');
//
//		switch(xiabiao) {
//			case 1:
//				$('.dilanimg-1').attr('src', 'mokuai1/ziyuan/shouye-icon.png');
//				break;
//			case 2:
//				$('.dilanimg-2').attr('src', 'mokuai1/ziyuan/gonggao-icon.png');
//				break;
//			case 3:
//				$('.dilanimg-3').attr('src', 'mokuai1/ziyuan/woyaomai-icon.png');
//				break;
//			case 4:
//				$('.dilanimg-4').attr('src', 'mokuai1/ziyuan/fuwu-icon.png');
//				break;
//			case 5:
//				$('.dilanimg-5').attr('src', 'mokuai1/ziyuan/wode-icon.png');
//				break;
//			default:
//				break;
//		}
//
//		for(var i = 1; i < 6; i++) {
//			if(i == xiabiao) {
//				$('.dilan-' + i).addClass('active');
//				continue;
//			}
//			$('.dilan-' + i).removeClass('active');
//		}

}



//	减少消息数量
function geixiaoxi(){

		var dizhi	=	'/def/message/index';
		var func	=	'xiaoxichuli';
		var op		=	{'dizhi':dizhi,'func':func};

		ajax(op);

}

function xiaoxichuli(data){

	if( data.code != 200 ){
		document.getElementById("xiaoxishu").style.display = 'none';
		return false;
	}

	var shu	=	data.data.count;

	if( shu < 1 ){
		document.getElementById("xiaoxishu").style.display = 'none';
	}else{
		document.getElementById("xiaoxishu").innerText	=	shu;
		document.getElementById("xiaoxishu").style.display = 'inline-block';
	}
}

function isLogIn(){
	var isLogIn		=	session('isLogIn');

	if( isLogIn == 1 ){
//		document.getElementById("xiaoxi").style.display	=	'table-cell';
//		document.getElementById("wo").style.display		=	'table-cell';
//		document.getElementById("shouye").classList.remove('mui-active');
//		document.getElementById("wo").classList.add('mui-active');
	}else{
//		document.getElementById("xiaoxi").style.display	=	'none';
//		document.getElementById("wo").style.display		=	'none';
	}
}

function jiguang(id){
	var isLogIn		=	session('isLogIn');
	if(isLogIn){
		var id	=	session('Id');
	}else{
		var id	=	arguments[0]?id:'all';
	}
	ajpush.init(id);

}


/*
 * 其他页面打开了社区二手
 * */
function dakaishequershou(){
	qiehuanyemian(2);
	api.execScript({
	    name: 'root',
	    frameName: 'shequshouye',
	    script: '_init('+1+');'
	});
}

/*
 * 其他页面打开了发现页面
 * */
function dakaifaxian(){
	qiehuanyemian(4);
	api.execScript({
	    name: 'root',
	    frameName: 'faxian',
	    script: '_init('+1+');'
	});
}
