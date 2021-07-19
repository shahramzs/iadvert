<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");


 include 'connect.php';
 include 'config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $name = security($_POST['name']);
    $text = security($_POST['text']);
    $token = security($_POST['token']);
    $user = security($_POST['user']);

    $sql = "INSERT INTO `comment`(`text`, `token`, `name`, `user`) VALUES (?,?,?,?)";
    $run = $connect->prepare($sql);
    $run->bindValue(1, $text);
    $run->bindValue(2, $token);
    $run->bindValue(3, $name);
    $run->bindValue(4, $user);
    if($run->execute()){
        $response = "You Registered Successfully";
    }else{
        $response = "error";  
    }
 }
 echo json_encode($response);
 