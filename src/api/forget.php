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

if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['email']) ){

$email = security($_POST['email']);

$sql = "SELECT * FROM `user` WHERE `email`= ? ";
$run = $connect->prepare($sql);
$run->bindValue(1, $email);
$run->execute();
$num = $run->rowCount();
$data = $run->fetch(PDO::FETCH_OBJ);
if ($num == 1){
    //email mojod ast
///////////////////////////
try{
    $mail=new PHPMailer(true);
    $mail->IsSMTP();
    $mail->Host='mail.banneer.com';
    $mail->SMTPAuth=true;
    $mail->Port=587;
    $mail->Username="banneer@banneer.com";
    $mail->Password="Shahramzs13651986";
    $mail->SMTPKeepAlive = true;
    $mail->AddAddress($email);
    $mail->SetFrom("banneer@banneer.com","banneer.com");
    $mail->Subject='Password Recovery Email';
    $mail->CharSet="UTF-8";
    $mail->ContentType="text/htm";
    $mail->MsgHTML('
        <p align="left"style="font-size: 20px;color:black;background: #b3d7ff;padding: 20px;border-radius: 7px">
        Dear '.$data->fullname.'
        <br><br>
        Your Sign in information :
        <br><br>
         email : '.$email.'
        <br><br>
            password : '.$data->password.'
            <br><br>
            for entering the site use the below link.
            <br><br>
            <a href="localhost/signin">Advert</a>
         </p>
        ');
    if($mail->Send()){
        //email ersal shod
        $response = "your password recovery correctly and sent to your email.";
    }else{
        //email ersal nashod
        $response = "password recovery email did not send. please try again.";
    }
}catch(phpmailerException $e){
    $response = $e->errorMessage();
}
catch (Exception $e) {
	$response = $e->getMessage(); 
}
//////////////////////////
}else{
    //email mojod nist
    $response = "Your email dose not register in our system.";
}

}
echo json_encode($response);