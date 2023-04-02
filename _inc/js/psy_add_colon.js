function psy_add_colon(element,window)
{
	if(element.firstChild.lastChild&&element.firstChild.lastChild.nodeType!=3)
	{
		element.firstChild.lastChild.appendChild(window.document.createTextNode(":"));
	}
	else
	{
		element.appendChild(window.document.createTextNode(":"));
	}
}