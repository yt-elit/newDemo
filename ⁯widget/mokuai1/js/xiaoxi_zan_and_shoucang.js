//app准备成功
apiready = function(){
}
var is_dibula = false;
_init();
fanye();//绑定翻页事件
//获取接口参数
function _init(){
	var shuju	=	{'type':'zan_and_shoucang'};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=getmsglist';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
	
	if( sysType != 'wx' ){
		api.execScript({
			name : 'xiaoxi',
		    frameName: 'zhimakaimen',
		    script: "_init();"
		});
	}
	
	var data = {};
		data.data = t.list;
	
	var html = template.render('list-tp',data);//渲染HTML
	
	if( curpage == 1 ){
		$('#list-box').html(html);
	}else{
		$('#list-box').append(html);
	}
	
	if( data.data.length < 1 ){
		tishi('无更多内容！');
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

