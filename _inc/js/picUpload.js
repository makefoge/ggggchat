var picUpload={
	show:function(){
		inputMenu.hide2();
		$('.box-input textarea').css('height','19px');
		$('.divUpload').html('Загрузка…');
		$('.divUpload').removeClass('hidden');
		//$('#msgSend').unbind('click').bind('click',function(){picUpload.hide();}).html('Отмена');
		//$('#msgSend').off('click');
		$('#msgSend').on('click',picUpload.hide);
		$('#msgSend').html('Отмена');
		$.ajax({
			url:'/check.php',
			cache:false,
			dataType:'json',
			data:{room:room,uid:uid,type:'upload'},
			success:function(data){
				if(data)
				{
					data.users.unshift('');
					/////////////////////////////////
					var pm=false;
					if($('#cmd').val()=='pm')
					{
						pm=cmdChange.getNickFromFwh();
					}
					var select='<select class="picUploadPrivate'+(pm?'':' hidden')+'">';
					$.each(data.users,function(){
						var sel=(pm==this.valueOf())?' selected="selected"':'';
						select+='<option value="'+this+'"'+sel+'>'+this+'</option>';
					});
					select+='</select>';
					/////////////////////////////////
					$('.divUpload').html('<div class="fl"><em>Можно загружать: <strong>'+data.capab+'</strong>; Сегодня: <strong>'+data.remain+'</strong></em>&nbsp;'+select+'&nbsp;</div><div class="fl"><input id="file" type="file" name="files[]" data-url="/send.php?room='+room+'" multiple="multiple"/></div><div id="progress" class="fl hidden"><div class="bar"></div></div>');//<button class="fr" onclick="picUpload.hide();" style="width:100px;margin:2px -2px 0 2px;">Отмена</button>
					$('#file').fileupload({
						dataType:'json',
						progressInterval:10,
						maxFileSize:32000000,
						add:function(e,data){
							var text=picUpload.send(data.files[0].name);
							if(text)
							{
								//popup.open({t:registry.templates.alert,id:'alert',d:{legend:'Загрузка изображения',content:'<tr><td style="white-space:normal;">'+text+'</td></tr>'},b:[{'n':'OK','f':function(){picUpload.execute(data);}},{'n':'Отмена','f':function(){picUpload.hide();}}],c:'alert-confirm'});
								registry.confirm(window,'alert','Загрузка изображения',text,function(){picUpload.execute(data);});
								//picUpload.execute(data);
							}
						},
						done:function(e,data){
							//console.log(data);
							//console.log('pass');
							msg.show.add(data.result);
							picUpload.hide();
						},
						progress:function(e,data){
							var progress=parseInt(data.loaded/data.total*100,10);
							$('#progress .bar').css('width',progress+'%');
						},
						error:function(jqXHR,textStatus,errorThrown){
							//alert('Ошибка!: '+textStatus+'\n'+errorThrown);
							picUpload.hide();
						}
					});
				}
				else
				{
					$('.divUpload').html('<div class="fl"><em>У вас исчерпана эта возможность на сегодня!</em></div>');//<button onclick="picUpload.hide();" style="width:100px;margin:0 -2px 0 2px;">Отмена</button>
				}
			}
		});
	},
	hide:function(){
		if($('.fl')[0])
		{
			$('#file').fileupload('destroy');
			$('.divUpload').addClass('hidden');
			$('.divUpload').empty();
			$('.box-input textarea').css('height','42px');
			send.inputClear();
			//$('#msgSend').unbind('click').bind('click',function(){send.msg();}).html('OK');
			$('#msgSend').off('click');
			//$('#msgSend').on('click',send.msg);
			$('#msgSend').html('OK');
			ui.inputFocus();
		}
	},
	send:function(file){
		if(validate.fileupload(file))
		{
			var inputuid=uid;
			var inputfwh=$('#fwh').val();
			var inputcmd=$('#cmd').val();
			if(inputcmd!='pm'&&inputcmd!='am')
			{
				inputcmd='say';
			}
			$('#inputuid').val(inputuid);
			$('#inputfwh').val(inputfwh);
			$('#inputcmd').val(inputcmd);
			$('#cmd').val(inputcmd);
			//////////////////////////////////
			var fwh=inputfwh.split('|');
			if(inputcmd=='pm')
			{
				if(fwh[0]!='')
				{
					var text='в приват для '+fwh[0];
				}
				else
				{
					alert("Чтобы послать изображение в приват, вы должны кликнуть на ник!");
					return false;
				}
			}
			else if(inputcmd=='am')
			{
				var text='в админку';
			}
			else
			{
				var text='в чат, для всех';
			}
			//////////////////////////////////
			return 'Вы действительно хотите отправить изображение '+text+'?';
		}
		return false;
	},
	execute:function(data){
		$('#file').addClass('hidden');
		$('#progress').removeClass('hidden');
		data.formData={cmd:$('#cmd').val(),cnd:$('#cnd').val(),fwh:$('#fwh').val(),msg:$('#input').val(),uid:uid};
		data.submit();
		send.inputClear();
	}
};
