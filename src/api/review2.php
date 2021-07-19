<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';


 $response['review'] = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $token = $_GET['token'];

 $sql = "SELECT t1.name, t1.text, t1.token, t1.time, t2.user, t2.urlProfile,(SELECT count(*) FROM comment WHERE token = t1.token)num FROM comment t1 LEFT JOIN profileimage t2 ON t2.user = t1.user WHERE t1.token = ? ORDER BY t1.id  DESC";
 $run = $connect->prepare($sql);
 $run->bindValue(1, $token);
 $run->execute();
 $num = $run->rowCount();
 $record = $run->fetchAll(PDO::FETCH_ASSOC);

 
   $response['review'] = $record;

 }
 echo json_encode($response,JSON_PRETTY_PRINT);