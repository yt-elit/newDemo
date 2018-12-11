var goods_id = getQueryString("goods_id");
$(function(){
	

    //渲染list
    var load_class = new ncScrollLoad();
    
    var shuju = {};
    if(goods_id){
    	shuju.goods_id = goods_id;
    }
    var k = msxgetCookie('key');
    	if( k ){
    		shuju.key = k;
    	}
    	if(zhuren_member_id){
    		shuju.zhuren_member_id = zhuren_member_id;
    	}
    
    load_class.loadInit({
        'url':ApiUrl + '/index.php?act=goods&op=goods_evaluate',
        'getparam':shuju,
        'tmplid':'product_ecaluation_script',
        'containerobj':$("#product_evaluation_html"),
        'iIntervalId':true,
        callback:function(){
            callback();
        }
        });


	$('.header-nav li').click(function(){
    	var i = $(this).index();
				
		api.execScript({
			name : 'shangpinxiangqing-w',
		    script: 'qiehuandilan2('+i+');'
		});
    })


    $('#goodsDetail').click(function(){
        window.location.href = WapSiteUrl+'/tmpl/product_detail.html?goods_id=' + goods_id;
    });
    $('#goodsBody').click(function(){
        window.location.href = WapSiteUrl+'/tmpl/product_info.html?goods_id=' + goods_id;
    });
    $('#goodsEvaluation').click(function(){
        window.location.href = WapSiteUrl+'/tmpl/product_eval_list.html?goods_id=' + goods_id;
    });
    
    $('.nctouch-tag-nav').find('a').click(function(){
        var type = $(this).attr('data-state');
        load_class.loadInit({
            url:ApiUrl + '/index.php?act=goods&op=goods_evaluate',
            getparam:{goods_id:goods_id,type:type},
            tmplid:'product_ecaluation_script',
            containerobj:$("#product_evaluation_html"),
            iIntervalId:true,
            callback:function(){
                callback();
            }
            });
        $(this).parent().addClass('selected').siblings().removeClass('selected');
    });
    
    

});

function callback(){
    $('.goods_geval').on('click', 'a', function(){
        var _this = $(this).parents('.goods_geval');
        _this.find('.nctouch-bigimg-layout').removeClass('hide');
        var picBox = _this.find('.pic-box');
        _this.find('.close').click(function(){
            _this.find('.nctouch-bigimg-layout').addClass('hide');
        });
        if (picBox.find('li').length < 2) {
            return;
        }
        Swipe(picBox[0], {
            speed: 400,
            auto: 3000,
            continuous: false,
            disableScroll: false,
            stopPropagation: false,
            callback: function(index, elem) {
                $(elem).parents('.nctouch-bigimg-layout').find('div').last().find('li').eq(index).addClass('cur').siblings().removeClass('cur');
            },
            transitionEnd: function(index, elem) {}
        });
    });
}

/*
 * 点赞
 */
function dianzan(dom){
	window.event.stopPropagation();
	
		if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	
	
	if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	var member_id = msxgetCookie('member_id');
	var master_member_id = $(dom).attr('data-member-id');
	if( member_id == master_member_id ){
		return false;
	}
	
	//点赞样式切换
	var type = $(dom).attr('data-type');
	if( type=='1' ){//撤销点赞
		$(dom).attr('data-type',0);
		$(dom).find('.zhuangtai-box-i img').attr('src','../mokuai1/ziyuan/faxian-zan.png');
		$(dom).find('.zhuangtai-box-number').removeClass('dianzan-text1').addClass('dianzan-text0').text(function(i,e){
			var i = Number(e);
				i = i - 1;
			return i;
		});
	}else{
		$(dom).attr('data-type',1);
		$(dom).find('.zhuangtai-box-i img').attr('src','../mokuai1/ziyuan/faxian-zanactive.png');
		$(dom).find('.zhuangtai-box-number').removeClass('dianzan-text0').addClass('dianzan-text1').text(function(i,e){
			var i = Number(e);
				i = i + 1;
			return i;
		});
	}
	
	
	
	var biao_id = $(dom).attr('data-id');
	
	var shuju	=	{'to_member_id':master_member_id,'biao_id':biao_id};
	var dizhi	=	ApiUrl + '/index.php?act=member&op=dianzanshangpinpinglun';
	var func	=	'_handle_dianzan';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
	
}

function _handle_dianzan(t){
	cl();
}

/*
 * 收藏
 */
function shoucang(dom){
	
	window.event.stopPropagation();
	
		if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	
	
	if( !msxIsLogIn() ){
		msxqudenglu();
		return false;
	}
	var type = $(dom).attr('data-type');
	
	
	if( type=='1' ){//撤销收藏
		$(dom).attr('data-type',0);
		$(dom).find('.zhuangtai-box-i img').attr('src','../mokuai1/ziyuan/faxian-shoucang.png');
		$(dom).find('.zhuangtai-box-number').removeClass('shoucang-text1').addClass('shoucang-text0').text(function(i,e){
			var i = Number(e);
				i = i - 1;
			return i;
		});
	}else{
		$(dom).attr('data-type',1);
		$(dom).find('.zhuangtai-box-i img').attr('src','../mokuai1/ziyuan/faxian-shoucangactive.png');
		$(dom).find('.zhuangtai-box-number').removeClass('shoucang-text0').addClass('shoucang-text1').text(function(i,e){
			var i = Number(e);
				i = i + 1;
			return i;
		});
	}
	
	var biao_id = $(dom).attr('data-id');
	
	if( type=='1' ){//删除收藏
		var shuju	=	{'fav_id':biao_id};
		var dizhi	=	ApiUrl + '/index.php?act=member_favorites&op=favorites_del';
	}else{
		var shuju	=	{'goods_id':biao_id};
		var dizhi	=	ApiUrl + '/index.php?act=member_favorites&op=favorites_add';
	}
	var func	=	'_handle_shoucang';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
	
	
//	添加 https://kmhd.kemeihudong.com/mobile/index.php?act=member_favorites&op=favorites_add    key:d9b6b97a544a78b2451fd3ae4de9212c    goods_id:100041

//  删除 https://kmhd.kemeihudong.com/mobile/index.php?act=member_favorites&op=favorites_del   key:d9b6b97a544a78b2451fd3ae4de9212c   fav_id:100041
}

function _handle_shoucang(t){
	cl();
}
