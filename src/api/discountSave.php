<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
 include 'config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['user'])){
    $user = security($_GET['user']);

        $sql2 = "SELECT t1.user, t1.token, t1.discountCode, t2.user, t2.token, t2.discountCode, t2.price, t2.title, t2.start, t2.expire, t2.url, t2.text, t2.time, t3.urlProfile, t3.user FROM  `like_discount` t1 INNER JOIN `discount` t2 ON t1.token = t2.token AND t1.discountCode = t2.discountCode INNER JOIN profileImage t3 ON t2.user = t3.user WHERE t1.token = t2.token AND t1.user = ? ";
        $run2 = $connect->prepare($sql2);
        $run2->bindValue(1, $user);
        $run2->execute();
        $num = $run2->rowCount();
        $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);

        if($num != 0){
            $response = $record2;
        }
    

 }

echo json_encode($response,JSON_PRETTY_PRINT);