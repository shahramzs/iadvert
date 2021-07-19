<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
  include 'config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['token'])){
    $token = security($_GET['token']);

        $sql2 = "SELECT t1.user, t1.price, t1.text, t1.url, t1.token, t1.title, t1.start, t1.expire, t1.discountCode, t1.time, t2.user, t2.urlProfile FROM `discount` t1 INNER JOIN profileImage t2 ON t1.user = t2.user WHERE t1.token = ? ";
        $run2 = $connect->prepare($sql2);
        $run2->bindValue(1, $token);
        $run2->execute();
        $num = $run2->rowCount();
        $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);

        if($num != 0){
            $response = $record2; 
        }else{
            $response = 'noAdvert'; 
        }
        
    echo json_encode($response,JSON_PRETTY_PRINT);

    
}

 
