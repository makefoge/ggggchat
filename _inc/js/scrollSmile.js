function scrollSmile()
{
	var offset=$('#smilebox').offset();
	var st=$('#nicksContainer').scrollTop();
	$('#nicksContainer').scrollTop(st+offset.top);
}