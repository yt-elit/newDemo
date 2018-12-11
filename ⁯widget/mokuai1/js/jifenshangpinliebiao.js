var is_dibula = false;

var is_address = false;


var is_vip = false;

var my_jifen = 0;
//app准备成功
apiready = function(){
	_init();
}

//fanye();//绑定翻页事件
//获取接口参数
function _init(){
	var shuju	=	{'isable':1};
	var dizhi	=	ApiUrl + '/index.php?act=pointprod&op=index';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol('',1); 
}

//处理返回数据
function _handle(t){
	cl();
	var data = {};
		data.data = t.goods_list;
	
	var html = template.render('list-tp',data);//渲染HTML
	
	if( curpage == 1 ){
		$('#list-box').html(html);
	}else{
		$('#list-box').append(html);
	}
	
	if( t.is_member ){
		var member_info = t.member_info;
		
		
		is_address = member_info.is_address==1?true:false;
		document.getElementById("wodejifen").innerText = member_info.member_points;
		
		document.getElementById("duihuanshu").innerText = member_info.duihuanshu;
		
		my_jifen = member_info.member_points;
		
		if(  member_info.level == 1   ){
			is_vip = true;
		}
		
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
		
	
	};
}


function duihuanshangpinla(dom){
	
	
	if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	
	var vip_type = $(dom).attr('data-vip-type');

	if( msxgetCookie('is_vip') != 1 ){
		mui.confirm(' ','您不是VIP用户',['升级','取消'],function(e){
			if(e.index==0){
				k('mokuai1/huiyuanquanyi.html','huiyuanquanyi')
				return false;
			}
		});
		return false;
	}
	
	var shangpinjifen = $(dom).attr('data-jifen');
	if( Number(shangpinjifen) > Number(my_jifen) ){
		mui.confirm(' ','您的积分不够',['确定'],function(e){
		});
		return false;
	}
	
	if( !is_address ){
		k('../tmpl/member/address_list.html','dizhiguanli');
		return false;
	}
	var id = $(dom).attr('data-id');
	mui.confirm(' ','确定兑换?',['确定','取消'],function(e){
		if( e.index == 0 ){
			var shuju	=	{'id':id};
			var dizhi	=	ApiUrl + '/index.php?act=pointcart&op=step2';
			var func	=	'_handle2';
			var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
			ajax(op);
			ol(); 
		}
	})
	
}

function _handle2(t){
	console.log(t);
	
	_init();
	
}


function duihuanjilu(){
	
	login_k('tmpl/member/pointorder_list.html','duihuanjilu');
	
}
