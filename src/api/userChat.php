<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Credentials");
header("Content-Type: text/plain"); 
header( 'Content-Type: multipart/form-data');

include './connect.php';
include './config.php';

$response = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $sender = security($_POST['sender']);
    $reciever = security($_POST['reciever']);
    $token = security($_POST['token']);
    $msg = security($_POST['msg']);

    $sql = "INSERT INTO `chat_msg`(`sender`,`reciever`,`msg`,`url`, `chat_token`) VALUES (?,?,?,?,?)";
    $run = $connect->prepare($sql);
    $run->bindValue(1, $sender);
    $run->bindValue(2, $reciever);
    $run->bindValue(3, $msg);
    $run->bindValue(4, 'no img');
    $run->bindValue(5, $token);
    try{
        if($run->execute()){
            return true;
        }else{
            return false;
         }
        }catch(Exception $e){
         echo $e->getMessage();
         }

}