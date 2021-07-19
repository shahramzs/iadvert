<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include '../connect.php';


 $response['moreInfoAdvert'] = array();

    $sql2 = "SELECT t1.user, t1.token, t2.token, t2.user, t2.text FROM advertdetails t1 INNER JOIN more_explain t2 ON t1.token = t2.token AND t1.user = t2.user  ORDER BY t1.id DESC";
    $run2 = $connect->prepare($sql2);
    $run2->execute();
    $num = $run2->rowCount();
    $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);


    if($num != 0){
        $response['moreInfoAdvert'] = $record2; 
    }



echo json_encode($response,JSON_PRETTY_PRINT);

