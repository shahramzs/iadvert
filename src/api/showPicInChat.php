<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include './connect.php';
include './config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['id'])){
    $id = security($_POST['id']);

    $sql = "SELECT * FROM `chat_msg` WHERE id = ? ";
    $run = $connect->prepare($sql);
    $run->bindValue(1, $id);
    $run->execute();
    $record = $run->fetchAll(PDO::FETCH_OBJ);   
    $response = $record; 

    echo json_encode($response,JSON_PRETTY_PRINT);

}

 
