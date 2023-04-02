function musicDel(num)
{
	var music_select=document.getElementById('music_select');
	if(music_select)
	{
		var current_value=music_select.value;
		var deleted=document.getElementById('mus'+num);
		if(deleted)
		{
			if(deleted.value==current_value)
			{
				player.stop('pMusic');
				music_select.value='';
			}
			music_select.removeChild(deleted);
		}
	}
}