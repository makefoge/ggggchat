var validate={
	v:1,
	nick:function(n)
	{
		var valid=true;
		var reason='Неверные символы в нике!\n';
		if(!(/^[0-9a-z\-\_\s]{1,32}$/i.test(n)||/^[0-9ёйцукенгшщзхъфывапролджэячсмитьбюЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ\-\_\s]{1,32}$/i.test(n))||/^\s{1,}$/i.test(n))
		{
			reason=reason+'Ник может содержать только цифры и/или буквы (все русские или все латинские), с пробелами, тире, знаком подчёркивания, быть от 1го до 32х символов.';
			alert(reason);
			valid=false;
		}
		else if(/(\S)\1{10,}/i.test(n))
		{
			reason=reason+'Ник не может содержать более 10ти одинаковых символов подряд.';
			alert(reason);
			valid=false;
		}
		return valid;
	},
	pass:function(p)
	{
		if(!(/^[0-9a-z]{1,32}$/i.test(p)))
		{
			alert("Неверные символы в пароле!\nОн может содержать только цифры и/или латинские буквы, с пробелами, тире, знаком подчёркивания, быть от 1го до 32х символов.");
			return false;
		}
		else{return true;}
	},
	chat:function(c)
	{
		if(!(/^[0-9a-z]{1,32}$/i.test(c)))
		{
			alert("Неверные символы в логине чата!\nОн может содержать только цифры и/или латинские буквы, с пробелами, тире, знаком подчёркивания, быть от 1го до 32х символов.");
			return false;
		}
		else{return true;}
	},
	filename:function(c)
	{
		if(!(/^[0-9a-z\-\_]{1,32}$/i.test(c)))
		{
			alert("Неверные символы в имени файла!\nОно может содержать только цифры и/или латинские буквы, с пробелами, тире, знаком подчёркивания, быть от 1го до 32х символов.");
			return false;
		}
		else{return true;}
	},
	length:function(c,num,text)
	{
		if(c.length>num)
		{
			alert("Текст в "+text+" слишком длинный! Попробуйте пожалуйста уложиться в "+num+" символов!");
			return false;
		}
		else{return true;}
	},
	ip:function(ip)
	{
		if((/^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/i.test(ip)))
		{
			ip=ip.split(".");
			for(var i=0;i<=3;i++)
			{
				ip[i]-=0;
				if(ip[i]>255)
				{
					alert("Неверный адрес!\n");
					return false;
				}
			}
			return true;
		}
		else{alert("Неверный адрес!\n");return false;}
	},
	addr:function(a)
	{
		if(!(a.match(pattern)))
		{
			alert("Неверная ссылка!");
			return false;
		}
		else{return true;}
	},
	num:function(num)
	{
		if((/^[0-9]+$/i.test(num)))
		{
			return true;
		}
		return false;
	},
	color:function(element)
	{
		if(!(/^[0-9a-f]{6}$/i.test(element.value)))
		{
			element.value='ffffff';
		}
		return element.value;
	},
	fileupload:function(value)
	{
		if(value=='')
		{
			alert('Выберите изображение!');
			return false;
		}
		return true;
	},
	mail:function(value)
	{
		if(mailPattern)
		{
			var re=new RegExp(mailPattern);
			if(re.test(value))
			{
				return true;
			}
		}
		alert('Укажите правильный, действующий адрес электронной почты!');
		return false;
	},
	fp:function(fp){
		if(!(/^[0-9a-f]{32}$/i.test(fp)))
		{
			alert('Код браузера должен содержать 32 символа!');
			return false
		}
		return true;
	},
	adm:{
		nick:function(p,n){
			if((p==""||validate.pass(p))&&validate.nick(n)){return true;}
			else return false;
		},
		ip:function(ip1,ip2){
			if(ip1.value==""&&ip2.value=="")
			{
				alert("Введите адреса!");
				return false;
			}
			else if(ip1.value==""&&ip2.value!="")
				{
				ip1.value=ip2.value;
			}
			else if(ip1.value!=""&&ip2.value=="")
			{
				ip2.value=ip1.value;
			}
			if(validate.ip(ip1.value)&&validate.ip(ip2.value))
			{
				return true;
			}
			else return false;
		},
		ban:function(n,ip1,ip2,fp){
			//корректировка
			if(ip1.value==""&&ip2.value!="")
			{
				ip1.value=ip2.value;
			}
			else if(ip1.value!=""&&ip2.value=="")
			{
				ip2.value=ip1.value;
			}
			//
			if((fp!=''&&!validate.fp(fp))||(n!=''&&!validate.nick(n))||(ip1.value!=''&&ip2.value!=''&&(!validate.ip(ip1.value)||!validate.ip(ip2.value))))
			{
				return false;
			}
			//
			//if((n!=""&&validate.nick(n)&&ip1.value==""&&ip2.value=="")||(n==""&&ip1.value!=""&&ip2.value!=""&&validate.ip(ip1.value)&&validate.ip(ip2.value))||(n!=""&&validate.nick(n)&&ip1.value!=""&&ip2.value!=""&&validate.ip(ip1.value)&&validate.ip(ip2.value)))
			//{
			//	return true;
			//}
			//else return false;
			return true;
		}
	}
};
function addSpace(msg,num,link)
{
	msg=msg.split(" ");
	for(var i=0;i<msg.length;i++)
	{
		if((link==true)||(/\w{3,5}\:\/\//i.test(msg[i])==false&&/\:\w{1,}\|\w{1,}\:/i.test(msg[i])==false&&/\[(img)|(audio)\=([0-9a-zA-Z\+\=]+)\]/i.test(msg[i])==false))
		{
			function replacer(str,p1,offset,s){return p1;}
			var re=/(\S)\1{10,}/ig;
			msg[i]=msg[i].replace(re,replacer);
			var re=new RegExp("(\\S{"+num+"})","g");
			msg[i]=msg[i].replace(re,"$1 ");
		}
	}
	return msg.join(" ");
}
