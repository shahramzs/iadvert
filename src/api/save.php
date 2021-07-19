<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';


 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $user = $_GET['user'];

        $sql2 = "SELECT t1.id, t1.title, t1.name,t1.start, t1.details, t1.user, t1.token, t1.time, t2.city, t2.country, t4.cat, t7.token, t7.user, t8.user, t8.urlProfile,(SELECT view FROM view_number t6 WHERE t6.token = t1.token)view,(SELECT Count(*) FROM like_number t5 WHERE t5.token = t1.token)like_num,(SELECT count(*) FROM image t3 WHERE t3.token = t1.token)numPic,(SELECT t3.url FROM image t3 WHERE t3.token = t1.token ORDER BY t3.id DESC LIMIT 1) url FROM advertdetails t1 INNER JOIN country t2 ON t2.token = t1.token INNER JOIN category t4 ON t4.token = t1.token INNER JOIN `like_number` t7 ON t7.token = t1.token INNER JOIN profileImage t8 ON t8.user = t1.user WHERE t7.user = ? ORDER BY t1.id DESC";
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