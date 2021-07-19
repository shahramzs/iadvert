<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
include 'config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['user']) && isset($_GET['token'])){
    $user = security($_GET['user']);
    $token = security($_GET['token']);

        $sql2 = "SELECT t1.urlProfile, t1.user, t2.sender, t2.reciever FROM `userchat` t2 INNER JOIN `profileimage` t1 ON t1.user = t2.reciever WHERE t2.chat_token = ? AND t2.sender = ?";
        $run2 = $connect->prepare($sql2);
        $run2->bindValue(1, $token);
        $run2->bindValue(2, $user);
        $run2->execute();
        $num = $run2->rowCount();
        $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);

        if($num != 0){
            $response = $record2; 
        }else{
            $response = $user; 
        }
        
    echo json_encode($response,JSON_PRETTY_PRINT);

    
}

 
