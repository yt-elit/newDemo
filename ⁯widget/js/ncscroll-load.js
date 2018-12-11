function ncScrollLoad() {
    var page,curpage,hasmore,footer,isloading;

    ncScrollLoad.prototype.loadInit = function(options) {
        var defaults = {
                data:{},
                callback :function(){},
                resulthandle:''
            }
        var options = $.extend({}, defaults, options);
        if (options.iIntervalId) {
            page = options.page>0?options.page : pagesize;
            curpage = 1;
            hasmore = true;
            footer = false;
            isloading = false;
        }
        ncScrollLoad.prototype.getList(options);
        $(window).scroll(function(){
            if (isloading) {//防止scroll重复执行
                return false;
            }
            if(($(window).scrollTop() + $(window).height() > $(document).height()-1)){
                isloading = true;
                options.iIntervalId = false;
                ncScrollLoad.prototype.getList(options);
            }
        });
    }

    ncScrollLoad.prototype.getList = function(options){
        if (!hasmore) {
            $('.loading').remove();
            ncScrollLoad.prototype.getLoadEnding();
            return false;
        }
        param = {};
        //参数
        if(options.getparam){
            param = options.getparam;
        }
        //初始化时延时分页为1
        if(options.iIntervalId){
            param.curpage = 1;
        }
        param.page = page;
        param.curpage = curpage;
        $.getJSON(options.url, param, function(result){
            checkLogin(result.login);
            $('.loading').remove();
            curpage++;
            var data = result.datas;
            //处理返回数据
            if(options.resulthandle){
                eval('data = '+options.resulthandle+'(data);');
            }

            if (!$.isEmptyObject(options.data)) {
                data = $.extend({}, options.data, data);
            }
            //评论页
            data.zhuren_member_id = geiGet('zhuren_member_id',false);
            
            
            var html = template.render(options.tmplid, data);
            if(options.iIntervalId === false){
                $(options.containerobj).append(html);
            }else{
                $(options.containerobj).html(html);
            }
            //评论页扩充父窗口高度
            if( data.zhuren_member_id ){
//          	var win_height = $('body').height()/1.7;
//          	
//          	if(result.datas.goods_eval_list == 0){
//          		win_height = 300;
//          	}
            	
//  			$('.yemian2 iframe', window.parent.document).css('height',win_height);
            }
            
            hasmore = result.hasmore;
            if (!hasmore) {
                $('.loading').remove();
                //加载底部
                if ($('#footer').length > 0) {
                    ncScrollLoad.prototype.getLoadEnding();
                    if (result.page_total == 0) {
                        $('#footer').addClass('posa');
                    }else{
                        $('#footer').removeClass('posa');
                    }
                }
            }
            if (options.callback) {
                options.callback.call('callback');
            }
            isloading = false;
        });
    }

    ncScrollLoad.prototype.getLoadEnding = function() {
        if (!footer) {
            footer = true;
            $.ajax({
                url: WapSiteUrl+'/js/tmpl/footer.js',
                dataType: "script"
            });
        }
    }
}