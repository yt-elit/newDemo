apiready = function(){
	ms();
}

function gei(){
	
	var fname	=	document.getElementById("fname").value;
	var fmima	=	document.getElementById("fmima").value;
	var status	=	3;
	
	var shuju	=	{'account':fname,'password':fmima,'status':status};
	var dizhi	=	'/def/Log/login';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
}

function chuli(data){
	if( data.code == 200 ){
		mui.alert( '' ,data.msg);
		
		var data = data.data;
		login(data.level,data);
		
		setTimeout(function() {
			
			api.closeToWin({
				name : 'root',
			});
			
		}, 1000);
		
	}else{
		mui.alert( '' ,data.msg);
	}

}

function wangjimima(){
	var op	=	{ 'name' : 'fangbanzhaohuimima-w' , 'html' : 'fangbanzhaohuimima-w.html' };
	
	ow(op);
}
