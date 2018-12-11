var is_dibula = false;
var _biaoqing_input_dom_name = '#neirong';//输入框dom
var id = geiGet('id',false);//话题id
var cid = 0;//回复评论的ID



if( sysType == 'wx' ){
	if( !id ){
		alert('话题不存在或已被删除！');
		msxBack();
		throw SyntaxError();
	}
	_init();
}else{
	//app准备成功
	apiready = function(){
		if( !id ){
			alert('话题不存在或已被删除！');
			msxBack();
			throw SyntaxError();
		}
		_init();
	}
}

//	id = 20;


_init_biaoqing();//表情初始化

//获取接口参数
function _init(){
	
	$(_biaoqing_input_dom_name).html('');//修复BUG
	
	var shuju	=	{'id':id};
	var dizhi	=	ApiUrl + '/index.php?act=circle_o&op=getlist';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
	
	var data = {};
		data.data = t.list;
	
	var html = template.render('list-tp',data);//渲染HTML
	
	if( curpage == 1 ){
		$('#list-box').html(html);
	}else{
		$('#list-box').append(html);
	}
	getpinglun();

}

/*
 * 获取评论列表
 */
function getpinglun(){
	var shuju	=	{'id':id};
	var dizhi	=	ApiUrl + '/index.php?act=circle_o&op=getpinglunlist';
	var func	=	'_handle2';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

function _handle2(t){
	
	document.getElementById("pinglunshuliang").innerText = t.count;
	
	var data = {};
		data.data = t.list;
	
	var html = template.render('pinglun-tp',data);//渲染HTML
	
	if( curpage == 1 ){
		$('#pinglun-box').html(html);
	}else{
		$('#pinglun-box').append(html);
	}
	
	if( data.data.length < 1 ){
		is_dibula = true;
	}
	fanye();//绑定翻页事件
	
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
		curpage++;
		getpinglun();
	
	};
}


/*
 * 表情初始化
 */
function _init_biaoqing(){	
	var data = {};
		data.shu = biaoqingzongshu;
	var html = template.render('biaoqing-tp',data);
	document.getElementById("biaoqing-box").innerHTML = html;
}

/*
 * 点击表情按钮
 */
function biaoqing(){
	var type = $('#_biaoqingkuang').is(':hidden');
	_biaoqingkuang(type);
}

/*
 * 表情栏弹出和缩回
 */
function _biaoqingkuang(type){
	if(type==1){
		$('#_biaoqingkuang').show();
		$('#dilan1').css('bottom','100px');
	}else{
		$('#_biaoqingkuang').hide();
		$('#dilan1').css('bottom','0px');
	}
}

/*
 * 插入表情
 */
function msxCharubiaoqing(dom){
	var biaoqing = $(dom).attr('src');
	var img_src = '<img src="'+ biaoqing +'">'
	var html = img_src;
	
	$(_biaoqing_input_dom_name).append( html );
	$('#neirong').scrollTop(9999)
	return false;
}


var _biaoqing_shiqu_id;//输入框失去焦点的ID
var _biaoqing_input_dom_name='#neirong';//输入框DOM
var _biaoqing_img_insert = true;//可插入表情状态
var _biaoqing_img_number = 20;//可插入表情数量
$(_biaoqing_input_dom_name).focus(function(){
	_biaoqingkuang(0);
	$(this).attr('data-focus',1);
}).blur(function(){
	clearTimeout(_biaoqing_shiqu_id);
	var that = $(this);
	_biaoqing_shiqu_id = setTimeout(function() {
		that.attr('data-focus',0);
	}, 444);
}).on('DOMNodeInserted',function(){
	var i = $(this).html();//输入的html内容
	var b;//输入的表情
	b = i.replace(/<img src\=\"(.*?)\">/gi,'~');
	b = b.match(/~/gi)?b.match(/~/gi):0;
	if( b.length >= _biaoqing_img_number  ){//判断插入表情数量
		_biaoqing_img_insert = false;
	}
	if( i.length != 0 ){
		$(this).removeClass('placeholder');
	}else{
		$(this).addClass('placeholder');
	}
}).on('input propertychange',function(){
	var i = $(this).html();//输入的html内容
	var b;//输入的表情
	b = i.replace(/<img src\=\"(.*?)\">/gi,'~');
	b = b.match(/~/gi)?b.match(/~/gi):0;
	if( b.length < _biaoqing_img_number  ){//判断插入表情数量
		_biaoqing_img_insert = true;
	}
	if( i.length != 0 ){
		$(this).removeClass('placeholder');
	}else{
		$(this).addClass('placeholder');
	}
})





/*
 * 发送主题
 */
function fasong(){
	
		if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	
	var neirong = $('#neirong').html();
	if( neirong == '' ){
		return false;
	}
	
	_biaoqingkuang(0);
	biaoqingkuanghuifu();
	
	
	var shuju	=	{'id':id,'cid':cid,'neirong':neirong};
	var dizhi	=	ApiUrl + '/index.php?act=circle_o&op=huifu';
	var func	=	'_handle3';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

function _handle3(){
	curpage = 1;
	$(document).scrollTop(0);
	getpinglun();
}

/*
 * 表情框恢复
 */
function biaoqingkuanghuifu(){
	cid = 0;
	$('#neirong').html('');
	$('#neirong').removeClass('placeholder').addClass('placeholder');
	var weilei_str = '#neirong.placeholder:after{height: 100px;content: "回复";color: #c6c6c6;}';
	$('#weilei').html(weilei_str);
}


/*
 * 回复话题内的评论
 */

function huifupinglun(dom){
	cid = $(dom).attr('data-cid');
	$('#neirong').focus().html('').removeClass('placeholder').addClass('placeholder');
	
	var weilei_str = '#neirong.placeholder:after{height: 100px;content: "对 老孟说";color: #c6c6c6;}';
	$('#weilei').html(weilei_str);
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


/*
 * 点赞
 */
function dianzanpinglun(dom){
	window.event.stopPropagation();
	
	//点赞样式切换
	var type = $(dom).attr('data-type');
	if( type=='1' ){//撤销点赞
		$(dom).attr('data-type',0);
		$(dom).find('img').attr('src','ziyuan/faxian-zan.png');
		
	}else{
		$(dom).attr('data-type',1);
		$(dom).find('img').attr('src','ziyuan/faxian-zanactive.png');
		
	}
	
	var to_member_id = $(dom).attr('data-member-id');
	var biao_id = $(dom).attr('data-id');
	
	var shuju	=	{'to_member_id':to_member_id,'biao_id':biao_id};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=dianzanpinglun';
	var func	=	'_handle_dianzanpinglun';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
	
}

function _handle_dianzanpinglun(t){
	
}



