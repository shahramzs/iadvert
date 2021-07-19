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

        $sql2 = "UPDATE `notification` SET `seen`= ? WHERE `user` = ?";
        $run2 = $connect->prepare($sql2);
        $run2->bindValue(1, 1);
        $run2->bindValue(2, $user);
        $run2->execute();
        $num = $run2->rowCount();

        if($num != 0){
            $response = $num; 
        }else{
            $response = 'noAdvert'; 
        }
        
    echo json_encode($response,JSON_PRETTY_PRINT);

    
}

 
