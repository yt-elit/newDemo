//app准备成功
apiready = function(){
}
var is_dibula = false;
_init();
fanye();//绑定翻页事件
//获取接口参数
function _init(){
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=wodepinglun';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
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

