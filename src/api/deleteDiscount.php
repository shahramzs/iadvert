<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $id = $_POST['id'];

$sql = "DELETE FROM `discount` WHERE id = ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $id);
if($run->execute()){
    $response = 'delete';
}else{
    $response = 'error';
}

 }

echo json_encode($response,JSON_PRETTY_PRINT);

