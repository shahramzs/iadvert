<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include '../connect.php';
include '../config.php';
require ('../PHPMailer/class.phpmailer.php');
require ('../PHPMailer/class.smtp.php');

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['title']) && isset($_POST['user']) && isset($_POST['message'])){
    $user = security($_POST['user']);
    $title = security($_POST['title']);
    $message = security($_POST['message']);

    try{
        $mail=new PHPMailer(true);
        $mail->IsSMTP();
        $mail->Host='mail.banneer.com';
        $mail->SMTPAuth=true;
        $mail->Port=587;
        $mail->Username="banneer@banneer.com";
        $mail->Password="Shahramzs13651986";
        $mail->SMTPKeepAlive = true;
        $mail->AddAddress($user);
        $mail->SetFrom("banneer@banneer.com","banneer.com");
        $mail->Subject='Support Advert';
        $mail->CharSet="UTF-8";
        $mail->ContentType="text/htm";
        $mail->MsgHTML('
            <p align="left"style="font-size: 20px;color:black;background: #b3d7ff;padding: 20px;border-radius: 7px">
            Dear '.$user.'
            <br><br>
             '.$title.'
             <br><br>
             '.$message.'
             </p>
            ');
        if($mail->Send()){
            //email ersal shod
            $response = "support send";
        }else{
            //email ersal nashod
            $response = "error";
        }
    }catch(phpmailerException $e){
        $response = $e->errorMessage();
    }
    catch (Exception $e) {
        $response = $e->getMessage(); 
    }

}
echo json_encode($response,JSON_PRETTY_PRINT);
