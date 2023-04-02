function cndChange(cnd)
{
	if(cnd=='0')
	{
		login.exit(false);
		return false;
	}
	var cndOld=$('#cnd').val();
	if((cndOld=="2"&&cnd=="3")||(cndOld=="3"&&cnd=="2"))
	{
		$('#cnd2').val(cndOld);
		alert("Переключаться из невидимки в другое состояние, или наоборот, недопустимо! Сначала отключите Ваше настоящее состояние!");
		return false;
	}
	$('#cnd').val(cnd);
	$.ajax({
		type:'post',
		url:'/send.php?room='+room,
		data:{uid:uid,cmd:'cnd',cnd:cnd},
		dataType:'json',
		success:function(data){
			msg.show.add(data);
		}
	});
}