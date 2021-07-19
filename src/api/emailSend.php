<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
 include 'config.php';
 require ('PHPMailer/class.phpmailer.php');
 require ('PHPMailer/class.smtp.php');


 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email']) && isset($_POST['text']) && isset($_POST['token']) && isset($_POST['emailDestination'])){
    $email = security($_POST['email']);
    $text = security($_POST['text']);
    $token = security($_POST['token']);
    $emailDestination = security($_POST['emailDestination']);
    $ip = htmlentities($_SERVER['REMOTE_ADDR']);

    $sql = " INSERT INTO `sendemail`(`emailText`, `token`, `email`, `emailDestination`, `ip`) VALUES (?,?,?,?,?)";
    $run = $connect->prepare($sql);
    $run->bindValue(1, $text);
    $run->bindValue(2, $token);
    $run->bindValue(3, $email);
    $run->bindValue(4, $emailDestination);
    $run->bindValue(5, $ip);
    if($run->execute()){
        
        try{
            $mail=new PHPMailer(true);
            $mail->IsSMTP();
            $mail->Host='mail.banneer.com';
            $mail->SMTPAuth=true;
            $mail->Port=587;
            $mail->Username="banneer@banneer.com";
            $mail->Password="Shahramzs13651986";
            $mail->SMTPKeepAlive = true;
            $mail->AddAddress($emailDestination);
            $mail->SetFrom("banneer@banneer.com","banneer.com");
            $mail->Subject='Advert Message';
            $mail->CharSet="UTF-8";
            $mail->ContentType="text/htm";
            $mail->MsgHTML('
                <p align="left"style="font-size: 20px;color:black;background: #b3d7ff;padding: 20px;border-radius: 7px">
                 you have a message from one of your visitors in advert site.
                    <br /><br />
                 from : '.$email.' <br />
                 to : '.$emailDestination.' <br /><br />
                  the message : <br/><br /> '.$text.'
                 </p>
                ');
            if($mail->Send()){
                //email ersal shod
                $response = "ok";
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

    }else{
        $response = "error";
    }
 }

 echo json_encode($response,JSON_PRETTY_PRINT);