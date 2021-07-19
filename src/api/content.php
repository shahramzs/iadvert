<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");


 include 'connect.php';
 include 'config.php';

 $response = array();
 $error = array();

if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['user']) && isset($_POST['title']) && isset($_POST['name']) && isset($_POST['internetShopping']) && isset($_POST['freeDelivery']) && isset($_POST['parking']) && isset($_POST['gift']) && isset($_POST['discount']) && isset($_POST['start']) && isset($_POST['details']) && isset($_POST['details']) ){
    $user = security($_POST['user']);
    $title = security($_POST['title']);
    $name = security($_POST['name']);
    $internetShopping = security($_POST['internetShopping']);
    $freeDelivery = security($_POST['freeDelivery']);
    $parking = security($_POST['parking']);
    $gift = security($_POST['gift']);
    $discount = security($_POST['discount']);
    $start = security($_POST['start']);
    $details = security($_POST['details']);
    $token = security($_POST['token']);

    $sql = 'INSERT INTO `advertdetails`( `user`, `title`, `name`, `start`, `details`, `token`) VALUES (?,?,?,?,?,?)';
    $run = $connect->prepare($sql);
    $run->bindValue(1, $user);
    $run->bindValue(2, $title);
    $run->bindValue(3, $name);
    $run->bindValue(4, $start);
    $run->bindValue(5, $details);
    $run->bindValue(6, $token);
    $run->execute();

    $sql2 = 'INSERT INTO `morefeatures`(`user`, `internetShopping`, `freeDelivery`,`parking` ,`specialGift` ,`specialDiscount` ,`token`) VALUES (?,?,?,?,?,?,?)';
    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $user);
    $run2->bindValue(2, $internetShopping);
    $run2->bindValue(3, $freeDelivery);
    $run2->bindValue(4, $parking);
    $run2->bindValue(5, $gift);
    $run2->bindValue(6, $discount);
    $run2->bindValue(7, $token);
    $run2->execute();

    if (isset($_FILES['menuImage'])) {
        $name_img = $_FILES['menuImage']['name'];
        $size_img = $_FILES['menuImage']['size'];
        $tmp_img = $_FILES['menuImage']['tmp_name'];
        $type_img = $_FILES['menuImage']['type'];
        $ext_img = array('jpeg', 'jpg', 'png');
        $uploadOk = 1;

        $picName = md5($name_img. microtime()) . substr($name_img, -5, 5);
        $src_img = '../public/uploadPic/' . basename($picName);
        $imageFileType = strtolower(pathinfo($src_img, PATHINFO_EXTENSION));
        if (in_array($imageFileType, $ext_img) === false) {
            //$error ="please use the file with JPG or PNG format.";
            $uploadOk = 0;
        }
        if ($uploadOk == 0) {
            $error = 'error';
        } else {
            $img_query = 'INSERT INTO `uploadcatalog`(`user`, `url`, `token`) VALUES (?,?,?)';
                   $result_img = $connect->prepare($img_query);
                   $result_img->bindValue(1, $user);
                   $result_img->bindValue(2, $src_img);
                   $result_img->bindValue(3, $token);

                   if ($result_img->execute()) {
                        if (move_uploaded_file($tmp_img, '../' . $src_img)) {
                            $response = "ok";
                        }else{
                            $response = "not ok";
                        }
                   }
                } 

    }
   
}
if($error != 'error' ){
    echo json_encode($response);
}else{
    echo json_encode($error);
}
