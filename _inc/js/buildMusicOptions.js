function buildMusicOptions(select)
{
	for(var i=0;i<musName.length;i++)
	{
		var music_option=document.createElement('option');
		music_option.setAttribute('value',musAddr[i]);
		music_option.setAttribute('id','mus'+musId[i]);
		music_option.appendChild(document.createTextNode(musName[i]));
		select.appendChild(music_option);
	}
}