apiready = function(){
	gei();
}

function gei(){
	var isLogIn		=	session('isLogIn');
	var level 		=	session('level');
	
	if ( !isLogIn ) {
		return false;
	}
	api.setFrameGroupIndex({
		name: 'group1',
		index: 3
	});
	
	
	if (level==10) {		//	国家防办
		var op =	{'name':'zichuangkou','html':'guojiafangban/index.html'};
	}else if(level==20){		//	省防办
		var op =	{'name':'zichuangkou','html':'shengfangban/index.html'};
		
	}else if(level==30){		//	市防办
		var op =	{'name':'zichuangkou','html':'shifangban/index.html'};
		
	}else if(level==40){		//	质监员
		var op =	{'name':'zichuangkou','html':'zhijianyuan/index.html'};
		
	}else if(level==50){		//	企业
		var op =	{'name':'zichuangkou','html':'qiye/index.html'};
		
	}else{
		
	}
	
	var header = $api.byId('header');
	$api.fixStatusBar(header);
	var headerH = $api.offset(header).h;
	
	op.yh = headerH;
	op.mgb = 50;
	
	of(op);
}
