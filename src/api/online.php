<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
include 'config.php';
 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['user'])){
     $user = $_POST['user'];

     $sql = "SELECT * FROM `online` WHERE user = ? ";
     $run = $connect->prepare($sql);
     $run->bindValue(1, $user);
     $run->execute();
     $num = $run->rowCount();
     $record = $run->fetchAll(PDO::FETCH_ASSOC);
     if($num == 0){
         $sql2 = "INSERT INTO `online`(`user`) VALUES (?)";
         $run2 = $connect->prepare($sql2);
        $run2->bindValue(1, $user);
        if($run2->execute()){
            $response ='insert';
        }else{
            $response = 'no insert';
        }
     }else{
        $sql3 = "UPDATE `online` SET `user`= ? WHERE user = ?";
        $run3 = $connect->prepare($sql3);
        $run3->bindValue(1, $user);
        $run3->bindValue(2, $user);
        if($run3->execute()){
            $response = 'update';
        }else{
            $response = 'no update';
        }
     }
    

     $response = $record;  
 }
echo json_encode($response,JSON_PRETTY_PRINT);