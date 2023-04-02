function inputFormBuildCmdMenu(status,reg)
{
	if(status=="4")
	{
		var a=Array("say","pm","ignore","unignore","am","punish","kick",'ban','s');
		var b=Array("сказать","приват","в игнор","из игнора","админка","наказать","выкинуть",'бан','статус');
		//var c=Array("s|0","s|1","s|2","s|3","s|4");
		//var d=Array("статус: "+s[0],"статус: "+s[1],"статус: "+s[2],"статус: "+s[3],"статус: "+s[4]);
		//a=a.concat(banOptionsA4);
		//b=b.concat(banOptionsB4);
	}
	else if(status=="3")
	{
		var a=Array("say","pm","ignore","unignore","am","punish","kick",'ban','s');
		var b=Array("сказать","приват","в игнор","из игнора","админка","наказать","выкинуть",'бан','статус');
		//var c=Array("s|0","s|1","s|2");
		//var d=Array("статус: "+s[0],"статус: "+s[1],"статус: "+s[2]);
		//a=a.concat(banOptionsA3);
		//b=b.concat(banOptionsB3);
	}
	else if(status=="2")
	{
		var a=Array("say","pm","ignore","unignore","kick",'ban','s');
		var b=Array("сказать","приват","в игнор","из игнора","выкинуть",'бан','статус');
		//var c=Array("s|0","s|1");
		//var d=Array("статус: "+s[0],"статус: "+s[1]);
		//a=a.concat(banOptionsA2);
		//b=b.concat(banOptionsB2);
	}
	else if(status=="1"&&reg!="?")
	{
		var a=Array("say","pm","ignore","unignore","kick");
		var b=Array("сказать","приват","в игнор","из игнора","выкинуть");
		//var c=Array();
		//var d=Array();
	}
	else
	{
		var a=Array("say","pm");
		var b=Array("сказать","приват");
		//var c=Array();
		//var d=Array();
	}
	var cmd=document.getElementById("cmd");
	cmd.innerHTML="";
	for(var i=0;i<a.length;i++)
	{
		var o=document.createElement("option");
		o.appendChild(document.createTextNode(b[i]));
		o.setAttribute("value",a[i]);
		cmd.appendChild(o);
	}
	/////////////////////////////
	if(myStatus==4&&room=='main')
	{
		$(cmd).append('<option value="globalban">глобальный бан</option>');
	}
	/////////////////////////////
	/*
	for(var i=0;i<c.length;i++)
	{
		var o=document.createElement("option");
		o.appendChild(document.createTextNode(d[i]));
		o.setAttribute("value",c[i]);
		cmd.appendChild(o);
	}
	*/
	return true;
}