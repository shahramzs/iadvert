<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Credentials");

 include 'connect.php';
  include 'config.php';

 $response = array();

 if($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_POST['ip']) && isset($_POST['country']) && isset($_POST['city']) && isset($_POST['region']) && isset($_POST['postal']) && isset($_POST['latitude']) && isset($_POST['longitude']) && isset($_POST['timezone']) && isset($_POST['country_calling_code']) && isset($_POST['currency_name']) && isset($_POST['languages']) && isset($_POST['asn']) && isset($_POST['org']) && isset($_POST['originLat']) && isset($_POST['originLng']) && isset($_POST['userAgent'])){

    $ip = security($_POST['ip']);
    $country = security($_POST['country']);
    $city = security($_POST['city']);
    $region = security($_POST['region']);
    $postal = security($_POST['postal']);
    $latitude = security($_POST['latitude']);
    $longitude = security($_POST['longitude']);
    $timezone = security($_POST['timezone']);
    $country_calling_code = security($_POST['country_calling_code']);
    $currency_name = security($_POST['currency_name']);
    $languages = security($_POST['languages']);
    $asn = security($_POST['asn']);
    $org = security($_POST['org']);
    $originLat = security($_POST['originLat']);
    $originLng = security($_POST['originLng']);
    $userAgent = security($_POST['userAgent']);

 $sql = "INSERT INTO `tracking`(`ip`, `country`, `city`, `region`, `postal`, `latitude`, `longitude`, `timezone`, `country_calling_code`, `currency_name`, `languages`, `asn`, `org`, `originLat`, `originLng`, `userAgent`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
 $run = $connect->prepare($sql);
 $run->bindValue(1, $ip);
 $run->bindValue(2, $country);
 $run->bindValue(3, $city);
 $run->bindValue(4, $region);
 $run->bindValue(5, $postal);
 $run->bindValue(6, $latitude);
 $run->bindValue(7, $longitude);
 $run->bindValue(8, $timezone);
 $run->bindValue(9, $country_calling_code);
 $run->bindValue(10, $currency_name);
 $run->bindValue(11, $languages);
 $run->bindValue(12, $asn);
 $run->bindValue(13, $org);
 $run->bindValue(14, $originLat);
 $run->bindValue(15, $originLng);
 $run->bindValue(16, $userAgent);
 $run->execute();
 

 }
 echo json_encode($response,JSON_PRETTY_PRINT);