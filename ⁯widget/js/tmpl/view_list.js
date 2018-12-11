var key = getCookie('key');
$(function(){
    
    //渲染list
    var load_class = new ncScrollLoad();
    load_class.loadInit({
        'url':ApiUrl + '/index.php?act=member_goodsbrowse&op=browse_list',
        'getparam':{'key':key},
        'tmplid':'viewlist_data',
        'containerobj':$("#viewlist"),
        'iIntervalId':true,
        'data':{WapSiteUrl:WapSiteUrl}
    });

    $("#clearbtn").click(function(){
        $.ajax({
            type: 'post',
            url: ApiUrl + '/index.php?act=member_goodsbrowse&op=browse_clearall',
            data: {key: key},
            dataType: 'json',
            async: false,
            success: function(result) {
                if (result.code == 200) {
                    //$.sDialog({skin: "green", content: "清空成功", okBtn: false, cancelBtn: false});
//                  location.href = WapSiteUrl+'/tmpl/member/views_list.html';
                    location.reload();
                }else{
                    $.sDialog({skin: "red", content: result.datas.error, okBtn: false, cancelBtn: false});
                }
            }
        });
    });
});

/*
 * 打开历史
 */
function dakailishi(id,type){
	
	if(type==2){
		k('mokuai1/faxianxiangqing.html?id='+id,'faxianxiangqing');
	}
	if(type==3){
		k('mokuai1/xianzhixiangqing.html?id='+id,'xianzhixiangqing');
	}
	
	if(!type){
		shangpinxiangqing(id);
	}
}
