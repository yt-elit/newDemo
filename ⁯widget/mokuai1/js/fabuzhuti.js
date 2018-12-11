//app准备成功
apiready = function(){
}

//var id = geiGet('id',false);//发布的话题ID
var is_dibula = false;//是否到底部判断，和fanye()函数一起用
var tianjiazuiduoshu = 9;//图片最多上传数量

var up_ziyuan = {};//图片本地资源，用于显示到页面中

var fenlei_id = geiGet('fenlei_id',false);

//_init();
//fanye();//绑定翻页事件
//获取接口参数
function _init(){
	var shuju	=	{'circle_id':id};
	var dizhi	=	ApiUrl + '/index.php?act=circle&op=edit';
	var func	=	'_handle';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

//处理返回数据
function _handle(t){
	
	
	document.getElementById("neirong").innerHTML = t.circle_name;
	
	var i = $('#neirong').html();
	
	if( i.length != 0 ){
		$('#neirong').removeClass('placeholder');
	}else{
		$('#neirong').addClass('placeholder');
	}
	
	var data = {};
		data.data = t.images_list;
		
		
//	
	var html = template.render('zhaopian-tp',data);//渲染HTML
	
//	if( curpage == 1 ){
//		$('#zhaopian-box').html(html);
//	}else{
		$('#zhaopian-box').append(html);
//	}

if( data.data.length >= tianjiazuiduoshu  ){
	$('#zhaoxiangji').hide();
}
	
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

/*
 *修改之前的本页面数据检测
 */
function fabu_check(){
	
	if( $('#neirong').html().length  < 1 ){
		mui.alert(' ','请输入文字内容');
		return false;
	}
	
//	if( $('.img-list').length  < 1 ){
//		mui.alert(' ','请上传图片!');
//		return false;
//	}
	
	ol('正在发布...',1);
	
	shangchuanwenjian();
}

/*
 * 修改提交
 */
function fabu(){
	var neirong = $('#neirong').html();
	var images = [];
	
	for (var i = 0; i < up_list.length; i++) {
		images.push(up_list[i].url_lujing);
	}
	
	images = images.join(',');
	
	
	var shuju	=	{'circle_name':neirong,'images':images,'class_id':fenlei_id};
	var dizhi	=	ApiUrl + '/index.php?act=circle&op=add';
	var func	=	'_handle2';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	ajax(op);

}

function _handle2(t){
	
	cl();
	
	tishi('发布成功!');
	
	if( fenlei_id ){
		api.execScript({
			name : 'quanzi',
		    frameName: 'zhimakaimen',
		    script: '_init();'
		});
	}else{
		api.execScript({
		    name: 'root',
		    script: 'dakaifaxian();'
		});
	}

	
	setTimeout(function() {
		msxBack();
	}, 1000);
	
}


var _biaoqing_shiqu_id;//输入框失去焦点的ID
var _biaoqing_input_dom_name='#neirong';//输入框DOM
var _biaoqing_img_insert = true;//可插入表情状态
var _biaoqing_img_number = 20;//可插入表情数量
$(_biaoqing_input_dom_name).focus(function(){
	_biaoqingkuang(0);
	$(this).attr('data-focus',1);
}).blur(function(){
	clearTimeout(_biaoqing_shiqu_id);
	var that = $(this);
	_biaoqing_shiqu_id = setTimeout(function() {
		that.attr('data-focus',0);
	}, 444);
}).on('DOMNodeInserted',function(){
	var i = $(this).html();//输入的html内容
	var b;//输入的表情
	b = i.replace(/<img src\=\"(.*?)\">/gi,'~');
	b = b.match(/~/gi)?b.match(/~/gi):0;
	if( b.length >= _biaoqing_img_number  ){//判断插入表情数量
		_biaoqing_img_insert = false;
	}
	if( i.length != 0 ){
		$(this).removeClass('placeholder');
	}else{
		$(this).addClass('placeholder');
	}
}).on('input propertychange',function(){
	var i = $(this).html();//输入的html内容
	var b;//输入的表情
	b = i.replace(/<img src\=\"(.*?)\">/gi,'~');
	b = b.match(/~/gi)?b.match(/~/gi):0;
	if( b.length < _biaoqing_img_number  ){//判断插入表情数量
		_biaoqing_img_insert = true;
	}
	if( i.length != 0 ){
		$(this).removeClass('placeholder');
	}else{
		$(this).addClass('placeholder');
	}
})

/*
 * 插入表情
 */
function msxCharubiaoqing(dom){
	clearTimeout(_biaoqing_shiqu_id);
	
	if( !_biaoqing_img_insert ){
		return false;
	}
	
	var biaoqing = $(dom).attr('src');
	var img_src = '<img src="'+ biaoqing +'">'
	
	var html = img_src;
	
	var is_focus = $(_biaoqing_input_dom_name).attr('data-focus');
	
	var sel, range;
	
	if( is_focus == '0' ){
		$(_biaoqing_input_dom_name).append( html );
		return false;
	}else if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                // Range.createContextualFragment() would be useful here but is
                // non-standard and not supported in all browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);
                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
    }
        
}

/*
 * 点击表情按钮
 */
function biaoqing(){
	var type = $('#_biaoqingkuang').is(':hidden');
	_biaoqingkuang(type);
}

function _biaoqingkuang(type){
	
	if(type==1){
		$('#_biaoqingkuang').show();
		$('#dilan1').css('bottom','100px');
	}else{
		$('#_biaoqingkuang').hide();
		$('#dilan1').css('bottom','0px');
	}
}

function aite(){
	$('#member_nickname').val('');
	$('#list-box').html('');
	_biaoqingkuang(0);
	mui('#aite').popover('toggle');
}


function sousuomingcheng(dom){
	
	var member_nickname = $('#member_nickname').val();
	
	if( member_nickname == '' ){
		return false;
	}
	
	var shuju	=	{'member_nickname':member_nickname};
	var dizhi	=	ApiUrl + '/index.php?act=circle&op=sousuoyuonghu';
	var func	=	'_sousuomingcheng';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol(); 
}

function _sousuomingcheng(t){
	var data = {};
		data.data = t.member_list;
		
	var html = template.render('list-tp',data);
	$('#list-box').html(html);
		
}

/*
 插入艾特
 */
function charuaite(dom){
	var nickname = $(dom).attr('data-member-nickname');
	var html = '&nbsp;@'+nickname+'&nbsp;';
	$('#neirong').append(html);
	
	//调用函数获取到img的data数据
//	var data = canvasWrapText({canvas:document.getElementById("canvas"),text:'@'+nickname});
//	var aitetupian = '<img src="'+data+'">';
//  $('#neirong').append(aitetupian);
//	
	mui('#aite').popover('toggle');
}


//绘制文字到canvas，判断换行位置，和设置canvas高度
function canvasWrapText(options) {
        var settings = {
            canvas:document.getElementsByTagName("canvas")[0], //canvas对象，必填，不填写默认找到页面中的第一个canvas
            canvasWidth:100, //canvas的宽度
            drawStartX:10, //绘制字符串起始x坐标
            drawStartY:30, //绘制字符串起始y坐标
            lineHeight:30, //文字的行高
            font:"24px 'Microsoft Yahei'", //文字样式
            text:"请修改掉默认的配置", //需要绘制的文本
            drawWidth:100, //文字显示的宽度
            color:"#000000", //文字的颜色
            backgroundColor:"#ffffff", //背景颜色
        };
 
        //将传入的配置覆盖掉默认配置
        if(!!options && typeof options === "object"){
            for(var i in options){
                settings[i] = options[i];
            }
        }
 
        //获取2d的上线文开始设置相关属性
        var canvas = settings.canvas;
        canvas.width = settings.canvasWidth;
        var ctx = canvas.getContext("2d");
 
        //绘制背景色
        ctx.fillStyle = settings.backgroundColor;
        ctx.fillRect(0,0,canvas.width,canvas.height);
 
        //绘制文字
        ctx.font = settings.font;
        ctx.fillStyle = settings.color;
        var lineWidth = 0; //当前行的绘制的宽度
        var lastTextIndex = 0; //已经绘制上canvas最后的一个字符的下标
        //由于改变canvas 的高度会导致绘制的纹理被清空，所以，不预先绘制，先放入到一个数组当中
        var arr = [];
        for(var i = 0; i<settings.text.length; i++){
            //获取当前的截取的字符串的宽度
            lineWidth = ctx.measureText(settings.text.substr(lastTextIndex,i-lastTextIndex)).width;
            
            if(lineWidth > settings.drawWidth){
                //判断最后一位是否是标点符号
                if(judgePunctuationMarks(settings.text[i-1])){
                    arr.push(settings.text.substr(lastTextIndex,i-lastTextIndex));
                    lastTextIndex = i;
                }else{
                    arr.push(settings.text.substr(lastTextIndex,i-lastTextIndex-1));
                    lastTextIndex = i-1;
                }
            }
            //将最后多余的一部分添加到数组
            if(i === settings.text.length - 1){
                arr.push(settings.text.substr(lastTextIndex,i-lastTextIndex+1));
            }
        }
 
        //根据arr的长度设置canvas的高度
        canvas.height = arr.length*settings.lineHeight+settings.drawStartY;
 
        ctx.font = settings.font;
        ctx.fillStyle = settings.color;
        for(var i =0; i<arr.length; i++){
            ctx.fillText(arr[i],settings.drawStartX,settings.drawStartY+i*settings.lineHeight);
        }
        //判断是否是需要避开的标签符号
        function judgePunctuationMarks(value) {
            var arr = [".",",",";","?","!",":","\"","，","。","？","！","；","：","、"];
            for(var i = 0; i< arr.length; i++){
                if(value === arr[i]){
                    return true;
                }
            }
            return false;
        }
        return canvas.toDataURL();
}


/*
 * 表情初始化
 */
_init_biaoqing();
function _init_biaoqing(){	
	var data = {};
		data.shu = biaoqingzongshu;
	var html = template.render('biaoqing-tp',data);
	document.getElementById("biaoqing-box").innerHTML = html;
}

//删除图片时,显示照相机
function quxiaotupian(dom){
	$(dom).parent().remove();
	$('#zhaoxiangji').show();
}


/*
 * 上传图片 
 *
 */
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
				
				
			var url_path = $(this).attr('data-url-path');
			
			if( url_path != '' ){
				tmp.is_ok = true;
				tmp.url_lujing = url_path;
			}
				
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
						if( ret.progress == 100 && ret.status == 1  ){
							up_list[i].is_ok = true;
							up_list[i].url_lujing = ret.body.listData.img;
							shangchuanwenjian();
						}
				});
				
				return false;
			}
		}
		fabu();//图片上传完毕,正式发布二手
	}
}


/*
 * 把选取的相机或相册图片显示到页面中 
 *
 */
function show_tupians(){
	for (var i = 0; i < up_ziyuan.length; i++) {
		up_ziyuan[i].url_lujing = '';
	}
	
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


/*
 * 打开系统相册,并选取图片
 */
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

/*
 * 打开相机
 */
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

/*
 * 打开资源
 */
function dakaiziyuan(){
	mui('#picture').popover('toggle');
	_biaoqingkuang(0);
}

/*
 * 预览图片
 */
function yulantupian(){
	$('.suolvtula').off('click');
	$('.suolvtula').on('click',function(){
		var ii = $('.suolvtula').index(this);
		
		var img_arr = [];
		$('.suolvtula').each(function(e,i){
			var path = $(this).attr('src');
			img_arr.push( path );
		})
		msxDakaitupian(img_arr,ii);
	})
}
