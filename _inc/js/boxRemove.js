function boxRemove(element)
{
	var box=element.parentNode.parentNode.parentNode;
	box.parentNode.removeChild(box);
}