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

$userId = $_SESSION['adi_user_id'];

$returnValue = array();
$returnValue["status"] = "ERROR";

$product_id = $data['product_id'];

try {

	$results = $database->archiveProductType($product_id, $userId);
	$returnValue["status"] = "SUCCESS";
	$returnValue["message"] = $results;

} 
catch(PDOException $e){
	$returnValue["status"] = "ERROR";
	$returnValue['message'] = $e;

}

print_r(json_encode($returnValue));


?>