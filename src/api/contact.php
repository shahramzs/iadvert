<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");


 include 'connect.php';
 include 'config.php';

 $response = array();

if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['user']) && isset($_POST['phone']) && isset($_POST['email']) && isset($_POST['instagram']) && isset($_POST['linkedin']) && isset($_POST['facebook']) && isset($_POST['twitter']) && isset($_POST['web']) && isset($_POST['token'])){
    $user = security($_POST['user']);
    $phone = security($_POST['phone']);
    $email = security($_POST['email']);
    $instagram = security($_POST['instagram']);
    $linkedin = security($_POST['linkedin']);
    $facebook = security($_POST['facebook']);
    $twitter = security($_POST['twitter']);
    $web =security($_POST['web']);
    $token = security($_POST['token']);

    $query = 'SELECT * FROM `contact` WHERE `user`= ? AND `token` = ?';
    $start = $connect->prepare($query);
    $start->bindValue(1, $user);
    $start->bindValue(2, $token);
    $start->execute();
    $num = $start->rowCount();
    if($num != 0){
            $sql2 = 'UPDATE `contact` SET `user`= ?,`phone`= ?,`email`= ?,`instagram`= ?,`linkedin`= ?,`facebook` = ?, `twitter` = ?,`web`= ?,`token`= ? WHERE `user`= ? AND `token`= ?';
            $run2 = $connect->prepare($sql2);
            $run2->bindValue(1, $user);
            $run2->bindValue(2, $phone);
            $run2->bindValue(3, $email);
            $run2->bindValue(4, $instagram);
            $run2->bindValue(5, $linkedin);
            $run2->bindValue(6, $facebook);
            $run2->bindValue(7, $twitter);
            $run2->bindValue(8, $web);
            $run2->bindValue(9, $token);
            $run2->bindValue(10, $user);
            $run2->bindValue(11, $token);
            if($run2->execute()){
                $response = "ok";
            }else{
                $response = "not ok";
            }
    }else{
    $sql = 'INSERT INTO `contact`( `user`, `phone`, `email`, `instagram`, `linkedin`, `facebook` ,`twitter` ,`web`, `token`) VALUES (?,?,?,?,?,?,?,?,?)';
    $run = $connect->prepare($sql);
    $run->bindValue(1, $user);
    $run->bindValue(2, $phone);
    $run->bindValue(3, $email);
    $run->bindValue(4, $instagram);
    $run->bindValue(5, $linkedin);
    $run->bindValue(6, $facebook);
    $run->bindValue(7, $twitter);
    $run->bindValue(8, $web);
    $run->bindValue(9, $token);
    
    if($run->execute()){
        $response = "ok";
    }else{
        $response = "not ok";
    }
    }

    
    
}
echo json_encode($response);

