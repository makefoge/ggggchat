var core={
	templates:{
		alert:'<div id="modal"></div><div class="box popup" id="alert"><fieldset><legend id="legend">{{legend}} <img class="sm" onmouseout="this.className=\'sm\';" onmouseover="this.className=\'smiehover\';" alt="X" src="/_img/del.gif"></legend><div class="content"><table><tr><td style="white-space:normal;overflow-y:auto;" class="content-td">{{{content}}}</td></tr></table></div></fieldset><div class="buttons"></div></div>',
		reason:'<tr><td style="text-align:right;">Причина:</td><td style="text-align:left;"><select id="reasons" onchange="popup.reasonSwitch(this);"><option value=""><своя></option>{{#each reasons}}<option>{{this}}</option>{{/each}}</select></td><tr><td colspan="2"><textarea id="reason"></textarea></td></tr>',
		bantimes:'<select id="bantimes" name="bantimes">{{#each bantimes}}<option value="{{@key}}">{{this}}</option>{{/each}}</select>',
		statuses:'<select id="statuses" name="statuses">{{#each statuses}}{{statuses_helper}}{{/each}}</select>',
		punishTypes:'<select id="punishTypes" name="punishTypes">{{#each punishTypes}}<option value="{{@key}}">{{this}}</option>{{/each}}</select>',
		info:'<div id="infoContentCPA"><table><tr>{{#each info}}<td><div><a href="{{this.link}}" target="_blank" rel="nofollow" class="name">{{this.name}}</a></div><div><a href="{{this.link}}" target="_blank" rel="nofollow" class="desc">{{this.desc}}</a></div></td>{{/each}}</tr></table></div>',
		fp:'<div id="modal"></div><div class="box popup" id="alert"><fieldset><legend id="legend">{{legend}}</legend><div class="content"><table><tr><td style="white-space:normal;overflow-y:auto;" class="content-td">{{{content}}}</td></tr></table></div></fieldset></div>',
		fpOpt:'<tr><td style="text-align:right;">По коду браузера:</td><td style="text-align:left;"><input type="checkbox" name="fpOpt" id="fpOpt"/></td>'
	},
	ajax:function(path,data){
		$.ajax({
			url:path,
			data:data,
			dataType:'script',
			complete:function(){}
		});
	},
	ajaxJSON:function(path,data,f,e){
		$.ajax({
			url:path,
			type:'post',
			data:data,
			dataType:'json',
			success:function(data){f(data);},
			error:function(event,jqxhr,settings,thrownError){e?e([event,jqxhr,settings,thrownError]):false;}
		});
	},
	////////////////////////////
	hashCode:function(str){
		var hash=0;
		if(str.length==0)return hash;
		for(i=0;i<str.length;i++){
			char=str.charCodeAt(i);
			hash=((hash<<5)-hash)+char;
			hash=hash&hash;// Convert to 32bit integer
		}
		return hash;
	},
	genPaginatorObj:function(paginator,type){
		var pObj=[],pObj1=[[],[],[]];
		var totalPages=Math.ceil(paginator.total/paginator.onPage);
		var preTotal=totalPages-1;
		///////
		if(totalPages>=2)
		{
			pObj1[0].push({n:1,t:type});
			pObj1[0].push({n:2,t:type});
			if(totalPages>=4)
			{
				pObj1[2].push({n:preTotal,t:type});
			}
			if(totalPages>=3)
			{
				pObj1[2].push({n:totalPages,t:type});
			}
			///////
			var current=parseInt(paginator.current);
			var preCurrent=((preCurrent=current-1)<=2||(preCurrent>=preTotal))?false:preCurrent;
			var postCurrent=((postCurrent=current+1)<=2||(postCurrent>=preTotal))?false:postCurrent;
			if(preCurrent){pObj1[1].push({n:preCurrent,t:type});}
			if(current>=3&&current<=(totalPages-2)){pObj1[1].push({n:current});}
			if(postCurrent){pObj1[1].push({n:postCurrent,t:type});}
			if(preCurrent&&preCurrent>=4){pObj1[1].unshift({n:0});}
			if(postCurrent&&postCurrent<=(totalPages-3)){pObj1[1].push({n:0});}
			if(!preCurrent&&!postCurrent&&totalPages>=5&&current!=3){pObj1[1].push({n:0});}
			///////
			$.each(pObj1,function(k,v){
				$.each(v,function(k1,v1){
					v1=(v1.n!=current)?v1:{n:current};
					pObj.push(v1);
				});
			});
		}
		//console.log(pObj);
		return pObj;
	},
	////////////////////////////
	done:function(data){
		switch(data.r)
		{
			case 0:
				main.registry.alert(window,'alert','Ошибка',data.t);
				break;
			case 1:
				window.location.reload();
				break;
		}
	}
};