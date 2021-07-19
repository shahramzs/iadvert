<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");


 include 'connect.php';

 $response = array();
 if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $user = $_POST['user'];
    
    $sql = 'UPDATE `user` SET `block`= 1 WHERE `email` = ?';
    $run = $connect->prepare($sql);
    $run->bindValue(1, $user);
    if($run->execute()){
        $response = 'ok';
    }else{
        $response = 'not ok';
    }


 }
 echo json_encode($response);