function showNews(text,text2,text3)
{
	var newsplace=document.getElementById("newsplace");
	var newsbox=document.getElementById("newsbox");
	if(!newsbox)
	{
		var newsbox=document.createElement("div");
		newsbox.className="box";
		newsbox.setAttribute("id","newsbox");
		var fieldset=document.createElement("fieldset");
		var legend=document.createElement("legend");
		legend.appendChild(document.createTextNode("Новости "));
		fieldset.appendChild(legend);
		var news=document.createElement("div");
		news.setAttribute("id","news");
		news.style.width='186px';
		news.style.overflow='auto';
		fieldset.appendChild(news);
		var author=document.createElement("div");
		author.setAttribute("id","author");
		author.style.width='100%';
		author.style.textAlign='right';
		fieldset.appendChild(author);
		var bday=document.createElement("div");
		bday.setAttribute("id","bday");
		fieldset.appendChild(bday);
		newsbox.appendChild(fieldset);
		newsplace.appendChild(newsbox);
		addCloseCross(legend,false);
	}
	//var news=document.getElementById("news");
	//var author=document.getElementById("author");
	//var bday=document.getElementById("bday");
	if(text!=null)
	{
		$('#news').html(text);
		$('#author').html(text2);
		$('#bday').html(text3);
	}
	else
	{
		$('#news').empty();
		$.ajax({
			url:'/send.php',
			data:{room:room,uid:uid,cmd:'news'},
			dataType:'json',
			success:function(data){
				//console.log(data);
				showNews(data[0],data[1],data[2]);
			},
			complete:function(){}
		});
		//frames['send'].document.location="/send.php?room="+frames['output'].room+"&uid="+frames['output'].uid+"&cmd=news";
		$('#news').append('<center class="smset">Идёт загрузка новостей...</center>');
		//var loadnote=document.createElement("center");
		//loadnote.className="smset";
		//loadnote.appendChild(document.createTextNode("Идёт загрузка новостей..."));
		//news.appendChild(loadnote);
	}
}