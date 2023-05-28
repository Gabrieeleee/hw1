<?php 
   

    if(!empty($_GET['link'])){
        $link=$_GET['link'];
        session_start();
        $_SESSION['link']=$link;
        echo json_encode($_SESSION['link']);
    }
?>