apiready = function(){
	ms();
	gei();
}

function gei(){
	var dizhi	=	'/def/info/lists';
	var func	=	'chuli';
	var id		=	geiGet('id',false);
	var shuju	=	{ 'id' : id };
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	ol();
}

function chuli(data){
	cl();
	if( data.data.length < 1 ){
		tishi(kongtishi);
	}
	
	var listHtml	=	template.render( 'list-tp' , data );

	document.getElementById("list-box").innerHTML	=	listHtml;
	ms();
}

//点击看详情
function neirongxiangqing(id){
	
	if( id == 0 ){
		return false;
	}
	
	var fenleiid	=	geiGet('id',false);
	
	var op = {name:'xinxineirong-w',html:'xinxineirong-w.html?id='+id+'&fenleiid='+fenleiid};
	
	ow(op);
}


//发表建议
function jianyi(){
//	mui.prompt('','','为了更好，请您吐槽',['确认','取消'],function(e){
//		if(e.index == 0){
//			
//			var jianyineirong	=	document.getElementById("jianyineirong").value;
//			var	jianyichangdu	=	jianyineirong.length;
//			if( jianyichangdu < 10 ){
//				mui.alert('','内容太少了');
//			}else{
//				tijiaojianyi(jianyineirong);
//			}
//		}
//	},'div');
//	document.querySelector('.mui-popup-input').innerHTML='<textarea id="jianyineirong" placeholder="输入吐槽内容"></textarea>';

	document.getElementById("h1").style.display = 'initial';
	document.getElementById("h2").style.display = 'initial';

}

function t1(){
	quxiao();
	var jianyineirong	=	document.getElementById("jianyineirong").value;
		var	jianyichangdu	=	jianyineirong.length;
		if( jianyichangdu < 10 ){
			mui.alert('','内容太少了');
		}else{
			tijiaojianyi(jianyineirong);
		}
}

function quxiao(){
	document.getElementById("h1").style.display = 'none';
	document.getElementById("h2").style.display = 'none';
}

//提交建议
function tijiaojianyi(neirong){
	var dizhi	=	'/def/Homepage/tucao';
	var shuju	=	{'content':neirong};
	var func	=	'tijiaochenggong';
	var op		=	{'dizhi':dizhi,'shuju':shuju,'func':func};
	
	ajax(op);
}
//提交成功
function tijiaochenggong(data){
	mui.toast(data.msg);
}