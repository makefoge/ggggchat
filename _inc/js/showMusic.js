function showMusic(autoplay)
{
	var musicplace=document.getElementById("musicplace");
	var musicbox=document.getElementById("musicbox");
	if(!musicbox)
	{
		var musicbox=document.createElement("div");
		musicbox.className="box";
		musicbox.setAttribute("id","musicbox");
		var fieldset=document.createElement("fieldset");
		var legend=document.createElement("legend");
		legend.appendChild(document.createTextNode("Музыка "));
		fieldset.appendChild(legend);
		var music=document.createElement("div");
		music.setAttribute('id','music');
		fieldset.appendChild(music);
		musicbox.appendChild(fieldset);
		musicplace.appendChild(musicbox);
		addCloseCross(legend,'music');
		////////////////////////////////////
		//var version=flashDetect();
		//if(version!==false&&version.major>=10)
		{
			//var player=document.getElementById('player');
			//if(!player)
			{
				//if(addr)
				//{
				//	flashvars='skin=/_inc/swf/simple.swf&file='+addr+'&type=sound&duration=-1&autostart=true';
				//}
				//music.innerHTML=playerHTML;//so.addParam('flashvars','&file=/media/20070128_excerpt.mp4&backcolor=EDDEC1&wmode=opaque&frontcolor=000000&lightcolor=005099&screencolor=000000');
				$(music).html('<div id="pMusic"></div>');
				player.init('pMusic',registry.player.autoplay);
			}
			/////////
			var music_select=document.getElementById('music_select');
			if(!music_select)
			{
				var music_select=document.createElement("select");
				music_select.setAttribute('id','music_select');
				music_select.style.width='186px';
				music_select.style.height='16px';
				music_select.style.fontSize='10px';
				music_select.style.textAlign='center';
				music_select.onchange=function(){player.play('pMusic',this.value);}
				music.appendChild(music_select);
			}
			///////
			buildMusicOptions(music_select);
			///////
			//if(addr){music_select.value=addr;}
			if(autoplay.length>0){music_select.value=autoplay;}
			else{music_select.value='';}
			///////
			return true;
		}
		//else{music.innerHTML='<span class="bold">ВНИМАНИЕ! Необходимо установить свежую версию <a href="http://get.adobe.com/flashplayer/" target="_blank">Adobe Flash Player</a></span>';}
	}
	else
	{
		musName=false;
		musAddr=false;
		musId=false;
		$('#musicbox').remove();
		$.ajax({
			url:'/send.php',
			data:{room:room,uid:uid,cmd:'music'},
			dataType:'json',
			success:function(data){
				//console.log(data);
				musName=data.name;
				musAddr=data.addr;
				musId=data.id;
			},
			complete:function(){}
		});
		//var loadnote=document.createElement('center');
		//loadnote.className='smset';
		//loadnote.appendChild(document.createTextNode('Идёт загрузка музыки...'));
		//music.appendChild(loadnote);
	}
}