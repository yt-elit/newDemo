apiready = function(){
	gei();
}

function gei(){
	
	var search	=	geiGet('search');
	var shuju	=	{ 'keywords' : search };
	
	var dizhi	=	'/def/Homepage/search';
	var func	=	'chuli';
	var op		=	{'dizhi':dizhi,'func':func,'shuju':shuju};
	
	ajax(op);
	
	ol();
}

function chuli(data){
	if( data.code != 200 ){
		tishi(data.msg);
		cl(); 
		return false;
	}
	if( data.data.searchinfo.length < 1 ){
		tishi(kongtishi);
	}
	
	var list	=	{};
		list.data	=	data.data.searchinfo;
		
	
	var html	=	template.render( 'list-tp' , list );
	
	document.getElementById("list").innerHTML	=	html;
	
	cl();

}