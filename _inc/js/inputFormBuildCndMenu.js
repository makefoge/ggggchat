function inputFormBuildCndMenu(status)
{
	status=(status-0);
	if(status>2)
	{
		var a=Array(1,2,3,0);
		var b=Array("в чате","нет на месте","невидимка","отключиться");
	}
	else
	{
		var a=Array(1,2,0);
		var b=Array("в чате","нет на месте","отключиться");
	}
	var cnd2=document.getElementById("cnd2");
	cnd2.innerHTML="";
	for(var i=0;i<a.length;i++)
	{
		var o=document.createElement("option");
		o.appendChild(document.createTextNode(b[i]));
		o.setAttribute("value",a[i]);
		cnd2.appendChild(o);
	}
	return true;
}