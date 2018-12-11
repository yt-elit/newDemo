
var goods_id = getQueryString("goods_id");
var map_list = [];
var map_index_id = '';
var store_id;
var jiazaicishu = 0;//页面加载次数

var order_pintuan	=	getQueryString('order_pintuan');

var banner_list = [];//图片数组

var shipin_url = '';

$(function (){

	
    var key = getCookie('key');

    var unixTimeToDateString = function(ts, ex) {
        ts = parseFloat(ts) || 0;
        if (ts < 1) {
            return '';
        }
        var d = new Date();
        d.setTime(ts * 1e3);
        var s = '' + d.getFullYear() + '-' + (1 + d.getMonth()) + '-' + d.getDate();
        if (ex) {
            s += ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        }
        return s;
    };

    var buyLimitation = function(a, b) {
        a = parseInt(a) || 0;
        b = parseInt(b) || 0;
        var r = 0;
        if (a > 0) {
            r = a;
        }
        if (b > 0 && r > 0 && b < r) {
            r = b;
        }
        return r;
    };

    template.helper('isEmpty', function(o) {
        for (var i in o) {
            return false;
        }
        return true;
    });

     // 图片轮播
    function picSwipe(){
      var elem = $("#mySwipe")[0];
      window.mySwipe = Swipe(elem, {
        continuous: false,
        // disableScroll: true,
        stopPropagation: true,
        callback: function(index, element) {
          $('.goods-detail-turn').find('li').eq(index).addClass('cur').siblings().removeClass('cur');
        }
      });
      
      setTimeout(function() {
              $('#xuanze-box').show();
      }, 10);
      
    }
    
    if(sysType=='wx'){
    	get_detail(goods_id);
    	
    }else{
    	apiready = function(){
    		ol('',1);
    		get_detail(goods_id);
    	}
    }
    
  //点击商品规格，获取新的商品
  function arrowClick(self,myData){
  	
  	
    $(self).addClass("current").siblings().removeClass("current");
    //拼接属性
    var curEle = $(".spec").find("a.current");
    var curSpec = [];
    $.each(curEle,function (i,v){
        // convert to int type then sort
        curSpec.push(parseInt($(v).attr("specs_value_id")) || 0);
    });
    var spec_string = curSpec.sort(function(a, b) { return a - b; }).join("|");
    //获取商品ID
    goods_id = myData.spec_list[spec_string];
    
    get_detail(goods_id);
  }

  function contains(arr, str) {//检测goods_id是否存入
	    var i = arr.length;
	    while (i--) {
           if (arr[i] === str) {
	           return true;
           }
	    }
	    return false;
	}
  $.sValid.init({
        rules:{
            buynum:"digits"
        },
        messages:{
            buynum:"请输入正确的数字"
        },
        callback:function (eId,eMsg,eRules){
            if(eId.length >0){
                var errorHtml = "";
                $.map(eMsg,function (idx,item){
                    errorHtml += "<p>"+idx+"</p>";
                });
                $.sDialog({
                    skin:"red",
                    content:errorHtml,
                    okBtn:false,
                    cancelBtn:false
                });
            }
        }
    });
  //检测商品数目是否为正整数
  function buyNumer(){
    $.sValid();
  }
  

  
  function get_detail(goods_id) {
  	
  	if( order_pintuan > 0 ){
  		var param = {goods_id:goods_id,key:key,'order_pintuan':order_pintuan};
  	}else{
  		var param = {goods_id:goods_id,key:key};
  	}

  	
      //渲染页面
      $.ajax({
         url:ApiUrl+"/index.php?act=goods&op=goods_detail",
         type:"get",
         data:param,
         dataType:"json",
         success:function(result){
         	if( sysType !='wx' ){
         		cl();
         	}
         	
            var data = result.datas;
            
            
            
            
            if(!data.error){
              //商品图片格式化数据
              if(data.goods_image){
                var goods_image = data.goods_image.split(",");
                data.goods_image = goods_image;
              }else{
                 data.goods_image = [];
              }
              //商品规格格式化数据
              if(data.goods_info.spec_name){
                var goods_map_spec = $.map(data.goods_info.spec_name,function (v,i){
                  var goods_specs = {};
                  goods_specs["goods_spec_id"] = i;
                  goods_specs['goods_spec_name']=v;
                  if(data.goods_info.spec_value){
                      $.map(data.goods_info.spec_value,function(vv,vi){
                          if(i == vi){
                            goods_specs['goods_spec_value'] = $.map(vv,function (vvv,vvi){
                              var specs_value = {};
                              specs_value["specs_value_id"] = vvi;
                              specs_value["specs_value_name"] = vvv;
                              return specs_value;
                            });
                          }
                        });
                        return goods_specs;
                  }else{
                      data.goods_info.spec_value = [];
                  }
                });
                data.goods_map_spec = goods_map_spec;
              }else {
                data.goods_map_spec = [];
              }

              // 虚拟商品限购时间和数量
              if (data.goods_info.is_virtual == '1') {
                  data.goods_info.virtual_indate_str = unixTimeToDateString(data.goods_info.virtual_indate, true);
                  data.goods_info.buyLimitation = buyLimitation(data.goods_info.virtual_limit, data.goods_info.upper_limit);
              }

              // 预售发货时间
              if (data.goods_info.is_presell == '1') {
                  data.goods_info.presell_deliverdate_str = unixTimeToDateString(data.goods_info.presell_deliverdate);
              }
              
              //填充图片数组
              banner_list = [];
              for (var i = 0; i < data.goods_image.length; i++) {
              	banner_list.push( data.goods_image[i] );
              }
              
              //视频初始化
              shipin_url = data.goods_info.video;
              

              //渲染模板
              var html = template.render('product_detail', data);
              $("#product_detail_html").html(html);
              
              var shangpindibuH = $(window).width() * 1.075 ;
              
              $('#shangpindibu').css('margin-top',shangpindibuH);
              

              if (data.goods_info.is_virtual == '0') {
            	  $('.goods-detail-o2o').remove();
              }
              
    
              //渲染模板
              var html = template.render('product_detail_sepc', data);
              $("#product_detail_spec_html").html(html);
              
              
              //拼团规则
			  $('.pintuandetail').click(function(){
				$(this).addClass('active').siblings().removeClass('active');
				pintuanjiajian();
				
			  });

              //渲染模板
              var html = template.render('voucher_script', data);
              	$("#voucher_html").html(html);
	      		var html = template.render('product_title', data);
	      		$("head").append(html);
              if (data.goods_info.is_virtual == '1') {
            	  store_id = data.store_info.store_id;
            	  virtual();
              }
  
              // 购物车中商品数量
              if (getCookie('cart_count')) {
                  if (getCookie('cart_count') > 0) {
                      $('#cart_count,#cart_count1').html('<sup>'+getCookie('cart_count')+'</sup>');
                  }
              }

              //图片轮播
              picSwipe();
              //商品描述
              $(".pddcp-arrow").click(function (){
                $(this).parents(".pddcp-one-wp").toggleClass("current");
              });
              //规格属性
              var myData = {};
              myData["spec_list"] = data.spec_list;
              $(".spec a").click(function (){
                var self = this;
                
                
                arrowClick(self,myData);
              });
              //购买数量，减
              $(".minus").click(function (){
                 var buynum = $(".buy-num").val();
                 if(buynum >1){
                    $(".buy-num").val(parseInt(buynum-1));
                 }
                 
//               if( data.goods_info.is_pintuan == '1' ){
                 	pintuanjiajian();
//               }
                 
              });
              //购买数量加
              $(".add").click(function (){
                 var buynum = parseInt($(".buy-num").val());
                 if(buynum < data.goods_info.goods_storage){
                    $(".buy-num").val(parseInt(buynum+1));
                 }
                 
                 
//               if( data.goods_info.is_pintuan == '1' ){
                 	pintuanjiajian();
//               }
                 
              });
              // 一个F码限制只能购买一件商品 所以限制数量为1
              if (data.goods_info.is_fcode == '1') {
                  $('.minus').hide();
                  $('.add').hide();
                  $(".buy-num").attr('readOnly', true);
              }
              //收藏
              $(".pd-collect").click(function (){
              	
              	if( !msxIsLogIn() ){
              		msxqudenglu();
              		return false;
              	}
              	
                  if ($(this).hasClass('favorate')) {
                      if (dropFavoriteGoods(goods_id)) $(this).removeClass('favorate');
                  } else {
                      if (favoriteGoods(goods_id)) $(this).addClass('favorate');
                  }
              });
              
              //加入购物车
              $("#add-cart").click(function (){
                var key = getCookie('key');//登录标记
                var quantity = parseInt($(".buy-num").val());
                 if(!key){
                     var goods_info = decodeURIComponent(getCookie('goods_cart'));
                     if (goods_info == null) {
                         goods_info = '';
                     }
                     if(goods_id<1){
                         show_tip();
                         return false;
                     }
                     var cart_count = 0;
                     if(!goods_info){
                         goods_info = goods_id+','+quantity;
                         cart_count = 1;
                     }else{
                         var goodsarr = goods_info.split('|');
                         for (var i=0; i<goodsarr.length; i++) {
                             var arr = goodsarr[i].split(',');
                             if(contains(arr,goods_id)){
                                 show_tip();
                                 return false;
                             }
                         }
                         goods_info+='|'+goods_id+','+quantity;
                         cart_count = goodsarr.length;
                     }
                     // 加入cookie
                     addCookie('goods_cart',goods_info);
                     // 更新cookie中商品数量
                     addCookie('cart_count',cart_count);
                     show_tip();
                     getCartCount();
                     $('#cart_count,#cart_count1').html('<sup>'+cart_count+'</sup>');
                     return false;
                 }else{
                    $.ajax({
                       url:ApiUrl+"/index.php?act=member_cart&op=cart_add",
                       data:{key:key,goods_id:goods_id,quantity:quantity},
                       type:"post",
                       success:function (result){
                          var rData = $.parseJSON(result);
                          if(checkLogin(rData.login)){
                            if(!rData.datas.error){
                                show_tip();
                                // 更新购物车中商品数量
                                delCookie('cart_count');
                                getCartCount();
                                $('#cart_count,#cart_count1').html('<sup>'+getCookie('cart_count')+'</sup>');
                            }else{
                              $.sDialog({
                                skin:"red",
                                content:rData.datas.error,
                                okBtn:false,
                                cancelBtn:false
                              });
                            }
                          }
                       }
                    })
                 }
              });

              //立即购买
              if (data.goods_info.is_virtual == '1') {
                  $("#buy-now").click(function() {
                  	
                      var key = getCookie('key');//登录标记
                      if (!msxIsLogIn()) {
						//v5.2 添加登录后，返回商品页
						
						var houzhui1	=	'';
						if( order_pintuan ){
							houzhui1	=	'&order_pintuan='+order_pintuan;
						}
						
						addCookie('redirect_uri','/tmpl/product_detail.html?goods_id='+goods_id+houzhui1);
						msxqudenglu();
						return false;
                      }
                      
                      if( session('is_shiming') <= 0 ){
                     		$.sDialog({
                                skin:"block",
                                content:'请实名认证！',
                                okFn:function(){
                                	k('mokuai1/shimingrenzheng.html','shimingrenheng');
                                },
                                cancelFn:function(){
                                	
                                }
                            });
                     		return;
                     	}

                      var buynum = parseInt($('.buy-num').val()) || 0;

                      if (buynum < 1) {
                            $.sDialog({
                                skin:"red",
                                content:'参数错误！',
                                okBtn:false,
                                cancelBtn:false
                            });
                          return;
                      }
                      if (buynum > data.goods_info.goods_storage) {
                            $.sDialog({
                                skin:"red",
                                content:'库存不足！',
                                okBtn:false,
                                cancelBtn:false
                            });
                          return;
                      }

                      // 虚拟商品限购数量
                      if (data.goods_info.buyLimitation > 0 && buynum > data.goods_info.buyLimitation) {
                            $.sDialog({
                                skin:"red",
                                content:'超过限购数量！',
                                okBtn:false,
                                cancelBtn:false
                            });
                          return;
                      }

                      var json = {};
                      json.key = key;
                      json.cart_id = goods_id;
                      json.quantity = buynum;
                      $.ajax({
                          type:'post',
                          url:ApiUrl+'/index.php?act=member_vr_buy&op=buy_step1',
                          data:json,
                          dataType:'json',
                          success:function(result){
                              if (result.datas.error) {
                                  $.sDialog({
                                      skin:"red",
                                      content:result.datas.error,
                                      okBtn:false,
                                      cancelBtn:false
                                  });
                              } else {
                                  location.href = WapSiteUrl+'/tmpl/order/vr_buy_step1.html?goods_id='+goods_id+'&quantity='+buynum;
                              }
                          }
                      });
                  });
              } else {
                  $("#buy-now,#pintuan-now,#vip-buy").click(function (){
                  	
                  	var iddom	=	$(this).attr('id');
                  	
                     var key = getCookie('key');//登录标记
                     if(!msxIsLogIn()){
						//v5.2 添加登录后，返回商品页
						var houzhui1	=	'';
						if( order_pintuan ){
							houzhui1	=	'&order_pintuan='+order_pintuan;
						}
						addCookie('redirect_uri','/tmpl/product_detail.html?goods_id='+goods_id+houzhui1);
						msxqudenglu();
						return false;
                     }else{
                     	if( session('is_shiming') <= 0 ){
                     		$.sDialog({
                                skin:"block",
                                content:'请实名认证！',
                                okFn:function(){
                                	k('mokuai1/shimingrenzheng.html','shimingrenheng');
                                },
                                cancelFn:function(){
                                	
                                }
                            });
                     		return;
                     	}
                     	
                     	
                     	
                     	
                         var buynum = parseInt($('.buy-num').val()) || 0;

                      if (buynum < 1) {
                            $.sDialog({
                                skin:"red",
                                content:'参数错误！',
                                okBtn:false,
                                cancelBtn:false
                            });
                          return;
                      }
                      if (buynum > data.goods_info.goods_storage) {
                            $.sDialog({
                                skin:"red",
                                content:'库存不足！',
                                okBtn:false,
                                cancelBtn:false
                            });
                          return;
                      }

                        var json = {};
                        json.key = key;
                        json.cart_id = goods_id+'|'+buynum;
                        
                        var houzhui	=	'';
                        
                        //拼团购买
                        if( iddom == 'pintuan-now' ){
                        	json.pintuan_id	=	$('.pintuandetail.active').attr('data-id');
                        	
                        	houzhui	=	houzhui	+	'&pintuan_id='+json.pintuan_id;
                        	if( order_pintuan ){
                        		houzhui	=	houzhui	+	'&order_pintuan='+order_pintuan;
                        	}
                        	
                        }
                        //vip购买
                        if( iddom == 'vip-buy' ){
                        	
                        	if( msxgetCookie('is_vip') != 1 ){
                        		k('mokuai1/huiyuanquanyi.html','huiyuanquanyi');
                        		return false
                        	}
                        	
                        	json.vip_buy = 1;
                        	houzhui		=	houzhui	+	'&vip_buy='+1;
                        }
                        
                        
                        $.ajax({
                            type:'post',
                            url:ApiUrl+'/index.php?act=member_buy&op=buy_step1',
                            data:json,
                            dataType:'json',
                            success:function(result){
                                if (result.datas.error) {
                                    $.sDialog({
                                        skin:"red",
                                        content:result.datas.error,
                                        okBtn:false,
                                        cancelBtn:false
                                    });
                                }else{
                               		if( sysType !='wx' ){
										k('tmpl/order/buy_step1.html?goods_id='+goods_id+'&buynum='+buynum+houzhui,'byu1');                               			
                               		}else{
                               			location.href = WapSiteUrl+'/tmpl/order/buy_step1.html?goods_id='+goods_id+'&buynum='+buynum+houzhui;
                               		}
                                }
                            }
                        });
                     }
                  });
                  
                  
                  
                  

              }

            }else {

              $.sDialog({
                  content: data.error + '！',
                  okBtn:false,
                  cancelBtnText:'取消',
                  cancelFn: function() { msxBack(); }
              });
            }

            //验证购买数量是不是数字
            $("#buynum").blur(buyNumer);
            
            var valves	=	'.animation-up,#goods_spec_selected';
            
            $.animationUp({
                valve : valves,          // 动作触发
                wrapper : '#product_detail_spec_html',    // 动作块
                scroll : '#product_roll',     // 滚动块，为空不触发滚动
                start : function(){       // 开始动作触发事件
                    $('.goods-detail-foot').addClass('hide').removeClass('block');
                },
                close : function(){        // 关闭动作触发事件
                    $('.goods-detail-foot').removeClass('hide').addClass('block');
                }
            });
            
            myScrollAnimationUp = new IScroll("#product_roll", { mouseWheel: true, click: true });
            
            $.animationUp({
                valve : '#getVoucher',          // 动作触发
                wrapper : '#voucher_html',    // 动作块
                scroll : '#voucher_roll',     // 滚动块，为空不触发滚动
            });

            $('#voucher_html').on('click', '.btn', function(){
                getFreeVoucher($(this).attr('data-tid'));
            });
            
            // 联系客服
            $('.kefu').click(function(){
				if (data.store_info.node_chat) {
					 window.location.href = WapSiteUrl+'/tmpl/member/chat_info.html?goods_id=' + goods_id + '&t_id=' + result.datas.store_info.member_id;
				}else{
                	msxliaotian();
            	}	 
				
				
                
				
            })
            
            //最上面的选择切换栏
            $('#zhongjiandaohanglan li').click(function(){
		    	var i = $(this).index();
				
				api.execScript({
					name : 'shangpinxiangqing-w',
				    script: 'qiehuandilan2('+i+');'
				});
		    })
            
            //中间红色的选择项
        	$('#xuanzexiang-box .xuanzexiang').click(function(){
//				$(this).addClass('active').siblings().removeClass('active');
				
				var i = $(this).index();
				
				
				api.execScript({
					name : 'shangpinxiangqing-w',
				    script: 'qiehuandilan2('+i+');'
				});
				
			})
         }
      });
  }
  
  $.scrollTransparent();
  $('#product_detail_html').on('click', '#get_area_selected', function(){
      $.areaSelected({
          success : function(data){
              $('#get_area_selected_name').html(data.area_info);
              var area_id = data.area_id_2 == 0 ? data.area_id_1:data.area_id_2;
              $.getJSON(ApiUrl + '/index.php?act=goods&op=calc', {goods_id:goods_id,area_id:area_id},function(result){
                  $('#get_area_selected_whether').html(result.datas.if_store_cn);
                  $('#get_area_selected_content').html(result.datas.content);
                  if (!result.datas.if_store) {
                      $('.buy-handle').addClass('no-buy');
                  } else {
                      $('.buy-handle').removeClass('no-buy');
                  }
              });
          }
      });
  });
  
  $('body').on('click', '#goodsBody,#goodsBody1', function(){
  		if( sysType == 'wx' ){
  	
      window.location.href = WapSiteUrl+'/tmpl/product_info.html?goods_id=' + goods_id;
  		}else{
  			api.execScript({
					name : 'shangpinxiangqing-w',
				    script: 'qiehuandilan2('+1+');'
				});  	
  		}
      
  });
  $('body').on('click', '#goodsEvaluation,#goodsEvaluation1', function(){
  	
  		if( sysType == 'wx' ){
  			window.location.href = WapSiteUrl+'/tmpl/product_eval_list.html?goods_id=' + goods_id;
  		}else{
			api.execScript({
					name : 'shangpinxiangqing-w',
				    script: 'qiehuandilan2('+3+');'
				});  			
  		}
  	
  });

  $('#list-address-scroll').on('click','dl > a',map);
  $('#map_all').on('click',map);
});


