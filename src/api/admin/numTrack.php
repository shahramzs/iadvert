<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include '../connect.php';
include '../config.php';


$sql = "SELECT `country`, COUNT(*) AS 'count' FROM `tracking` GROUP BY `country` limit 10";
    $run = $connect->prepare($sql);
    $run->execute();
    $record = $run->fetchAll(PDO::FETCH_ASSOC);
    $response = $record; 

    echo json_encode($response,JSON_PRETTY_PRINT);
