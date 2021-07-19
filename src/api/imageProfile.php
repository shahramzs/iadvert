<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header( 'Content-Type: multipart/form-data');

 include 'connect.php';


 $response = array();
 $error = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $user = $_POST['user'];

                
$sql = "SELECT * FROM `profileimage` WHERE user = ?";
$run = $connect->prepare($sql);
$run->bindValue(1, $user);
$run->execute();
$num = $run->rowCount();

if($num != 0){
    //avatar exist
    if (isset($_FILES['image'])) {
        $name_img = $_FILES['image']['name'];
        $size_img = $_FILES['image']['size'];
        $tmp_img = $_FILES['image']['tmp_name'];
        $type_img = $_FILES['image']['type'];
        $ext_img = array('jpeg', 'jpg', 'png');
        $uploadOk = 1;
        $picName = md5($name_img . microtime()) . substr($name_img, -5, 5);
        $src_img = '../public/uploadPic/' . basename($picName);
        $imageFileType = strtolower(pathinfo($src_img, PATHINFO_EXTENSION));
        if (in_array($imageFileType, $ext_img) === false) {
            $uploadOk = 0;
        }
        if ($uploadOk == 0) {
            $error="error";
        }
if($type_img == "image/jpg" || $type_img == "image/jpeg" || $type_img == "image/png"){
    $sql2 = "UPDATE `profileimage` SET `urlProfile`= ? WHERE `user` = ?";
    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $src_img);
    $run2->bindValue(2, $user);
    if($run2->execute()){
        if(move_uploaded_file($tmp_img, '../'.$src_img)){
            $response = $src_img;
        }else{
            $error = 'error';
        }
       
    }else{
        $error = 'error';
    }
}else{
    $error = 'error';
}
    }
}else if($num == 0){
    //avatar not exist
    if (isset($_FILES['image'])) {
        $name_img = $_FILES['image']['name'];
        $size_img = $_FILES['image']['size'];
        $tmp_img = $_FILES['image']['tmp_name'];
        $type_img = $_FILES['image']['type'];
        $ext_img = array('jpeg', 'jpg', 'png');
        $uploadOk = 1;
        $picName = md5($name_img . microtime()) . substr($name_img, -5, 5);
        $src_img = '../public/uploadPic/' . basename($picName);
        $imageFileType = strtolower(pathinfo($src_img, PATHINFO_EXTENSION));
        if (in_array($imageFileType, $ext_img) === false) {
            $uploadOk = 0;
        }
        if ($uploadOk == 0) {
            $error="error";
        }
if($type_img == "image/jpg" || $type_img == "image/jpeg" || $type_img == "image/png"){
    $sql3 = "INSERT INTO `profileimage`(`urlProfile`, `user`) VALUES (?,?)";
    $run3 = $connect->prepare($sql3);
    $run3->bindValue(1, $src_img);
    $run3->bindValue(2, $user);
    if($run3->execute()){
        if(move_uploaded_file($tmp_img, '../'.$src_img)){
            $response = $src_img;
        }else{
            $error = 'error';
        }
        
    }else{
        $error = 'error';
    }
        }else{
            $error = 'error';
        }
    
}

}
    
 }

 if($error != "error" ){
    echo json_encode($response);
}else{
    echo json_encode($error);
}