apiready = function(){
	ms();
	gei();
	yanshouchanpin();
	
	dakaishujuku();
}
function gei(){
	
//	document.getElementById("duanbiaoti").innerText = session('shi')+'质监员';
	
	var touxiang	=	session('touxiang');
	document.getElementById("touxiang").src	=	touxiang;
	
	document.getElementById("mingzi").innerText	=	session('lianxiren');
	document.getElementById("zhiwei").innerText	=	session('zhiwei');
	document.getElementById("lianxidianhua").innerText	=	session('lianxidianhua');
	
	
	
}

function bianjiziliao(){
	if( !istiao() ){
		return false;
	}
	var op = {name:'bianjiziliao-w',html:'bianjiziliao-w.html'};
	ow(op);
}

function yanshoujilu(){
	if( !istiao() ){
		return false;
	}
	var op = {name:'yanshoujilu-w',html:'yanshoujilu-w.html'};
	ow(op);
}
function xiugaimima(){
	var op = {name:'xiugaimima-w',html:'xiugaimima-w.html'};
	ow(op);
}
function zhijianyuanliebiao(){
	if( !istiao() ){
		return false;
	}
	var id	=	session('id');
	var op = {name:'zhijianyuanliebiao3-w',html:'zhijianyuanliebiao3-w.html?id='+id};
	ow(op);
}
function fangbanliebiao1(){
	if( !istiao() ){
		return false;
	}
	var id	=	session('id');
	var op = {name:'fangbanliebiao2-w',html:'fangbanliebiao2-w.html?id='+id};
	ow(op);
}
function tianjiazhijianyuan(){
	if( !istiao() ){
		return false;
	}
	var op = {name:'tianjiazhijianyuan-w',html:'tianjiazhijianyuan-w.html'};
	ow(op);
}
function yanshouchanpin(){
	if( !istiao() ){
		return false;
	}
	var wangluo	=	wangluozhuangtai();
	
//	if( wangluo ){
		var op = {name:'yanshouchanpin-w',html:'yanshouchanpin-w.html'};
		ow(op);
//	}else{
//		huancunbianma();
//	}
	
}


function huancunbianma(){
	if( !istiao() ){
		return false;
	}
	var op = {name:'huancunbianma-w',html:'huancunbianma-w.html'};
	ow(op);
}

function openlixianyanshou(){
	if( !istiao() ){
		return false;
	}
	var op = {name:'lixianyanshou-w',html:'lixianyanshou-w.html'};
	ow(op);
}


function istiao(){
	var type	=	session('ismodifypass');
	if( type == 0 ){
		xiugaimima();
		return false;
	}else{
		return true;
	}
}

function lixianyanshou(){
	
	var open	=	session('lixian_open');
	
	if( open == '1' ){
		openlixianyanshou();
		return false;
	}
	
	
	mui.confirm('','首次使用需要下载离线数据包，是否下载？',['下载','取消'],function(e){
		if( e.index == 0 ){
			mui.alert('','正在下载，请稍候...','确认',function(){
				openlixianyanshou();
			});
			
			setTimeout(function() {
				document.querySelector('.mui-popup-buttons').style.display = 'none';
			}, 244);
			
			openTable();
			
		}
	});
}


function dakaishujuku(){
	
	var db = api.require('db');
	db.openDatabase({
	    name: db_name
	}, function(ret, err) {
	    if (ret.status) {
	        
	    } else {
	        document.getElementById("lixianyanshou").style.display	=	'none';
	    }
	});
}

function openTable(){
	var db = api.require('db');
		db.executeSql({
		    name: db_name,
		    sql: 'CREATE TABLE IF NOT EXISTS t1(id int, bianma varchar(20), qiyemingcheng varchar(50), gongchengmingcheng varchar(50), suijima varchar(20), miaoshu varchar(100), zhuangtai int, miaoshuzhuangtai int )'
		}, function(ret, err) {
		    if (ret.status) {
		    	
		    	geis();
//		    	insertTable();
//		    	truncateTable();
		    	
		    } else {
	        	document.getElementById("lixianyanshou").style.display	=	'none';
		    }
		});
}

function insertTable(s){
	
	var db = api.require('db');
		db.executeSql({
		    name: db_name,
		    sql: s
		}, function(ret, err) {
		    if (ret.status) {
		    	
		    	
		    } else {
//		        alert(JSON.stringify(err));
		    }
		});
}

