function psy_set_tag(name,value)
{
	//var frame;if((frame=psy_get_frame('input')))
	//{
		var input=document.getElementById('input');
		if(input)
		{
			input.focus();
			input.value+=' ['+name+'='+value+'] ';
			input.focus();
		}
	//}
}