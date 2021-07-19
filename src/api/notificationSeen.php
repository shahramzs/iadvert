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

        $sql2 = "SELECT * FROM `notification` WHERE user = ? AND seen = ? ORDER BY id DESC";
        $run2 = $connect->prepare($sql2);
        $run2->bindValue(1, $user);
        $run2->bindValue(2, 0);
        $run2->execute();
        $num = $run2->rowCount();

        if($num != 0){
            $response = $num; 
        }
        
    echo json_encode($response,JSON_PRETTY_PRINT);

    
}

 
