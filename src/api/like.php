<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Credentials");
header("Content-Type: text/plain"); 

 include 'connect.php';


 $response['like'] = array();

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $user = $_POST['user'];
    $token = $_POST['token'];

$sql = "SELECT * FROM `like_number` WHERE user = ? AND token = ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $user);
$run->bindValue(2, $token);
$run->execute();
$num = $run->rowCount();
if($num === 0){
    $sql2 = "INSERT INTO `like_number`(`user`, `token`) VALUES (?,?)";
    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $user);
    $run2->bindValue(2, $token);
    if($run2->execute()){
        $response['like'] = 'insert';  
    }else{
        $response['like'] = 'error1';  
    }
}else if($num !== 0){
$sql3 = "DELETE FROM `like_number` WHERE user = ? AND token = ?";
$run3 = $connect->prepare($sql3);
$run3->bindValue(1, $user);
$run3->bindValue(2, $token);
if($run3->execute()){
    $response['like'] = 'delete';  
}else{
    $response['like'] = 'error2';  
}

}


}

echo json_encode($response['like']);
   