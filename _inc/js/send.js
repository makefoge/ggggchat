var send={
	init:function(data){
		$.ajax({
			type:'post',
			url:'/send.php?room='+room,
			data:data,
			dataType:'json',
			success:function(data){
				msg.show.add(data);
				yandexAd.rotate();
			},
			complete:function(){}
		});
	},
	msg:function(){
		if($('#file')[0]){return false;}
		//console.log($('iframe')[0]);
		ui.inputFocus();
		var fwh=$('#fwh').val();fwh=fwh.split('|');
		var msg=$('#input').val();
		var cmd=$('#cmd').val();
		if(cmd=='say'||cmd=='pm'||cmd=='am')
		{
			////////////////////////////////////антифлуд
			var currentTimer=antiflood.timer;
			antiflood.timer+=antiflood.getTime();
			//console.log(antiflood.timer);
			if(currentTimer>0)
			{
				return false;
			}
			antiflood.init();
			/////////////////////
			var audio=$('.divAudio')[0];
			if(!$(audio).hasClass('hidden'))
			{
				if(validate.addr($('.audioText').val()))
				{
					audio=$('.audioText').val();
					$('.audioText').val('');
				}
				else return false;
			}
			else audio=false;
			/////////////////////
			if(!((/^\s{1,}$/i.test(msg)||msg==''||msgPrevious==msg)&&!audio))
			{
				if($('#mynick').html()===fwh[0])
				{
					var reason=confirm('Вы действительно хотите отправить сообщение самому себе?','');
					if(!reason){return false;}
				}
				else if(fwh[0]==''&&cmd=='pm')
				{
					alert('Для выполнения этой команды, необходимо кликнуть на ник!');
					return false;
				}
			}
			else return false;
		}
		else
		{
			////////////////
			var template=Handlebars.compile(core.templates.reason);
			var reasonsHTML=template({reasons:registry.reasons});
			////////////////
			var bantimes=(myStatus>2)?registry.bantimes.adm:registry.bantimes.pu;
			var template=Handlebars.compile(core.templates.bantimes);
			var bantimesHTML='<tr><td style="text-align:right;">Время:</td><td style="text-align:left;">'+template({bantimes:bantimes})+'</td>';
			////////////////
			var template=Handlebars.compile(core.templates.fpOpt);
			var fpOptHTML=template();
			////////////////
			if(fwh[0]=='')
			{
				alert('Для выполнения этой команды, необходимо кликнуть на ник!');
				return false;
			}
			else if(cmd=='kick')
			{
				send.inputClear();
				popup.open({t:core.templates.alert,id:'alert',d:{legend:'Выкинуть',content:'<table><tr><td style="text-align:right;width:50%;">Ник:</td><td style="text-align:left;"><strong>'+fwh[0]+'</strong></td></tr>'+reasonsHTML+'</table>'},b:[{'n':'OK','f':function(){send.init({uid:uid,cmd:cmd,fwh:fwh.join('|'),msg:$('#reason').val()});}},{'n':'Отмена','f':function(){}}],c:'kick-confirm'});
				$('#reason').bind('keypress',function(event){if(event.which==13){$('.buttons button:first').trigger('click');}}).focus();
				return false;
			}
			else if(cmd=='ban')
			{
				send.inputClear();
				popup.open({t:core.templates.alert,id:'alert',d:{legend:'Заблокировать',content:'<table><tr><td style="text-align:right;width:50%;">Ник:</td><td style="text-align:left;"><strong>'+fwh[0]+'</strong></td></tr>'+fpOptHTML+bantimesHTML+reasonsHTML+'</table>'},b:[{'n':'OK','f':function(){send.init({uid:uid,cmd:('ban|'+$('#bantimes').val()),fwh:fwh.join('|'),fpOpt:($('#fpOpt').prop('checked')?1:0),msg:$('#reason').val()});}},{'n':'Отмена','f':function(){}}],c:'ban-confirm'});
				$('#reason').bind('keypress',function(event){if(event.which==13){$('.buttons button:first').trigger('click');}}).focus();
				return false;
			}
			else if(cmd=='globalban')
			{
				send.inputClear();
				popup.open({t:core.templates.alert,id:'alert',d:{legend:'Заблокировать глобально',content:'<table><tr><td style="text-align:right;width:50%;">Ник:</td><td style="text-align:left;"><strong>'+fwh[0]+'</strong></td></tr>'+bantimesHTML+reasonsHTML+'</table>'},b:[{'n':'OK','f':function(){send.init({uid:uid,cmd:('globalban|'+$('#bantimes').val()),fwh:fwh.join('|'),msg:$('#reason').val()});}},{'n':'Отмена','f':function(){}}],c:'ban-confirm'});
				$('#reason').bind('keypress',function(event){if(event.which==13){$('.buttons button:first').trigger('click');}}).focus();
				return false;
			}
			else if(cmd=='punish')
			{
				var template=Handlebars.compile(core.templates.punishTypes);
				var punishTypesHTML='<tr><td style="text-align:right;">Тип:</td><td style="text-align:left;">'+template({punishTypes:{0:'Повесить браузер',1:'Бот',2:'Нет смайлов',3:'Нет стилей'}})+'</td>';
				////////////////
				send.inputClear();
				popup.open({t:core.templates.alert,id:'alert',d:{legend:'Наказать',content:'<table><tr><td style="text-align:right;width:50%;">Ник:</td><td style="text-align:left;"><strong>'+fwh[0]+'</strong></td></tr>'+fpOptHTML+punishTypesHTML+bantimesHTML+reasonsHTML+'</table>'},b:[{'n':'OK','f':function(){send.init({uid:uid,cmd:('punish|'+$('#bantimes').val()+'|'+$('#punishTypes').val()),fwh:fwh.join('|'),msg:$('#reason').val(),fpOpt:($('#fpOpt').prop('checked')?1:0)});}},{'n':'Отмена','f':function(){}}],c:'punish-confirm'});
				$('#reason').bind('keypress',function(event){if(event.which==13){$('.buttons button:first').trigger('click');}}).focus();
				return false;
				/*
				var reason=prompt('Ник: '+fwh[0]+'\nНаказание: '+cmd+'\nВведите причину...','');
				if(reason==null){return false;}
				msg=reason;
				*/
			}
			else if(cmd=='s')
			//else if((cmd.substr(0,2))=='s|')
			{
				Handlebars.registerHelper('statuses_helper',function(){
					return new Handlebars.SafeString('<option value="'+this+'" '+(this==1?'selected="selected"':'')+'>'+s[this]+'</option>');
				});
				///////////////////
				var template=Handlebars.compile(core.templates.statuses);
				var statusesHTML=template({statuses:registry.statuses[myStatus]});
				///////////////////
				send.inputClear();
				popup.open({t:core.templates.alert,id:'alert',d:{legend:'Смена статуса',content:'<table><tr><td style="text-align:right;width:50%;">Ник:</td><td style="text-align:left;"><strong>'+fwh[0]+'</strong></td></tr><tr><td style="text-align:right;width:50%;">Новый статус:</td><td style="text-align:left;">'+statusesHTML+'</td></tr></table>'},b:[{'n':'OK','f':function(){send.init({uid:uid,cmd:('s|'+$('#statuses').val()),fwh:fwh.join('|'),msg:''});}},{'n':'Отмена','f':function(){}}],c:'alert-confirm'});
				return false;
				//var reason=confirm('Вы действительно хотите дать пользователю '+fwh[0]+' статус '+s[(cmd.substr(2,1))]+'?','');
				//if(!reason){return false;}
			}
			else if(cmd=='ignore')
			{
				var reason=confirm('Вы действительно хотите начать игнорировать пользователя '+fwh[0]+'?','');
				if(!reason){return false;}
			}
			else if(cmd=='unignore')
			{
				var reason=confirm('Вы действительно хотите прекратить игнорировать пользователя '+fwh[0]+'?','');
				if(!reason){return false;}
			}
		}
		msgPrevious=msg;
		var msg=addSpace(msg,50,false);
		////////////////////////////////////
		var data={uid:uid,cmd:cmd,fwh:$('#fwh').val(),fp:registry.fp,msg:msg};//encodeURIComponent(msg)
		if(audio){data.audio=audio;}
		//////////////////////////////
		send.init(data);
		//////////////////////////////
//		$.ajax({
//			type:'post',
//			url:'/send.php?room='+room,
//			data:data,
//			//data:'&uid='+uid+'&cmd='+cmd+'&fwh='+$('#fwh').val()+'&msg='+encodeURIComponent(msg),
//			dataType:'script',
//			success:function(){
//				yandexAd.rotate();
//			},
//			complete:function(){}
//		});
		send.inputClear();
		////////////////////////////////////
		picUpload.hide();
		audioLink.hide();
	},
	inputClear:function(){
		$('#fwh').val('');
		$('#input').val('');
		$('#cmd').val('say');
	}
};
