apiready = function() {
	getNeirongxiangqing();
}

function getNeirongxiangqing() {
	var dizhi = '/def/info/detail';
	var id = geiGet('id', false);
	var fenleiid = geiGet('fenleiid', false);
	var shuju = {
		'id': id,
		'fenleiid': fenleiid
	};
	var func = 'setNeirongxiangqing';
	var op = {
		'dizhi': dizhi,
		'shuju': shuju,
		'func': func
	};

	ajax(op);
	ol();
}

function setNeirongxiangqing(data) {
	cl();

	var data = data.data;

	document.getElementById("biaoti").innerHTML = data.Title;
	document.getElementById("time").innerText = data.Datetime;
	document.getElementById("neirong").innerHTML = data.Content;

//	datu();	
}

function datu() {
	var doms = document.querySelectorAll('img');
	var indexs = 0;
	
	
	var img	=	['http://dynamic-image.yesky.com/1080x-/uploadImages/2015/289/18/088DKEL7G4C0.jpg','https://www.baidu.com/img/bd_logo1.png'];
	
	for(var i = 0; i < doms.length; i++) {

		indexs = indexs + 1;

		doms[i].setAttribute('data-index', indexs);
		doms[i].addEventListener('click', function(e) {
			var hereIndex = this.getAttribute('data-index');
			opendatu( hereIndex,img.join(',') );
		});

	}
}

function opendatu(index,imgUrls) {
	
	var op = {
		'name': 'tupianfangda',
		'html': 'widget://chajian/tupianfangda.html?index='+index+'&imgUrls='+imgUrls,
		'yh': 0
	};

	of (op);
}