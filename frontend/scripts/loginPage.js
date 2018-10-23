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

function redirectToHome()
{
	$(".submitButton").click(function()
	{
		console.log("clicked");
		var url = "homePage.html";
    	window.location.href = url;
	});
}

$(document).ready(function()
{
	redirectToHome();
	animateText();
});
