<?php 

include 'auth.php';
if(!$user = checkAuth())exit;

if(!empty($_GET["idpost"])){

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $idpost=mysqli_real_escape_string($conn,$_GET["idpost"]);

    $var=$_SESSION['id'];

    $query="INSERT INTO likee(utente,idpost) values('$var','$idpost')";
    $res1=mysqli_query($conn,$query);

    echo json_encode('ok');

    mysqli_close($conn);
}

?>