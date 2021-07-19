<?php

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');
header("Access-Control-Allow-Credentials");
header("Content-Type: text/plain"); 

 include 'connect.php';
 include 'config.php';
 include 'tcpdf/tcpdf.php';


if( isset($_GET['token'])){
    $token = $_GET['token'];

    $sql =  "SELECT t1.title, t1.name,t1.start, t1.details, t1.user, t1.token, t1.time, t2.city, t2.country, t4.cat,t5.phone,t5.email,t5.instagram,t5.twitter,t5.linkedin,t5.facebook,t5.web,t6.region,t6.streetAddress,t6.optional,t6.city,t6.state,t6.zipCode,t7.fullname,(SELECT view FROM view_number t6 WHERE t6.token = t1.token)view,(SELECT Count(*) FROM like_number t5 WHERE t5.token = t1.token)like_num,(SELECT count(*) FROM image t3 WHERE t3.token = t1.token)numPic FROM advertdetails t1 INNER JOIN country t2 ON t2.token = t1.token INNER JOIN category t4 ON t4.token = t1.token INNER JOIN contact t5 ON t5.token = t1.token INNER JOIN location t6 ON t6.token = t1.token INNER JOIN user t7 ON t7.email = t1.user WHERE t1.token =?";
    $run = $connect->prepare($sql);
    $run->bindValue(1, $token);
    $run->execute();
    $record = $run->fetchAll(PDO::FETCH_ASSOC);
    foreach($record as $row){
        $name = $row['name'];
        $token = $row['token'];
        $title = $row['title'];
        $cat = $row['cat'];
        $view = $row['view'];
        $like_num = $row['like_num'];
        $numPic = $row['numPic'];
        $fullname = $row['fullname'];
        $region = $row['region'];
        $country = $row['country'];
        $city = $row['city'];
        $state = $row['state'];
        $zipCode = $row['zipCode'];
        $details = $row['details'];
        $start = $row['start'];
        $streetAddress = $row['streetAddress'];
        $optional = $row['optional'];
        $email = $row['email'];
        $phone = $row['phone'];
        $web = $row['web'];
        $instagram = $row['instagram'];
        $twitter = $row['twitter'];
        $linkedin = $row['linkedin'];
        $facebook = $row['facebook'];
       $imageFile = $row['url'];  
    }

   
    $pdf = new TCPDF('p', 'mm', 'A4', true, 'UTF-8', false);
    $pdf->SetCreator(PDF_CREATOR);
    $pdf->SetAuthor($name);
    $pdf->SetTitle($title);
    $pdf->SetSubject($title);
    $pdf->SetKeywords($name, $title, $cat);
    $pdf->SetHeaderData(PDF_HEADER_LOGO, PDF_HEADER_LOGO_WIDTH, PDF_HEADER_TITLE.' 061', PDF_HEADER_STRING);
    $pdf->SetPrintHeader(false);
    $pdf->SetPrintFooter(false);
    $pdf->SetDefaultMonospacedFont(PDF_FONT_MONOSPACED);
    $pdf->SetMargins(PDF_MARGIN_LEFT, PDF_MARGIN_TOP, PDF_MARGIN_RIGHT);
    $pdf->SetHeaderMargin(PDF_MARGIN_HEADER);
    $pdf->SetFooterMargin(PDF_MARGIN_FOOTER);
    $pdf->SetAutoPageBreak(TRUE, PDF_MARGIN_BOTTOM);
    $pdf->setImageScale(PDF_IMAGE_SCALE_RATIO);

    $pdf->AddPage();
    //$pdf->setTextShadow(array('enabled'=>true, 'depth_w'=>0.2, 'depth_h'=>0.2, 'color'=>array(196,196,196), 'opacity'=>1, 'blend_mode'=>'Normal'));
    

    $html = <<<EOF
    <style>
    div.main {
        display: grid;
        grid-template-areas:main main main right right right";
        grid-gap: 10px;
    }
    h1.fheader {
        text-align:center;
    }
    div.part1 {
        text-align:center;
        grid-area: main;
    }
    dl.ull {
        text-align: left;
        font-size: 12pt;
    }
    div.part2 {
        text-align: center;
        grid-area: right;
    }
    dt.li {
        padding: 1.2rem; 
        font-size: 12pt;
        margin-bottom: 10px;
    }
    i.ii {
        color: grey;
        font-size: 12pt;
    }
    div.part3{
        padding: 10px;
    }
    i.part3Des{
        color: grey;
        font-size: 12pt;
        text-justify: auto;
    }
    </style>
    <h1 class="fheader">Business Advertisement Information</h1>
        <div class="main">
            <div class="part1">
                <dl class="ull">
                    <dt class="li">token: <i class="ii">$token</i></dt>
                    <dt class="li">name: <i class="ii">$name</i></dt>
                    <dt class="li">title: <i class="ii">$title</i></dt>
                    <dt class="li">category: <i class="ii">$cat</i></dt>
                    <dt class="li">view: <i class="ii">$view</i></dt>
                    <dt class="li">like: <i class="ii">$like_num</i></dt>
                    <dt class="li">number of pictures: <i class="ii">$numPic</i></dt>
                </dl>
            </div>
            <div class="part2">
                <dl class="ull">
                    <dt class="li">fullname: <i class="ii">$fullname</i></dt>
                    <dt class="li">region: <i class="ii">$region</i></dt>
                    <dt class="li">country: <i class="ii">$country</i></dt>
                    <dt class="li">city: <i class="ii">$city</i></dt>
                    <dt class="li">state: <i class="ii">$state</i></dt>
                    <dt class="li">zipcode: <i class="ii">$zipCode</i></dt>
                </dl>
            </div>
    </div>
    <hr>
    <div class="part3">
      <h3>Description: </h3><i class="part3Des">$details</i> 
    </div>
    <div class="part3">
        <h3>Open Hour: </h3><i class="part3Des">$start</i> 
    </div>
    <hr>
    <div class="main">
        <h1 class="fheader">Contact Fields</h1>
        <div class="part1">
            <dl class="ull">
                <dt class="li">Address: <i class="ii">$streetAddress</i></dt>
                <dt class="li">Optional Address: <i class="ii">$optional</i></dt>
                <dt class="li">Email: <i class="ii">$email</i></dt>
                <dt class="li">Business phone: <i class="ii">$phone</i></dt>
                <dt class="li">Business Web site: <i class="ii">$web</i></dt>
            </dl>
        </div>
        <div class="part2">
            <dl class="ull">
                <dt class="li">Instagarm : <i class="ii">$instagram</i></dt>
                <dt class="li">Twitter : <i class="ii">$twitter</i></dt>
                <dt class="li">Linkedin : <i class="ii">$linkedin</i></dt>
                <dt class="li">Facebook : <i class="ii">$facebook</i></dt>
            </dl>
        </div>
    </div>
    <hr>
    EOF;
    $pdf->writeHTML($html, true, false, true, false, 'J');


    $pdf->setJPEGQuality(100);

     $imageFile = Array();
    $sql2 = "SELECT * FROM image WHERE token = ?";
    $run2 = $connect->prepare($sql2);
    $run2->bindValue(1, $token);
    $run2->execute();
    $record2 = $run2->fetchAll(PDO::FETCH_ASSOC);
    foreach($record2 as $row2){
        $imageFile ='../'.$row2['url'] ;
        $pdf->Image($imageFile, 15, 120, 180, 160, 'JPG', ' ', '', true, 300, '', false, false, 1, false, false, false); 
    }
    
    $sql3 = "SELECT * FROM `uploadcatalog` WHERE token = ?";
    $run3 = $connect->prepare($sql3);
    $run3->bindValue(1, $token);
    $run3->execute();
    $record3 = $run3->fetchAll(PDO::FETCH_ASSOC);
    foreach($record3 as $row3){
        $imageFile2 ='../'.$row3['url'] ;
        $pdf->Image($imageFile2, 15, 120, 180, 160, 'JPG', ' ', '', true, 300, '', false, false, 1, false, false, false); 
    }

}   
 $pdf->Output();


