gei();
apiready = function(){
}

function gei(){
	
	document.getElementById("yi").innerText	=	session('sheng');
	document.getElementById("er").innerText	=	'省级质监员';
	
	var moren	=	{'yi':session('sheng'),'er':'省级质监员'};
	liandongcaidan(moren);
}

function tijiao(){
	
	var id 		=	geiGet('id',false);
	
	var denglushouji	=	document.getElementById("denglushouji").value;
	var denglumima		=	document.getElementById("denglumima").value;
	var lianxiren		=	document.getElementById("lianxiren").value;
	var lianxidianhua	=	document.getElementById("lianxidianhua").value;
	var shenfenzheng	=	document.getElementById("shenfenzheng").value;
	var yi				=	document.getElementById("yi").innerText;
	var er				=	document.getElementById("er").innerText;
	
	if( denglushouji.length < 1 ){
		mui.alert('','请输入登陆手机号！');
		return false;
	}
	if( denglumima.length < 6 ){
		mui.alert('','请输入密码！');
		return false;
	}
	
	if( lianxiren.length < 1 ){
		mui.alert('','请输入联系人！');
		return false;
	}
	
	if( lianxidianhua.length < 1 ){
		mui.alert('','请输入联系电话！');
		return false;
	}
	
	if( shenfenzheng.length < 1 ){
		mui.alert('','请输入身份证号！');
		return false;
	}
	
	if( yi == '请选择' ){
		mui.alert('','请选择所在区域！');
		return false;
	}
	
	var shuju	=	{
						'id':id,
						'UserMobile':denglushouji,
						'UserPass':denglumima,
						'ContactUser':lianxiren,
						'ContactTel':lianxidianhua,
						'UserCode':shenfenzheng,
						'Province':yi,
						'City':er,
					};
	var dizhi	=	'/def/Fangban/add_zjy';
	var func	=	'tijiaochuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
}

function tijiaochuli(data){
	
	
	cl();
	
	if( data.code == 200 ){
		mui.alert('','添加成功！');
		setTimeout(function() {
			cw();
		}, 1000);
		
		return false;
	}
	
	mui.alert('',data.msg);
}


function liandongcaidan(moren){
	//级联示例-----------------------------------------
	(function($, doc) {
		$.ready(function() {
		
			//初始化
			var op	=	{'layer':2};
			var cityPicker = new $.PopPicker(op);
			cityPicker.setData(cityData);			//	塞进数组
			
			//设置默认值
			var provCode = moren.yi;
			var cityCode = moren.er;
			cityPicker.pickers[0].setSelectedText(provCode, 0);
			setTimeout(function() {
				cityPicker.pickers[1].setSelectedText(cityCode,0);
			}, 0);
		
		
			//实例化
			var showCityPickerButton = doc.getElementById('suozaiquyu');
			
			//	隐藏省，开放市
			document.querySelectorAll('.mui-picker')[0].style.display = 'none';
			document.querySelectorAll('.mui-picker')[1].style.width = '100%';
			
			showCityPickerButton.addEventListener('tap', function(event) {
				cityPicker.show(function(items) {
					var yi	=	items[0].text;
					var er	=	items[1].text;
					document.getElementById("yi").innerHTML	=	yi;
					document.getElementById("er").innerHTML	=	er;
					//返回 false 可以阻止选择框的关闭
					//return false;
				});
			}, false);
			//-----------------------------------------
			//					//级联示例
		});
	})(mui, document);
}
