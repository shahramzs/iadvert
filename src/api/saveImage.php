<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Credentials");
header("Content-Type: text/plain"); 
header( 'Content-Type: multipart/form-data');

    include './connect.php';
    include './config.php';

    $response = array();
    $error = array();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $sender = security($_POST['sender']);
    $reciever = security($_POST['reciever']);
    $token = security($_POST['token']);


 if (isset($_FILES['img'])) {

    $name_img = $_FILES['img']['name'];
    $size_img = $_FILES['img']['size'];
    $tmp_img = $_FILES['img']['tmp_name'];
    $type_img = $_FILES['img']['type'];
    $ext_img = array('jpeg', 'jpg', 'png');
    $uploadOk = 1;
        $uploadOk = 1;

            $picName = md5($name_img . microtime()) . substr($name_img, -5, 5);
            $src_img = '../public/uploadChat/' . basename($picName);
            $imageFileType = strtolower(pathinfo($src_img, PATHINFO_EXTENSION));
         if (in_array($imageFileType, $ext_img) === false) {
             $uploadOk = 0;
         }
         if ($uploadOk == 0) {
             $error="error";
         } 
        
             $img_query = 'INSERT INTO `chat_msg`(`sender`, `reciever`, `msg`,`url`, `chat_token`) VALUES (?,?,?,?,?)';
                $result_img = $connect->prepare($img_query);
                $result_img->bindValue(1, $sender);
                $result_img->bindValue(2, $reciever);
                $result_img->bindValue(3, 'no msg');
                $result_img->bindValue(4, $src_img);
                $result_img->bindValue(5, $token);
                if ($result_img->execute()) {
                 if(move_uploaded_file($tmp_img, '../'.$src_img)){
                    $response = "ok";
                }else {
                 $response = "not ok";
                }
         }
    
  }

}
if($error != "error" ){
    echo json_encode($response);
}else{
    echo json_encode($error);
}
