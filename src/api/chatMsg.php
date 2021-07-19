<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
include 'config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['token']) && isset($_GET['sender'])){
    $token = security($_GET['token']);
    $sender = security($_GET['sender']);

    $sql = "SELECT reciever FROM `userchat` WHERE sender = ? AND chat_token = ?";
    $run = $connect->prepare($sql);
    $run->bindValue(1, $sender);
    $run->bindValue(2, $token);
    $run->execute();
    $num = $run->rowCount();
    $record = $run->fetchAll(PDO::FETCH_OBJ);

    $sql2 = "SELECT * FROM `chat_msg` WHERE  chat_token = ? ORDER BY id ";
        $run2 = $connect->prepare($sql2);
        $run2->bindValue(1, $token);
        $run2->execute();
        $num2 = $run2->rowCount();
        $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);

        if($num2 != 0){
            $response = $record2; 
        }else{
            $response = 'no chat'; 
        }
        
    echo json_encode($response,JSON_PRETTY_PRINT);

    
}

 
