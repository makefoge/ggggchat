var info={
	init:function(n){
		//var result=($('#Ya_sync_0').html()!='')?1:0;
		setTimeout("info.get("+n+")",1500);
	},
	get:function(n){
		if($('#infoContent').html()==''||$('#infoContentCPA').length>0)
		{
			core.ajaxJSON('/_ajax/info.php',{n:n,type:'infoCPA'},function(data){
				var template=Handlebars.compile(core.templates.info);
				var _info=template(data);
				//console.log(data);
				if($('#infoContent').html()=='')
				{
					$('#infoContent').empty().append(_info);
					$('#msgBanner').removeClass('hidden');
				}
			},function(){});
		}
		//main.registry.ajax('/rpc.php',{});
	}
};