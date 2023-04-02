var cmdChange={
	init:function(data){
		if(!$('.divUpload').hasClass('hidden'))
		{
			if($('.picUploadPrivate').hasClass('hidden')&&data=='pm')
			{
				$('.picUploadPrivate').removeClass('hidden');
				$('.picUploadPrivate').val(cmdChange.getNickFromFwh());
			}
			else
			{
				$('.picUploadPrivate').addClass('hidden');
			}
		}
		ui.inputFocus();
	},
	getNickFromFwh:function(){
		var nick=$('#fwh').val().split('|');
		return nick[0];
	}
};