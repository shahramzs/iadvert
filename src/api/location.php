<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");


 include 'connect.php';
 include 'config.php';

 $response = array();

if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['user']) && isset($_POST['region']) && isset($_POST['streetAddress']) && isset($_POST['optional']) && isset($_POST['city']) && isset($_POST['state']) && isset($_POST['zipCode']) && isset($_POST['lat']) && isset($_POST['lng']) && isset($_POST['token']) ){
    $user = security($_POST['user']);
    $region = security($_POST['region']);
    $streetAddress = security($_POST['streetAddress']);
    $optional = security($_POST['optional']);
    $city = security($_POST['city']);
    $state = security($_POST['state']);
    $zipCode = security($_POST['zipCode']);
    $lat = security($_POST['lat']);
    $lng = security($_POST['lng']);
    $token = security($_POST['token']);

    $query = 'SELECT * FROM `location` WHERE `user`= ? AND `token` = ?';
    $start = $connect->prepare($query);
    $start->bindValue(1, $user);
    $start ->bindValue(2, $token);
    $start->execute();
    $num = $start->rowCount();
    if($num != 0 ){
            $sql2 = 'UPDATE `location` SET `user`= ?,`region`= ?,`streetAddress`= ?,`optional`= ?,`city`= ?,`state`=?,`zipCode`=?,`lat`=?,`lng`=?,`token`=?  WHERE `user`= ? AND `token`=?';
            $run2 = $connect->prepare($sql2);
            $run2->bindValue(1, $user);
            $run2->bindValue(2, $region);
            $run2->bindValue(3, $streetAddress);
            $run2->bindValue(4, $optional);
            $run2->bindValue(5, $city);
            $run2->bindValue(6, $state);
            $run2->bindValue(7, $zipCode);
            $run2->bindValue(8, $lat);
            $run2->bindValue(9, $lng);
            $run2->bindValue(10,$token);
            $run2->bindValue(11,$user);
            $run2->bindValue(12,$token);
        if($run2->execute()){
            $response = "ok";
        }else{
            $response = "not ok";
        }
    }else{
        $sql = 'INSERT INTO `location`( `user`, `region`, `streetAddress`, `optional`, `city`, `state`, `zipCode`, `lat`, `lng`, `token`) VALUES (?,?,?,?,?,?,?,?,?,?)';
        $run = $connect->prepare($sql);
        $run->bindValue(1, $user);
        $run->bindValue(2, $region);
        $run->bindValue(3, $streetAddress);
        $run->bindValue(4, $optional);
        $run->bindValue(5, $city);
        $run->bindValue(6, $state);
        $run->bindValue(7, $zipCode);
        $run->bindValue(8, $lat);
        $run->bindValue(9, $lng);
        $run->bindValue(10,$token);
    
        if($run->execute()){
            $response = "ok";
        }else{
            $response = "not ok";
        }
    }
  
}
echo json_encode($response);