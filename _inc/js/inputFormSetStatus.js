function inputFormSetStatus(status,reg,name,smilesPermit,uploadPermit)
{
	myStatus=status;
	//console.log('test');
	inputFormBuildCmdMenu(status,reg);
	//console.log('test');
	main.registry.smile.permitText=smilesPermit;
	uploadPermitText=uploadPermit;
	//console.log('test');
	if(inputFormBuildCndMenu(status))
	{
		//console.log('test');
		//scroll(0,0);//без этого в ie6 следующая строка не пашет почемуто
		if($('#cnd').val()=="3"&&status<3){$('#cnd').val(1);}
		$('#cnd2').val($('#cnd').val());
	}
	$('#status').html(name);
	$('#status').off();
	//$('#submenuadmin').remove();
	//console.log('test');
	if(status>1)
	{
		$('#status').click(function(){window.open('/admin.php?room='+room+'&uid='+uid,'',windowOpenFeature);});
		$('#status').mouseover(function(){this.className='smsetiehover';});
		$('#status').mouseout(function(){this.className='';});
		menu2Exclude=[];
		//$('#submenu').css('width','60px');
		//$('#submenu').attr('colspan','2');
		//$('#submenu button').html('Настр.');
		//$('#submenubonus').css('width','60px');
		//$('#submenubonus').attr('colspan','2');
		//$('#submenubonus').before('<td style="width:60px;" colspan="2" id="submenuadmin" onclick="window.open(\'/admin.php?room='+room+'&amp;uid='+uid+'\',\'\',\''+windowOpenFeature+'\');" title="Администрирование чата"><button style="width:100%;">Админ</button></td>');
	}
	else{menu2Exclude=['admin'];}
	/*
	else if(reg!='?')
	{
		$('#submenu').css('width','90px');
		$('#submenu').attr('colspan','3');
		$('#submenubonus').css('width','90px');
		$('#submenubonus').attr('colspan','3');
	}
	*/
}