function showOptions()
{
	$.ajax(
	{
		type:'GET',
		url:'http://localhost/dbs_project/getFormats',
		dataType:'json',
		crossOrigin:'true',
		success : function(data,status)
		{
			$.each(data,function(index,element)
			{
				$("#options").append(
					"<option value='"+element.format_type+"'>"+element.format_type+"</option>"
					)
			});
		}
	});
}

function onChange()
{
	var genre_name = $("#options :selected").text();
	console.log(genre_name);
	$("#genre_title").html(genre_name);
	$("#rule").show();
}

$(function()
{
	$("#rule").hide();
	showOptions();
	$("#options").change(function()
	{
		onChange();
	});
});