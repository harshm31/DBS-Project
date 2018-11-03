var reg_no;

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
		var name = $("#name").html();
		var reg_no = $("#reg_no").html();
		var phone = $("#phone").html();
		var email = $("#email").html();
		var pwd = $("#pwd1").html();

		console.log(name);
		console.log(phone);
		console.log("successfully signed up");
		//window.location.href = "loginPage.html";
	});
}


function redirectToHome()
{
	$(".submitButton").click(function()
	{
		console.log("clicked");
		var url = "home.html";
		reg_no = $("#login_reg").text()
		document.cookie = "reg_no="+reg_no;
    	window.location.href = url;
	});

	
}

$(document).ready(function()
{
	redirectToHome();
	animateText();
	signUp();
});
