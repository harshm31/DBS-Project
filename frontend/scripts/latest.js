var image;
var isbn_code;
var title;
var content;

function getLatest()
{
	var author,rating ,genre,publisher;
	$.ajax(
	{
		type:'GET',
		url :'http://localhost/dbs_project/topRated',
		dataType:'json',
		crossOrigin:'true',
		success: function(data,status)
		{
			$.each(data,function(index,element)
			{
				var new_data = JSON.stringify(element);
				$("#content").append(
					"<div class='content-block col-sm-3'>"+
						"<div class='media-left'>"+
							"<a href='bookDetails.html?isbn="+element.book_isbn+"' data-toggle='popover' id='link-"+element.book_isbn+"' target='_blank'>"+
							 "<img class='img-thumbnail content-img'  id='cover-"+element.book_isbn+"' src="+image+" >"+
							 "</a>"+
						"</div>"+
					"</div>"
					);
					getImage(element.book_isbn);	
				$('[data-toggle="popover"]').popover({
						container:'body',
						html:true,
						placement:'auto right',
						trigger:'hover',
						title: function()
						{
							var id = $(this).attr('id');
							var popover_isbn = id.slice(5);
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
							var popover_isbn = id.slice(5);
							$.ajax(
							{
								type:'GET',
								url:'http://localhost/dbs_project/getdetails/'+popover_isbn+'/',
								crossOrigin:'true',
								dataType:'json',
								success:function(data,status)
								{
									author = data[0].author_name;
									genre= data[0].format_type;
									if(genre == "")
									{
										genre = "No Genre Available"
									}
									if(data[0].rating == "")
									{
										rating = "No rating available";
									}
									else
									{
										rating  = data[0].rating;
									}
									series_index=data[0].series_index;
									publisher = data[0].publisher_name;


								}
							});
							return ("<p class='pop-content'> by : <span class='pop-detail'> "+ author + "</span></p><br> "+
										"<p class='pop-content'> Genre : <span class='pop-detail'>" + genre + "</span></p><br>" +
										"<p class='pop-content'> Publisher : <span class='pop-detail'> " + publisher + "</span></p><br>" +
										"<p class='pop-content'> Rating  : <span class='pop-detail'> " + rating + "</span><br><br> Series Index :<span class='pop-detail'>"+series_index+" </span></p>"); 
						}
					});

			});
		},
		error : function(data)
		{
			console.log("error cannot display details");
		}
	});
}

function getImage(isbn)
{
	$.ajax(
	{
		type:'GET',
		url :'https://www.googleapis.com/books/v1/volumes?q=isbn:'+isbn+'&key=AIzaSyBOj06z9F_tkkO7DNSdqJ54ZlkJLndcVlk&country=IN',
		dataType:'json',
		crossOrigin:'true',
		success : function(data,status)
		{
			for(i = 0; i<data.items.length;i++)
			{
				var book = data.items[i];
				image = book.volumeInfo.imageLinks.thumbnail;
			}
			$('#cover-'+isbn).attr('src',image);


		},
		error : function(data)
		{
			image = '../images/image-not-available.jpg';
			$("#cover-"+isbn).attr('src',image);
		}
	});
}

$(document).ready(function()
{
	
	getLatest();
	console.log("getting popover deets");
	var x = document.cookie;
	console.log(x);
});
