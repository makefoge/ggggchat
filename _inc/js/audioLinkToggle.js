var audioLink={
	show:function(){
		inputMenu.hide2();
		$('.box-input textarea').css('height','18px');
		$('.divAudio').removeClass('hidden');
	},
	hide:function(){
		$('.divAudio').addClass('hidden');
		$('.box-input textarea').css('height','42px');
	}
};
