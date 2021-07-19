<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';


 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $user = $_POST['user'];
    $token = $_POST['token'];
    $extraText = $_POST['extraText'];

$sql = "INSERT INTO `more_explain`(`text`, `user`, `token`) VALUES (?,?,?)";
$run = $connect->prepare($sql);
$run->bindValue(1, $extraText);
$run->bindValue(2, $user);
$run->bindValue(3, $token);
if($run->execute()){
    $response = 'insert'; 
 }else{
     $response = 'error';
 }
}
echo json_encode($response,JSON_PRETTY_PRINT);
