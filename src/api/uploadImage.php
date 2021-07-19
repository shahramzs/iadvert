<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header( 'Content-Type: multipart/form-data');

include 'connect.php';

$response = array();
$error = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $user = $_POST['user'];
    $token = $_POST['token'];

    if (isset($_FILES['pictures'])) {
           $name_img = $_FILES['pictures']['name'];
           $size_img = $_FILES['pictures']['size'];
           $tmp_img = $_FILES['pictures']['tmp_name'];
           $type_img = $_FILES['pictures']['type'];
           $ext_img = array('jpeg', 'jpg', 'png');
           $uploadOk = 1;
        foreach ($name_img as $key => $value) {
            $picName = md5($name_img[$key] . microtime()) . substr($name_img[$key], -5, 5);
               $src_img = '../public/uploadPic/' . basename($picName);
               $imageFileType = strtolower(pathinfo($src_img, PATHINFO_EXTENSION));
            if (in_array($imageFileType, $ext_img) === false) {
                $uploadOk = 0;
            }
            if ($uploadOk == 0) {
                $error="error";
            } 
            // if($type_img == "image/jpg" || $type_img == "image/jpeg" || $type_img == "image/png") {
                $img_query = 'INSERT INTO `image`(`user`, `url`, `token`) VALUES (?,?,?)';
                   $result_img = $connect->prepare($img_query);
                   $result_img->bindValue(1, $user);
                   $result_img->bindValue(2, $src_img);
                   $result_img->bindValue(3, $token);
                   if ($result_img->execute()) {
                      if(move_uploaded_file($tmp_img[$key], '../'.$src_img)){
                        $response = "ok";
                   }else {
                    $response = "not ok";
                   }
            }
        // }else{
        //     $uploadOk == 0;
        // }
    }
    }
}
if($error != "error" ){
    echo json_encode($response);
}else{
    echo json_encode($error);
}