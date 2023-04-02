var antiflood={
	timeout:false,
	timer:0,
	time:3,
	maxLinesDiv:4,
	init:function(){
		///////////
		clearTimeout(antiflood.timeout);
		antiflood.timer-=1;
		var OK=$('#msgSend');
		if(antiflood.timer>0)
		{
			OK.html(antiflood.timer);
			antiflood.timeout=setTimeout(antiflood.init,1000);
		}
		else
		{
			antiflood.timer=0;
			OK.html('ОК');
		}
		//console.log(antiflood.timer);
	},
	getTime:function(){
		return (main.registry.punished.data[1]>sys.getUnixTime()?main.registry.punished.timer:antiflood.time);
	},
	toggleDiv:function(img){
		var img=$(img);
		if(img.prop('src').indexOf('aftc')!==-1)
		{
			img.parent().height(((parseInt(img.next().css('font-size'))+3.5)*antiflood.maxLinesDiv));
			img.prop('src','/_img/afto.png');
		}
		else
		{
			img.parent().height('auto');
			img.prop('src','/_img/aftc.png');
		}
	},
	container:function(element){
		if(typeof Cookies.get('noDivWrap')=='undefined')
		{
			var lh=parseInt($(element).css('font-size'))+3.5;
			if($(element).parent().height()>(lh*antiflood.maxLinesDiv))
			{
				var l=$(element).text().length;
				var dw=$(element).parent().width();
				if(!(dw/(l/antiflood.maxLinesDiv)>10))
				{
					$(element).before('<img onclick="antiflood.toggleDiv(this);" class="sm" onmouseout="this.className=\'sm\';" onmouseover="this.className=\'smiehover\';" src="/_img/aftc.png">');
					antiflood.toggleDiv($(element).prev());
				}
			}
		}
	}
};