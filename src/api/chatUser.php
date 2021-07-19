<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
include 'config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['token'])){
    $token = security($_GET['token']);

        $sql2 = "SELECT `user` FROM `advertdetails` WHERE token = ?";
        $run2 = $connect->prepare($sql2);
        $run2->bindValue(1, $token);
        $run2->execute();
        $num = $run2->rowCount();
        $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);
        $response = $record2;
        
    echo json_encode($response,JSON_PRETTY_PRINT);

    
}

 