/**********************************************/


function show_tip() {
	return false;
    var flyer = $('.goods-pic > img').clone().css({'z-index':'999','height':'3rem','width':'3rem'});
    flyer.fly({
        start: {
            left: $('.goods-pic > img').offset().left,
            top: $('.goods-pic > img').offset().top-$(window).scrollTop()
        },
        end: {
            left: $("#cart_count1").offset().left+40,
            top: $("#cart_count1").offset().top-$(window).scrollTop(),
            width: 0,
            height: 0
        },
        onEnd: function(){
            flyer.remove();
        }
    });
}

function virtual() {
	$('#get_area_selected').parents('.goods-detail-item').remove();
    $.getJSON(ApiUrl + '/index.php?act=goods&op=store_o2o_addr', {store_id:store_id},function(result){
    	if (!result.datas.error) {
    		if (result.datas.addr_list.length > 0) {
    	    	$('#list-address-ul').html(template.render('list-address-script',result.datas));
    	    	map_list = result.datas.addr_list;
    	    	var _html = '';
    	    	_html += '<dl index_id="0">';
    	    	_html += '<dt>'+ map_list[0].name_info +'</dt>';
    	    	_html += '<dd>'+ map_list[0].address_info +'</dd>';
    	    	_html += '</dl>';
    	    	_html += '<p><a href="tel:'+ map_list[0].phone_info +'"></a></p>';
    	    	$('#goods-detail-o2o').html(_html);

    	    	$('#goods-detail-o2o').on('click','dl',map);

    	    	if (map_list.length > 1) {
    	    		$('#store_addr_list').html('查看全部'+map_list.length+'家分店地址');
    	    	} else {
    	    		$('#store_addr_list').html('查看商家地址');
    	    	}
    	    	$('#map_all > em').html(map_list.length);    			
    		} else {
    			$('.goods-detail-o2o').hide();
    		}
    	}
    });
    $.animationLeft({
        valve : '#store_addr_list',
        wrapper : '#list-address-wrapper',
        scroll : '#list-address-scroll'
    });
}

