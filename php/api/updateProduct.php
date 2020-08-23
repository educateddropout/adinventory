<?php

$database = require '..\bootstrap.php';

session_start();

// setting return value
header("Access-Control-Allow-Origin: *");
//header("Content-Type: application/json; charset=UTF-8");
header('Content-Type: application/download; charset=utf-8');
//header('Content-Type: text/plain; charset=utf-8');

// decoding of post data //
$data = json_decode(file_get_contents("php://input"), true);

$userId = "111111";

$returnValue = array();
$returnValue["status"] = "ERROR";

$product = $data['product'];

try {

	$results = $database->updateProduct($product, $userId);
	$returnValue["status"] = "SUCCESS";
	$returnValue["message"] = $results;

} 
catch(PDOException $e){
	$returnValue["status"] = "ERROR";
	$returnValue['message'] = $e;

}

print_r(json_encode($returnValue));


?>