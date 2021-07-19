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

if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['user']) && isset($_POST['token']) && isset($_POST['discountCode'])){
    $user = $_POST['user'];
    $token = $_POST['token'];
    $discountCode = $_POST['discountCode'];

$sql = "SELECT * FROM `like_discount` WHERE user = ? AND token = ? AND discountCode = ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $user);
$run->bindValue(2, $token);
$run->bindValue(3, $discountCode);
$run->execute();
$num = $run->rowCount();
if($num === 0){
    $sql2 = "INSERT INTO `like_discount`(`user`,`token`,`discountCode`) VALUES (?,?,?)";
    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $user);
    $run2->bindValue(2, $token);
    $run2->bindValue(3, $discountCode);
    if($run2->execute()){
        $response = 'insert';  
    }else{
        $response = 'error1';  
    }
}else if($num !== 0){
$sql3 = "DELETE FROM `like_discount` WHERE user = ? AND token = ? AND discountCode = ?";
$run3 = $connect->prepare($sql3);
$run3->bindValue(1, $user);
$run3->bindValue(2, $token);
$run3->bindValue(3, $discountCode);
if($run3->execute()){
    $response = 'delete';  
}else{
    $response = 'error2';  
}

}


}

echo json_encode($response);
   