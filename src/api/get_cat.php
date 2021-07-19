<?php
header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

include 'connect.php';

$query = "SELECT * FROM `business` ORDER BY `id` ASC";
$result = $connect->prepare($query);
$result->execute();
$data = $result->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data, JSON_PRETTY_PRINT);


