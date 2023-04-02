function setSmile(name,type)
{
	if(window.psy_delete_smile)
	{
		return window.psy_delete_smile(name,type);
	}
	else if(window.psy_delete_chatsmile)
	{
		return window.psy_delete_chatsmile(name);
	}
	var input=document.getElementById("input");
	if(input)
	{
		if(window.psy_show_mysmile1)
		{
			var smiles=psy_count_mysmiles();
			if(smiles.length>=mysmiles){alert('Вы можете добавить не более '+mysmiles+' любимых смайлов!');return false;}
			if(type=='local'){var addr=room+'/smile/'+name+'.gif';}else{var addr='_sml/'+type+'/'+name+'.gif';}
			var sm=document.createElement("img");
			sm.onclick=function(){psy_del_smile(this);}
			sm.oncontextmenu=function(){psy_move_smile(this);return false;}
			sm.setAttribute('src',addr);
			sm.setAttribute('id',':'+name+'|'+type+':');
			sm.className='sm';
			input.appendChild(sm);
			psy_qty_update();
		}
		else
		{
			if(smilesPermit())
			{
				input.focus();
				input.value+=' :'+name+'|'+type+': ';
			}
			input.focus();
		}
	}
}