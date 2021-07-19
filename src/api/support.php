<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
include 'config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $user = security($_POST['email']);
    $feedback = security($_POST['feedback']);

        $sql2 = "INSERT INTO `support`( `user`, `text`) VALUES (?,?)";
        $run2 = $connect->prepare($sql2);
        $run2->bindValue(1, $user);
        $run2->bindValue(2, $feedback);
        if($run2->execute()){
            $response = 'ok';
        }else{
            $response = 'error';
        }
        
 }

echo json_encode($response,JSON_PRETTY_PRINT);