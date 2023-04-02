var inputMenu={
	show1:function()
	{
		if($('.box-menu1').hasClass('hidden'))
		{
			$('.box-menu1').fadeIn(400);
			$('.box-menu1').removeClass('hidden');
		}
	},
	hide1:function()
	{
		if(!$('.box-menu1').hasClass('hidden'))
		{
			$('.box-menu1').fadeOut(400);
			$('.box-menu1').addClass('hidden');
		}
	},
	show2:function()
	{
		clearTimeout(hideMenu2Timeout);
		picUpload.hide();
		audioLink.hide();
		if(!$('.box-menu2').hasClass('hidden'))
		{
			 inputMenu.hide2();
		}
		else
		{
			$('.box-menu2').append('<table><tr id="menu2-container"></tr></table>');
			//console.log(menu2);
			//var width=Math.round(100/menu2.length);
			var id=0;
			$.each(menu2,function(k,v){
				if(jQuery.inArray(k,menu2Exclude)==-1)
				{
					//$('#menu2-container').append('<td style="width:'+width+'%;"><button id="m2b'+id+'">'+this.text+'</button></td>');
					$('#menu2-container').append('<td><button id="m2b'+id+'">'+this.text+'</button></td>');
					$('#m2b'+id).bind('click',this.f);
					id++;
				}
			});
			$('.box-menu2').fadeIn(200);
			$('.box-menu2').removeClass('hidden');
			$('.box-container').fadeOut(200);
			$('.box-container').addClass('hidden');
			hideMenu2Timeout=setTimeout(inputMenu.hide2,5000);
		}
	},
	hide2:function()
	{
		clearTimeout(hideMenu2Timeout);
		$('.box-container').fadeIn(200);
		$('.box-container').removeClass('hidden');
		$('.box-menu2').fadeOut(200);
		$('.box-menu2').addClass('hidden');
		$('.box-menu2').html('');
	}
};