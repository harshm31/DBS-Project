var reg_no;
var persist_reg_no;

function animateText()
{

 	$('.quoteText').each(function(){
  		$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
	});

	anime.timeline({loop: true})
  		.add({
	    targets: '.quoteText .letter',
	    opacity: [0,1],
	    easing: "easeInOutQuad",
	    duration: 300,
	    delay: function(el, i) {
	      return 100 * (i+1)
	    }
  	}).add({
	    targets: '.quoteText',
	    opacity: 0,
	    duration: 300,
	    easing: "easeOutExpo",
	    delay: 10
  	});

}

function signUp()
{
	$("#signUpButton").click(function()
	{
		var name = $("#name").val();
		var reg_no = $("#reg_no").val();
		var phone = $("#phone").val();
		var email = $("#email").val();
		var pwd = $("#pwd1").val();

		console.log(name);
		console.log(phone);
		//console.log("successfully signed up");

		$.ajax(
		{
			type :'POST',
			url : 'http://localhost/dbs_project/signUp',
			crossOrigin : 'true',
			contentType:'application/json',
			dataType : 'json',
			data : JSON.stringify({
				"name":'"'+name+'"',
				"contact":'"'+phone+'"',
				"email" : '"'+email+'"',
				"password" : '"'+pwd+'"',
				"reg" : '"'+reg_no+'"'
			}),

			success : function(data)
			{
				console.log("message : " + data.message);
				console.log("status : " + data.status);
			},
			error : function(data)
			{
				alert(data.message);
			}

		});
		//window.location.href = "loginPage.html";
	});

}

function reset()
{
	$("#resetButton").click(function()
	{
		var reg_no = $("#reg-no").val();
		console.log(reg_no);
	var new_pwd = $("#new_pwd").val();
	console.log(new_pwd);
	var confirm_pwd = $("#confirm_pwd").val();
	if(confirm_pwd==new_pwd)
	{
		$.ajax(
		{
			type :'POST',
			url:'http://localhost/dbs_project/reset',
			dataType:'json',
			contentType:'application/json',
			crossOrigin:'true',
			data : JSON.stringify({
				"reg":'"'+reg_no+'"',
				"newpwd":'"'+new_pwd+'"'
			}),
			success : function(data)
			{
				console.log("message : " + data.message);
				console.log("status : " + data.status);
			},
			error : function(data)
			{
				console.log("message : " + data.message);
				console.log("status : " + data.status);
			}
		});
	}
	
	});
}


function redirectToHome()
{
	$(".submitButton").click(function()
	{
		console.log("clicked");
		var url = "home.html";
		reg_no = $("#login_reg").val()
		alert(reg_no);
		//document.cookie = "reg_no="+reg_no;
		localStorage.setItem("reg_no",reg_no);
    	window.location.href = url;
	});

	
}

$(document).ready(function()
{
	redirectToHome();
	animateText();
	signUp();
	reset();
});
