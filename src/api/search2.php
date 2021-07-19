<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Credentials");
header("Content-Type: text/plain"); 


 include 'connect.php';
 include 'config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['name']) && isset($_GET['city']) && isset($_GET['business'])){
    $name = security($_GET['name']);
    $city = security($_GET['city']);
    $business = security($_GET['business']);

$sql = "SELECT t1.id, t1.title, t1.name,t1.start, t1.details, t1.user, t1.token, t1.time, t2.city, t2.country, t4.cat, t7.lat, t7.lng,(SELECT view FROM view_number t6 WHERE t6.token = t1.token)view,(SELECT Count(*) FROM like_number t5 WHERE t5.token = t1.token)like_num,(SELECT count(*) FROM image t3 WHERE t3.token = t1.token)numPic,(SELECT t3.url FROM image t3 WHERE t3.token = t1.token ORDER BY t3.id DESC LIMIT 1) url FROM advertdetails t1 INNER JOIN country t2 ON t2.token = t1.token INNER JOIN category t4 ON t4.token = t1.token INNER JOIN location t7 ON t7.token = t1.token WHERE t1.name  LIKE ? AND t2.city = ? AND t4.cat = ? ORDER BY t1.id DESC";
$run = $connect->prepare($sql);
$run->bindValue(1, '%'.$name.'%');
$run->bindValue(2, $city);
$run->bindValue(3, $business);
$run->execute();
$num = $run->rowCount();
$record = $run->fetchAll(PDO::FETCH_ASSOC);

$response = $record;  
 
 }
 
echo json_encode($response,JSON_PRETTY_PRINT);
   