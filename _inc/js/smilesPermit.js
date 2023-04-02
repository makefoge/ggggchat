function smilesPermit()
{
	if(main.registry.punished.data[2]>sys.getUnixTime())
	{
		main.registry.alert(window,'alert','Ошибка!','Вы наказаны и не можете использовать смайлы!');
		return false;
	}
	//console.log(main.registry.smile.permitLevel);
	switch(main.registry.smile.permitLevel)
	{
		case 2:
			if(main.myId=='?'){main.registry.alert(window,'alert','Ошибка!',main.registry.smile.permitText);return false;}
			break;
		case 3:
			if(main.myStatus<2){main.registry.alert(window,'alert','Ошибка!',main.registry.smile.permitText);return false;}
			break;
		case 4:
			if(main.myStatus<3){main.registry.alert(window,'alert','Ошибка!',main.registry.smile.permitText);return false;}
			break;
		case 5:
			if(main.myStatus<4){main.registry.alert(window,'alert','Ошибка!',main.registry.smile.permitText);return false;}
			break;
		case 6:
			if(main.myStatus<1){main.registry.alert(window,'alert','Ошибка!',main.registry.smile.permitText);return false;}
			break;
		case 7:
			if(main.myId=='?'||main.myStatus<1){main.registry.alert(window,'alert','Ошибка!',main.registry.smile.permitText);return false;}
			break;
	}
	return true;
}