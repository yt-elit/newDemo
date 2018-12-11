if( sysType == 'wx' ){
	_init();
}else{
	//app准备成功
	apiready = function(){
		_init();
	}
}
var is_dibula = false;
var is_shuaxin = false;//是否别的页面唤醒刷新
var shuaxin_curpage = 1;//刷新页面数
fanye();//绑定翻页事件

//检查是否完善信息
function checkwanshan(){
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=checkwanshan';
	var func	=	'checkwanshanchuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}
function checkwanshanchuli(t){
	if( t.type == 0 ){
		$('#wanshan').show();
	}
}

//获取接口参数
function _init(){
	if(is_shuaxin==true){
		
	}
	
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=wodexianzhi';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol('',1);
}

//处理返回数据
function _handle(t){
	cl();
	checkwanshan();
	
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
	window.onscroll = function(fn){
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
 * 关注
 */
function guanzhu(dom){
	window.event.stopPropagation();
	
	//关注样式切换
	var type = $(dom).attr('data-type');
	if( type=='1' ){//撤销关注
		$(dom).attr('data-type',0);
		$(dom).addClass('guanzhu').removeClass('yiguanzhu').text('关注');
	}else{
		$(dom).attr('data-type',1);
		$(dom).addClass('yiguanzhu').removeClass('guanzhu').text('已关注');
	}
	
	var to_member_id = $(dom).attr('data-member-id');
	var biao_id = 0;
	
	var shuju	=	{'to_member_id':to_member_id,'biao_id':biao_id};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=guanzhu';
	var func	=	'_handle_guanzhu';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
	
}

function _handle_guanzhu(t){
	cl();
}

/*
 * 擦亮(更新数据时间,使其拍到最前)
 */
function caliang(dom){
	
	$(dom).text('已擦亮').css('color','#aaa');
	$(dom).parent().find('.time').text('刚刚');
	
	var goods_id = $(dom).attr('data-goods-id');
	
	var shuju	=	{'goods_id':goods_id};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=caliang';
	var func	=	'caliangchuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}


/*
 * 擦亮(更新数据时间,使其拍到最前)
 */
function shangxiajia(dom){
	
	
	var goods_id = $(dom).attr('data-goods-id');
	var goods_type = $(dom).attr('data-type');
	
	if( goods_type == 1 ){
		$(dom).attr('data-type',0).text('已下架');
		goods_type = 0;
	}else{
		$(dom).attr('data-type',1).text('上架中');
		goods_type = 1;
	}
	
	var shuju	=	{'goods_id':goods_id,'goods_show':goods_type};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=shangxiajiaxianzhi';
	var func	=	'shangxiajiachuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol('',1);
}
function shangxiajiachuli(t){
	cl();
}


/*
 * 删除
 */
function shanchu(dom){
	
	mui.confirm(' ','确定删除?',['确定','取消'],function(e){
		if(e.index == 0){
			var goods_id = $(dom).attr('data-goods-id');

	
			var shuju	=	{'goods_id':goods_id};
			var dizhi	=	ApiUrl + '/index.php?act=member&op=shanchuxianzhi';
			var func	=	'shanchuchuli';
			var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
			ajax(op);
			ol('',1);
		}
	});
	
}

function shanchuchuli(t){
	cl();
	
	var dom_name = '#goods-id-' + t.goods_id;
	$(dom_name).remove();
	
}

/*
 * 其他页面呼唤本页面刷新
 */
function shuaxin(){
	is_shuaxin = true;
	curpage = 1;
	_init();
}
