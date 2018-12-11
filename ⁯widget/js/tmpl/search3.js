$(function(){
	Array.prototype.unique = function()
	{
		var n = [];
		for(var i = 0; i < this.length; i++)
		{
			if (n.indexOf(this[i]) == -1) n.push(this[i]);
		}
		return n;
	}
	var keyword = decodeURIComponent(getQueryString('keyword'));
    if (keyword) {
    	$('#keyword').val(keyword);
    	writeClear($('#keyword'));
    }
    $('#keyword').on('input',function(){
    	var value = $.trim($('#keyword').val());
    	if (value == '') {
    		$('#search_tip_list_container').hide();
    	} else {
//          $.getJSON(ApiUrl + '/index.php?act=goods&op=auto_complete',{term:$('#keyword').val()}, function(result) {
//          	if (!result.datas.error) {
//              	var data = result.datas;
//              	data.WapSiteUrl = WapSiteUrl;
//              	if (data.list.length > 0) {
//              		$('#search_tip_list_container').html(template.render('search_tip_list_script',data)).show();
//              	} else {
//              		$('#search_tip_list_container').hide();
//              	}
//          	}
//          })
    	}
    });

    $('.input-del').click(function(){
        $(this).parent().removeClass('write').find('input').val('');
    });

    template.helper('$buildUrl',buildUrl);
	xianshilishijilu();
    
//  $.getJSON(ApiUrl + '/index.php?act=index&op=search_key_list', function(result) {
//  	var data = result.datas;
//  	data.WapSiteUrl = WapSiteUrl;
//  	$('#hot_list_container').html(template.render('hot_list',data));
//      $('#search_his_list_container').html(template.render('search_his_list',data));
//  })

    $('#header-nav').click(function(){
    		
    		var lishijilu = session('shangpinsousuolishijilu');
    			lishijilu = lishijilu + ',' + $('#keyword').val();
    		
    		var lishijilu_arr = lishijilu.split(',');
    			lishijilu_arr = unique(lishijilu_arr);
    			
    		var cunlishijilu = [];
    		for (var i = 0; i < lishijilu_arr.length; i++) {
    			if( lishijilu_arr[i] == null || lishijilu_arr[i] == 'null' ){
    				continue;
    			}
    			cunlishijilu.push( lishijilu_arr[i] );
    		}
    		
    		session('shangpinsousuolishijilu', cunlishijilu.join(',') );
    		
    		
    		k('tmpl/product_list2.html?keyword='+$('#keyword').val(),'product_list2');
    		
    		
    });
});

function xianshilishijilu(){
	var lishijilu = session('shangpinsousuolishijilu');
	if( lishijilu == null || lishijilu == '' || lishijilu == 'null' ){
		return false;
	}
	
	var data = {};
		data.his_list = lishijilu.split(',');
	
	var html = template.render('search_his_list',data);
	document.getElementById("search_his_list_container").innerHTML = html;
	
}


function unique(arr) {
    var result = [], hash = {};
    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
        if (!hash[elem]) {
            result.push(elem);
            hash[elem] = true;
        }
    }
    return result;
//http://www.cnblogs.com/sosoft/
}

function qingkonglishi(){
	document.getElementById("jishijilukuang").innerHTML = '';
	session('shangpinsousuolishijilu','null');
}
