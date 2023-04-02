function delMsg(id)
{
	id=id.split(',');
	for(var a in id)
	{
		var msg=$('#p'+id[a]);
		if(msg)
		{
			msg.remove();
		}
	}
	scrollHeight=0;
}