<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Credentials");
header("Content-Type: text/plain"); 
header( 'Content-Type: multipart/form-data');

include './connect.php';
include './config.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $user = security($_POST['user']);

    $sql = "SELECT * FROM `chat_msg` WHERE reciever = ? ";
    $run = $connect->prepare($sql);
    $run->bindValue(1, $user);
    $run->execute();
    $record = $run->fetchAll(PDO::FETCH_ASSOC);
    foreach($record as $row){
        if($row['seen'] == 0){
            $response = 'seen';
        }else{
            $response = "no seen";
        }
    }

}

echo json_encode($response,JSON_PRETTY_PRINT);