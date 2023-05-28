<?php 
include 'auth.php';
if(!$user = checkAuth())exit;


if(!empty($_GET['value']) && !empty($_GET['idpost'])){
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
   
    $contenuto=mysqli_real_escape_string($conn,$_GET["value"]);
    $id=$_SESSION['id'];
    $idpost=$_GET['idpost'];
    $query="INSERT INTO commento(testo,idutente,idpost) VALUES('$contenuto','$id','$idpost')";
    $res= mysqli_query($conn,$query);

    $query="SELECT id from commento where testo='".$contenuto."' and idpost='".$idpost."'";
    $res1= mysqli_query($conn,$query);
    $row=mysqli_fetch_assoc($res1);

    echo json_encode(array('testo'=>$contenuto, 'idcommento'=>$row['id']));
} else
echo json_encode("false");
?>