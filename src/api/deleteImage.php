<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
include 'config.php';
 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['id'])){
    $id = security($_POST['id']);

$sql = "DELETE FROM `image` WHERE id = ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $id);
if($run->execute()){
    $response = 'delete';
}else{
    $response = 'error';
}

 }

echo json_encode($response,JSON_PRETTY_PRINT);

