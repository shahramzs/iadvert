<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';


 $response['address'] = array();

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $token = $_GET['token'];

$sql = "SELECT t1.streetAddress, t1.optional, t2.phone,t2.email, t2.web FROM location t1 INNER JOIN contact t2 ON t2.token = t1.token  WHERE t1.token = ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $token);
$run->execute();
$num = $run->rowCount();
$record = $run->fetchAll(PDO::FETCH_ASSOC);


$response['address'] = $record;  
}

echo json_encode($response,JSON_PRETTY_PRINT);
   