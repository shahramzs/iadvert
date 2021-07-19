<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Credentials");
header("Content-Type: text/plain"); 


 include 'connect.php';
 include 'config.php';

$response = array();


if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['fullName']) && isset($_POST['email']) && isset($_POST['mobileNumber']) && isset($_POST['password']) ){
    $fullName = security($_POST['fullName']);
    $email = security($_POST['email']);
    $mobileNumber = security($_POST['mobileNumber']);
    $password = security($_POST['password']);
    $hash = hash('sha256', microtime());

    $sql = 'SELECT * FROM `user` WHERE `email`= ?';
    $run = $connect->prepare($sql);
    $run->bindValue(1, $email);
    $run->execute();
    $num = $run->rowCount();
    if($num == 0){
        $query = 'INSERT INTO `user`(`fullname`, `email`, `hash`, `mobile`, `password`, `block`) VALUES (?, ?, ?, ?, ?, ?)';
        $result = $connect->prepare($query, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
        $result->bindValue(1, $fullName);
        $result->bindValue(2, $email);
        $result->bindValue(3, $hash);
        $result->bindValue(4, $mobileNumber);
        $result->bindValue(5, $password);
        $result->bindValue(6, 0);
            if($result->execute()){
            $response = "You Registered Successfully";
        }else{
            $response = "You Could not Register Successfully. Please Try Again";
        }

    }else{
        $response = "You have an account, Please sign in.";
    }
}
echo json_encode($response);
