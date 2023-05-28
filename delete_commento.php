<?php 
    include 'auth.php';
    if(!$user = checkAuth())exit;

    if(!empty($_GET['idcommento']) ){

        $conn=mysqli_connect("localhost","root","","flork");

        $query="DELETE from commento where id='".$_GET['idcommento']."'";
        $res=mysqli_query($conn,$query);
        echo json_encode('true');
        
    }
?>