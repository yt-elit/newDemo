
apiready = function(){
	ms();
}


var shujuarr;
gei();


function shuoming(){
	mui('#sheet1').popover('toggle');
}

function gei(){
	
	var shuju	=	session('huancunbianma');
	
	if( !shuju ){
		document.getElementById("list-box").innerHTML	=	'';
		return false;
	}
	shuju	=	shuju.split(',');
	for ( var i = 0 ; i < shuju.length ; i++ ) {
		var linshi				=	shuju[i].split('|');
		shuju[i]			=	{'bianma':linshi[0],'shijian':linshi[1],'id':i};
	}
	
	shujuarr	=	shuju;
	
	sethtml(shuju);
	
}

function sethtml(data){
	var nima	=	{'data':data};
	
	
	var html	=	template.render('list-tp',nima);
	document.getElementById("list-box").innerHTML	=	html;
}

function cun(){
	var neirong	=	document.getElementById("huancunshuru").value;
	var shijian	=	date();
	
	if( neirong.length < 8 || neirong.length > 15 ){
		mui.alert('','请输入正确的编码！');
		return false;
	}
	
	var data	=	{'bianma':neirong , 'shijian':shijian};
	
	huancunbianma(data);
	document.getElementById("huancunshuru").value	=	'';
	gei();
}

//扫码
function saoma(){
	var scanner = api.require('scanner');
	scanner.open(function(ret, err) {
	    if (ret.eventType == 'success') {
	        
	        var neirong	=	geiGet( 'keywords' , ret.msg);
			var shijian	=	date();
	        
	        var data	=	{'bianma':neirong , 'shijian':shijian};
	
			huancunbianma(data);
			gei();
	    }
	});
}

function shanchu(dom,bianma,id){
	mui.confirm('','确定删除【'+bianma+'】',['确定','取消'],function(e){
		if( e.index == 0 ){
			
			for (var i = 0; i < shujuarr.length ; i++) {	//	根据ID删除数组
				if( id == shujuarr[i].id ){
					shujuarr.splice(i,1);
				}
			}
			
			huancunbianma2(shujuarr);
			dom.remove();
		}
	});
}

//	用于页面逻辑
function huancunbianma(data){
	var shuju	=	session('huancunbianma');
	if( !shuju ){
		shuju	=	data.bianma + '|' + data.shijian;
	}else{
		shuju	=	data.bianma + '|' + data.shijian + ',' + session('huancunbianma') ;
	}
	
	session('huancunbianma',shuju);
}
//	用于后台逻辑
function huancunbianma2(data){
	
	if( !data.length ){
		localStorage.removeItem('huancunbianma');
		gei();
		return false;
	}
	document.getElementById("shuliang").innerText	=	document.getElementById("shuliang").innerText - 1;
	
	var shuju	=	'';
	
	for (var i = 0 ; i < data.length ; i++) {
		if( i == 0 ){
			shuju	=	data[i].bianma + '|' + data[i].shijian;
		}else{
			shuju	=	shuju + ',' + data[i].bianma + '|' + data[i].shijian;
		}
	}
	
	session('huancunbianma',shuju);
}

function qingkong(){
	mui.confirm('','确定清空？',['确认','取消'],function(e){
		if( e.index == 0 ){
			localStorage.removeItem('huancunbianma');
			gei();
		}
	});
}
function quyanshou(){
	var op = {name:'yanshouchanpin-w',html:'yanshouchanpin-w.html?huancun=1'};
	ow(op);
}