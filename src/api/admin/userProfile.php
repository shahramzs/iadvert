<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include '../connect.php';
 include '../config.php';

 $response = array();

$sql = "SELECT  t1.urlProfile, t1.user, t2.id, t2.email, t2.password, t2.block, t2.hash, t2.time, t2.mobile, t2.fullname FROM `profileimage` t1 RIGHT JOIN `user` t2 ON t1.user = t2.email";
$run = $connect->prepare($sql);
$run->execute();
$num = $run->rowCount();
$record = $run->fetchAll(PDO::FETCH_ASSOC);

$response = $record; 
 

echo json_encode($response,JSON_PRETTY_PRINT);