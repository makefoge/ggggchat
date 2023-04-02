function psy_get_offset_X(e)
{
	var x=0;
	while(e)
	{
		x+=e.offsetLeft;
		e=e.offsetParent;
	}
	return x;
}
function psy_get_offset_Y(e)
{
	var y=0;
	while(e)
	{
		y+=e.offsetTop;
		e=e.offsetParent;
	}
	return y-$('#nicksContainer').scrollTop();
}