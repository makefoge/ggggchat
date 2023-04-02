var player={
	init:function(id,autoplay){
		//console.log(test);
		////////////////////
		///*
		if(Modernizr.audio)
		{
			$('#'+id).replaceWith('<audio id="'+id+'" controls="controls" style="width:186px;"></audio>');//height:60px;
			$('#'+id)[0].volume=0.3;
			//console.log($('#'+id));
			if(autoplay&&autoplay.length>0&&!Cookies.get('noradio'))
			{
				player.play(id,autoplay);
			}
		}
		else
		//	*/
		{
			swfobject.createSWF({data:'/_inc/swf/player.swf',width:186,height:20,id:id,name:id},{flashvars:((autoplay&&autoplay.length>0&&!Cookies.get('noradio'))?'skin=/_inc/swf/simple.swf&file='+autoplay+'&type=sound&duration=-1&autostart=true':'skin=/_inc/swf/simple.swf&type=sound'),allowscriptaccess:'always'},id);
			//swfobject.createSWF({data:'/_inc/swf/player.swf',width:186,height:20,id:id,name:id},{flashvars:'skin=/_inc/swf/simple.swf&type=sound',allowscriptaccess:'always'},id);
			//swfobject.embedSWF('/_inc/swf/player.swf',id,'186','20','10','',{skin:'/_inc/swf/simple.swf',type:'sound'},{allowscriptaccess:'always'},{id:id,name:id,style:''});
			//console.log(document['player'].sendEvent);
		}
		////////////////////
		//*/
		return true;
	},
	load:function(id,file){
		var playerElement=$('#'+id);
		switch(playerElement[0].nodeName)
		{
			case'AUDIO':
				playerElement.prop('src',file);
				break;
			default:
				if(playerElement[0].sendEvent){playerElement[0].sendEvent('LOAD',{file:file,type:'sound',duration:-1,autostart:true});}
		}
		return true;
	},
	play:function(id,file){
		var playerElement=$('#'+id);
		if(!playerElement[0]){
			showMusic(false);
			playerElement=$('#'+id);
		}
		player.load(id,file);
		switch(playerElement[0].nodeName)
		{
			case'AUDIO':
				playerElement[0].play();
				break;
			default:
				if(playerElement[0].sendEvent){playerElement[0].sendEvent('PLAY','true');}
		}
	},
	stop:function(id){
		var playerElement=$('#'+id);
		switch(playerElement[0].nodeName)
		{
			case'AUDIO':
				playerElement[0].pause();
				break;
			default:
				if(playerElement[0].sendEvent){playerElement[0].sendEvent('STOP','true');}
		}
	}
};