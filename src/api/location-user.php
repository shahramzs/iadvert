<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
include 'config.php';

 $response['locationUser'] = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['user'])){
    $user = security($_GET['user']);


    $sql2 = "SELECT lat , lng, city, streetAddress from location WHERE user = ? ORDER BY id DESC";
    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $user);
    $run2->execute();
    $num = $run2->rowCount();
    $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);

    if($num != 0){
        $response['locationUser'] = $record2;
    }
}

 

echo json_encode($response,JSON_PRETTY_PRINT);