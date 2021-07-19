<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
 include 'config.php';


 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['user'])){
    $user = security($_GET['user']);
    

$sql = "SELECT urlProfile FROM `profileimage` WHERE user = ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $user);
$run->execute();
$record = $run->fetchAll(PDO::FETCH_ASSOC);

$response = $record;
 }

echo json_encode($response,JSON_PRETTY_PRINT);