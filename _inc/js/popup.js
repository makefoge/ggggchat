var popup={
	close:function(data){
		//$('#'+data.id).modal().close();
		$('#'+data.id).remove();
		$('#modal').remove();
	},
	open:function(data){
		var ie=sys.getInternetExplorerVersion();
		if(ie&&ie<7.0){data.b[0].f();return;}
		var template=Handlebars.compile(data.t);
		var _popup=template(data.d);
		$('#popupContainer').html(_popup);
		$('#'+data.id).addClass(data.c);
		//$('#'+data.id).addClass('hidden');
		$('#'+data.id).css('margin-top',($('#'+data.id).height()/2)*(-1)+'px');
		$('#'+data.id).css('margin-left',($('#'+data.id).width()/2)*(-1)+'px');
		$('#modal').fadeTo(0,0.8);
		$('#'+data.id).find('.sm').bind('click',function(){popup.close({id:data.id});});
		var buttonWidth=(100/data.b.length);
		var button=$('#'+data.id).find('.buttons');
		$.each(data.b,function(k,v){
			button.append($(document.createElement('button')).html(v.n).bind({click:function(){v.f();popup.close({id:data.id});}}).css('width',buttonWidth+'%'));//bind('mouseup',function(){popup.close({id:data.id});})
		});
		//$('#'+data.id).modal().open({closeOnOverlayClick:false});
		$('.buttons button:first').focus();
	},
	reasonSwitch:function(elem){
		var val=$(elem).val();
		if(val=='')
		{
			$('#reason').removeAttr('disabled').val('');
			$('#reason').focus();
		}
		else
		{
			$('#reason').attr('disabled','disabled').val(val);
		}
	}
};