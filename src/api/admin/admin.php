<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include '../connect.php';
include '../config.php';

 $response = array();

    $sql2 = "SELECT t1.id, t1.title, t1.name,t1.start, t1.details, t1.user, t1.token, t1.time, t2.city, t2.country, t4.cat ,(SELECT view FROM view_number t6 WHERE t6.token = t1.token)view,(SELECT Count(*) FROM like_number t5 WHERE t5.token = t1.token)like_num,(SELECT count(*) FROM image t3 WHERE t3.token = t1.token)numPic,(SELECT t3.url FROM image t3 WHERE t3.token = t1.token ORDER BY t3.id DESC LIMIT 1) url FROM advertdetails t1 INNER JOIN country t2 ON t2.token = t1.token INNER JOIN category t4 ON t4.token = t1.token ORDER BY t1.id DESC";
    $run2 = $connect->prepare($sql2);
    $run2->execute();
    $num = $run2->rowCount();
    $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);

        if($num != 0){
            $response = $record2; 
        }else{
            $response = 'noAdvert'; 
        }
        
    echo json_encode($response,JSON_PRETTY_PRINT);

    


 
