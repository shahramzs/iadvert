<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
include 'config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['sender']) && isset($_POST['reciever']) && isset($_POST['chatToken'])){
    $sender = security($_POST['sender']);
    $reciever = security($_POST['reciever']);
    $chatToken = security($_POST['chatToken']);


        $sql = "SELECT * FROM `userchat` WHERE sender = ? AND reciever = ?";
        $run = $connect->prepare($sql);
        $run->bindValue(1,$sender);
        $run->bindValue(2,$reciever);
        $run->execute();
        $num = $run->rowCount();
        if($num == 1){
           //
        }else{
            $sql2 = "SELECT * FROM `userchat` WHERE sender = ? AND reciever = ?";
            $run2 = $connect->prepare($sql2);
            $run2->bindValue(1,$reciever);
            $run2->bindValue(2,$sender);
            $run2->execute();
            $num2 = $run2->rowCount();
            if($num2 == 1){
                $sql3 = "SELECT * FROM `userchat` WHERE sender = ? AND reciever = ?";
                $run3 = $connect->prepare($sql3);
                $run3->bindValue(1,$reciever);
                $run3->bindValue(2,$sender);
                $run3->execute();
                $record3 = $run3->fetchAll(PDO::FETCH_ASSOC);
                foreach($record3 as $row3){
                    $sql4 = "INSERT INTO `userchat`(`sender`, `reciever`, `chat_token`) VALUES (?,?,?)";
                    $run4 = $connect->prepare($sql4);
                    $run4->bindValue(1, $sender);
                    $run4->bindValue(2, $reciever);
                    $run4->bindValue(3, $row3['chat_token']);
                    if($run4->execute()){
                        $response = "ok";
                    }else{
                        $response = "error";
                    }
                }

            }else{
                $sql5 = "INSERT INTO `userchat`(`sender`, `reciever`, `chat_token`) VALUES (?,?,?)";
                $run5 = $connect->prepare($sql5);
                $run5->bindValue(1, $sender);
                $run5->bindValue(2, $reciever);
                $run5->bindValue(3, $chatToken);
                if($run5->execute()){
                    $response = "ok";
                }else{
                    $response = "error";
                }

                $sql5 = "INSERT INTO `userchat`(`sender`, `reciever`, `chat_token`) VALUES (?,?,?)";
                $run5 = $connect->prepare($sql5);
                $run5->bindValue(1, $reciever);
                $run5->bindValue(2, $sender);
                $run5->bindValue(3, $chatToken);
                if($run5->execute()){
                    $response = "ok";
                }else{
                    $response = "error";
                }

            }

}   
    echo json_encode($response,JSON_PRETTY_PRINT);

    
}

 
