var image;

function getBooks()
{
	var format_type = $("#options :selected").text();
	$.ajax(
	{
		type:'GET',
		url:"http://localhost/dbs_project/format/"+format_type,
		dataType:'json',
		crossOrigin:'true',
		success : function(data,status)
		{
			$.each(data,function(index,element)
			{
				$("#content2").append(
					"<div class='content-block col-sm-3'>"+
						"<div class='media-left'>"+
							"<a href='bookDetails.html?isbn="+element.book_isbn+"' data-toggle='popover' id='link_2-"+element.book_isbn+"'>"+
								"<img class='img-thumbnail content-img-2' id='cover-"+element.book_isbn+"' src="+image+">"+
							"</a>"+
						"</div>"+
					"</div>"
					);
					getGenreImages(element.isbn);	
					$('[data-toggle="popover"]').popover({
						container:'body',
						html:true,
						placement:'auto right',
						trigger:'hover',
						delay:{show:500,hide:500},
						animation:true,
						title: function()
						{
							var id = $(this).attr('id');
							var popover_isbn = id.slice(7);
							$.ajax(
							{
								type:'GET',
								url:'http://localhost/dbs_project/getdetails/'+popover_isbn+'/',
								crossOrigin:'true',
								dataType:'json',
								success : function(data,status)
								{
									title = data[0].title;
								}
							});
							return "<h4 class='popover_title'>" + title +"</h4>"
						},
						content : function()
						{
							var id = $(this).attr('id');
							var popover_isbn = id.slice(7);
							$.ajax(
							{
								type:'GET',
								url:'http://localhost/dbs_project/getdetails/'+popover_isbn+'/',
								crossOrigin:'true',
								dataType:'json',
								success:function(data,status)
								{
									console.log(data);
									author = data[0].author_name;
									console.log(author);
									genre= data[0].format_type;
									console.log(genre);
									if(data[0].series == "")
									{
										series = "The book does not belong to any particular series";
									}
									else
									{
										series = data[0].series;
									}
									console.log(series);
									series_index=data[0].series_index;
									console.log(series_index);
									publisher = data[0].publisher_name;
									console.log(publisher);


								}
							});
							return ("<p class='pop-content'> by : <span class='pop-detail'> "+ author + "</span></p><br> "+
										"<p class='pop-content'> Genre : <span class='pop-detail'>" + genre + "</span></p><br>" +
										"<p class='pop-content'> Publisher : <span class='pop-detail'> " + publisher + "</span></p><br>" +
										"<p class='pop-content'> Series : <span class='pop-detail'> " + series + "</span><br><br> Series Index :<span class='pop-detail'>"+series_index+" </span></p>"); 
						}
					});

				//console.log(getImageSrc(element.isbn));
			});//end of each
		},
		error : function(data)
		{
			image = '../images/image-not-available.jpg';
			$("#cover-"+isbn).attr('src',image);
		}
	});
}

function getGenreImages(isbn)
{
	$.ajax(
	{
		type:'GET',
		url :'https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn+'&key=AIzaSyC-xVPmWkCHyb67o0q50udhKQm6gFVmfb0&country=IN',
		dataType:'json',
		crossOrigin:'true',
		success : function(data,status)
		{
			for(i = 0; i<data.items.length;i++)
			{
				var book = data.items[i];
				image = book.volumeInfo.imageLinks.thumbnail;
			}
			console.log(image);
			$('#cover-'+isbn).attr('src',image);


		},
		error : function(data)
		{
			image = '../images/image-not-available.jpg';
			$("#cover-"+isbn).attr('src',image);
		}
	});
}



$(function()
{
	$("#options").change(function()
	{
		$("#content2").html("");
		getBooks();
	});
});