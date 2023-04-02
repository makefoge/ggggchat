function nickList(nick,type,uid,cnd,avlink,id,sound)
{
	//console.log(nick,type,uid,cnd,avlink,id,sound);
	var list=document.getElementById("nicks");
	if(list)
	{
		var inchat=document.getElementById("inchat");
		var line=document.getElementById("p_"+nick);
		if(type=="1"||type=="15")
		{
			if(!line)
			{
				var line=document.createElement('tr');
				var n=document.createElement('span');
				var a=document.createElement('img');
				var td1=document.createElement('td');
				var td2=document.createElement('td');
				a.setAttribute("alt","[?]");
				a.setAttribute("id","a_"+nick);
				a.style.margin="1px";
				n.setAttribute("id","n_"+nick);
				n.style.whiteSpace="nowrap";
				n.appendChild(document.createTextNode(nick));
				line.setAttribute("id","p_"+nick);
				n.onmouseover=function(){this.className='smsetiehover';}
				n.onmouseout=function(){this.className='';}
				a.onmouseover=function(){this.className='smiehover';}
				a.onmouseout=function(){this.className='sm';}
				a.onclick=function(){window.open('/viz.php?nick='+encodeURIComponent(nick)+'&room='+window.room+'&uid='+window.uid,'',windowOpenFeature);}
				a.oncontextmenu=function(){nickMenu(this,nick,uid);return false;}
				n.oncontextmenu=function(){nickMenu(this,nick,uid);return false;}
				n.onclick=function(){psy_for(nick,uid,"pm");}
				td1.setAttribute("width","34");
				td1.setAttribute("height","34");
				td1.style.textAlign="center";
				td1.appendChild(a);
				td2.appendChild(n);
				line.appendChild(td1);
				line.appendChild(td2);
				list.appendChild(line);
				nick_width=145;
				inchat.innerHTML++;
				if(n.offsetWidth>=nick_width)
				{
					n.innerHTML=nickTruncate(n.innerHTML,n.offsetWidth);
				}
			}
			var n=document.getElementById('n_'+nick);
			if(cnd=='1'||cnd=='12'){n.style.fontStyle='normal';}
			else if(cnd=='2'){n.style.textDecoration='line-through';}
			else if(cnd=='3'||cnd=='11'){n.style.fontStyle='italic';}
			var a=document.getElementById('a_'+nick);
			a.src=avlink;
			///////////////////////////////публичное звуковое оповещение
			if(id!='?')
			{
				var soundcache=document.getElementById('sound'+id);
				if(!soundcache)
				{
					soundcache=document.createElement('img');
					soundcache.style.display='none';
					soundcache.setAttribute('id','sound'+id);
					a.parentNode.appendChild(soundcache);
				}
				if(sound.length>0){soundcache.src=sound;}else{a.parentNode.removeChild(soundcache);}
			}
		}
		else
		{
			var p=document.getElementById('p_'+nick);
			if(p){list.removeChild(p);}
			if(line){inchat.innerHTML--;}
		}
	}
}