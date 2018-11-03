function getQuote()
{
	$.ajax(
	{
		type :'GET',
		url:'http://ec2-35-154-119-96.ap-south-1.compute.amazonaws.com/library/quote',
		dataType:'json',
		crossOrigin:'true',
		success : function(data,status)
		{
			console.log(data[0]);
			$("#quote-1").append(
				"<h4 class='quote-text'>"+data[0].quote+"</h4>"+
				"<h2 class='quote-author'>"+data[0].author+"</h2>"
				);
			$("#quote-2").append(
				"<h4 class='quote-text'>"+data[1].quote+"</h4>"+
				"<h2 class='quote-author'>"+data[1].author+"</h2>"
				);
			$("#quote-3").append(
				"<h4 class='quote-text'>"+data[2].quote+"</h4>"+
				"<h2 class='quote-author'>"+data[2].author+"</h2>"
				);

		}
	});
}

$(function()
{
	getQuote();
});