var fenlei_id = geiGet('fenlei_id',false);
var is_dibula = false;
if( sysType == 'wx' ){
	_init();
}else{
	//app准备成功
	apiready = function(){
		_init();
	}
}

//fanye();//绑定翻页事件
//获取接口参数
function _init(type){
	if( type == 1 ){
		curpage=1;
		is_dibula = false;
		$(document).scrollTop(0);
	}
	
	var params = {};

	if(fenlei_id){
		params.class_id = fenlei_id;
	}
	
	params.get_my = 1;
	
	var shuju	=	params;
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
	
	
	fanye();//绑定翻页事件
	
	
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
 * 点赞
 */
function dianzan(dom){
	window.event.stopPropagation();
	
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
	
	if( !msxCL() ){
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
 * 预览图片
 */
function yulantupian(dom,index){
	window.event.stopPropagation();
	
	var img_arr = [];
	$(dom).parent().find('img').each(function(){
		var path = $(this).attr('src');
		img_arr.push(path);
	})
	
	msxDakaitupian(img_arr,index);
	
}












