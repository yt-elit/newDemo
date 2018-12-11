//app准备成功
apiready = function(){
	
}

var up_ziyuan = {};

var fenlei;
var diqu;

var param_zhaopian = '';
var param_biaoti = '';
var param_neirong = '';
var param_diqu = '';
var param_diqu_ids = '';
var param_diqu_ids1 = '';
var param_diqu_ids2 = '';
var param_diqu_ids3 = '';
var param_fenlei = '';
var param_fenlei_ids = '';
var param_fenlei_ids1 = '';
var param_fenlei_ids2 = '';
var param_jiage = '';

var param_flea_pphone = '';


var tianjiazuiduoshu = 9;

//如果是从急卖通道按钮点进来的
var is_jimai = geiGet('is_jimai',false);
if( is_jimai ){
	$('#is_jimai').attr('data-id','1').css('color','red');
}


_init();

//fanye();//绑定翻页事件
//获取接口参数
function _init(){
	var shuju	=	{};
	var dizhi	=	ApiUrl + '/index.php?act=xianzhi&op=fabuershou';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
	
	var data = {};
		data.data = t;
	
	fenlei = t.fenlei;
	diqu = t.diqu;
	
//	document.getElementById("vip_zhiding_time").innerText = t.vip_zhiding_time;
	if( t.member_info.is_huiyuan == 1 ){
		$('#zhidingkuang').hide();
	}
	
	liandongcaidan();
	liandongcaidan2();
	
//	var html = template.render('list-tp',data);//渲染HTML
//	document.getElementById("list-box").innerHTML = html;
}



//触发翻页事件
function fanye(){
	window.onscroll = function(fn){
		var hh = getScrollTop();
		console.log(hh);
	　　if( !_dibu() ){
			return;
	　　}
		//翻页逻辑代码
		
	
	};
}

function kaigejia(){
	mui.prompt(' ','请输入价格',' ',['确定','取消'],function(e){
		if( e.index == 0 ){
			
			var jiage = Number(e.value);
			
			if( jiage < 1 || isNaN(jiage) ){
				jiage = 1;
			}
			
			document.getElementById("kaigejia").innerText = '￥'+jiage;
			document.getElementById("kaigejia").style.color = 'red';
			param_jiage = jiage;
		}
	});
}

