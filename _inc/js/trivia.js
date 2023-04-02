function trivia()
{
	$.ajax({
		url:"/rpc.php",
		cache:false,
		data:"room="+room+"&uid="+uid+"&cmd=trivia",
		dataType:"script",
		success:function(){},
		complete:function(){return true;}
		});
	ui.inputFocus();
}
