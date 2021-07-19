<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");


 include 'connect.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST'){
 $user = $_POST['user'];

 $sql = 'SELECT * FROM `user` WHERE `email` = ? AND `block` = 1';
 $run = $connect->prepare($sql);
 $run->bindValue(1, $user);
 $run->execute();
 $num = $run->rowCount();
 if($num == 1){
     $response = "ok";
 }else{
     $response = "not ok";
 }
 
}    
echo json_encode($response);
