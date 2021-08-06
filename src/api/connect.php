<?php
header("X-Frame-Options: DENY");

try{
    $connect = new PDO('mysql:host=localhost;dbname=iadvert_advert',"iadvert_advert","sh13651986" ,array(PDO::ATTR_EMULATE_PREPARES => true,
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
    $connect->exec("set names utf8");
}catch (PDOException $e){
    echo $e->getMessage();
}


?>
