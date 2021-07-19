<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';


 $response['imgProfile'] = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $token = $_GET['token'];

    $sql = "SELECT * FROM `advertdetails` WHERE token = ?";
    $run = $connect->prepare($sql);
    $run->bindValue(1, $token);
    $run->execute();
    $num = $run->rowCount();
    $record = $run->fetchAll(PDO::FETCH_ASSOC);

    foreach($record as $row){
        $sql2 = "SELECT * FROM `profileimage` WHERE user = ?";
        $run2 = $connect->prepare($sql2);
        $run2->bindValue(1, $row['user']);
        $run2->execute();
        $num = $run2->rowCount();
        $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);

        if($num != 0){
            $response['imgProfile'] = $record2;
        }
    }

 
 }

echo json_encode($response,JSON_PRETTY_PRINT);