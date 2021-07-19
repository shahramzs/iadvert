<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';


 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $user = $_GET['user'];

    $sql2 = "SELECT * FROM `like_number` WHERE `user` = ?";
    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $user);
    $run2->execute();
    $num = $run2->rowCount();
    $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);
        if($num != 0){
            $response = $record2;
        }else if($num == 0){
            $response = 'notExist';
        }
    
    
  
 }


echo json_encode($response,JSON_PRETTY_PRINT);