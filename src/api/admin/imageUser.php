<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include '../connect.php';
 include '../config.php';


 $response = array();
    

$sql = "SELECT t1.urlProfile, t1.user, t2.email FROM `profileimage` t1 INNER JOIN `user` t2  ON t1.user = t2.email";
$run = $connect->prepare($sql);
$run->execute();
$record = $run->fetchAll(PDO::FETCH_ASSOC);

$response = $record;
 

echo json_encode($response,JSON_PRETTY_PRINT);