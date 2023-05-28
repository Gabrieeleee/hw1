<?php 
    include 'auth.php';

    if(!$user= checkAuth()) exit;

    if(!empty($_GET['id'])){

       
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        $query="SELECT id from follow where utente1='".$_SESSION['id']."' and utente2='".$_GET['id']."'";
        $res=mysqli_query($conn,$query);

        if(mysqli_num_rows($res)>0){   
        echo json_encode($_GET['id']);
        }else 
        echo json_encode('false');
    }
    
?>