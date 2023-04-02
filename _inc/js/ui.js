var ui={
	enter:function(nick,uid,status,reg,name,cnd,bonus,smilesPermitText,uploadPermitText,mysound,menu2ExcludeJson)
	{
		//console.log('test');
		$(window).bind('beforeunload',function(){return'Вы правда хотите уйти?';});
		window.uid=uid;
		myStatus=status;
		myId=reg;
		window.mysound=(typeof Cookies.get(mysound)!='undefined')?Cookies.get(mysound):false;
		//window.mysound=getCookie(mysound);
		$('#mynick').html(nick);
		//console.log(window.mysound);
		menu2Exclude=$.parseJSON(menu2ExcludeJson);
		//alert(menu2ExcludeJson);
		/////////////ссылки на бонусы
		if(reg!='?')
		{
			//$('#submenu').css('width','90px');
			//$('#submenu').attr('colspan','3');
			//$('#submenu').next().before('<td style="width:90px;" colspan="3" id="submenubonus"><button style="width:100%;" onclick="window.open(\'/mybonus.php?room='+room+'&amp;uid='+uid+'\',\'\',\''+windowOpenFeature+'\');return false;" title="Бонусы">Бонусы</button></td>');
			$('#frontbonus').html('[<span onmouseover="this.className=\'smsetiehover\'" onmouseout="this.className=\'\'" style="font-weight:bold;" id="bonus" onclick="window.open(\'/mybonus.php?room='+room+'&amp;uid='+uid+'\',\'\',\''+windowOpenFeature+'\');" title="Бонусы">'+bonus+'</span>]');
		}
		//$('#submenu button').html('Настройки');
		inputFormSetStatus(status,reg,name,smilesPermitText,uploadPermitText);
		$('#cnd2').val(cnd);
		$('#input').focus();
		clearMsg();
		$('#inputForm').removeClass('hidden');
		$('#enterForm').addClass('hidden');
		//$('#inputForm').css('display','block');
		//$('#enterForm').css('display','none');
		$('#pass').val('');
		//$("#enter").removeAttr("disabled");
		//loginRequestSent=false;
		ui.inputFocus();
	},
	exit:function(msgview,a,inchat)
	{
		$(window).unbind('beforeunload');
		window.uid=false;
		window.mysound=false;
		if(msgview==1&&!a)
		{
			clearMsgAndNicks(true);
			$('#inchat').html(inchat);
		}
		else{clearMsg();}
		psy_bonus_stop();
		$('#inputForm').addClass('hidden');
		$('#enterForm').removeClass('hidden');
		$('#input').val('');
		$('#status').off();
		$('#frontbonus').empty();
		$('#submenuadmin').remove();
		$('#submenubonus').remove();
		$('#submenu').css('width','180px');
		$('#submenu').attr('colspan','6');
		smilesClear();
		$('#smilebox').remove();
		ui.inputFocus();
	},
	inputFocus:function()
	{
		if($('#inputForm').css('display')=='block')
		{
			$('#input').focus();
		}
		else if($('#enterForm').css('display')=='block')
		{
			if($('#nick').val()==''){$('#nick').focus();}else{$('#pass').focus();}
		}
	}
};