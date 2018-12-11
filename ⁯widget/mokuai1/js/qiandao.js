//app准备成功
apiready = function(){
}
var is_dibula = false;
_init();
var jinriqiandao = 2;
//fanye();//绑定翻页事件
//获取接口参数
function _init(){
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=member_signin&op=index';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
	
	var data = {};
		data.data = t;
		
	jinriqiandao = t.jinriqiandao;
	
	if( jinriqiandao == 0 ){
		document.getElementById("dianjiqiandao").innerText = '已签到';
		document.getElementById("dianjiqiandao").style.color = 'rgb(251,214,78)';
	}
	
	var qiandaotixing = t.member_info.qiandaotixing=='1'?'mui-active':'';
	$('#qiandaotixing').addClass(qiandaotixing);
	
	
	document.getElementById("guize").innerHTML = t.guize;
	
	document.getElementById("lianxuqiandaotianshu").innerText = t.lianxuqiandaotianshu;
	document.getElementById("zaiqiantianshu").innerText = t.zaiqiantianshu;
	
	document.getElementById("ewaijinbi").innerText = t.ewaijinbi;
		
	document.getElementById("points_putongqiandao").innerText = t.points_putongqiandao;
	document.getElementById("points_vipqiandao").innerText = t.points_vipqiandao;
	document.getElementById("points_putong7qiandao").innerText = t.points_putong7qiandao;
	document.getElementById("points_vip7qiandao").innerText = t.points_vip7qiandao;
	
	qiandaoyangshi(t.lianxuqiandaotianshu);
	
//	var html = template.render('list-tp',data);//渲染HTML
//	
//	if( curpage == 1 ){
//		$('#list-box').html(html);
//	}else{
//		$('#list-box').append(html);
//	}
	
//	if( data.data.length < 1 ){
//		is_dibula = true;
//	}
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

function qiandao(){
	if(jinriqiandao==2){
		mui.alert(' ','请稍候...');
		return false;
	}
	
	if(jinriqiandao==0){
		mui.alert(' ','今日以签到');
		return false;
	}
	
	jinriqiandao = 0;
	
	
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=member_signin&op=signin_add';
	var func	=	'_handle2';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

function _handle2(t){
//	console.log(t);
	mui.alert(t.msg,'签到成功');
	_init();
}

/*
 中间签到样式,
 
 tianshu   连续签到的天数
 */
function qiandaoyangshi(tianshu){
	if( tianshu == 1 ){
		for (var i = 1; i <= 7; i++) {
			$('.jinbi-'+i).attr('src','ziyuan/file_5baedae360f4e.png');
			$('.tiao-'+i).attr('src','ziyuan/file_5baedae2754c8.png');
			$('.wenzi-'+i).css('color','rgb(153, 153, 153)');
		}
	}
	for (var i = 1; i <= tianshu; i++) {
		$('.jinbi-'+i).attr('src','ziyuan/file_5baedae70a0d7.png');
		$('.wenzi-'+i).css('color','red');
		$('.tiao-'+i).attr('src','ziyuan/file_5baedae5cc54a.png');
	}
}

function qiandaotixing(dom){
	
	var qiandaotixing = $(dom).is('.mui-active')?1:0;
	
	var shuju	=	{'qiandaotixing':qiandaotixing};
	var dizhi	=	ApiUrl + '/index.php?act=member_signin&op=edit';
	var func	=	'_handle3';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
	
}

function _handle3(){
	
}
