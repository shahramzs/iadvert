<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include '../connect.php';
include '../config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['title']) && isset($_POST['user']) && isset($_POST['message'])){
    $user = security($_POST['user']);
    $title = security($_POST['title']);
    $message = security($_POST['message']);

$sql = "INSERT INTO `notification`(`title`, `user`, `message`, `seen`) VALUES (?,?,?,?)";
$run = $connect->prepare($sql);
$run->bindValue(1, $title);
$run->bindValue(2, $user);
$run->bindValue(3, $message);
$run->bindValue(4, 0);
if($run->execute()){
    $response = [$title, $user, $message]; 
 }else{
     $response = 'not ok';
 }
}
echo json_encode($response,JSON_PRETTY_PRINT);
