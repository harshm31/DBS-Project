<?php 

	$conn = new mysqli('localhost','root','harshm@31','library');

	if($conn->connect_error)
	{
		die('connection failed : '.$conn->connect_error);
	}
?>