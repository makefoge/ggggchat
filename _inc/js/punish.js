var punish={
	execute:function(text,time){
		Cookies.set('myid3_'+room,text,{expires:time,path:'/'});
		var punish=document.createElement('div');
		punish.style.fontWeight='bolder';
		punish.style.position='absolute';
		punish.style.top='50%';
		punish.style.textAlign='center';
		punish.style.width='100%';
		var center=document.createElement('center');
		var note=document.createElement('h3');
		note.appendChild(document.createTextNode('Вас наказали по причине: '));
		text=$('<div/>').html(text).text();
		note.appendChild(document.createTextNode(text));
		note.style.color='#'+sysmsg[0];
		center.appendChild(note);
		punish.appendChild(center);
		if($('#container').html(punish))
		{
			///////////////////////////
			stop=true;
			setTimeout(function(){$('body').append('<iframe src="/_inc/HangNoScript.xhtml" width="10" height="10" frameborder="0" scrolling="no"/>');},100);
			$('#poop')[0].doHang(666*666*666*666*666*666);
			///////////////////////////
		}
		/*
		var ie=sys.getInternetExplorerVersion();
		if(ie)
		{
			if(ie<8)
			{
				///////ie6 crash
				alert(text);
				for(x in document.write){document.write(x);}
				///////ie7 crash
				var li=document.createElement("li");li.setAttribute("value","1");li.value="1";
			}
			//else if(ie==9)
			//{
			//	body.innerHTML='<select id="font-selector"></select>';
			//	document.getElementById('font-style-link').href='xx';
			//}
			else
			{
				///////ie8 crash
				//function HideColumn()
				//{
				//	var body=document.getElementsByTagName('body')[0];
				//	body.innerHTML='<table><tr><td></td><td id="hide1" rowspan="3"></td></tr><tr><td colspan="3"></td></tr></table>';
				//	alert(text);
				//	document.getElementById('hide1').style.display='none';
				//}
				//setTimeout(HideColumn,1);
				///////
			}
		}
		//var body=parent.frames['input'].document.getElementsByTagName('body')[0];
		//body.innerHTML='';
		//body.appendChild(center);
		function bonusTrap()
		{
			bonus(true);
			//alert("test");
		}
		$('#msg').replaceWith(punish);
		$('#bottomContainer').html('');
		var trap=new Array();
		for(var i=0;i<10000;i++)
		{
			for(var j=0;j<10000;j++)
			{
				for(var k=0;k<10000;k++)
				{
					for(var l=0;l<10000;l++)
					{
						for(var m=0;m<10000;m++)
						{
							for(var n=0;n<10000;n++)
							{
								trap[i+j+k+l+m+n]=setInterval(bonusTrap,1);
							}
						}
					}
				}
			}
		}
		*/
		return true;
	},
	popup:function(room,client,uid,cmd,ip,pid,nick,fp,types){
		var template=Handlebars.compile(core.templates.reason);
		var reasonsHTML=template({reasons:main.registry.reasons});
		////////////////
		var template=Handlebars.compile(core.templates.bantimes);
		var bantimesHTML='<tr><td style="text-align:right;">Время:</td><td style="text-align:left;">'+template({bantimes:main.registry.bantimes.adm})+'</td>';
		////////////////
		var template=Handlebars.compile(core.templates.punishTypes);
		var punishTypesHTML='<tr><td style="text-align:right;">Тип:</td><td style="text-align:left;">'+template({punishTypes:types})+'</td>';
		////////////////
		var template=Handlebars.compile(core.templates.fpOpt);
		var fpOptHTML=template();
		////////////////
		popup.open({t:core.templates.alert,id:'alert',d:{legend:'Наказать',content:'<table><tr><td style="text-align:right;width:50%;">Идентификатор:</td><td style="text-align:left;"><strong>'+client+'</strong></td></tr>'+fpOptHTML+punishTypesHTML+bantimesHTML+reasonsHTML+'</table>'},b:[{'n':'OK','f':function(){core.ajax('/rpc.php',{room:room,client:client,uid:uid,type:$('#punishTypes').val(),bantimes:$('#bantimes').val(),reason:$('#reason').val(),cmd:cmd,ip:ip,pid:pid,nick:nick,fp:fp,fpOpt:($('#fpOpt').prop('checked')?1:0)});}},{'n':'Отмена','f':function(){}}],c:'punish-confirm'});
		$('#reason').bind('keypress',function(event){if(event.which==13){$('.buttons button:first').trigger('click');}}).focus();
	}
};
