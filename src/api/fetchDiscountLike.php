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

if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['token']) && isset($_GET['user'])){
    $token = security($_GET['token']);
    $user = security($_GET['user']);
$sql = "SELECT discountCode FROM `like_discount` WHERE token = ? AND user = ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $token);
$run->bindValue(2, $user);
$run->execute();
$num = $run->rowCount();
$record = $run->fetchAll(PDO::FETCH_ASSOC);
if($num === 0){
    $response ='notFound';
}else if($num !== 0){
 $response = $record;
}


}

echo json_encode($response);
   