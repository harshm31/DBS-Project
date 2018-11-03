function getUserDetails()
{
	var reg_no = localStorage.getItem("reg_no");
	console.log(reg_no);
	var urlstring = "http://localhost/dbs_project/userDetails/"+reg_no+"/";
	console.log(urlstring);
	$.ajax(
	{
		type:'GET',
		url : urlstring,
		contentType:'application/json',
		crossOrigin:'true',
		success : function(data)
		{
			$("#user_info").append(
				"<hr>"+
				"<p class='user_subtitles'> Name : <span id='name'> "+data[0]['name']+"</span></p>"+
	"<p class='user_subtitles'> Email : <span id='email'>"+data[0]['email']+"</span></p>"+
	"<p class='user_subtitles'> Contact : <span id='contact'>"+data[0]['contact_no']+"</span></p>"+
	"<p class='user_subtitles'> Registration Number : <span id='reg_no'>"+data[0]['reg_no']+"</span></p>"
				);
		},
		error : function()
		{
			console.log("please login");
			//window.location.href = "loginPage.html";
		}
	});
}

$(document).ready(function()
{
	getUserDetails();
});