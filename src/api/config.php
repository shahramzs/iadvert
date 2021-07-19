<?php
error_reporting (0);
     if(!defined("SITE_URL")) define("SITE_URL", "localhost:3000");
     if(!defined("BASE_URL")) define("BASE_URL", "http://localhost:3000/");

     function security($value){
        return trim(htmlspecialchars(addslashes($value)));
     }

     function securityShow($value){
      return stripslashes(filter_var($value), FILTER_SANITIZE_FULL_SPECIAL_CHARS);
   }

   function checkQueryString(){
      $query_string = $_SERVER["QUERY_STRING"];
      $black_list = array("script", ">", "<", "'", "%27", "document", "cookie", "hack", "shell", "%3C", "%3E");

      foreach($black_list as $key){
         if(strpos($query_string, $key)){
            echo "error in query string";
            return false;
         }else{
            return true;
         }
      }
   }

   checkQueryString();

   $ip = htmlentities($_SERVER['REMOTE_ADDR']);

   function logAttack($db, $ip, $details){
       $details = "Attack Details : ".$details;
       $sql = "INSERT INTO `log` SET `ip` = ? , `details` = ?";
       $result = $db->prepare($sql);
       $result->bindValue(1, $ip);
       $result->bindValue(2, addslashes(htmlentities($details)));
   }

   $black_list = array("script", "'", "or", ">", "<", "document", "cookie", "hack", "shell", "../", "%27", "%3C", "%3E");
   if(isset($GET)){
      foreach($_GET as $k => $v){
           foreach($black_list as $key => $value){
               if(preg_match("@$value@", $v)){
                   logAttack($connect, $ip, "$value");
               }
           }
      } 
   }
   
?>