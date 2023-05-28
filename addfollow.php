<?php


    include 'auth.php';
    if (!$user = checkAuth()) exit;
    
    if(!empty($_GET['id'])){

       
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        $query="SELECT id from utente where username='".$_GET['id']."'";
        $res=mysqli_query($conn,$query);
        $row=mysqli_fetch_assoc($res);
        $query="INSERT into follow(utente1,utente2) values ('".$_SESSION['id']."','".$row['id']."')";
        $res=mysqli_query($conn,$query);

        
        echo json_encode('true');
    } else
    
    echo json_encode('false');
   
?>