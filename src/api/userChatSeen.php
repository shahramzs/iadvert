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
    $user = security($_POST['user']);
    $token = security($_POST['token']);

    $sql2 = "SELECT * FROM `chat_msg` WHERE reciever = ? AND chat_token = ?";
    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $user);
    $run2->bindValue(2, $token);
    $run2->execute();
    $num2 = $run2->rowCount();
    $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);
    foreach($record2 as $row2){
        if($row2['seen'] == 0){
            $sql = "UPDATE `chat_msg` SET `seen`= ? WHERE `reciever` = ? AND chat_token = ?";
            $run = $connect->prepare($sql);
            $run->bindValue(1, '1');
            $run->bindValue(2, $user);
            $run->bindValue(3, $token);
            try{
                if($run->execute()){
                    return true;
                }else{
                    return false;
                 }
                }catch(Exception $e){
                 echo $e->getMessage();
                 }
        }else{
            //
        }
    }


}