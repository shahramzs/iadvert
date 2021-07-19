<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';


 $response['details'] = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $token = $_GET['token'];

$sql = "SELECT t1.id, t1.title, t1.name,t1.start, t1.details, t1.user, t1.token, t1.time, t2.city, t2.country, t4.cat, t7.fullname, t8.region,t9.zipCode, t10.state,t11.internetShopping,t11.freeDelivery,t11.parking,t11.specialGift,t11.specialDiscount, (SELECT view FROM view_number t6 WHERE t6.token = t1.token)view,(SELECT Count(*) FROM like_number t5 WHERE t5.token = t1.token)like_num FROM advertdetails t1 INNER JOIN country t2 ON t2.token = t1.token INNER JOIN category t4 ON t4.token = t1.token INNER JOIN user t7 ON t7.email = t1.user INNER JOIN location t8 ON t8.token = t1.token  INNER JOIN location t9 ON t9.token = t1.token INNER JOIN location t10 ON t10.token = t1.token INNER JOIN morefeatures t11 ON t11.token = t1.token WHERE t1.token = ? ORDER BY t1.id DESC";
$run= $connect->prepare($sql);
$run->bindValue(1, $token);
$run->execute();
$record = $run->fetchAll(PDO::FETCH_ASSOC);


$response['details'] = $record;  
} 

echo json_encode($response,JSON_PRETTY_PRINT);
   