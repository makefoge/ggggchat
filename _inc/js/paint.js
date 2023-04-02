function psy_paint(element,color,font,size,window)
{
	if(color.indexOf('|')!=-1)
	{
		color=color.split('|');
		font=font.split('|');
		size=size.split('|');
		var i=0;var j=0;
		for(var k=0;k<element.childNodes.length;k++)
		{
			if(element.childNodes[k].nodeType==3)
			{
				var new_container=window.document.createElement('span');
				while(i<element.childNodes[k].nodeValue.length)
				{
					if(j>=color.length){j=0;}
					var span=window.document.createElement('span');
					span.appendChild(window.document.createTextNode(element.childNodes[k].nodeValue.charAt(i)));
					span.style.color='#'+color[j];
					span.style.fontFamily=font[j];
					span.style.fontSize=size[j]+'px';
					new_container.appendChild(span);
					i++;j++;
					if(element.childNodes[k].nodeValue.charAt(i)==' '){j--;}
				}
				j--;
				i=0;
				element.childNodes[k].parentNode.replaceChild(new_container,element.childNodes[k]);
			}
		}
	}
	else if(color.indexOf('-')!=-1)
	{
		function psy_grad_text_length(element)
		{
			var text='';
			for(var i=0;i<element.childNodes.length;i++)
			{
				if(element.childNodes[i].nodeType==3)
				{
					text=text+element.childNodes[i].nodeValue.replace(/\s/g,'');
				}
			}
			return text.length;
		}
		function hex2dec(thisColor)
		{
			var colRGB=[];
			var colHEX=[];
			colRGB[0]=thisColor.substr(0,2);
			colRGB[1]=thisColor.substr(2,2);
			colRGB[2]=thisColor.substr(4,2);
			colHEX[0]=parseInt(colRGB[0],16);
			colHEX[1]=parseInt(colRGB[1],16);
			colHEX[2]=parseInt(colRGB[2],16);
			return colHEX;
		}
		function psy_gradient_build(color)
		{
			var a=false;
			var alltextlength=psy_grad_text_length(element);
			if(alltextlength>0)
			{
				alltextlength--;
				color=color.split('-');
				var a=new Array();
				var AllHex='0123456789ABCDEF';
				var gradlength=Math.ceil(alltextlength/(color.length-1));
				var count=0;
				a[a.length]=color[0];
				for(var i=0;i<color.length;i++)
				{
					if(color[i]&&color[i+1])
					{
						colFrom=hex2dec(color[i]);
						colTo=hex2dec(color[i+1]);
						var r=(colFrom[0]-colTo[0])/gradlength;
						var g=(colFrom[1]-colTo[1])/gradlength;
						var b=(colFrom[2]-colTo[2])/gradlength;
						for(var j=0;j<gradlength;j++)
						{
							colFrom[0]-=r;
							colFrom[1]-=g;
							colFrom[2]-=b;
							R=AllHex.charAt(Math.floor(colFrom[0]/16))+AllHex.charAt(colFrom[0]%16);
							G=AllHex.charAt(Math.floor(colFrom[1]/16))+AllHex.charAt(colFrom[1]%16);
							B=AllHex.charAt(Math.floor(colFrom[2]/16))+AllHex.charAt(colFrom[2]%16);
							if(R.length==1)R+=R;
							if(G.length==1)G+=G;
							if(B.length==1)B+=B;
							thisColor=R+G+B;
							a[a.length]=thisColor;
							count++;
						}
					}
				}
			}
			return a;
		}
		var a=psy_gradient_build(color);
		var i=0;var j=0;
		for(var k=0;k<element.childNodes.length;k++)
		{
			if(element.childNodes[k].nodeType==3)
			{
				var new_container=window.document.createElement('span');
				while(i<element.childNodes[k].nodeValue.length)
				{
					var letter=element.childNodes[k].nodeValue.charAt(i);
					if(/\S/i.test(letter))
					{
						var span=window.document.createElement('span');
						span.appendChild(window.document.createTextNode(letter));
						span.style.color='#'+a[j];
						j++;
					}
					else{var span=window.document.createTextNode(letter);}
					new_container.appendChild(span);
					i++;
				}
				i=0;
				element.childNodes[k].parentNode.replaceChild(new_container,element.childNodes[k]);
			}
		}
		element.style.fontFamily=font;
		element.style.fontSize=size+'px';
	}
	else
	{
		element.style.color='#'+color;
		element.style.fontFamily=font;
		element.style.fontSize=size+'px';
	}
}