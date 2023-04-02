function clearMsgAndNicks(out)
{
	clearTimeout(window.msgTimeout);
	var msgarea=document.getElementById('msg');
	if(out)
	{
		//console.log('pass');
		if(msgarea){msgarea.innerHTML=msgareaHTML;}
		msg.connectionLEDChange('r');
	}
	else
	{
		if(msgarea){msgarea.innerHTML='';}
	}
	if(!uid){$('#legend img').remove();}
	var container=document.getElementById('nicks').parentNode;
	container.removeChild(document.getElementById('nicks'));
	var tbody=document.createElement('tbody');
	tbody.setAttribute('id','nicks');
	container.appendChild(tbody);
	document.getElementById('inchat').innerHTML='0';
	scrollHeight=0;
	lm=0;
	watcher=0;
	sounds=new Array();
}