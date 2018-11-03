$(document).ready(function()
{
	$.ajax(
	{
		type:'GET',
		url :'http://ec2-35-154-119-96.ap-south-1.compute.amazonaws.com/library/loader_quote',
		dataType:'json',
		crossOrigin:'true',
		success : function(data,status)
		{
			
				$("#loader_content").append(
					"<h3 id='loader_quote'>" +data[0].quote +"</h3><br>"+
					"<h4 id='loader_author'> - " +data[0].author+"</h4>"
					);
		}
	});
});