function map() {
	  $('#map-wrappers').removeClass('hide').removeClass('right').addClass('left');
	  $('#map-wrappers').on('click', '.header-l > a', function(){
		  $('#map-wrappers').addClass('right').removeClass('left');
	  });
	  $('#baidu_map').css('width', document.body.clientWidth);
	  $('#baidu_map').css('height', document.body.clientHeight);
	  map_index_id = $(this).attr('index_id');
	  if (typeof map_index_id != 'string'){
		  map_index_id = '';
	  }
	  if (typeof(map_js_flag) == 'undefined') {
	      $.ajax({
	          url: WapSiteUrl+'/js/map.js',
	          dataType: "script",
	          async: false
	      });
	  }
	if (typeof BMap == 'object') {
	    baidu_init();
	} else {
	    load_script();
	}
}

function pintuanjiajian(){
	var pintuanjiage = $('.pintuandetail.active').attr('data-price');
	var shangpinjiage = $('#buy-now').attr('data-price');
	var vipjiage = $('#vip-buy').attr('data-price');
	
	
	
	var shu	=	$('#buynum').val();
	
	var pintuanzongjia	=	pintuanjiage * shu;
	pintuanzongjia	=	pintuanzongjia.toFixed(2);
	
	var shangpinzongjia	=	shangpinjiage * shu;
	shangpinzongjia	=	shangpinzongjia.toFixed(2);
	
	var vipzongjia	=	vipjiage * shu;
	vipzongjia	=	vipzongjia.toFixed(2);
	
	var s	=	'￥'+pintuanzongjia+'元';
	var s1	=	'￥'+shangpinzongjia+'元';
	var s2	=	'￥'+vipzongjia+'元';
	
	$('#pintuan-now span').text( s );
	$('#buy-now span').text( s1 );
	$('#vip-buy span').text( s2 );
}


/*
 * 产品图片轮播 
 */
function tupianindex(index){
	msxDakaitupian( banner_list , index );
}

/*
 * 打开视频
 */
function shipin(){
	msxDakaishipin( shipin_url );
}