function selectTable(){
	var db = api.require('db');
		db.selectSql({
		    name: db_name,
		    sql: 'SELECT count(*) FROM t1'
		}, function(ret, err) {
		    if (ret.status) {
		    	
		        alert(JSON.stringify(ret));
		    	
		    } else {
		        alert(JSON.stringify(err));
		    }
		});
		
		truncateTable();
		
}


function geis(){
	
//	var shuju	=	{'id':264431};
	var shuju	=	{'id':0};
	var dizhi	=	'/def/Yanshou/products';
	var func	=	'chulis';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	
}


/*
 * 
 * 
 * CREATE TABLE IF NOT EXISTS t1(id int, bianma varchar(20), qiyemingcheng varchar(50), gongchengmingcheng varchar(50), suijima varchar(20), miaoshu varchar(100), zhuangtai int )
	"Id":"254311",
	"Title":"湖北华强科技有限责任公司",
	"Sites":"绿都塞纳春天一期地下车库",
	"Rands":"17emMCdJ2Z",
	"ProductNumber":"HBHQ20160503401",
	"yan":1,
	"miaoshu":"此编号安装在河南省洛阳市,已于2017-06-30 14:41:56被15896676570吕建新验收"
 * */
function chulis(data){
	
	if( data.code != 200 ){
		return false;
	}
	
	var rs	=	data.data;
	
	if( rs === null ){
		return false;
	}
	if( rs.length < 1 ){
		return false;
	}
	for (var i = 0; i < rs.length ; i++) {
		var sql	=	'INSERT INTO t1 VALUES ('+ rs[i].Id +',"'+rs[i].ProductNumber+'","'+ rs[i].Title +'","'+ rs[i].Sites +'","'+ rs[i].Rands +'","'+rs[i].miaoshu+'",'+rs[i].yan+',0)';
			
		session('lixianId_zuihou', rs[i].Id );
			
		insertTable(sql);
	}
		
		
	setTimeout(function() {
		document.querySelector('.mui-popup-title').innerText = '下载完毕';
		document.querySelector('.mui-popup-buttons').style.display = 'block';
	}, 300);
	
	session('lixian_open','1');	//	
	
//	selectTable();
}

//离线验收数据库，静默更新
function gengxin(){
	var open	=	session('lixian_open');	//	
	if( open == '0' ){
		return false;
	}
	var last_id	=	session('lixianId_zuihou');
	var shuju	=	{'id': last_id };
	var dizhi	=	'/def/Yanshou/products';
	var func	=	'chulis';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	ajax(op);
}

//离线验收数据，静默提交
function yanshoutijiao(){
	var open	=	session('lixian_open');
	var ids		=	session('lixianIds');
	
	if( open == '0' ){
		return false;
	}
	
	if( ids == '0' ){
		return false;
	}
	
	
	var shuju	=	{'ids':ids};
	var dizhi	=	'/def/Yanshou/products_yan';
	var func	=	'yanshoutijiaochuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	
}

function yanshoutijiaochuli(data){
	if( data.code != 200 ){
		return false;
	}
	session('lixianIds','0');
}


function jiahuofankui(){
	if( !istiao() ){
		return false;
	}
	var op = {name:'jiahuofankui-w',html:'jiahuofankui-w.html'};
	ow(op);
}


//离线验收，静默同步线上已验收数据
function gengxinUp(){
	var open	=	session('lixian_open');	//	
	if( open == '0' ){
		return false;
	}
	var shuju	=	{'id': 0 };
	var dizhi	=	'/def/Yanshou/upProducts';
	var func	=	'gengxinUpchuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	ajax(op);
}

function gengxinUpchuli(data){
	if( data.code != 200 ){
		return false;
	}
	
	if( data.ids == '' ){
		return false;
	}
	
	var s	=	'UPDATE t1 SET zhuangtai=1 WHERE id in('+data.ids+')';
	
	var data = {};
	
	var db = api.require('db');
		db.executeSql({
		    name: db_name,
		    sql: s
		}, function(ret, err) {
		    if (ret.status) {
		    	console.log('OK');
		    } else {
		    	console.log('NO');
		    }
		});
}

setInterval(function() {
	gengxin();
	yanshoutijiao();
}, 14000);

setInterval(function() {
	gengxinUp();
}, 64000);

var zhanghao = session('dengluzhanghao');
if( zhanghao == '18701380959' ){
	document.getElementById("baidu").style.display = 'block';
}

function baidu(){
	var op = {name:'baidu-w',html:'baidu-w.html'};
	ow(op);
}
