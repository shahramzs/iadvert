<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

 include 'connect.php';
 include 'config.php';

 $response = array();

if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['country']) && isset($_POST['city']) && isset($_POST['cat']) && isset($_POST['user']) && isset($_POST['token'])){
    $country = security($_POST['country']);
    $city = security($_POST['city']);
    $cat = security($_POST['cat']);
    $user = security($_POST['user']);
    $token = security($_POST['token']);

    $query = 'SELECT * FROM `country` WHERE `user`=? AND `token`= ?';
    $start = $connect->prepare($query);
    $start->bindValue(1, $user);
    $start->bindValue(2, $token);
    $start->execute();
    $num = $start->rowCount();
    if($num != 0){
            $sql = 'UPDATE `country` SET `country`= ?,`city`= ?,`user`= ?,`token`= ? WHERE `user`= ? AND `token`= ?';
            $run = $connect->prepare($sql);
            $run->bindValue(1, $country);
            $run->bindValue(2, $city);
            $run->bindValue(3, $user);
            $run->bindValue(4, $token);
            $run->bindValue(5, $user);
            $run->bindValue(6, $token);
            if($run->execute()){
                $response = "You Registered Successfully";
                }else{
                $response = "You Could not Register Successfully.";
                }
    }else{
        $sql = 'INSERT INTO `country`(`country`, `city`, `user`, `token`) VALUES (?,?,?,?)';
            $run = $connect->prepare($sql);
            $run->bindValue(1, $country);
            $run->bindValue(2, $city);
            $run->bindValue(3, $user);
            $run->bindValue(4, $token);
            if($run->execute()){
                $response = "You Registered Successfully";
            }else{
                $response = "You Could not Register Successfully.";
            }
    }

    $query2 = 'SELECT * FROM `category` WHERE `user`= ? AND `token`= ?';
    $start2 = $connect->prepare($query2);
    $start2->bindValue(1, $user);
    $start2->bindValue(2, $token);
    $start2->execute();
    $num2 = $start2->rowCount();
    if($num2 != 0){
            $sql2 = 'UPDATE `category` SET `cat`= ?,`user`= ?,`token`= ? WHERE `user`= ? AND `token`= ?';
            $run2 = $connect->prepare($sql2);
            $run2->bindValue(1, $cat);
            $run2->bindValue(2, $user);
            $run2->bindValue(3, $token);
            $run2->bindValue(4, $user);
            $run2->bindValue(5, $token);
            if($run2->execute()){
                $response2 = "You Registered Successfully";
                }else{
                $response2 = "You Could not Register Successfully.";
                }
    }else{
        $sql3 = 'INSERT INTO `category`(`cat`, `user`, `token`) VALUES (?,?,?)';
        $run3 = $connect->prepare($sql3);
        $run3->bindValue(1, $cat);
        $run3->bindValue(2, $user);
        $run3->bindValue(3, $token);
        if($run3->execute()){
            $response3 = "You Registered Successfully";
        }else{
            $response3 = "You Could not Register Successfully.";
        }

    }

}

echo json_encode($response);
