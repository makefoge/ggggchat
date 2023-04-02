function inArray(array,string)
{
	for(var i in array)
	{
		if(array[i]==string)
		{
			return i;
		}
	}
	return false;
}