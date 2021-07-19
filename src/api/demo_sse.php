<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header("Access-Control-Allow-Methods: PUT, GET, POST, OPTIONS");
header("Access-Control-Allow-Credentials");
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Headers: *');


include './connect.php';
include './config.php';

$response = array();

    $user = security($_GET['user']);

    $sql = "SELECT * FROM `chat_msg` WHERE reciever = ? ";
    $run = $connect->prepare($sql);
    $run->bindValue(1, $user);
    $run->execute();
    $record = $run->fetchAll(PDO::FETCH_ASSOC);
    foreach($record as $row){
        if($row['seen'] == 0){
            $response = 'seen';
            echo "data:{$response}\n\n";
            flush();
        }else{
            $response = "no seen";
            echo "data:{$response}\n\n";
            flush();
        }
    }

?>