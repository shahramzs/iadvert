<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Credentials");
header("Content-Type: text/plain"); 

 include 'connect.php';


 $response['like'] = array();

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $user = $_GET['user'];
    $token = $_GET['token'];

$sql = "SELECT * FROM `like_number` WHERE user = ? AND token = ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $user);
$run->bindValue(2, $token);
$run->execute();
$num = $run->rowCount();
if($num === 0){
    $response['like'] ='notFound';
}else if($num !== 0){
 $response['like'] = 'ok';
}


}

echo json_encode($response['like']);
   