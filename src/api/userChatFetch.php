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

        $sql = "SELECT t1.sender, t1.reciever,t1.chat_token, t1.time, t2.urlProfile, t2.user FROM `userchat` t1 LEFT JOIN `profileimage` t2 ON t1.reciever = t2.user WHERE t1.sender = ?";
        $run = $connect->prepare($sql);
        $run->bindValue(1, $user);
        $run->execute();
        $num = $run->rowCount();
        $record = $run->fetchAll(PDO::FETCH_ASSOC);

        if($num != 0){
            $response = $record; 
        }else{
            $response = $user; 
        }
        
    echo json_encode($response,JSON_PRETTY_PRINT);

    
}

 
