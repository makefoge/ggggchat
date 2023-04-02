if(!Date.now){
	Date.now=function(){return new Date().getTime();}
}
//////////
var sys={
	getInternetExplorerVersion:function(){
		var rv=false;
		if(navigator.appName=='Microsoft Internet Explorer')
		{
			var rv=-1;
			var ua=navigator.userAgent;
			var re=new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
			if(re.exec(ua)!=null)rv=parseFloat(RegExp.$1);
		}
		return rv;
	},
	getUnixTime:function(){
		return Date.now()/1000;
	}
};
