function nickTruncate(nick,width)
{
	var a=document.createElement("span")
	var c;
	for(var i=0;i<nick.length;i++)
	{
		a.appendChild(document.createTextNode(nick.charAt(i)));
		a.innerHTML+="...";
		document.body.appendChild(a);
		var b=a.offsetWidth;
		document.body.removeChild(a);
		if(b<nick_width)
		{
			c=a.innerHTML;
			a.innerHTML=a.innerHTML.slice(0,-3);
		}
		else{break;}
	}
	return c;
}
