$(function() {
    var goods_id = getQueryString("goods_id");
    $.ajax({
        url: ApiUrl + "/index.php?act=goods&op=goods_body",
        data: {goods_id: goods_id},
        type: "get",
        success: function(result) {
            $(".fixed-tab-pannel").html(result);
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
});