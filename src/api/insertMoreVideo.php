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

    if (isset($_FILES['video'])) {
           $name_img = $_FILES['video']['name'];
           $size_img = $_FILES['video']['size'];
           $tmp_img = $_FILES['video']['tmp_name'];
           $type_img = $_FILES['video']['type'];
           $ext_img = array('avi', 'mp4', 'mov', 'webm');
           $uploadOk = 1;
            $picName = md5($name_img . microtime()) . substr($name_img, -5, 5);
               $src_img = '../public/uploadVideo/' . basename($picName);
               $imageFileType = strtolower(pathinfo($src_img, PATHINFO_EXTENSION));
            if (in_array($imageFileType, $ext_img) === false) {
                $uploadOk = 0;
            }
            if ($uploadOk == 0) {
                $error="error";
            }
            if($type_img == "video/avi" || $type_img == "video/mp4" || $type_img == "video/mov" || $type_img == "video/webm") {
                $img_query = 'INSERT INTO `video`(`user`, `url`, `token`) VALUES (?,?,?)';
                   $result_img = $connect->prepare($img_query);
                   $result_img->bindValue(1, $user);
                   $result_img->bindValue(2, $src_img);
                   $result_img->bindValue(3, $token);
                   if ($result_img->execute()) {
                      if(move_uploaded_file($tmp_img, '../'.$src_img)){
                        $response = $src_img;
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