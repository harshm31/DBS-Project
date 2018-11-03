
var rating;
var image;

function getDetails()
{
	var url_string = window.location.href;
	var url = new URL(url_string);
	var isbn = url.searchParams.get("isbn");
	console.log(isbn);

	$.ajax(
	{
		type :'GET',
		url :'http://localhost/dbs_project/getdetails/'+isbn+'/',
		dataType:'json',
		crossOrigin:'true',
		success : function(data,status)
		{
			if(data[0].rating=="")
			{
				rating = "The book does not have any rating ";
			}
			else
			{
				rating = data[0].rating;
			}
			var comments = data[0].comments;
			if(comments=="")
			{
				comments = "No Review/Summary available";
			}
			var comments1 = comments.replace(/<(.|\n)*?>/g, '');

			$("#content4").append(
				"<div class='book_content'>"+
					"<img id='cover-"+isbn+"' src="+image+" class='cover img-thumbnail'>"+
					"<h3 class='title'>"+data[0].title+"</h3>"+
					"<hr id='title_rule'>"+
					"<p class='sub_text'> By : <span class='main_text'> "+data[0].author_name+"</span></p><br>"+
					"<p class='sub_text'> Format : <span class='main_text'>" +data[0].format_type + "</span></p><br>"+
					"<p class='sub_text'> Rating  : <span class='main_text'>" + rating + "</span></p><br>"+
					"<p class='sub_text'> Series Index : <span class='main_text'> "+data[0].series_index+"</span></p><br>"+
					"<p class='sub_text'> Publisher : <span class='main_text'> " + data[0].publisher_name + "</span></p><br>"+
					"<p class='sub_text'> Published on : <span class='main_text'>" +data[0].pubdate+"</span></p><br>"+
					"<br>"+
					"<p class='comments'>" +comments+ "</p>"+
				"</div>"
				);
			getImage(isbn);
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

function order_book()
{
	var url_string = window.location.href;
	var url = new URL(url_string);
	var isbn = url.searchParams.get("isbn");

	var redirectUrl = "https://amazon.in/gp/product/"+isbn;
	window.location.href = redirectUrl;
}

function read_book()
{
	var url_string = window.location.href;
	var url = new URL(url_string);
	var isbn = url.searchParams.get("isbn");

	var redirectUrl = "https://books.google.co.in/book?isbn="+isbn;
	window.location.href = redirectUrl;
}



$(document).ready(function()
{
	getDetails();

	$("#order_button").click(function()
	{
		order_book();
	});

	$("#read_button").click(function()
	{
		read_book();
	});
});