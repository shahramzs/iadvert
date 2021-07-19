<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include './connect.php';
  include './config.php';
 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['token'])){
    $token = $_POST['token'];

$sql = "DELETE FROM `chat_msg` WHERE chat_token = ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $token);
if($run->execute()){
    $response = 'delete';
}else{
    $response = 'error';
}

 }

echo json_encode($response,JSON_PRETTY_PRINT);

