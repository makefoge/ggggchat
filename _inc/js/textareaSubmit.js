function textareaSubmit(e)
{
	if(window.event)
	{
		var kn=window.event.keyCode;
	}
	else if(e)
	{
		var kn=e.which;
	}
	else return true;
	if(kn==13||kn==10)
	{
		send.msg();
		return false;
	}
	else return true;
}