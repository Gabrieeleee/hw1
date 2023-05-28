<?php 

include 'auth.php';
if (!$user = checkAuth()) exit;


if(!empty($_GET['idpost'])){

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $query="DELETE FROM post where id='".$_GET['idpost']."'";
    $res=mysqli_query($conn,$query);
    echo json_encode('deleted');
}


?>