function showSmiles(closeCross)
{
	if(!smilesPermit()){return false;}
	var smileplace=document.getElementById("smileplace");
	var smilebox=document.getElementById("smilebox");
	if(!smilebox)
	{
		var smilebox=document.createElement("div");
		smilebox.setAttribute("id","smilebox");
		smilebox.className="box";
		var fieldset=document.createElement("fieldset");
		fieldset.setAttribute("id","smile");
		var legend=document.createElement("legend");
		legend.appendChild(document.createTextNode("Смайлы "));
		var smile_sets=document.createElement("div");
		smile_sets.setAttribute("id","smile_sets");
		var hr=document.createElement("hr");
		fieldset.appendChild(legend);
		if(closeCross){main.addCloseCross(legend,"smile");}
		fieldset.appendChild(smile_sets);
		fieldset.appendChild(hr);
		smilebox.appendChild(fieldset);
		smileplace.appendChild(smilebox);
		if(main.smileSetName)
		{
			return showSmileSets();
		}
		else
		{
			loadSmiles();
		}
	}
	else
	{
		clearInterval(smileTimeout);
		smilesClear();
		removeSmilebox();
	}
}
function removeSmilebox()
{
	if((main==window)||(main.guest&&!main.guest.closed)||(main.mail&&!main.mail.closed))
	{
		var sb=document.getElementById("smilebox");
		if(sb)
		{
			sb.parentNode.removeChild(sb);
		}
	}
}
function loadSmiles()
{
	var smarea=document.getElementById("smarea");
	if(smarea){smarea.parentNode.removeChild(smarea);}
	var smile_set_select=document.getElementById("smile_set_select");
	if(smile_set_select){smile_set_select.parentNode.removeChild(smile_set_select);}
	var loadnote=document.createElement("center");
	loadnote.setAttribute("id","loadnote");
	loadnote.className="smset";
	loadnote.appendChild(document.createTextNode("Идёт загрузка смайлов..."));
	document.getElementById("smile_sets").appendChild(loadnote);
	$.ajax({
		url:'/send.php',
		data:{room:main.room,uid:main.uid,cmd:'smile'},
		dataType:'json',
		success:function(data){
			console.log(data);
			if(data.sets)
			{
				//console.log(data.sets.set);
				main.chatSmile=data.chat;
				main.mySmiles=data.my;
				main.smileSetName=data.sets.set;
				main.smileSetDescr=data.sets.description;
				main.smileSetContent=data.sets.content;
				//$('#loadnote').remove();
				//showSmileSets();
				//console.log(data);
			}
			else if(data.punished&&data.msg)
			{
				smilesClear();
				removeSmilebox();
				//console.log(data.punished);
				//main.registry.smile.punished=data.punished;
				$.each(data.punished,function(k,v){
					main.registry.punished.data[k]=v;
				});
				msg.show.add(data.msg);
			}
		}
	});
	smileTimeout=setInterval(function(){checkSmiles();},100);
}
function showSmileSets()
{
	var smile_sets=document.getElementById("smile_sets");
	if(smile_sets)
	{
		var smile_set_select=document.createElement("select");
		smile_set_select.style.width='186px';
		smile_set_select.style.height='16px';
		smile_set_select.style.fontSize='10px';
		smile_set_select.style.textAlign='center';
		smile_set_select.setAttribute('id','smile_set_select');
		for(var i=0;i<main.smileSetName.length;i++)
		{
			if(!window.psy_delete_chatsmile)
			{
				var smile_set=document.createElement("option");
				smile_set.setAttribute('value',main.smileSetName[i]);
				smile_set.appendChild(document.createTextNode(main.smileSetDescr[i]));
				smile_set_select.appendChild(smile_set);
			}
		}
		smile_set_select.onchange=function(){showSmileSetGrid(this.value);}
		smile_sets.appendChild(smile_set_select);
		//////
		smile_set_select.value='main';
		if(!window.psy_delete_smile&&main.chatSmile!=''||window.psy_delete_chatsmile)
		{
			var smile_set=document.createElement("option");
			smile_set.setAttribute('value','local');
			smile_set.appendChild(document.createTextNode('Смайлы чата'));
			smile_set_select.appendChild(smile_set);
			if(room!='main')
			{
				smile_set_select.value='local';
			}
		}
		//////
		if(main.mySmiles&&!window.psy_show_mysmile1&&!window.psy_delete_smile&&!window.psy_delete_chatsmile)
		{
			var smile_set=document.createElement("option");
			smile_set.setAttribute('value','main.mySmiles');
			smile_set.appendChild(document.createTextNode('Мои любимые'));
			smile_set_select.appendChild(smile_set);
			smile_set_select.value='main.mySmiles';
		}
		showSmileSetGrid(smile_set_select.value);
		if(window.psy_show_mysmile1){window.psy_show_mysmile1();}
		return true;
	}
}
function showSmileSetGrid(set)
{
	if(main.smileSetName==null){loadSmiles();return;}
	var smile_sets=document.getElementById('smile_sets');
	if(smile_sets)
	{
		var table=document.getElementById('table');if(table){table.parentNode.removeChild(table);}
		if(!(set=='main.mySmiles'||set=='local'&&main.chatSmile==''))
		{
			var table=document.createElement('table');
			table.setAttribute('id','table');
			table.className='smset';
			table.style.width='100%';
			table.style.textAlign='center';
			var tbody=document.createElement('tbody');
			var tr=document.createElement('tr');
			for(var i=0;i<12;i++)
			{
				var td=document.createElement('td');
				td.setAttribute('id','td'+i);
				td.style.width='10px';
				td.style.maxWidth='10px';
				tr.appendChild(td);
			}
			tbody.appendChild(tr);
			table.appendChild(tbody);
			smile_sets.appendChild(table);
			smileSetGridFill(set,1);
			//console.log(document.getElementById('smile_set_select'));
			showSmileSet(document.getElementById('td1').firstChild,document.getElementById('smile_set_select').value,1);
		}
		else
		{
			showSmileSet(null,set,1);
		}
	}
}
function smileSetGridFill(set,start)
{
	var smiles=getSmiles(set);
	if(smiles)
	{
		var smile_sets_num=Math.ceil(smiles.length / 30);
		gridTdClear('td0');
		gridTdClear('td11');
		if(start>1)
		{
			psy_create_grid_span('td0','<');
			var td0=document.getElementById('td0');
			td0.firstChild.onclick=function(){gridMove(false);}
		}
		else{gridTdClear('td0');}
		for(var i=1;i<11;i++)
		{
			if(start>smile_sets_num){break;}
			psy_create_grid_span('td'+i,start,document.getElementById(set+'_'+start));
			start++;
		}
		if(smile_sets_num>=start)
		{
			psy_create_grid_span('td11','>');
		}
		else{gridTdClear('td11');}
	}
}
function gridTdClear(td)
{
	var td=document.getElementById(td);
	if(td.firstChild){td.removeChild(td.firstChild);}
}
function gridMove(dir)
{
	var start=document.getElementById("td1").firstChild.innerHTML;
	start-=0;
	if(dir){start++;}else{start--;}
	smileSetGridFill(document.getElementById('smile_set_select').value,start);
}
function getSmiles(set)
{
	if(set=='local')
	{
		var smiles=main.chatSmile;
		//return smiles.split('|');
		return smiles;
	}
	if(set=='main.mySmiles'){var smiles=main.mySmiles;return smiles;}
	var num=main.inArray(main.smileSetName,set);
	if(num)
	{
		if(main.smileSetContent)
		{
			var smiles=main.smileSetContent[num];
			//return smiles.split('|');
			return smiles;
		}
		else
		{
			loadSmiles();
		}
	}
}
function psy_create_grid_span(id,text,inactive)
{
	var td=document.getElementById(id);gridTdClear(id);
	var span=document.createElement('span');
	span.appendChild(document.createTextNode(text));
	if(inactive)
	{
		span.className='current';
	}
	else
	{
		span.className='smset';
		span.onmouseover=function(){this.className='smsetiehover';}
		span.onmouseout=function(){this.className='smset';}
	}
	////
	if(text=='<')
	{
		span.onclick=function(){gridMove(false);}
	}
	else if(text=='>')
	{
		span.onclick=function(){gridMove(true);}
	}
	else
	{
		span.onclick=function(){showSmileSet(this,document.getElementById('smile_set_select').value,text);}
	}
	////
	td.appendChild(span);
}
function showSmileSet(element,set,num)
{
	if(!smilesPermit()){smilesClear();removeSmilebox();return false;}
	if(main.smileSetName==null){loadSmiles();return;}
	var div=document.getElementById("smile");
	var smarea=document.getElementById('smarea');if(smarea){div.removeChild(smarea);}
	var smarea=document.createElement('div');
	smarea.setAttribute('id','smarea');
	smarea.style.whiteSpace='normal';
	smarea.style.width='auto';
	smarea.style.marginLeft='auto';
	smarea.style.marginRight='auto';
	smarea.style.textAlign='center';
	div.appendChild(smarea);
	//
	if(!(set=='main.mySmiles'||set=='local'&&main.chatSmile==''))
	{
		var span=document.createElement('span');
		span.setAttribute('id',set+'_'+num);
		smarea.appendChild(span);
		psy_create_grid_span(element.parentNode.getAttribute('id'),num,true);
		smileSetGridFill(set,document.getElementById('td1').firstChild.innerHTML);
	}
	//
	//if(navigator.userAgent.indexOf("IE")!=-1)
	//{
	//	smarea.innerHTML+="<span class=\"bold\">ВНИМАНИЕ! При листании смайликов в браузере Internet Explorer, он может начать дёргаться и глючить!</span> Если вы постоянно с этим сталкиваетесь, мы рекомендуем вам установить и использовать для этого чата альтернативный браузер, такой как <span class=\"bold\"><a href=\"http://www.mozilla.com/en-US/firefox/all.html#ru\" target=\"_blank\">Mozilla Firefox</a></span>, <span class=\"bold\"><a href=\"http://www.google.com/chrome/\" target=\"_blank\">Google Chrome</a></span> или <span class=\"bold\"><a href=\"http://ru.opera.com/\" target=\"_blank\">Opera</a></span><hr/>";
	//}
	var smiles=getSmiles(set);
	if(set!='main.mySmiles')
	{
		var end=num*30;
		var start=end-30;
	}
	else
	{
		start=0;
		end=(main.mySmiles.length+1);
	}
	for(var i=start;i<end;i++)
	{
		if(smiles[i])
		{
			var smile=smiles[i];
			if(smile.indexOf(":")!=-1&&smile.indexOf("|")!=-1)
			{
				smile=smile.split(":");
				smile=smile[1].split("|");
				set=smile[1];
				smile=smile[0];
			}
			if(set=='local'){var addr='/'+room+'/smile/'+smile+'.gif';}else{var addr='/_sml/'+set+'/'+smile+'.gif';}
			$(smarea).append('<img src="'+addr+'" onclick="setSmile(\''+smile+'\',\''+set+'\');" onmouseover="this.className=\'smiehover\';" onmouseout="this.className=\'sm\';" oncontextmenu="return false" onload="scrollSmile();"/>');
		}
	}
}
function checkSmiles()
{
	//console.log(main.smileSetName);
	if(main.smileSetName&&(main.smileSetName.length>0))
	{
		var loadnote=document.getElementById('loadnote');
		if(loadnote)
		{
			loadnote.parentNode.removeChild(loadnote);
			clearInterval(smileTimeout);
			showSmileSets();
		}
	}
}
function smilesRenew(uid)
{
	if(uid!=main.uid&&main.smileSetName)
	{
		smilesClear();
		if(document.getElementById("smilebox"))
		{
			removeSmilebox();
			showSmiles(true);
		}
	}
}