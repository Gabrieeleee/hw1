<?php 

include 'auth.php';
if (!$user = checkAuth()) exit;

if(!empty($_GET['link']) ){

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    $id=$_SESSION['id'];
    $link=$_GET['link'];
    $query="SELECT id from newssalvate where idutente='".$id."' and link='".$link."'";
    $res1=mysqli_query($conn,$query);
    $row=mysqli_fetch_assoc($res1);
    if(mysqli_num_rows($res1)>0)
    echo json_encode(array('id'=>$row['id'], 'link'=>$link));
    else
    echo json_encode('false');
}


?>