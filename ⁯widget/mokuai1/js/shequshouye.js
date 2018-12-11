var is_first = 1;
if( sysType == 'wx' ){
	_init();
}else{
	//app准备成功
	apiready = function(){
		_init();
	}
}


var diqu = [];//地区
var fenlei = [];//分类


var shaixuan_diqu = '';//ajax筛选用的地区名称
var shaixuan_fenlei = '';//ajax筛选用的分类名称

var shaixuan_diqu_name = '';//前端地区筛选栏显示用
var shaixuan_fenlei_name = '';//前端分类筛选栏显示用

var shaixuan_diqu_xiabiao = [0,0,0];//筛选地区的默认下标
var shaixuan_fenlei_xiabiao = [0,0];//筛选分类的默认下标

var ajax_title = '';//搜索的宝贝名称，AJAX提交

var is_jimai = 0;//筛选急卖商品


//获取接口参数
function _init(type){
	
	
	
	if( type == 1 ){//所有的都初始化
		curpage=1;
		is_dibula = false;
		$(document).scrollTop(0);
		shaixuan_diqu = '';
		shaixuan_fenlei = '';
		shaixuan_diqu_xiabiao = [0,0,0];
		shaixuan_fenlei_xiabiao = [0,0];
		document.getElementById("diquname").innerText = '全社区';
		document.getElementById("fenleiname").innerText = '所有分类';
		document.getElementById("sousuokuang").innerText = '搜索宝贝';
		ajax_title = '';
		is_jimai = 0;
	}
	
	if( type == 4 ){//急卖按钮点击时候的初始化
		curpage=1;
		is_dibula = false;
		$(document).scrollTop(0);
		shaixuan_diqu = '';
		shaixuan_fenlei = '';
		shaixuan_diqu_xiabiao = [0,0,0];
		shaixuan_fenlei_xiabiao = [0,0];
		document.getElementById("diquname").innerText = '全社区';
		document.getElementById("fenleiname").innerText = '所有分类';
		document.getElementById("sousuokuang").innerText = '搜索宝贝';
		ajax_title = '';
	}
	
	if( type == 5 ){//搜索名称的时候初始化
		curpage=1;
		is_dibula = false;
		$(document).scrollTop(0);
		shaixuan_diqu = '';
		shaixuan_fenlei = '';
		shaixuan_diqu_xiabiao = [0,0,0];
		shaixuan_fenlei_xiabiao = [0,0];
		document.getElementById("diquname").innerText = '全社区';
		document.getElementById("fenleiname").innerText = '所有分类';
	}
	
	if( type == 2 ){//预留
		curpage=1;
		is_dibula = false;
		$(document).scrollTop(0);
		shaixuan_diqu = '';
		shaixuan_fenlei = '';
	}
	
	if( type == 3 ){//选择分类和地区时候的初始化
		curpage=1;
		is_dibula = false;
		$(document).scrollTop(0);
	}
	
	var shuju	=	{};
	
	if( shaixuan_diqu != '' ){
		shuju.diqu = shaixuan_diqu;
	}
	
	if( shaixuan_fenlei != '' ){
		shuju.fenlei = shaixuan_fenlei;
	}
	
	if( is_jimai != 0 ){
		shuju.is_jimai = is_jimai;
	}
	shuju.is_first = is_first;
	if( is_first == 1 &&  session('lat') != '0' ){
		shuju.lat=session('lat');
		shuju.lng=session('lng');
		shuju.city_name=session('city_name');
	}
	
	
	if( ajax_title != '' ){
		shuju.goods_name = ajax_title;
	}
	
	
	var dizhi	=	ApiUrl + '/index.php?act=xianzhi_o&op=getlist';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	if( type == 3 || type == 4 || type==5 ){
		ol('',1);
	}else if(curpage != 1){
		ol('',1);
	}

}

