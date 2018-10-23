function redirectToLogin()
{
	$(".landingPage_button").click(function()
	{
		console.log("clicked");
		var url = "loginPage.html";
    	window.location.href = url;
	});
}

function animateText()
{

 	$('.ml2').each(function(){
  		$(this).html($(this).text().replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>"));
	});

	anime.timeline({loop: true})
  		.add({
	    targets: '.ml2 .letter',
	    opacity: [0,1],
	    easing: "easeInOutQuad",
	    duration: 2250,
	    delay: function(el, i) {
	      return 150 * (i+1)
	    }
  	}).add({
	    targets: '.ml2',
	    opacity: 0,
	    duration: 1000,
	    easing: "easeOutExpo",
	    delay: 1000
  	});
}

$(document).ready(function()
{
	redirectToLogin();
	animateText();
});
