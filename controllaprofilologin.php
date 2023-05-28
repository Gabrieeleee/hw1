<?php 
        include 'auth.php';
        if (!$user = checkAuth()) exit;

        if($_GET['username']=$user)
        echo json_encode('true');
        else
        echo json_encode('false');
        
?>