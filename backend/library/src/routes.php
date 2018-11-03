<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

// $app->get('/[{name}]', function (Request $request, Response $response, array $args) {
//     // Sample log message
//     $this->logger->info("Slim-Skeleton '/' route");

//     // Render index view
//     return $this->renderer->render($response, 'index.phtml', $args);
// });

$app->get('/importBooks',function(Request $request,Response $response)
{
	require_once("db.php");
	$file=file_get_contents("../Files/mydb.json");
	$data = json_decode($file,true);

	foreach ($data as $row) {
		//insert into BOOK
		// $query = "INSERT INTO book(author,title,comments,isbn,pubdate,series,series_index,publisher,genre) VALUES ('".$row["authors"]."','".addslashes($row["title"])."','".addslashes($row["comments"])."','".addslashes($row["isbn"])."','".addslashes($row["pubdate"])."','".addslashes($row["series"])."','".addslashes($row["series_index"])."','".addslashes($row["publisher"])."','".addslashes($row["genre"])."');";
		
		//insert into book 
		$query = "INSERT INTO books(book_isbn,comments,pubdate,series_index,title,rating)VALUES ('".$row["isbn"]."','".addslashes($row["comments"])."','".$row["pubdate"]."','".addslashes($row["series_index"])."','".addslashes($row["title"])."','".addslashes($row["rating"])."');";

		$conn->query($query);

	}
	
	$conn->close();
});

$app->get('/importAuthors',function(Request $request , Response $response)
{

	require_once("db.php");
	$file = file_get_contents("../Files/mydb.json");
	$data = json_decode($file,true);

	foreach($data as $row)
	{
		$query = "INSERT INTO authors(author_name) VALUES ('".$row["authors"]."');";
		$conn->query($query);
	}
	$conn->close();

});

$app->get('/importPublishers',function(Request $request , Response $response)
{
	require_once("db.php");
	$file = file_get_contents("../Files/mydb.json");
	$data = json_decode($file,true);

	foreach($data as $row)
	{
		$query = "INSERT INTO publishers(publisher_name) VALUES ('".$row["publisher"]."');";
		$conn->query($query);
	}
	$conn->close();
});

$app->get('/import' , function(Request $request , Response $response)
{
	require_once("db.php");
	$file = file_get_contents("../Files/mydb.json");
	$data = json_decode($file,true);

	foreach($data as $row)
	{
		$query1 = "INSERT INTO series(series_name) VALUES ('".$row["series"]."');";
		$conn->query($query1);
		$query2 = "INSERT INTO format(format_type) VALUES ('".$row["formats"]."');";
		$conn->query($query2);
		$query3 = "INSERT INTO genre(genre_name) VALUES ('".$row["genre"]."');";
		$conn->query($query3);
	}
	$conn->close();
});

$app->get('/importRelations',function(Request $request,Response $response)
{
	require_once("db.php");
	$file = file_get_contents("../Files/mydb.json");
	$data = json_decode($file,true);

	foreach ($data as $row) {
		
		$query1 = "INSERT INTO belongs_to(series_name,book_isbn) VALUES ('".$row["series"]."','".$row["isbn"]."');";
		$conn->query($query1);

		$query2 = "INSERT INTO published_by(publisher_name,book_isbn) VALUES ('".$row["publisher"]."','".$row["isbn"]."');";
		$conn->query($query2);

		$query3 = "INSERT INTO type(format_type,book_isbn) VALUES ('".$row["formats"]."','".$row["isbn"]."');";
		$conn->query($query3);

		$query4 = "INSERT INTO written_by(author_name,book_isbn) VALUES ('".$row["authors"]."','".$row["isbn"]."');";
		$conn->query($query4);
	}

	$conn->close();

});

//signup
$app->post('/signUp',function(Request $request,Response $response,array $args)
{
	require_once("db.php");
	$input_data = $request->getParsedBody();
	$reg = $input_data["reg"];
	$name = $input_data["name"];
	$email = $input_data["email"];
	$contact = $input_data["contact"];
	$password = $input_data["password"];

	$insert_query = $conn->prepare("INSERT INTO users(reg_no,email,name,contact_no,password) VALUES (?,?,?,?,?)");
	$insert_query->bind_param("sssss",$reg,$email,$name,$contact,$password);

	if($insert_query->execute())
	{
		$message = "Successfully Registered !";
		$status = 200;

		$data = array("message"=>$message,"status"=>$status);
		return $response->withJson($data)
						->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	}
	else
	{
		$message = "error registering";
		$status = 100;

		$data = array("message"=>$message,"status"=>$status);
		return $response->withJson($data)
						->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

	}

	$conn->close();

});

$app->post('/reset',function(Request $request,Response $response,array $args)
{
	require_once("db.php");
	$input_data = $request->getParsedBody();
	$reg = $input_data["reg"];
	$newpwd = $input_data["newpwd"];

	$query = "UPDATE users SET password = '".$newpwd."' WHERE reg_no = '".$reg."';";
	echo($query);
	if($conn->query($query))
	{
		$message = "Successfully changed password";
		$status = 200;
		$data = array("message"=>$message,"status"=>$status);

		return $response->withJson($data)
						->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	}
	else
	{
		$message = "Could not change password";
		$status = 100;

		$data = array("message"=>$message,"status"=>$status);
		return $response->withJson($data)
						->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	}

	$conn->close();
});

