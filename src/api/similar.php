<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';


 $response['similar'] = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $token = $_GET['token'];

$sql = "SELECT * FROM `category` WHERE token = ? ";
$run= $connect->prepare($sql);
$run->bindValue(1, $token);
$run->execute();
$record = $run->fetchAll(PDO::FETCH_ASSOC);

foreach($record as $row){

    $sql2 = "SELECT t1.title, t1.name, t1.token, t2.city, t2.country, t4.cat,(SELECT t3.url FROM image t3 WHERE t3.token = t1.token ORDER BY t3.id DESC LIMIT 1) url FROM advertdetails t1 INNER JOIN country t2 ON t2.token = t1.token INNER JOIN category t4 ON t4.token = t1.token WHERE t4.cat = ? AND t1.token != ? ORDER BY t1.id DESC limit 0 , 8 ";
    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $row['cat']);
    $run2->bindValue(2, $token);
    $run2->execute();
    $num = $run2->rowCount();
    $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);

} 

    $response['similar'] = $record2 ;

 } 
echo json_encode($response,JSON_PRETTY_PRINT);
   