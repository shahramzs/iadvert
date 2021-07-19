<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include '../connect.php';
include '../config.php';

 $response['advertUser'] = array();

    $sql2 = "SELECT t1.id, t1.title, t1.name,t1.start, t1.details, t1.user, t1.token, t1.time, t2.city, t2.country, t2.token, t3.cat, t3.token , t4.region, t4.streetAddress, t4.optional, t4.state, t4.zipCode, t4.token , t5.phone, t5.email, t5.instagram, t5.twitter, t5.facebook, t5.linkedin, t5.web, t5.token , (SELECT t6.text FROM comment t6 WHERE t6.token = t1.token ORDER BY t6.id DESC LIMIT 1)commentText, (SELECT t6.name FROM comment t6 WHERE t6.token = t1.token ORDER BY t6.id DESC LIMIT 1)commentName, (SELECT t6.time FROM comment t6 WHERE t6.token = t1.token ORDER BY t6.id DESC LIMIT 1)commentTime FROM advertdetails t1 INNER JOIN country t2 ON t2.token = t1.token INNER JOIN category t3 ON t3.token = t1.token INNER JOIN location t4 ON t4.token = t1.token INNER JOIN contact t5 ON t5.token = t1.token ORDER BY t1.id DESC";
    $run2 = $connect->prepare($sql2);
    $run2->execute();
    $num = $run2->rowCount();
    $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);

    if($num != 0){
        $response['advertUser'] = $record2;
    }else{
        $response['advertUser'] = 'noData';
    }


echo json_encode($response,JSON_PRETTY_PRINT);