$app->post('/login',function(Request $request , Response $response , array $args)
{
	require_once("db.php");
	$input_data = $request->getParsedBody();
	$reg = $input_data["reg"];
	$password = $input_data["password"];

	$query = $conn->prepare("SELECT * FROM users WHERE reg_no = '".$reg."';");
	if($query->execute())
	{
		$result = $query->fetch_assoc();
		if(is_null($result))
		{
			$message = "user doesnt exist";
			$status = 1;
			$data = array("message"=>$message,"status"=>$status);
		return $response->withJson($data)
						->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
		}
		else
		{
			$message = "Successfully logged in ";
			$status = 2;
			$data = array("message"=>$message,"status"=>$status);
		return $response->withJson($data)
						->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
		}
	}

	$conn->close();

});

$app->get('/userDetails/{reg_no}/',function(Request $request , Response $response , array $args)
{
	require_once("db.php");
	$reg = $args['reg_no'];
	//echo($reg);

	$query = "SELECT reg_no , name ,email,contact_no FROM users WHERE reg_no = '".$reg."';";
	//echo($query);
	$result = $conn->query($query);
	$row = $result->fetch_assoc();
	$data[]=$row;
	return $response->withJson($data)
						->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

	$conn->close();

});

$app->post('/addBook',function(Request $request , Response $response)
{
	require_once("db.php");
	$input = $request->getParsedBody();
	$reg_no = $input["reg_no"];
	$isbn = $input["isbn"];

	$query = $conn->prepare("INSERT INTO wishlist VALUES (?,?)");
	$query->bind_param("ss",$isbn,$reg_no);
	if($query->execute())
	{
		$message = "Successfully added";
		$data = array("message"=>$message);
		return $response->withJson($data,200)
					->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	}
	else
	{
		$message = "Could not insert";
		$data = array("message"=>$message);
		return $response->withJson($data,200)
					->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	}
});

//top rated books 
$app->get('/topRated', function (Request $request,Response $response,array $args)
{
	require_once("db.php");
	$query = "SELECT * FROM books natural join written_by natural join published_by natural join type ORDER BY book_isbn DESC LIMIT 8";
	$result = $conn->query($query);
	while($row = $result->fetch_assoc())
	{
		$data[] = $row;
	}
	return $response->withJson($data,200)
					->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

//edit books

$app->get('/getdetails/{isbn}/',function(Request $request,Response $response,array $args)
{
	require_once("db.php");
	$isbn = $args['isbn'];

	// $query = "SELECT * FROM books natural join written_by natural join published_by natural join type WHERE book_isbn = '".$isbn."';";
	//echo($query);
	$query = "SELECT * FROM books natural join written_by natural join published_by natural join type WHERE book_isbn in (select b.book_isbn from books b where b.book_isbn = '".$isbn."');";
	//echo($query)
	$result = $conn->query($query);
	while($row=$result->fetch_assoc())
	{
		$data[]=$row;
	}
	return $response->withJson($data,200)
					->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

$app->get('/getFormats',function(Request $request , Response $response)
{
	require_once("db.php");
	$query = "SELECT DISTINCT * from format where format_type<>''";
	$result = $conn->query($query);
	while($row = $result->fetch_assoc())
	{
		$data[] = $row;
	}
	return $response->withJson($data,200)
					->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    $conn->close();
});

$app->get('/format/{format_type}',function(Request $request , Response $response , array $args)
{
	require_once("db.php");
	$type = $args["format_type"];
	$query = "SELECT * from books natural join type where format_type in (select format_type from format where format_type='".$type."') LIMIT 8;";
	$result = $conn->query($query);
	while($row = $result->fetch_assoc())
	{
		$data[] = $row;
	}
	return $response->withJson($data,200)
					->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

// generating quotes api

$app->get('/quotes',function(Request $request,Response $response,array $args)
{
	require_once("db.php");
	$query = "select * from quotes limit 2";
	$result = $conn->query($query);
	while($row = $result->fetch_assoc())
	{
		$data[] = $row;
	}
	return $response->withJson($data,200)
					->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    $conn->close();
});




$app->get('/search/{input}/',function(Request $request,Response $response,array $args)
{
	require_once("db.php");
	 $input = $args['input'];
	 $trim_input = substr($input,0,3);
	 //echo($trim_input);
	 // $query = "SELECT DISTINCT title,author,comments,isbn,pubdate,publisher,series,series_index,genre FROM book WHERE title LIKE '%".$trim_input."%' LIMIT 12 ;";

	 $query = "SELECT DISTINCT * FROM books natural join written_by natural join published_by natural join type WHERE title LIKE '%".$trim_input."%' LIMIT 12;";

	 if($result = $conn->query($query))
	 {
	 while($row=$result->fetch_assoc())
	 {
	 	$data[]=$row;
	 }
	return $response->withJson($data,200)
					->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
     }
     else
     {
     	$data=array("message"=>"no results found");
     	return $response->withJson($data,200)
     					->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    }
});

$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
    $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
    return $handler($req, $res);
});


