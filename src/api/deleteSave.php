<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';


 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $token = $_POST['token'];

    $sql2 = "DELETE FROM `like_number` WHERE token = ?";

    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $token);
    if($run2->execute()){
        $response = "delete";
    }else{
        $response = "error";
    }
}


echo json_encode($response,JSON_PRETTY_PRINT);