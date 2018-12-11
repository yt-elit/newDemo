var id = geiGet('id',false);

if( sysType == 'wx' ){
	_init();
}else{
	//app准备成功
	apiready = function(){
		_init();
	}
}
//var is_dibula = false;
//fanye();//绑定翻页事件
//获取接口参数
function _init(){
	var shuju	=	{id:id};
	var dizhi	=	ApiUrl + '/index.php?act=gongneng&op=jiamenghezuo';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
	
	$('#zixundianhua').attr('href','tel:'+t.zixundianhua);
	
	$('#content').html(t.info.article_content);
	
	
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

