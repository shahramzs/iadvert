<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header( 'Content-Type: multipart/form-data');

include 'connect.php';
include 'config.php';

$response = array();
$error = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['user']) && isset($_POST['title']) && isset($_POST['price']) && isset($_POST['text']) && isset($_POST['token']) && isset($_POST['start']) && isset($_POST['expire']) && isset($_POST['discountCode'])) {

    $user = security($_POST['user']);
    $title = security($_POST['title']);
    $price = security($_POST['price']);
    $text = security($_POST['text']);
    $token = security($_POST['token']);
    $start = security($_POST['start']);
    $expire = security($_POST['expire']);
    $discountCode = security($_POST['discountCode']);

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
            if($type_img == "image/jpg" || $type_img == "image/jpeg" || $type_img == "image/png") {
                $img_query = 'INSERT INTO `discount`(`user`, `url`, `token`, `price`, `title`, `text`, `start`, `expire`, `discountCode`) VALUES (?,?,?,?,?,?,?,?,?)';
                   $result_img = $connect->prepare($img_query);
                   $result_img->bindValue(1, $user);
                   $result_img->bindValue(2, $src_img);
                   $result_img->bindValue(3, $token);
                   $result_img->bindValue(4, $price);
                   $result_img->bindValue(5, $title);
                   $result_img->bindValue(6, $text);
                   $result_img->bindValue(7, $start);
                   $result_img->bindValue(8, $expire);
                   $result_img->bindValue(9, $discountCode);
                   if ($result_img->execute()) {
                      if(move_uploaded_file($tmp_img, '../'.$src_img)){
                        $response = array($src_img, $title, $price, $text, $start, $expire, $discountCode);
                   }else {
                    $response = "not ok";
                   }
            }
        }else{
            $uploadOk == 0;
        }
    
    }
}
if($error != "error" ){
    echo json_encode($response);
}else{
    echo json_encode($error);
}