function liandongcaidan(moren){
	//级联示例-----------------------------------------
	(function($, doc) {
		$.ready(function() {
		
			//初始化
			var op	=	{'layer':2};
			var cityPicker = new $.PopPicker(op);
			cityPicker.setData(fenlei);			//	塞进数组
			
			//设置默认值
//			var provCode = moren.yi;
//			var cityCode = moren.er;
//			cityPicker.pickers[0].setSelectedText(provCode, 0);
//			setTimeout(function() {
//				cityPicker.pickers[1].setSelectedText(cityCode,0);
//			}, 0);
		
		
			//实例化
			var showCityPickerButton = doc.getElementById('xuanzefenlei_click');
			showCityPickerButton.addEventListener('tap', function(event) {
				cityPicker.show(function(items) {
					var yi	=	items[0].text;
					var er	=	items[1].text;
					var yi_id	=	items[0].value;
					var er_id	=	items[1].value;
					
					param_fenlei 	 = yi + ' ' + er;
					param_fenlei_ids = ','+yi_id+','+er_id+',';
					param_fenlei_ids1 = yi_id;
					param_fenlei_ids2 = er_id;
					document.getElementById("xuanzefenlei").innerText = param_fenlei;
					document.getElementById("xuanzefenlei").style.color = 'red';
					
					
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, false);
			//-----------------------------------------
			//					//级联示例
		});
	})(mui, document);
}

function liandongcaidan2(moren){
	//级联示例-----------------------------------------
	(function($, doc) {
		$.ready(function() {
		
			//初始化
			var op	=	{'layer':3};
			var cityPicker = new $.PopPicker(op);
			cityPicker.setData(diqu);			//	塞进数组
			
			//设置默认值
//			var provCode = moren.yi;
//			var cityCode = moren.er;
//			cityPicker.pickers[0].setSelectedText(provCode, 0);
//			setTimeout(function() {
//				cityPicker.pickers[1].setSelectedText(cityCode,0);
//			}, 0);
		
		
			//实例化
			var showCityPickerButton = doc.getElementById('diqu_click');
			showCityPickerButton.addEventListener('tap', function(event) {
				cityPicker.show(function(items) {
					var yi	=	items[0].text;
					var er	=	items[1].text;
					var san	=	items[2].text;
					var yi_id	=	items[0].value;
					var er_id	=	items[1].value;
					var san_id	=	items[2].value;
					
					param_diqu 	 = yi + ' ' + er + ' ' + san;
					param_diqu_ids = ','+yi_id+','+er_id+',' + san_id + ',' ;
					param_diqu_ids1 = yi_id;
					param_diqu_ids2 = er_id;
					param_diqu_ids3 = san_id;
					document.getElementById("diqu").innerText = param_diqu;
					document.getElementById("diqu").style.color = 'red';
					
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, false);
			//-----------------------------------------
			//					//级联示例
		});
	})(mui, document);
}

function shangchuantijiao(){
	
	var shuju	=	{};
	var dizhi	=	'/Home/Public/Upload';
	var func	=	'shangchuantijiaochuli';
	var fileid	=	'Filedata';
	
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju,'fileid':fileid,'type':1};
	ajax(op);
}

function shangchuantijiaochuli(t){
	console.log(t);
}


function dakaixiangce(){
	
	mui('#picture').popover('toggle');//关闭遮罩层
	
	var yiyoushu  =  $('.img-list').length;
	var max_length = tianjiazuiduoshu - yiyoushu;
	
	
	//手机相册选图片
	var obj = api.require('UIMediaScanner');
	obj.open({
		type : 'picture',
		column : 3,
		max : max_length,
		sort : {
			key : 'time',
			order : 'desc'
		},
		texts : {
			stateText : '已选择*项',
			cancelText : '取消',
			finishText : '完成'
		},
		styles : {
			bg : '#fff',
			mark : {
				icon : '',
				position : 'bottom_right',
				size : 20
			},
			nav : {
				bg : '#eee',
				stateColor : '#000',
				stateSize : 18,
				cancleBg : 'rgba(0,0,0,0)',
				cancelColor : '#000',
				cancelSize : 18,
				finishBg : 'rgba(0,0,0,0)',
				finishColor : '#000',
				finishSize : 18
			}
		}
	}, function(ret) {
		//将选择的图像进行剪辑
		if (ret.eventType == 'cancel') {
		} else if (ret.list.length > 0) {
			
			up_ziyuan = ret.list;
			
			show_tupians();
			
		}
	});
}

function dakaixiangji(){
	
	mui('#picture').popover('toggle');//关闭遮罩层
	
	
	api.getPicture({
		sourceType : 'camera',
		encodingType : 'png',
		mediaValue : 'pic',
		allowEdit : false,
		quality : 96,
		saveToPhotoAlbum : false
	}, function(ret, err) {
		// 获取拍照图像并剪辑
		if (ret.data!='') {
			
			var data = {};
				data.path = ret.data;
				data.thumbPath = ret.data;
			var rs = [];
				rs.push( data );
			up_ziyuan = rs;
			show_tupians();
		}
	});
}

function show_tupians(){
	
	
	
	var data = {};
		data.data = up_ziyuan;
	
	var html = template.render('zhaopian-tp',data);
	$('#zhaopian-box').append(html);
	
	var yiyoushu  =  $('.img-list').length;
	
	if( yiyoushu == tianjiazuiduoshu  ){
		$('#zhaoxiangji').hide();
	}
	
	yulantupian();
	
}

function quxiaotupian(dom){
	$(dom).parent().remove();
	$('#zhaoxiangji').show();
	
}

function fabu(){//发布二手
	
	var params = {};
		
	
	
		params.goods_name = $('#goods_name').val();
		params.goods_body = $('#goods_body').val();
		
		if( params.goods_name == '' ){
			mui.alert(' ','请输入宝贝标题');
			return false;
		}
		if( params.goods_body == '' ){
			mui.alert(' ','请输入宝贝内容');
			return false;
		}
		
		params.flea_area_id = param_diqu_ids2;
		params.area_ids = param_diqu_ids;
		params.flea_area_name = param_diqu;
		
		if( param_diqu == '' ){
			mui.alert(' ','请选择宝贝地区');
			return false;
		}
		
		params.gc_id = param_fenlei_ids2;
		params.gc_name = param_fenlei;
		params.gc_ids = param_fenlei_ids;
		
		if( param_fenlei == '' ){
			mui.alert(' ','请选择宝贝分类');
			return false;
		}
		
		param_jiage = $('#goods_price').val();
		params.goods_price = param_jiage;
		if( param_jiage == '' ){
			mui.alert(' ','请输入宝贝价格');
			return false;
		}
		
		param_flea_pphone = $('#flea_pphone').val();
		
		params.flea_pphone = param_flea_pphone;
		
		if( param_flea_pphone == '' || param_flea_pphone.length < 7 ){
			mui.alert(' ','请输入联系电话');
			return false;
		}
		if( $('.img-list').length < 1 ){
			mui.alert(' ','请上传宝贝图片');
			return false;
		}
		
	
	ol('正在发布...',1);
	
	shangchuanwenjian();//第一步上传图片
}
var up_list = [];//上传文件列表
var is_uploading = false;//正在上传
function shangchuanwenjian(){
	if( !is_uploading ){//第一次进来,组建数据
		$('.img-list').each(function(){
			var wenjian = $(this).attr('data-path');
			var tmp = {};
				tmp.is_ok = false;//是否上传成功
				tmp.lujing = wenjian;
				tmp.url_lujing = '';
			up_list.push(tmp);
		})
		is_uploading = true;
		
		shangchuanwenjian();
	}else{//正在上传中,数据循环上传
		
		for (i=0;i<up_list.length;i++) {
			if( up_list[i].is_ok == false ){
				api.ajax({
				    url: apiUrl + '/Home/Public/Upload',
				    method : 'post',
				    report : true,
					cache : 'false',
				    data: {
				        values: {},
				        files : {
				        	filea : up_list[i].lujing
				        },
					   },
				}, function(ret, err) {
						die(ret);
						if( ret.progress == 100 && ret.status == 1 ){
							up_list[i].is_ok = true;
							up_list[i].url_lujing = ret.body.listData.img;
							shangchuanwenjian();
						}
				});
				return false;
				break;
			}
		}
		faburenwu();//图片上传完毕,正式发布二手
	}
}

function faburenwu(){
	
	var params = {};
		params.goods_name = $('#goods_name').val();
		params.goods_body = $('#goods_body').val();
		
		params.flea_area_id = param_diqu_ids2;
		params.area_ids = param_diqu_ids;
		params.flea_area_name = param_diqu;
		
		params.gc_id = param_fenlei_ids2;
		params.gc_name = param_fenlei;
		params.gc_ids = param_fenlei_ids;
		
		params.goods_price = param_jiage;
		
		var images = [];
		for (var i = 0; i < up_list.length; i++) {
			images.push( up_list[i].url_lujing );
		}
		params.images = images.join(',');
		
		params.is_zhuanzhuan = $('#is_zhuanzhuan').is('.mui-active')?1:0;
		
		params.is_quanxin = $('#quanxinbaobei').prop('checked')?1:0;
		
		params.is_jimai = $('#is_jimai').attr('data-id');
		params.flea_pphone = param_flea_pphone;
		
	
	var shuju	=	params;
	var dizhi	=	ApiUrl + '/index.php?act=xianzhi&op=fabuershouAjax';
	var func	=	'_handle2';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}
function _handle2(t){
	
	cl();
	
	tishi('发布成功!');
	

	api.execScript({
	    name: 'root',
	    script: 'dakaishequershou();'
	});

	
	setTimeout(function() {
		msxBack();
	}, 1000);
	
	
	
}

/*
 * 急卖按钮点击事件
 */
function jimai(dom){
	var data_id = $(dom).attr('data-id');
	if( data_id == '1' ){
		$(dom).attr('data-id','0').css('color','#ccc');
	}else{
		$(dom).attr('data-id','1').css('color','red');
	}
}

/*
 * 预览图片
 */
function yulantupian(){
	$('.suolvtu').off('click');
	$('.suolvtu').on('click',function(){
		var ii = $('.suolvtu').index(this);
		
		var img_arr = [];
		$('.suolvtu').each(function(e,i){
			var path = $(this).attr('src');
			img_arr.push( path );
		})
		msxDakaitupian(img_arr,ii);
	})
}
