function addCloseCross(legend,type)
{
	if(!legend||legend.getElementsByTagName('img')[0]){return false;}
	var img=document.createElement("img");
	img.setAttribute("src","/_img/del.gif");
	img.setAttribute("alt","[X]");
	img.onmouseover=function(){this.className='smiehover';}
	img.onmouseout=function(){this.className='sm';}
	if(type=="smile")
	{
		img.onclick=function(){smilesClear();boxRemove(this);}
	}
	else if(type=="music")
	{
		img.onclick=function(){
			player.stop('pMusic');
			/*
			var player=document['player'];
			if(player&&player.sendEvent)
			{
				player.sendEvent('STOP','true');
			}
			*/
			boxRemove(this);
		}
	}
	else if(type=="banner")
	{
		$(img).on('click',function(){
			$('#msgBanner').addClass('hidden');
		});
	}
	else
	{
		img.onclick=function(){boxRemove(this);}
	}
	legend.appendChild(img);
}