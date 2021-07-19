<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");


 include 'connect.php';

 $response['catNumber'] = array();

 $sql = 'SELECT count(*) ,( SELECT count(*) FROM category t1 WHERE t1.cat = ?)SB ,(SELECT count(*) FROM category t2 WHERE t2.cat = ?)IB,(SELECT count(*) FROM category t3 WHERE t3.cat = ?)INB,(SELECT count(*) FROM category t4 WHERE t4.cat = ?)HB,(SELECT count(*) FROM category t5 WHERE t5.cat = ?)NISB ,(SELECT count(*) FROM category t6 WHERE t6.cat = ?)MB  FROM category t7 WHERE t7.cat = ?';
 $run = $connect->prepare($sql);
 $run->bindValue(1,'Small Business');
 $run->bindValue(2,'Industrial Business');
 $run->bindValue(3,'Internet Business');
 $run->bindValue(4,'Home Business');
 $run->bindValue(5,'Non Internet Service Business');
 $run->bindValue(6,'Medical Business');
 $run->bindValue(7,'Medical Business');
 $run->execute();
 $num = $run->rowCount();
 $record = $run->fetchAll(PDO::FETCH_ASSOC);

 $response['catNumber'] = $record;

 echo json_encode($response,JSON_PRETTY_PRINT);