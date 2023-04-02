function audioLinkSend()
{
	var fwh=$('#fwh').val();fwh=fwh.split('|');
	var cmd=$('#cmd').val();
	var audio=$('#audio').val();
	var audioname=$('#audioname').val();
	if(validate.addr(audio))
	{
		if(cmd!='pm'&&cmd!='am')
		{
			$('#cmd').val('say');
			cmd='say';
		}
		if(cmd=='pm'&&fwh[0]=='')
		{
			alert('Чтобы послать аудио ссылку в приват, вы должны кликнуть на ник!');
			return false;
		}
		////////////////////////////////////
		$.ajax({
			type:'post',
			url:'/send.php?room='+room,
			data:'&uid='+uid+'&cmd='+cmd+'&fwh='+$('#fwh').val()+'&audio='+audio+'&audioname='+audioname,
			dataType:'script',
			success:function(){},
			complete:function(){}
		});
		////////////////////////////////////
	}
	else return false;
}