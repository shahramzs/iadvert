<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
include 'config.php';

 $response['locate'] = array();

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['token'])){
    $token = security($_GET['token']);

$sql = "SELECT t1.lat, t1.lng, t1.region, t1.streetAddress, t1.optional,t1.state, t2.country, t2.city,t3.phone, t3.email,t3.instagram, t3.facebook,t3.linkedin, t3.twitter,t3.web, t5.name, t5.title,(SELECT t4.url FROM image t4 WHERE t4.token = t1.token ORDER BY t4.id DESC LIMIT 1) url FROM location t1 INNER JOIN country t2 INNER JOIN contact t3 ON t1.token = t3.token INNER JOIN advertdetails t5 ON t1.token = t5.token WHERE t1.token = t2.token AND t1.token = ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $token);
$run->execute();
$num = $run->rowCount();
$record = $run->fetchAll(PDO::FETCH_ASSOC);


$response['locate'] = $record;  
}

echo json_encode($response,JSON_PRETTY_PRINT);
   