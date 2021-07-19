<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include './connect.php';
 include './config.php';


 $response = array();


    $sql = "SELECT `name`,`title` FROM `advertdetails` ORDER BY `id`";
    $run = $connect->prepare($sql);
    $run->execute();
    $num = $run->rowCount();
    $record = $run->fetchAll(PDO::FETCH_ASSOC);

    if($num != 0){
        $response = $record; 
    }else{
        $response = 'noName'; 
    }


echo json_encode($response,JSON_PRETTY_PRINT);