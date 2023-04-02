function flashDetect()
{
	if(window.ActiveXObject)
	{
		try
		{
			var a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
			if(a)
			{
				var a=swfobject.getFlashPlayerVersion(); 
				return a;
			}
		}
		catch(e)
		{
			return false;
		}
	}
	else if(navigator.plugins&&navigator.plugins["Shockwave Flash"])
	{
		if(navigator.mimeTypes&&navigator.mimeTypes["application/x-shockwave-flash"])
		{
			var a=swfobject.getFlashPlayerVersion();
			return a;
		}
	}
	return false;
}