<?php 
    include 'auth.php';
    if(!$user = checkAuth())exit;

    if(!empty($_GET["link"])){

        $conn=mysqli_connect("localhost","root","","flork");
        $query="DELETE FROM newssalvate where link='".$_GET['link']."'";
        $res=mysqli_query($conn,$query);
        echo json_encode($_GET['link']);

    
    }
?>