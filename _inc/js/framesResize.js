function framesResize()
{
	$('#msgContainer').height(($(window).height()-91));
	$('#msgContainer').width(($(window).width()-221));
	$('#nicksContainer').height(($(window).height()-91));
	$('#bottomContainer').width($(window).width());
	msg.scroll.init();
	//scrolling();
}