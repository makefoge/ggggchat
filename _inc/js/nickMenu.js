function nickMenu(span,nick,uid)
{
	if($('#inputForm').css('display')=='block')
	{
		if($('#nickmenu')){$('#nickmenu').remove();}
		var menu=document.createElement('div');
		var nicks=document.getElementById('nicks')
		if(menu)
		{
			menu.setAttribute('id','nickmenu');
			menu.className='box';
			menu.style.position='absolute';
			menu.style.left=psy_get_offset_X(span)+'px';
			menu.style.top=psy_get_offset_Y(span)+span.offsetHeight+'px';
			menu.onclick=function(){document.body.removeChild(menu);}
			var a=document.getElementById('cmd').getElementsByTagName('option');
			var n=document.getElementById('n_'+nick);
			var mynick;
			for(var i=0;i<a.length;i++)
			{
				if(n.style.fontStyle=='italic'&&a[i].text=='сказать'){mynick=operator;}else{mynick=nick;}
				var line=document.createElement('div');
				line.style.lineHeight='15px';
				line.className='box1';
				line.onmouseover=function(){this.className='box2';}
				line.onmouseout=function(){this.className='box1';}
				//$(line).click(function(){psy_for(mynick,uid,a[i].value);});
				if(line.attachEvent){line.attachEvent("onclick",new Function("psy_for('"+mynick+"','"+uid+"','"+a[i].value+"');"));}else{line.setAttribute("onclick","psy_for('"+mynick+"','"+uid+"','"+a[i].value+"');");}
				//////////////////////
				var option=document.createElement('span');
				option.appendChild(document.createTextNode(a[i].text));
				option.className='text';
				option.onmouseover=function(){this.style.cursor='pointer';}
				option.onmouseout=function(){this.style.cursor='none';}
				line.appendChild(option);
				menu.appendChild(line);
			}
			//alert($('#nicksContainer')[0]);
			var pos=$(span).position();
			$(menu).css('top',pos.top+$('#nicksContainer').scrollTop()+$(span).height());
			$(menu).css('left',pos.left);
			$(menu).css('zIndex',2000);
			$('#nicksconfirm').append(menu);
			//document.body.appendChild(menu);
		}
	}
}