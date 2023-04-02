var msg={
	pick:{
		init:function(){
			if(req){req.abort();}
			req=$.ajax({
				url:'/pick.php',
				data:{room:room,uid:uid,lm:lm,fp:registry.fp},
				dataType:'json',
				timeout:10000,
				beforeSend:function(){msg.connectionLEDChange('y');},
				success:function(data){
					msg.show.add(data);
				},
				complete:function(xhr){
					if(!stop)
					{
						if(xhr.status==200)
						{
							xhr.abort();
							msg.connectionLEDChange('g');
							window.msgTimeout=setTimeout(msg.pick.init,8000);
						}
						else
						{
							xhr.abort();
							msg.connectionLEDChange('r');
							window.msgTimeout=setTimeout(msg.pick.init,10000);
						}
					}
				}
			});
			if(!uid)
			{
				if(watcher>=23)
				{
					stop=true;
					msg.connectionLEDChange('r');
				}
				watcher++;
			}
		}
	},
	show:{
		mine:function(id,line,fwh){
			if(fwh[1]===window.uid)
			{
				line.appendChild(document.createTextNode('• '));
				//if(!(/playnot\=true/.test(document.cookie))&&document['play']&&document['play'].sendEvent)
				if(!(/playnot\=true/.test(document.cookie)))
				{
					var nicksound=document.getElementById('sound'+id);
					var sound=(mysound)?mysound:((nicksound)?nicksound.src:window.sound.src);
					player.play('sound',sound);
					//console.log(document['play']);
					//document['play'].sendEvent('LOAD',{file:sound});
					//document['play'].sendEvent('PLAY','true');
				}
			}
		},
		init:function(nick,mess,nc,nf,ns,mc,mf,ms,lm,cl,tm,uid,fwh,cnd,lmupdate,id)
		{
			window.lm=lmupdate?lm:window.lm;
			///////////////////////////
			if((document.getElementById("p"+lm))!==null){return false;}
			var div=document.getElementById("msg");
			if(div)
			{
				fwh=fwh.split('|');
				//var sysmsg=document.getElementById("sysmsg");
				//if(sysmsg){div.innerHTML='';}
				var line=document.createElement("div");
				var n=document.createElement("span");
				var m=document.createElement("span");
				var t=document.createElement("span");
				t.appendChild(document.createTextNode("["+tm+"]: "));
				line.setAttribute("id","p"+lm);
				psy_paint(line,sysmsg[0],sysmsg[1],sysmsg[2],window);
				n.appendChild(document.createTextNode(nick));
				psy_paint(n,nc,nf,ns,window);
				if(nick!=''){mess='&nbsp;'+mess;}
				n.onclick=function(){psy_for(nick,uid,'say');}
				if(cnd=="3")
				{
					n.onclick=function(){psy_for(operator,uid,"say");}
					n.style.fontStyle="italic";
				}
				else if(cnd=="2")
				{
					n.style.textDecoration="line-through";
				}
				if(cl=="1"||cl=="2"||cl=="11"||cl=="12"||cl=="14")
				{
					line.style.fontWeight="bolder";
					n.style.fontWeight="normal";
					psy_paint(m,sysmsg[0],sysmsg[1],sysmsg[2],window);
					line.appendChild(t);
					m.innerHTML=mess;
				}
				else if(cl=="3")
				{
					line.style.fontWeight="bolder";
					n.style.fontWeight="normal";
					m.style.fontWeight="normal";
					line.appendChild(t);
					m.innerHTML=mess;
					psy_paint(m,mc,mf,ms,window);
				}
				else if(cl=="5"||cl=="10"||cl=="13")
				{
					if(window.uid){msg.show.mine(id,line,fwh);}
					line.style.fontWeight="bolder";
					line.appendChild(t);
					var note=document.createElement("span");
					note.appendChild(document.createTextNode("[Система]: "));
					if(cl=="5"||cl=="13")
					{
						note.style.fontStyle="italic";
						if(cl=="5")
						{
							n.onclick=function(){psy_for(nick,uid,"pm");}
						}
					}
					line.appendChild(note);
					n.style.fontWeight="normal";
					psy_paint(m,sysmsg[0],sysmsg[1],sysmsg[2],window);
					m.innerHTML=mess;
				}
				else if(cl=="7"||cl=="8")
				{
					line.style.fontWeight="bolder";
					line.appendChild(t);
					n.style.fontWeight="normal";
					psy_paint(m,sysmsg[0],sysmsg[1],sysmsg[2],window);
					m.innerHTML=mess;
					var listnick=document.getElementById("n_"+nick);
					if(listnick)
					{
						if(cl=="7")
						{
							listnick.style.textDecoration="line-through";
						}
						else
						{
							listnick.style.textDecoration="none";
						}
					}
				}
				else
				{
					if(window.uid)
					{
						msg.show.mine(id,line,fwh);
						if(cl=="4")
						{
							line.style.fontWeight="bolder";
							var note=document.createElement("span");
							if(uid===window.uid)
							{
								note.appendChild(document.createTextNode("[Приват @"+fwh[0]+"]: "));
							}
							else
							{
								note.appendChild(document.createTextNode("[Приват]: "));
							}
							note.style.fontStyle="italic";
							line.appendChild(note);
							n.style.fontWeight="normal";
							m.style.fontWeight="normal";
							if(cnd!="3")
							{
								n.onclick=function(){psy_for(nick,uid,"pm");}
							}
							else
							{
								n.onclick=function(){psy_for(operator,uid,"pm");}
							}
						}
						else if(cl=="6")
						{
							line.style.fontWeight="bolder";
							line.appendChild(document.createTextNode("[Админка]: "));
							n.style.fontWeight="normal";
							m.style.fontWeight="normal";
							n.onclick=function(){psy_for(nick,uid,"am");}
						}
					}
					psy_add_colon(n,window);
					m.innerHTML=mess;
					psy_paint(m,mc,mf,ms,window);
				}
				n.onmouseover=function(){this.className='nickiehover';}
				n.onmouseout=function(){this.className='nick';}
				line.appendChild(n);
				line.appendChild(m);
				var p=div.lastChild;
				if(p!=null&&p.nodeType==1)
				{
					var ins=false;
					while(!ins)
					{
						var id=p.getAttribute('id').substr(1);
						id-=0;lm-=0;
						if(lm>id)
						{
							if(p!=div.lastChild)
							{
								div.insertBefore(line,p.nextSibling);
								ins=true;
							}
							else
							{
								div.appendChild(line);
								ins=true;
							}
						}
						else
						{
							if(p.previousSibling)
							{
								p=p.previousSibling;
							}
							else
							{
								div.insertBefore(line,p)
								ins=true;
							}
						}
					}
				}
				else
				{
					div.appendChild(line);
				}
				/////////////////////
				antiflood.container(m);
			}
		},
		add:function(data){
			//console.log(data);
			data.lpc=((typeof data.lpc)=='object')?data.lpc:{};
			data.msg=((typeof data.msg)=='object')?data.msg:{};
			data.nicks=((typeof data.nicks)=='object')?data.nicks:{};
			$.each(data.lpc,function(k,v){
				//console.log($.parseJSON(v));
				lpc.init($.parseJSON(v));
			});
			////////////////////////////////
			var values=msg.scroll.values();
			//console.log(values);
			$.each(data.msg,function(k,v){
				msg.show.init(v[0],v[1],v[2],v[3],v[4],v[5],v[6],v[7],v[8],v[9],v[10],v[11],v[12],v[13],v[14],v[15]);
			});
			if(values.ss<30||lm==0)
			{
				msg.scroll.init();
			}
			////////////////////////////////
			$.each(data.nicks,function(k,v){
				msg.nick.init(v[0],v[1],v[2],v[3],v[4],v[5],v[6]);
			});
			////////////////////////////////
			if(data.punished)
			{
				//console.log(data.punished);
				//main.registry.smile.punished=data.punished;
				$.each(data.punished,function(k,v){
					main.registry.punished.data[k]=v;
				});
			}
		}
	},
	scroll:{
		init:function(){
			var val=msg.scroll.values();
			if(val.ss>1)
			{
				val.ss=Math.ceil(val.ss / 20);
				$('#msgContainer').scrollTop(val.ss+val.st+1);
				setTimeout(msg.scroll.init,10);
			}
		},
		values:function(){
			var a={st:$('#msgContainer').scrollTop(),sh:$('#msg').height(),ch:$('#msgContainer').height()};
			a.ss=a.sh-(a.ch+a.st);
			return a;
		}
	},
	nick:{
		init:function(nick,type,uid,cnd,avlink,id,sound){
			//console.log(nick,type,uid,cnd,avlink,id,sound);
			var list=document.getElementById("nicks");
			if(list)
			{
				var inchat=document.getElementById("inchat");
				var line=document.getElementById("p_"+nick);
				if(type=="1"||type=="15")
				{
					if(!line)
					{
						var line=document.createElement('tr');
						var n=document.createElement('span');
						var a=document.createElement('img');
						var td1=document.createElement('td');
						var td2=document.createElement('td');
						a.setAttribute("alt","[?]");
						a.setAttribute("id","a_"+nick);
						a.style.margin="1px";
						n.setAttribute("id","n_"+nick);
						n.style.whiteSpace="nowrap";
						n.appendChild(document.createTextNode(nick));
						line.setAttribute("id","p_"+nick);
						n.onmouseover=function(){this.className='smsetiehover';}
						n.onmouseout=function(){this.className='';}
						a.onmouseover=function(){this.className='smiehover';}
						a.onmouseout=function(){this.className='sm';}
						a.onclick=function(){window.open('/viz.php?nick='+encodeURIComponent(nick)+'&room='+window.room+'&uid='+window.uid,'',windowOpenFeature);}
						a.oncontextmenu=function(){nickMenu(this,nick,uid);return false;}
						n.oncontextmenu=function(){nickMenu(this,nick,uid);return false;}
						n.onclick=function(){psy_for(nick,uid,"pm");}
						td1.setAttribute("width","34");
						td1.setAttribute("height","34");
						td1.style.textAlign="center";
						td1.appendChild(a);
						td2.appendChild(n);
						line.appendChild(td1);
						line.appendChild(td2);
						list.appendChild(line);
						nick_width=145;
						inchat.innerHTML++;
						if(n.offsetWidth>=nick_width)
						{
							n.innerHTML=nickTruncate(n.innerHTML,n.offsetWidth);
						}
					}
					var n=document.getElementById('n_'+nick);
					if(cnd=='1'||cnd=='12'){n.style.fontStyle='normal';}
					else if(cnd=='2'){n.style.textDecoration='line-through';}
					else if(cnd=='3'||cnd=='11'){n.style.fontStyle='italic';}
					var a=document.getElementById('a_'+nick);
					a.src=avlink;
					///////////////////////////////публичное звуковое оповещение
					if(id!='?')
					{
						var soundcache=document.getElementById('sound'+id);
						if(!soundcache)
						{
							soundcache=document.createElement('img');
							soundcache.style.display='none';
							soundcache.setAttribute('id','sound'+id);
							a.parentNode.appendChild(soundcache);
						}
						//console.log(sound,window.sound);
						if(sound&&sound.length>0){soundcache.src=sound;}else{a.parentNode.removeChild(soundcache);}
					}
				}
				else
				{
					var p=document.getElementById('p_'+nick);
					if(p){list.removeChild(p);}
					if(line){inchat.innerHTML--;}
				}
			}
		}
	},
	/////////////////////////////////////////
	connectionLEDChange:function(type)
	{
		if(connectionLED)
		{
			connectionLED.attr('src','/_img/conn'+type+'.gif');
		}
	}
};