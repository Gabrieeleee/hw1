<?php


    include 'auth.php';
    if (!$user = checkAuth()) exit;
    
    if(!empty($_GET['id'])){

       
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        $query="DELETE from follow where utente1='".$_SESSION['id']."'and utente2='".$_GET['id']."'";
        $res=mysqli_query($conn,$query);
        
        
        echo json_encode('true');
    } else
    
    echo json_encode('false');
   
?>