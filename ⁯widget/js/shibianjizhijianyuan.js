apiready = function(){
	gei();
}

function gei(){
	var id 		=	geiGet('id',false);
	var shuju	=	{'id':id};
	var dizhi	=	'/def/Yanshou/yancount';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
}

function chuli(data){
	
	if( data.code != 200 ){
		tishi(kongtishi);
		cl();
		return false;
	}
	
	var data = data.data;
	
	document.getElementById("denglushouji").value	=	data.UserMobile;
	document.getElementById("lianxiren").value	=	data.ContactUser;
	document.getElementById("lianxidianhua").value	=	data.ContactTel;
	document.getElementById("shenfenzheng").value	=	data.UserCode;
	document.getElementById("yi").innerText	=	data.Province;
	document.getElementById("er").innerText	=	data.City;
	document.getElementById("querenquyu").style.display = 'block';
				
	cl();
	
}

function tijiao(){
	
	var id 		=	geiGet('id',false);
	
	var denglushouji	=	document.getElementById("denglushouji").value;
	var denglumima		=	document.getElementById("denglumima").value;
	if( denglumima.length == 0 ){
		denglumima	=	'';
	}
	var lianxiren		=	document.getElementById("lianxiren").value;
	var lianxidianhua	=	document.getElementById("lianxidianhua").value;
	var shenfenzheng	=	document.getElementById("shenfenzheng").value;
	var yi				=	document.getElementById("yi").innerText;
	var er				=	document.getElementById("er").innerText;
	
	
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
	var dizhi	=	'/def/Fangban/edit_zjy';
	var func	=	'tijiaochuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
}

function tijiaochuli(data){
	
	
	cl();
	
	if( data.code == 200 ){
		mui.alert('','修改成功！');
		
		var id 		=	geiGet('id',false);
		
		xiugaiyonghuxinxi(id);
		
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

//编辑之后，动态修改用户信息
function xiugaiyonghuxinxi(id){
	api.execScript({
		name : 'zhijianyuanliebiao3-w',
	    frameName: 'zhijianyuanliebiao3',
	    script: 'xiugaiyonghuxinxi('+id+');'
	});
}
