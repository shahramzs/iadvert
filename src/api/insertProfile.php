<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';


 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['user']) && isset($_POST['password']) && isset($_POST['mobile']) && isset($_POST['fullname'])){
    $user = $_POST['user'];
    $password = $_POST['password'];
    $mobile = $_POST['mobile'];
    $fullname = $_POST['fullname'];

$sql = "UPDATE `user` SET `fullname`=?,`mobile`=?,`password`=? WHERE `email`= ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $fullname);
$run->bindValue(2, $mobile);
$run->bindValue(3, $password);
$run->bindValue(4, $user);
if($run->execute()){
    $response = 'insert';
}else{
    $response = 'noInsert'; 
}

 }

echo json_encode($response,JSON_PRETTY_PRINT);