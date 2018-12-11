var param_xingbie = '';
var param_nianling = '';
var param_nicheng = '';
var param_touxiang = '';

var is_shuaxin_num = 1;

var is_bind_wx = 1;
var is_bind_shouji = 1;
var is_bind_qq = 1;

if( sysType == 'wx' ){
	_init();
}else{
	//app准备成功
	apiready = function(){
		_init();
	}
}
var is_dibula = false;
//fanye();//绑定翻页事件
//获取接口参数
function _init(){
	
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=index';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
	cl();
	var m = t.member_info;
	
	$('#nicheng').text(m.member_nickname);
	$('#xingbie').text(m.member_sex_name);
	$('#nianling').text(m.member_nianling_name);
	$('#head-img1').attr('src',m.member_avatar);
	
	is_bind_wx = m.is_bind_wx;
	if( m.is_bind_wx == 1 ){
		$('#bangdingweixin').text('已绑定');
	}else{
		$('#bangdingweixin').text('绑定微信');
	}
	is_bind_shouji = m.is_bind_shouji;
	if( m.is_bind_shouji == 1 ){
		$('#bangdingshouji').text('已绑定');
	}else{
		$('#bangdingshouji').text('绑定手机号');
	}
	
	is_bind_qq = m.is_bind_qq;
	if( m.is_bind_qq == 1 ){
		$('#bangdingqq').text('已绑定');
	}else{
		$('#bangdingqq').text('绑定QQ');
	}
	
	if( is_shuaxin_num == 1 ){//联动菜单只初始化一次
		xingbie(m.member_sex_name);
		nianling(m.member_nianling_name);
	}
	is_shuaxin_num = 2;
	
	$('#shimingrenzheng').text(m.shiming_tishi1);
	
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

function xingbie(moren){
	//级联示例-----------------------------------------
	(function($, doc) {
		$.ready(function() {
		
			//初始化
			var op	=	{'layer':1};
			var cityPicker = new $.PopPicker(op);
			
			var xingbies = [
					{
						value: '0',
						text: '保密'
					},
					{
						value: '1',
						text: '男'
					},
					{
						value: '2',
						text: '女'
					},
				];
			
			cityPicker.setData(xingbies);			//	塞进数组
			
			//设置默认值
			var provCode = moren;
//			var cityCode = moren.er;
			cityPicker.pickers[0].setSelectedText(provCode, 0);
//			setTimeout(function() {
//				cityPicker.pickers[1].setSelectedText(cityCode,0);
//			}, 0);
		
		
			//实例化
			var showCityPickerButton = doc.getElementById('xuanzexingbie');
			showCityPickerButton.addEventListener('tap', function(event) {
				cityPicker.show(function(items) {
					var er	=	items[0].text;
					var yi_id	=	items[0].value;
					
					param_xingbie = yi_id;
					up();
					
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, false);
			//-----------------------------------------
			//					//级联示例
		});
	})(mui, document);
}

function nianling(moren){
	//级联示例-----------------------------------------
	(function($, doc) {
		$.ready(function() {
		
			//初始化
			var op	=	{'layer':1};
			var cityPicker = new $.PopPicker(op);
			
			var nianling_arr = [];
			for (var i = 0; i < 100; i++) {
				var tmp = {};
					tmp.value = i;
					tmp.text = i;
					
					if( i == 0 ){
						tmp.text = '保密';
					}
				nianling_arr.push(tmp);
			}
			
			
			cityPicker.setData(nianling_arr);			//	塞进数组
			
			//设置默认值
			var provCode = moren;
//			var cityCode = moren.er;
			cityPicker.pickers[0].setSelectedText(provCode, 0);
//			setTimeout(function() {
//				cityPicker.pickers[1].setSelectedText(cityCode,0);
//			}, 0);
		
		
			//实例化
			var showCityPickerButton = doc.getElementById('xuanzenianling');
			showCityPickerButton.addEventListener('tap', function(event) {
				cityPicker.show(function(items) {
					var er	=	items[0].text;
					var yi_id	=	items[0].value;
					
					param_nianling = yi_id;
					up();
					
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, false);
			//-----------------------------------------
			//					//级联示例
		});
	})(mui, document);
}


/*
 * 修改昵称
 */
function xuanzenicheng(){
	mui.prompt('修改昵称', '长度:2-10位昵称', ' ', ['确定','取消'], function(e) {
		if (e.index == 0) {
			
			if( e.value.length > 10 || e.value.length < 2 ){
			}else{
				param_nicheng = e.value;
				up();
			}
			
		} else {
			
		}
	})
}

/*
 * 修改会员属性
 */
function up(){
	
	var params = {};
	
	if( param_xingbie != '' ){
		params.member_sex = param_xingbie;
	}
	
	
	if( param_nianling !== '' ){
		params.nianling = param_nianling;
	}
	
	if( param_nicheng.trim() !== '' ){
		params.member_nickname = param_nicheng.trim();
	}
	
	if( param_touxiang != '' ){
		params.member_avatar = param_touxiang;
	}
	
	
	
	
	if( !params ){
		return false;
	}
	
	var shuju	=	params;
	var dizhi	=	ApiUrl + '/index.php?act=member&op=up';
	var func	=	'upchuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
//	ol();
}
function upchuli(){
	api.execScript({
		name : 'root',
	    frameName: 'wode',
	    script: "login();"
	});
	
	setTimeout(function() {
		_init();
	}, 10);
	
	
}

/*
 * 上传头像
 */
function uptouxiang(path){
	param_touxiang = path;
	up();
}

/*
 * 
 */
function tuichudenglu(){
	
	mui.confirm('','确定退出？',['确认','取消'],function(e){
		if(e.index == 0){
//			msxdelCookie('key');
//			msxdelCookie('is_vip');
//			msxdelCookie('member_id');
			localStorage.clear();
//			truncateTable();
			setTimeout(function() {
				api.closeWidget({
					silent:true,
				});
			}, 1000);
		}
	});
	
}

/*
 * 绑定微信
 */
function bangdingweixin(){
	if( is_bind_wx == 1 ){
		return false;
	}
	msxBindWeixin();
}

// 绑定微信 - 回调处理
function bangdingweixinchuli(data){
	cl();
	tishi(data.msg);
	_init();
}

/*
 * 绑定手机
 */
function bangdingshouji(){
	if( is_bind_shouji == 1 ){
		return false;
	}
	k('mokuai1/bangding.html','bangding')
}

/*
 * 绑定微信
 */
function bangdingqq(){
	if( is_bind_qq == 1 ){
		return false;
	}
	msxBindQQ();
}

// 绑定QQ - 回调处理
function bangdingqqchuli(data){
	cl();
	tishi(data.msg);
	_init();
}

function shimingrenzheng(){
	k('mokuai1/shimingrenzheng.html','shimingrenzheng')
}
