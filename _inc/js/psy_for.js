function psy_for(nick,uid,cmd)
{
	if($('#inputForm').css('display')=='block')
	{
		//var file=document.getElementById('file');
		if(!($('#fwh').val()!=''&&$('#input').val()!=''&&$('#cmd').val()=='pm'&&(cmd=='pm'||cmd=='say')))
		{
			$('#fwh').val(nick+'|'+uid);
			$('#cmd').val(cmd);
		}
		ui.inputFocus();
		$('#input').val($('#input').val()+nick+', ');
		///////////////////////////
		if(!$('.divUpload').hasClass('hidden'))
		{
			if(cmd!='pm')
			{
				$('.picUploadPrivate').addClass('hidden');
			}
			else
			{
				//console.log(nick);
				$('.picUploadPrivate').removeClass('hidden');
				$('.picUploadPrivate').val(nick);
				$('#fwh').val(nick+'|'+uid);
			}
		}
		///////////////////////////
		if(cmd!='say'&&cmd!='pm'&&cmd!='am')
		{
			send.msg()
			//if(msgSend($('#fwh').val(),$('#cmd').val())==true)
			//{
			//	document.form.submit();
			//}
		}
	}
}