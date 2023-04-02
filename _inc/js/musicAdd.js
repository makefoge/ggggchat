function musicAdd()
{
	var music_select=document.getElementById('music_select');
	if(music_select)
	{
		var current_value=music_select.value;
		music_select.innerHTML='';
		buildMusicOptions(music_select);
		music_select.value=current_value;
	}
}