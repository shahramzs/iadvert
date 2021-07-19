<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include '../connect.php';
include '../config.php';

 $response['advertUserComment'] = array();

        $sql2 = "SELECT t1.user, t1.token, t2.token, t2.text, t2.name, t2.time FROM advertdetails t1 INNER JOIN comment t2 ON t1.token = t2.token ORDER BY t1.id DESC";
        $run2 = $connect->prepare($sql2);
        $run2->execute();
        $num = $run2->rowCount();
        $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);
    
    if($num != 0){
        $response['advertUserComment'] = $record2; 
    
}

echo json_encode($response,JSON_PRETTY_PRINT);