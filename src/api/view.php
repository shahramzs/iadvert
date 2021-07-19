<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST'){
     $token = $_POST['token'];
     $view = 1;

     $sql = "SELECT * FROM `view_number` WHERE token = ? ";
     $run = $connect->prepare($sql);
     $run->bindValue(1, $token);
     $run->execute();
     $num = $run->rowCount();
     
     if($num == 0){
        $sql2 = "INSERT INTO `view_number`(`token`, `view`) VALUES (?, ?)";
        $run2 = $connect->prepare($sql2);
        $run2->bindValue(1, $token);
        $run2->bindValue(2, $view );
        if($run2->execute()){
            $response ="insert";
        }else{
            $response = "error";
        }

     }

     if($num == 1){
         $sql3 = "SELECT * FROM `view_number` WHERE token = ?";
         $run3 = $connect->prepare($sql3);
         $run3->bindValue(1, $token);
         $run3->execute();
         $record = $run3->fetchAll(PDO::FETCH_ASSOC);
         foreach($record as $row){

         $sql4 = "UPDATE `view_number` SET `view` = ? WHERE token = ?";
         $run4 = $connect->prepare($sql4);
        $run4->bindValue(1, $row['view'] + 1);
        $run4->bindValue(2, $token);
        if($run4->execute()){
            $response = "update";
        }else{
            $response = "error";
        }
    }
}

      
 }
echo json_encode($response,JSON_PRETTY_PRINT);