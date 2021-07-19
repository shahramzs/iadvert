<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include '../connect.php';
include '../config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['id'])){
    $id = security($_POST['id']);

    $sql2 = "UPDATE `user` SET  block = 1  WHERE id = ?";

    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $id);
    if($run2->execute()){
        $response = "update";
    }else{
        $response = "error";
    }
}


echo json_encode($response,JSON_PRETTY_PRINT);