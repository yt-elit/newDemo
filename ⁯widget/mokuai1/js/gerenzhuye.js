var master_member_id = geiGet('id',false);

if( sysType == 'wx' ){
	_init();
	setTimeout(function() {
	list();
}, 100);
}else{
	//app准备成功
	apiready = function(){
		_init();
		setTimeout(function() {
			list();
		}, 100);
	}
}

var yemian2gao = $(window).height()-115;

var yemian2_src = '../tmpl/product_eval_list.html?zhuren_member_id='+master_member_id;
$('.yemian2 iframe').css('height',yemian2gao).attr('src',yemian2_src);

var is_dibula = false;
fanye();//绑定翻页事件



//获取接口参数
function _init(){
	
	if( !master_member_id ){
		return false;
	}
	
	var shuju	=	{'master_member_id':master_member_id};
	var dizhi	=	ApiUrl + '/index.php?act=member_o&op=gerenzhuye';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol('',1); 
}

//处理返回数据
function _handle(t){
	cl();
	var master_member_info = t.master_member_info;
	$('#title').text(master_member_info.member_nickname);
	$('#beizanliang').text(master_member_info.beizanshu);
	$('#fensiliang').text(master_member_info.fensishu);
	$('#guanzhuliang').text(master_member_info.guanzhushu);
	$('#yonghutouxiang').attr('src',master_member_info.member_avatar);
	
	if( master_member_info.member_bg != '' ){
		$('#yonghubeijing').css('background-image','url('+master_member_info.member_bg+')');
	}
	
	var caozuo = t.caozuo;
	
	if( caozuo.is_genghuanbeijing == 1 ){
		$('#genghuanbeijing').show();
	}
	
	dianzanbutton( caozuo.is_dianzan );
	guanzhubutton( caozuo.is_guanzhu );
	

}

/*
 * 获取题主发布的话题
 */
function list(){
	
	if( !master_member_id ){
		return false;
	}
	
	var shuju	=	{'master_member_id':master_member_id};
	var dizhi	=	ApiUrl + '/index.php?act=circle_o&op=getlist';
	var func	=	'listchuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol('',1); 
}

function listchuli(t){
	
		cl();
	
		var data = {};
			data.data = t.list;
		var html = template.render('list-tp',data);//渲染HTML
		
		if( curpage == 1 ){
			$('#list-box').html(html);
		}else{
			$('#list-box').append(html);
		}
		
		if( data.data.length < 1 ){
			is_dibula = true;
		}
}



//触发翻页事件
function fanye(){
	window.onscroll = function(){
		
		var i = $(window).scrollTop();
		
		if( i > 220 ){
			$('#header').removeClass('my-header-a').addClass('my-header-b');
		}else{
			$('#header').removeClass('my-header-b').addClass('my-header-a');
		}
		
		
		if( is_dibula ){
			return false;
		}
	　　if( !_dibu() ){
			return;
	　　}
		//翻页逻辑代码
		curpage++;
		list();
	
	};
}


/*
 * 个人主页
 */
function gerenzhuye(dom){
	
	k('mokuai1/gerenzhuye.html','gerenzhuye');
}


/*
 * 点赞
 */
function dianzan(dom){
	if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	var member_id = msxgetCookie('member_id');
	if( member_id == master_member_id ){
		return false;
	}
	var type = $(dom).attr('data-type');
	if( type == 1 ){
		dianzanbutton(0);
	}else{
		dianzanbutton(1);
	}
	
	
	var shuju	=	{'to_member_id':master_member_id};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=dianzangeren';
	var func	=	'dianzanchuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol('',1); 
}
function dianzanchuli(t){
	cl();
	_init();
}

/*
 * 关注
 */
function guanzhu(dom){
	if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	var member_id = msxgetCookie('member_id');
	if( member_id == master_member_id ){
		return false;
	}
	var type = $(dom).attr('data-type');
	if( type == 1 ){
		guanzhubutton(0);
	}else{
		guanzhubutton(1);
	}
	
	var shuju	=	{'to_member_id':master_member_id};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=guanzhu';
	var func	=	'guanzhuchuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol('',1); 
}

function guanzhuchuli(t){
	cl();
	_init();
}

/*
 * 点赞按钮状态
 */
function dianzanbutton(type){
	if( type == 1 ){
		$('#dianzan').attr('data-type',1).removeClass('dianzan0').addClass('dianzan1').text('已点赞');
	}else{
		$('#dianzan').attr('data-type',0).removeClass('dianzan1').addClass('dianzan0').text('点赞');
	}
	
	
	
}

/*
 * 关注按钮状态
 */
function guanzhubutton(type){
	if( type == 1 ){
		$('#guanzhu').attr('data-type',1).removeClass('guanzhu0').addClass('guanzhu1').text('已关注');
	}else{
		$('#guanzhu').attr('data-type',0).removeClass('guanzhu1').addClass('guanzhu0').text('+ 关注');
	}
}

/*
 * 底部页面切换
 */
function yemianqiehuan(dom){
	
	var p = $(dom).attr('data-type');
	
	
	if( p == 1 ){
		$('.yemian1').show();
		$('.yemian2').hide();
		$('.yemian1anniu').removeClass('meixuanzhong').addClass('xuanzhong');
		$('.yemian2anniu').removeClass('xuanzhong').addClass('meixuanzhong');
	}else{
		$('.yemian1').hide();
		$('.yemian2').show();
		$('body,html').animate({ scrollTop: 222 }, 400);
		$('.yemian1anniu').removeClass('xuanzhong').addClass('meixuanzhong');
		$('.yemian2anniu').removeClass('meixuanzhong').addClass('xuanzhong');
	}
}


/*
 * 打开系统相册,并选取图片
 */
function dakaixiangce(){
	
	mui('#picture').popover('toggle');//关闭遮罩层
	
	
	
	//手机相册选图片
	var obj = api.require('UIMediaScanner');
	obj.open({
		type : 'picture',
		column : 2,
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
			
			shangchuantupian( ret.list[0].path );
			
		}
	});
}

/*
 * 上传图片
 */
function shangchuantupian(path){
	ol('',1);
	api.ajax({
	    url: apiUrl + '/Home/Public/Upload',
	    method : 'post',
	    report : true,
		cache : 'false',
	    data: {
	        values: {},
	        files : {
	        	filea : path
	        },
		   },
	}, function(ret, err) {
			die(ret);
			if( ret.progress == 100 && ret.status == 1 && ret.statusCode == 200 ){
				upbeijing(ret.body.listData.img);
			}
	});
}

/*
 * 修改背景图片
 */
function upbeijing(path){
	
	console.log(path);
	
	var shuju	=	{'path':path};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=upBg';
	var func	=	'upbeijingchuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}
function upbeijingchuli(){
	cl();
	_init();
}
