var login={
	init:function(){
		var n=$('#nick').val();
		var p=$('#pass').val();
		if(validate.nick(n)&&(p==''||validate.pass(p)))
		{
			$('#loginForm').addClass('hidden');
			$('#loginNote').removeClass('hidden');
			$.ajax({
				type:'post',
				url:'/login.php',
				data:{room:room,nick:n,pass:p,fp:registry.fp,iac:registry.iac},
				dataType:'json',
				success:function(data){
					switch(data.result)
					{
						case 1:
							ui.enter(data.data.enter[0],data.data.enter[1],data.data.enter[2],data.data.enter[3],data.data.enter[4],data.data.enter[5],data.data.enter[6],data.data.enter[7],data.data.enter[8],data.data.enter[9],data.data.enter[10]);
							if(data.data.bonus!==false){psy_bonus_start(data.data.bonus);}
							if(data.data.bannerhide){addCloseCross($("#legend")[0],"banner");}
							break;
						case 2:
							if(data.alert)
							{
								registry.alert(window,'alert2','Ошибка!',data.alert);
							}
							else if(data.confirm)
							{
								registry.confirm(window,'alert2','Ошибка!',data.confirm,function(){window.location.assign('/main/?banredir='+room);});
							}
							break;
						case 3:
							window.location.reload();
							//window.location.replace('/banned.php');
							break;
						case 4:
							punish.execute(unescape(data.data));
							break;
					}
					$('#loginNote').addClass('hidden');
					$('#loginForm').removeClass('hidden');
				},
				error:function(data){
					//console.log(data);
				}
			});
		}
	},
	submit:function(e)
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
			login.init();
			return false;
		}
		else return true;
	},
	exit:function(force)
	{
		if(!$('#inputForm').hasClass('hidden'))
		{
			var a=document.getElementById('input');
			if(!force&&a&&a.value.length>0)
			{
				if(!confirm("Вы действительно хотите выйти из чата?","")){return false;}
			}
			stop=true;
			$.ajax({
				type:'post',
				url:'/login.php',
				data:{room:room,uid:uid},
				dataType:'json',
				success:function(data){
					ui.exit(data.data[0],data.data[1],data.data[2]);
				}
			});
		}
	}
};