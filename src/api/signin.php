<?php
session_start();
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

//  if($_SERVER["HTTP_HOST"] == SITE_URL && $_SERVER["HTTP_REFERER"] == BASE_URL){
     
    if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email']) && isset($_POST['password'])){
        
        $email = security($_POST['email']);
        $password = security($_POST['password']);
            
       
        if($email == 'admin@admin.com' && $password == 'adminshahram'){
            $response = 'admin';
        }else{

        $query = 'SELECT * FROM `user` WHERE `email`= ? AND `password` = ?';
        $result = $connect->prepare($query, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
        $result->bindValue(1, $email);
        $result->bindValue(2, $password);
        $result->execute();
        $num = $result->rowCount();
        
        if ($num == 1){
            //ba in email va password record vojod darad
            session_regenerate_id();
            $_SESSION['user'] = $email;
            $response = $_SESSION['user'];
        }else{
            //ba in email va password recordi vojod nadarad
            $response = "Your Email or Password is wrong.";
        }
    }

    }else{
        //roy dokme click nashode
        //header("location:signin.php");
        exit();
    }
//  }else{
//     exit(); 

//  }


echo json_encode($response);
