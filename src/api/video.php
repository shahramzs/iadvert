<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET'){
     $token = $_GET['token'];

     $sql = "SELECT * FROM video WHERE token = ? ORDER BY id ASC ";
     $run = $connect->prepare($sql);
     $run->bindValue(1, $token);
     $run->execute();
     $picNum = $run->rowCount();
     $record = $run->fetchAll(PDO::FETCH_ASSOC);


     $response = $record;  
 }
echo json_encode($response,JSON_PRETTY_PRINT);