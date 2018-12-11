apiready = function(){
	api.bringFrameToFront({
	    from: 'shouyelunbo'
	});
}

session('shouyelunbo','1');

_init();
//获取接口参数
function _init(){
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=gongneng&op=shouyelunbo';
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
	
	$('#silid').html(html);
	
	var slider	=	mui("#silid");
	slider.slider({
		interval: 10000000
	});

}

function guanbi(){
	api.closeFrame();
}


//$('#img1').onload =function() {
//  console.log(1);
//}

function guanbiload(){
	$('.loading').hide();
}
