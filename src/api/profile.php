<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';


 $response['profile'] = array();

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $token = $_GET['token'];

$sql = "SELECT t1.title, t1.name, t2.city,t2.country, t3.fullname, t4.instagram , t4.facebook, t4.twitter, t4.linkedin,t4.email FROM advertdetails t1 INNER JOIN country t2 ON t2.token = t1.token INNER JOIN user t3 ON t3.email = t1.user INNER JOIN contact t4 ON t4.token = t1.token WHERE t1.token = ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $token);
$run->execute();
$num = $run->rowCount();
$record = $run->fetchAll(PDO::FETCH_ASSOC);


$response['profile'] = $record;  
}

echo json_encode($response,JSON_PRETTY_PRINT);
   