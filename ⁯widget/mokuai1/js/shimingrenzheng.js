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
	
	$('#xingming').val(m.xingming)
	$('#shenfenzhenghao').val(m.shenfenzhenghao)
	if(m.shenfenzhengzhengmian){
		$('#zhengmian').attr('src',m.shenfenzhengzhengmian).attr('data-src',m.shenfenzhengzhengmian).css('opacity',1);
	}
	if(m.shenfenzhengfanmian){
		$('#fanmian').attr('src',m.shenfenzhengfanmian).attr('data-src',m.shenfenzhengfanmian).css('opacity',1);
	}
	if(m.gerenzhaopian){
		$('#geren').attr('src',m.gerenzhaopian).attr('data-src',m.gerenzhaopian).css('opacity',1);
	}
	
	if( m.is_shiming != 1 ){
		$('#tijiaoanniu').show();
	}
	
	if( m.shiming_tishi != '' ){
		$('.tishi').show().text(m.shiming_tishi);
	}
	
	session('is_shiming',m.is_shiming);
	
	
	api.execScript({
		name : 'shezhi',
	    frameName: 'zhimakaimen',
	    script: '_init();'
	});
	
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

function xuanzezhengmian(dom){
	var file = dom.files[0];     
        // 确认选择的文件是图片                
        if(file.type.indexOf("image") == 0) {
            var reader = new FileReader();
            reader.readAsDataURL(file);                    
            reader.onload = function(e) {
                // 图片base64化
                var newUrl = this.result;
                $('#zhengmian').css('opacity','1').attr('src',newUrl);
            };
        }
}

function xuanzefanmian(dom){
	var file = dom.files[0];     
        // 确认选择的文件是图片                
        if(file.type.indexOf("image") == 0) {
            var reader = new FileReader();
            reader.readAsDataURL(file);                    
            reader.onload = function(e) {
                // 图片base64化
                var newUrl = this.result;
                $('#fanmian').css('opacity','1').attr('src',newUrl);

                
            };
        }
}

function xuanzegeren(dom){
	var file = dom.files[0];     
        // 确认选择的文件是图片                
        if(file.type.indexOf("image") == 0) {
            var reader = new FileReader();
            reader.readAsDataURL(file);                    
            reader.onload = function(e) {
                // 图片base64化
                var newUrl = this.result;
                $('#geren').css('opacity','1').attr('src',newUrl);

                
            };
        }
}

/**
 * 异步上传图片
 */
$.fn.ajaxUploadImage = function(options) {
    var defaults = {
        url : '',
        data : {},
        start : function(){},     // 开始上传触发事件
        success : function(){}
    }
    var options = $.extend({}, defaults, options);
    var _uploadFile;
    function _checkFile() {
          //文件为空判断
          if (_uploadFile === null || _uploadFile === undefined) {
              alert("请选择您要上传的文件！");
              return false;
          }
//           
//          //检测文件类型
//          if(_uploadFile.type.indexOf('image') === -1) {
//              alert("请选择图片文件！");
//              return false;
//          }
//           
//          //计算文件大小
//          var size = Math.floor(_uploadFile.size/1024);
//          if (size > 5000) {
//              alert("上传文件不得超过5M!");
//              return false;
//          };
          return true;
    };
    return this.each(function() {
        $(this).on('change', function(){
            var _element = $(this);
            options.start.call('start', _element);
            _uploadFile = _element.prop('files')[0];
            if (!_checkFile) return false; 
            try {
                //执行上传操作
                var xhr = new XMLHttpRequest();
                xhr.open("post",options.url, true);
                xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4) {
                        returnDate = $.parseJSON(xhr.responseText);
                        options.success.call('success', _element, returnDate);
                    };
                };
                //表单数据
                var fd = new FormData();
                for (k in options.data) {
                    fd.append(k, options.data[k]);
                }
                fd.append(_element.attr('name'), _uploadFile);
                //执行发送
                result = xhr.send(fd);
            } catch (e) {
                console.log(e);
                alert(e);
            }
        });
    });
}

	
	
	var datas = {'key':'1749c3e6ead012c1c18d355980316e03'};
	
	
	$('input[name="shenfenzhengzhengmian"]').ajaxUploadImage({
        url : apiUrl + "/Home/Public/Upload",
        data:{},
        start :  function(element){
            ol('正在处理',1);
        },
        success : function(element, result){
        	cl();
            console.log(result);
            $('#zhengmian').attr('data-src',result.listData.img);
            
        }
    });
	$('input[name="shenfenzhengfanmian"]').ajaxUploadImage({
        url : apiUrl + "/Home/Public/Upload",
        data:{},
        start :  function(element){
            ol('正在处理',1);
        },
        success : function(element, result){
        	cl();
            console.log(result);
            $('#fanmian').attr('data-src',result.listData.img);
            
        }
    });
	$('input[name="gerenzhaopian"]').ajaxUploadImage({
        url : apiUrl + "/Home/Public/Upload",
        data:{},
        start :  function(element){
            ol('正在处理',1);
        },
        success : function(element, result){
        	cl();
            console.log(result);
            $('#geren').attr('data-src',result.listData.img);
            
        }
    });
	
//提交审核
var cishu = 1;
function tijiao(){
	var xingming = $('#xingming').val();
	var shenfenzhenghao = $('#shenfenzhenghao').val();
	
	if( !xingming ){
		mui.alert('','请输入姓名');
		return;
	}
	if( !shenfenzhenghao || shenfenzhenghao.length < 15 ){
		mui.alert('','请输入身份证号');
		return;
	}
	
	var shenfenzhengzhengmian = $('#zhengmian').attr('src');
	var shenfenzhengfanmian = $('#fanmian').attr('src');
	var gerenzhaopian = $('#geren').attr('src');
	if( !shenfenzhengzhengmian ){
		mui.alert('','请上传身份证正面');
		return;
	}
	if( !shenfenzhengfanmian ){
		mui.alert('','请上传身份证反面');
		return;
	}
	if( !gerenzhaopian ){
		mui.alert('','请上传个人照片');
		return;
	}
	
	var shenfenzhengzhengmian_url = $('#zhengmian').attr('data-src');
	var shenfenzhengfanmian_url = $('#fanmian').attr('data-src');
	var gerenzhaopian_url = $('#geren').attr('data-src');
	if( !shenfenzhengzhengmian_url || !shenfenzhengfanmian_url || !gerenzhaopian_url ){
		if( cishu == 1 ){
			ol('正在提交,请稍后...',1);
		}
		setTimeout(function() {
			tijiao();
		}, 1000);
		return;
	}
	
	
	var shuju	=	{'xingming':xingming,'shenfenzhenghao':shenfenzhenghao,'shenfenzhengzhengmian':shenfenzhengfanmian_url,'shenfenzhengfanmian':shenfenzhengfanmian_url,'gerenzhaopian':gerenzhaopian_url};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=shimingrenzhengAdd';
	var func	=	'tijiaochuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	
	
}

function tijiaochuli(t){
	tishi('提交成功!');
	cl();
	
	_init();
	
	$(window).scrollTop(0);
	
	$('#tijiaoanniu').hide();
	
}












