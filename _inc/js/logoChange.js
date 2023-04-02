function logoChange(img)
{
	var logo=document.getElementById('logo');
	var logoimg=document.getElementById('logoimg');
	if(logoimg){logo.removeChild(logoimg);}
	if(img!='')
	{
		var a=document.createElement('img');
		a.setAttribute('src',img);
		a.setAttribute('alt','[logo]');
		a.setAttribute('id','logoimg');
		logo.appendChild(a);
	}
}