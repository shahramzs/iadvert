<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';


 $response['info'] = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $token = $_GET['token'];

$sql = "SELECT * FROM `more_explain` WHERE token = ?";
$run= $connect->prepare($sql);
$run->bindValue(1, $token);
$run->execute();
$record = $run->fetchAll(PDO::FETCH_ASSOC);

$response['info'] = $record;  
} 

echo json_encode($response,JSON_PRETTY_PRINT);
   