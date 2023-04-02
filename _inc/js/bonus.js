function bonus(around)
{
	function psy_bounce(bonusid,diameter)
	{
		if(dir==0)
		{
			$(bonusid).animate({"left":"+="+diameter+"px"},around_dur).animate({"left":"-="+diameter+"px"},around_dur,function(){psy_bounce(bonusid,diameter)});
		}
		else
		{
			$(bonusid).animate({"left":"-="+diameter+"px"},around_dur).animate({"left":"+="+diameter+"px"},around_dur,function(){psy_bounce(bonusid,diameter)});
		}
	}
	function psy_around(bonusid)
	{
		$(bonusid).animate({path:new $.path.arc({center:[bonus_left,bonus_y],radius:Math.floor(diameter/2),start:0,end:1,dir:-1})},{duration:(around_dur*3),easing:'linear',complete:function(){psy_around(bonusid)}});
	}
	function psy_create_img(id,left,bonus_top,zindex)
	{
		var a=document.createElement('img');
		a.setAttribute('src',src);
		a.setAttribute('id','bonus'+id);
		a.setAttribute('alt','[bonus]');
		a.style.position='absolute';
		a.style.top=bonus_top+"px";
		a.style.left=left+'px';
		a.className='bonus';
		if(zindex){a.style.zIndex=a.style.zIndex-1;}
		return a;
	}
	function psy_bonus_clone(id)
	{
		////////
		var id2=Math.floor(Math.random()*999999+1);
		var bonusid='#bonus'+id;
		var bonuscloneid='#bonus'+id+'_'+id2;
		var img='<im'+'g src="'+src+'" id="bonus'+id+'_'+id2+'" alt="[bonus]" class="bonus" style="position:fixed;top:'+$(bonusid).css('top')+';left:'+$(bonusid).css('left')+';"/>';
		////////
		var ie=sys.getInternetExplorerVersion();
		if(ie&&ie<8.0)
		{
				if($(bonusid).css('top')&&$(bonusid).css('left'))
			{
				var top=$(bonusid).css('top').replace(/px/,'');
				var left=$(bonusid).css('left').replace(/px/,'');
				document.body.appendChild(psy_create_img(id+'_'+id2,left,top,true));
			}
		}
		else
		{
			$(img).insertAfter($("body"));
		}
		////////
		$(bonuscloneid).fadeOut('slow',function(){$(bonuscloneid).remove();});
		if(!uid&&!around){psy_complete(bonusid);}
	}
	function psy_complete(bonusid)
	{
		window.clearInterval(bonus1);
		$(bonusid).remove();
	}
	function psy_got_bonus(bonusid)
	{
		$.ajax({
		url:'/bonus.php',
		cache:false,
		data:'room='+room+'&uid='+uid,
		//timeout:5000,
		//error:function(){alert('pass');setTimeout('bonus.psy_got_bonus("'+bonusid+'")',5000)},
		success:function(text){if(text!=''){psy_bonus_note(bonusid,text);}},
		complete:function(){psy_complete(bonusid);psy_bonus_start(300000);}
		});
	}
	function psy_bonus_note(bonusid,text)
	{
		var id=makeId();
		var noteid='#h1_'+id;
		var ie=sys.getInternetExplorerVersion();
		if(ie&&ie<8.0)
		{
			var note=document.createElement('h1');
			note.setAttribute('id','h1_'+id);
			note.style.color='#'+color;
			note.style.position='absolute';
			note.style.display='none';
			note.style.top=bonus_bottom;
			note.className='bonus';
			note.appendChild(document.createTextNode('+'+text));
			document.body.appendChild(note);
		}
		else
		{
			var note='<h1 id="h1_'+id+'" class="bonus" style="color:#'+color+';position:fixed;text-shadow:black 2px 2px 2px;display:none;top:'+bonus_bottom+'px;">+'+text+'</h1>';
			$(note).insertAfter($("body"));
		}
		/////
		//var bonus=parent.frames['input'].document.getElementById('bonus');
		$('#bonus').html(($('#bonus').html()-0)+(text-0));
		/////
		if(!/nobonus\=true/.test(document.cookie))
		{
			if($(bonusid).width()>$(noteid).width())
			{
				var diff=Math.floor(($(bonusid).width()-$(noteid).width())/2);
				var left=$(bonusid).css('left').replace(/px/,'')-0+diff;
			}
			else
			{
				var diff=Math.floor(($(noteid).width()-$(bonusid).width())/2);
				var left=$(bonusid).css('left').replace(/px/,'')-0-diff;
			}
		}
		else
		{
			var left=($(window).width()/2);
		}
		/////
		$(noteid).css('left',left+'px');
		$(noteid).css('display','block');
		/////
		$(noteid).animate({'top':'-='+(bonus_bottom+100)+'px'},{duration:4000,easing:'linear',complete:function(){$(noteid).remove();}});
	}
	function psy_bonus_fall(bonusid,bonus_top,bonus_bottom)
	{
		var tick=Math.floor(2000/(bonus_bottom));
		var way=bonus_bottom-1-($(bonusid).css('top').replace(/px/,'')-bonus_top);
		var dur=way*tick;
		$(bonusid).stop().stop().animate({'top':'+='+way+'px'},{duration:dur,easing:'linear',complete:function(){psy_got_bonus(bonusid);}});
	}
	function makeId()
	{
		return Math.floor(Math.random()*999999+1);
	}
	function psy_create_bonus()
	{
		var ie=sys.getInternetExplorerVersion();
		if(ie&&ie<8.0)
		{
			var diff=(bonus_y+(diameter/4))-bonus_bottom;
			if(diff>0)
			{
				//alert(diff);
				bonus_y=bonus_y-diff;
			}
			document.body.appendChild(psy_create_img(id,bonus_left,bonus_y,false));
			bonus_bottom=bonus_bottom-$(bonusid).height();
		}
		else
		{
			var img='<im'+'g src="'+src+'" id="bonus'+id+'" alt="[bonus]" class="bonus" style="position:fixed;top:'+bonus_y+'px;left:'+bonus_left+'px;"/>';
			$(img).insertAfter($('body'));
		}
		bonus1=window.setInterval(function(){psy_bonus_clone(id);},200);//включаем отброс теней
	}
	function psy_get_left()
	{
		return Math.floor(Math.random()*($(window).width()-50));
	}
	function psy_get_y()
	{
		if(around)
		{
			return Math.floor(Math.random()*($(window).height()));
		}
		return 0;
	}
	function psy_get_diameter()
	{
		if(around)
		{
			return Math.floor(Math.random()*666+50);
		}
		return 500;
	}
	//////
	var id=makeId();
	var smiles_rand=Math.floor(Math.random()*registry.bonus.img.length);
	var src='/_img/bonus/'+(registry.bonus.img[smiles_rand])+'.gif';
	var bonusid='#bonus'+id;
	//var value=parent.psy_get_browser_values(window);
	var bonus_top=0;
	var bonus_bottom=$(window).height();//value[2];
	var bonus_left=psy_get_left();
	var diameter=psy_get_diameter(around);
	var around_dur=Math.floor(4000/666)*diameter;
	var bonus_y=bonus_top+psy_get_y();
	var dir=Math.floor(Math.random()*2);
	///
	var bonus1;
	if(around)
	{
		psy_create_bonus();
		psy_around(bonusid);
	}
	else
	{
		if($('img.bonus').length==0)
		{
			if(!/nobonus\=true/.test(document.cookie))
			{
				psy_create_bonus();
				psy_bounce(bonusid,diameter);
				$(bonusid).animate({"top":"+="+bonus_bottom+"px"},{duration:20000,queue:false,easing:'linear',complete:function(){psy_complete(bonusid);psy_bonus_start(15000);}});//плавное падение вниз
				$(bonusid).click(function(){psy_bonus_fall(bonusid,bonus_top,bonus_bottom);});//при клике подбирается бонус
				//alert($(bonusid).css('left'));
				//alert($(window).width());
			}
			else
			{
				var altbonus=document.getElementById('altbonus');
				if(altbonus)
				{
					var altbonusimg=document.createElement('img');
					altbonusimg.setAttribute('src','/_img/coin.gif');
					altbonusimg.setAttribute('id','bonus'+id);
					altbonusimg.setAttribute('title','Подберите бонус!');
					altbonusimg.style.verticalAlign='-3px';
					altbonusimg.onclick=function(){psy_got_bonus(bonusid);altbonus.removeChild(altbonusimg);};
					altbonusimg.onmouseover=function(){this.className='smiehover';}
					altbonusimg.onmouseout=function(){this.className='sm';}
					altbonus.appendChild(altbonusimg);
				}
			}
		}
	}
}
function psy_bonus_start(time)
{
	if(!/nobonus\=true/.test(document.cookie))
	{
		bonusTimer=window.setTimeout('bonus(false)',time);
	}
	else
	{
		var altbonus=document.getElementById('altbonus');
		if(altbonus.innerHTML=='')
		{
			bonusTimer=window.setTimeout('bonus(false)',time);
		}
	}
	//window.setInterval('bonus(false)',2000);
}
function psy_bonus_stop()
{
	window.clearTimeout(bonusTimer);
}