//处理返回数据
function _handle(t){
	
//	console.log(JSON.stringify(t));
	cl();
fanye();//绑定翻页事件
	
	
	diqu = t.diqu;
	fenlei = t.fenlei;
	
	var data = {};
		data.data = t.list;
		
//		data.data = [];
	
	var html = template.render('list-tp',data);//渲染HTML
	if( curpage == 1 ){
		$('#list-box').html(html);
	}else{
		$('#list-box').append(html);
	}
	
	if( t.city_name != '' ){
		$('#diquname').text(t.city_name);
		shaixuan_diqu = t.city_name;
	}
	
	
	if( data.data.length < 1 && is_first != 1 ){
		tishi('无更多内容');
		is_dibula = true;
	}
	is_first = 2;
	
}

var is_dibula = false;

//触发翻页事件
function fanye(){
	window.onscroll = function(){
		
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
 * 预览图片
 */
function yulantupian(dom,index){
	
	var img_arr = [];
	
	$(dom).parent().find('img').each(function(){
		var path = $(this).attr('src');
		img_arr.push( path );
	})
	
	msxDakaitupian(img_arr,index);
	
}


/*
 * 收藏
 */
function shoucang(dom){
	window.event.stopPropagation();
	
	if( !msxCL() ){
		return false;
	}
	
	//收藏样式切换
	var type = $(dom).attr('data-type');
	if( type=='1' ){//撤销收藏
		$(dom).attr('data-type',0);
		$(dom).next().find('img').attr('src','ziyuan/faxian-shoucang.png');
		$(dom).next().next().removeClass('shoucang-text1').addClass('shoucang-text0').text(function(i,e){
//			var i = Number(e);
//				i = i - 1;
//			return i;
		});
	}else{
		$(dom).attr('data-type',1);
		$(dom).next().find('img').attr('src','ziyuan/faxian-shoucangactive.png');
		$(dom).next().next().removeClass('shoucang-text0').addClass('shoucang-text1').text(function(i,e){
//			var i = Number(e);
//				i = i + 1;
//			return i;
		});
	}
	
	
	var to_member_id = $(dom).attr('data-member-id');
	var biao_id = $(dom).attr('data-id');
	
	var shuju	=	{'to_member_id':to_member_id,'biao_id':biao_id};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=shoucangxianzhi';
	var func	=	'_handle_shoucang';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
//	ol(); 
	
}

function _handle_shoucang(t){
	
}

/*
 * 选择社区
 */
function xuanzeshequ(){
	var UIActionSelector = api.require('UIActionSelector');
	UIActionSelector.open({
	    datas: diqu,
	    actives : shaixuan_diqu_xiabiao,
	    layout: {
	        row: 5,
	        col: 3,
	        height: 30,
	        size: 12,
	        sizeActive: 14,
	        rowSpacing: 5,
	        colSpacing: 10,
	        maskBg: 'rgba(0,0,0,0.2)',
	        bg: '#fff',
	        color: '#888',
	        colorActive: '#f00',
	        colorSelected: '#f00'
	    },
	    animation: true,
	    cancel: {
	        text: '取消',
	        size: 12,
	        w: 90,
	        h: 35,
	        bg: '#fff',
	        bgActive: '#ccc',
	        color: '#888',
	        colorActive: '#fff'
	    },
	    ok: {
	        text: '确定',
	        size: 12,
	        w: 90,
	        h: 35,
	        bg: '#3385ff',
	        bgActive: '#ccc',
	        color: '#FFF',
	        colorActive: '#fff'
	    },
	    title: {
	        text: '请选择',
	        size: 12,
	        h: 44,
	        bg: '#eee',
	        color: '#888'
	    },
	    fixedOn: api.frameName
	}, function(ret, err) {
	    if (ret.eventType == 'ok') {
//	        alert(JSON.stringify(ret));


			var str = ret.level1 + ' ' + ret.level2 + ' ' + ret.level3;
	        
	        	str = str.replace(/undefined/ig,'');
	        
	        shaixuan_diqu = str;
	        
	        shaixuan_diqu_name = shaixuan_diqu.trim();
			shaixuan_diqu_name = shaixuan_diqu_name.split(' ');
			shaixuan_diqu_name = shaixuan_diqu_name.reverse();
			shaixuan_diqu_name = shaixuan_diqu_name[0];
	        document.getElementById("diquname").innerText = shaixuan_diqu_name;
	        
	        
	        if( ret.selectedInfo.length <= 1 ){//修复BUG
				var xiabiao1= 0;
				var xiabiao2= 0;
				var xiabiao3= 0;
				shaixuan_diqu = '';
			}else{
				var xiabiao1= ret.selectedInfo[0].index;
				var xiabiao2= ret.selectedInfo[1].index;
				var xiabiao3= ret.selectedInfo[2].index;
			}
	        
	        
	        shaixuan_diqu_xiabiao = [xiabiao1,xiabiao2,xiabiao3];
	        
	        _init(3);

	    } else {
//	        alert(JSON.stringify(err));
	    }
	});
}


/*
 * 选择分类
 */
function xuanzefenlei(){
	var UIActionSelector = api.require('UIActionSelector');
	UIActionSelector.open({
	    datas: fenlei,
	    actives : shaixuan_fenlei_xiabiao,
	    layout: {
	        row: 5,
	        col: 2,
	        height: 30,
	        size: 12,
	        sizeActive: 14,
	        rowSpacing: 5,
	        colSpacing: 10,
	        maskBg: 'rgba(0,0,0,0.2)',
	        bg: '#fff',
	        color: '#888',
	        colorActive: '#f00',
	        colorSelected: '#f00'
	    },
	    animation: true,
	    cancel: {
	        text: '取消',
	        size: 12,
	        w: 90,
	        h: 35,
	        bg: '#fff',
	        bgActive: '#ccc',
	        color: '#888',
	        colorActive: '#fff'
	    },
	    ok: {
	        text: '确定',
	        size: 12,
	        w: 90,
	        h: 35,
	        bg: '#3385ff',
	        bgActive: '#ccc',
	        color: '#FFF',
	        colorActive: '#fff'
	    },
	    title: {
	        text: '请选择',
	        size: 12,
	        h: 44,
	        bg: '#eee',
	        color: '#888'
	    },
	    fixedOn: api.frameName
	}, function(ret, err) {
	    if (ret.eventType == 'ok') {
//	        alert(JSON.stringify(ret));
	        
	        var str = ret.level1 + ' ' + ret.level2;
	        
	        	str = str.replace('undefined','');
	        
	        shaixuan_fenlei = str;
			
			
			
			shaixuan_fenlei_name = shaixuan_fenlei.trim();
			shaixuan_fenlei_name = shaixuan_fenlei_name.split(' ');
			shaixuan_fenlei_name = shaixuan_fenlei_name.reverse();
			shaixuan_fenlei_name = shaixuan_fenlei_name[0];
	        document.getElementById("fenleiname").innerText = shaixuan_fenlei_name;
	        
	        
	        if( ret.selectedInfo.length <= 1 && ret.selectedInfo[0].name == '所有分类' ){//修复BUG
				var xiabiao1= 0;
				var xiabiao2= 0;
				shaixuan_fenlei = '';
			}else{
				
				if( ret.selectedInfo.length <= 1 ){
					var xiabiao1= ret.selectedInfo[0].index;
					var xiabiao2= 0;
				}else{
					var xiabiao1= ret.selectedInfo[0].index;
					var xiabiao2= ret.selectedInfo[1].index;
				}
				
			}
	        
	        
	        shaixuan_fenlei_xiabiao = [xiabiao1,xiabiao2];
	        
	        
	        _init(3);
	        
	        
	    } else {
//	        alert(JSON.stringify(err));
	    }
	});
}

/*
 * 急卖按钮
 */
function jimai(dom){
	var type = $(dom).attr('data-type');
	
	if( type == 1 ){//是普通社区
		$(dom).text('急卖专区').attr('data-type',0);
		is_jimai = 0;
	}else{//是急卖社区
		$(dom).text('普通专区').attr('data-type',1);
		is_jimai = 1;
	}
	
	_init(4);
}


/*
 * 搜索闲置名称
 */
function sousuo(name){
	document.getElementById("sousuokuang").innerText = name;
	
	if(name ==''){
		document.getElementById("sousuokuang").innerText = '搜索宝贝';
	}
	
	ajax_title = name;
	_init(5);
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


setInterval(function(){
	$('.logo-title').text( session('app_name') );
},1000)

















