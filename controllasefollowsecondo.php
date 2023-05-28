<?php 
   /* include 'auth.php';

    if(!$user= checkAuth()) exit;

    if(!empty($_GET['id'])){

       
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        $query="SELECT id from follow where utente1='".$_SESSION['id']."' and utente2='".$_GET['id']."'";
        $res=mysqli_query($conn,$query);
        $row=mysqli_fetch_assoc($res);
        if(mysqli_num_rows($res)>0){   
        echo json_encode($row['id']);
        }else 
        echo json_encode('false');
    }
    */
?>