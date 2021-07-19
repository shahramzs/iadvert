<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include './connect.php';
include './config.php';
 $response = array();

//  if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['user'])){
     $user = security($_GET['user']);

     //$sql = "SELECT t1.user  FROM `online` t1 INNER JOIN `userchat` t2 ON t1.user = t2.reciever WHERE t2.sender = ? ";
     $sql = "SELECT user FROM `online`";
     $run = $connect->prepare($sql);
   //   $run->bindValue(1, $user);
     $run->execute();
     $num = $run->rowCount();
     $record = $run->fetchAll(PDO::FETCH_ASSOC);
     if($num != 0){
        $response = $record;
     }else{
        $response = 'no user are online';
     }
//  }
echo json_encode($response,JSON_PRETTY_PRINT);