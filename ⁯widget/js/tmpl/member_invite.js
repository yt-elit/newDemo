//by 33hao invite
$(function(){
		var key = getCookie('key');
		if(key==''){
			location.href = 'login.html';
		}
		$.ajax({
			type:'post',
			url:ApiUrl+"/index.php?act=member_invite",
			data:{key:key},
			dataType:'json',
			//jsonp:'callback',
			success:function(result){
				checkLogin(result.login);
				$('#username').html(result.datas.member_info.user_name);
				$('#myurl').val(result.datas.member_info.myurl);
				$('.qufenxiang').attr('data-url',result.datas.member_info.houzhui);
				$('.qufenxiang').show();
				$('#myurl_src').attr("src",result.datas.member_info.myurl_src);
				$('#download_url').attr("href",result.datas.member_info.mydownurl);
				return false;
			}
		});
});