<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include '../connect.php';
include '../config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['token'])){
    $token = security($_POST['token']);

    $sql2 = "DELETE `advertdetails`,`category`,`contact`,`country`,`image`,`location`,`morefeatures`,`uploadcatalog`,`video` FROM 
             `advertdetails` LEFT JOIN `category` ON `advertdetails`.token = `category`.token LEFT JOIN `contact` ON `advertdetails`.token = `contact`.token 
             LEFT JOIN `country` On `advertdetails`.token = `country`.token LEFT JOIN `image` ON `advertdetails`.token = `image`.token 
             LEFT JOIN `location` ON `advertdetails`.token = `location`.token LEFT JOIN `morefeatures` ON `advertdetails`.token = `morefeatures`.token 
             LEFT JOIN `uploadcatalog` ON `advertdetails`.token = `uploadcatalog`.token LEFT JOIN `video` ON `advertdetails`.token = `video`.token 
             WHERE `advertdetails`.token = ?";

    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $token);
    if($run2->execute()){
        $response = "delete";
    }else{
        $response = "error";
    }
}


echo json_encode($response,JSON_PRETTY_PRINT);