<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
session_start();

 include 'connect.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST'){
 $code = $_POST['code'];
 $user = $_POST['user'];
 
 $sql = 'SELECT * FROM `block` WHERE `user`= ?';
 $run = $connect->prepare($sql);
 $run->bindValue(1, $user);
 $run->execute();
 $num = $run->rowCount();
 if($num != 0){
     $data= $run->fetch(PDO::FETCH_OBJ);
     $number = $data->code;

     if($number == $code){
         $query = 'UPDATE `user` SET  `block`= 0 WHERE `email` = ?'; 
         $start = $connect->prepare($query);
         $start->bindValue(1,$user);
         if($start->execute()){
            $sql2 = 'DELETE FROM `block` WHERE `user`= ?';
            $run2 = $connect->prepare($sql2);
            $run2->bindValue(1, $user);
            if($run2->execute()){
                $response = "ok";
            }
             
         }else{
             $response = "not ok";
         }

     }else{
         $response="not ok";
     }
 }

}
echo json_encode($response);