<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');
header("Access-Control-Allow-Origin: *");



    $data = array();
    if($_SERVER['REQUEST_METHOD'] == 'GET' && isset($_GET['country']) && isset($_GET['city']) && isset($_GET['cat']) && isset($_GET['user']) && isset($_GET['token'])){    
    
    $country = $_GET['country'];
     $city = $_GET['city'];
     $cat = $_GET['cat'];
     $user = $_GET['user'];
     $token = $_GET['token'];

    // $country = 'iran';
    // $city = 'tehran';
    // $cat = 'small';
    // $user = 'parmida';
    // $token = '7634555';

    $data = [$country, $city, $cat, $user, $token];

     echo 'data: '.json_encode($data)."\n\n";
     
    flush();            //Flush the result to the browser
    sleep(1);           //Wait a second (or what ever you like)

    //If the browser is still connected
    // if(!connection_aborted() && connection_status()==0){
    //     stream();       //recurse the function
    // }
}else{
    echo '\n';
}
