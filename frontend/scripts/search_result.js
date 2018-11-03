function getInput()
{
	var input = $("#search_input").val();
	console.log(input);
	var trim_input = input.slice(0,3);
	console.log(trim_input);
	localStorage.setItem("search-query",trim_input);
	// console.log("local storage item");
	// console.log(localStorage.getItem("search-query"));

	//console.log(getCookie("query"));
	//location.href="search.html";
	window.open("search.html","_blank");
}

$(function()
{
	$("#search_button").click(function()
	{
		getInput();
	});
});