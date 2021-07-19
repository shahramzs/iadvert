<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");


 include 'connect.php';
include 'config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['user']) && isset($_POST['country']) && isset($_POST['code']) && isset($_POST['mobile'])){
    $user = security($_POST['user']);
    $country = security($_POST['country']);
    $code = security($_POST['code']);
    $mobile = security($_POST['mobile']);

    $sql = 'SELECT * FROM `block` WHERE `user` = ?';
    $run = $connect->prepare($sql);
    $run->bindValue(1, $user);
    $run->execute();
    $num = $run->rowCount();
    if($num != 0){
        $query = 'UPDATE `block` SET `country`= ?,`mobile`= ?,`user`= ?,`code`= ? WHERE `user`= ?';
        $del = $connect->prepare($query);
        $del->bindValue(1, $country);
        $del->bindValue(2, $mobile);
        $del->bindValue(3, $user);
        $del->bindValue(4, $code);
        $del->bindValue(5, $user);
        if($del->execute()){
            $response = "ok";
        }else{
            $response="not ok";
        }
    }else{
        $sql2 = 'INSERT INTO `block`( `country`, `mobile`, `user`, `code`) VALUES (?,?,?,?)';
        $insert = $connect->prepare($sql2);
        $insert->bindValue(1,$country);
        $insert->bindValue(2,$mobile);
        $insert->bindValue(3,$user);
        $insert->bindValue(4,$code);
        if($insert->execute()){
            $response= "ok";
        }else{
            $response="not ok";
        }
    }
 
 }   
echo json_encode($response);
