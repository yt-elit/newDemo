var apiUrl	=	'http://p.kemeihudong.com/tp.php';
var hUrl	=	'https://kmhd.kemeihudong.com';		//	打开网页地址URL
var upUrl	=	'http://p.kemeihudong.com/tp.php';//上传图片
var tupianUrl = apiUrl + '/app/index.php?i=1&c=entry&do=picture&m=hulu_like' ; // 图片入库URL
var uId = 1;//我的ID
var yingyan_id=204444;
//var apiUrl	=	'http://192.168.2.247';
//var apiUrl	=	'http://139.129.213.138';
var dengdaichaoshi	=	20000;					//	等待超时时间
var dengdaitishi	=	'';			//	等待提示
var chaoshitishi	=	'网络不通畅，请重试！';	//	超时提示
var kongtishi		=	'无内容';				//	数据为空的时候提示
var per_page		=	0;						//	分页默认起始数
var nian			=	'2017';
var db_name			=	'msxdb';				//	本地数据库名
