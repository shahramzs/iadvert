<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include '../connect.php';
include '../config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['discountCode'])){
    $discountCode = security($_POST['discountCode']);

    $sql2 = "DELETE FROM `discount` WHERE discountCode = ?";
    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $discountCode);
    if($run2->execute()){
        $response = "delete";
    }else{
        $response = "error";
    }
}


echo json_encode($response,JSON_PRETTY_PRINT);