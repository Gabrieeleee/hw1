<?php 

include 'auth.php';
if (!$user = checkAuth()) exit;

if(!empty($_POST['titolo'])  && !empty($_POST['descrizione']) && !empty($_POST['lin']) ){

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    if(!empty($_POST['immagine']))
        $immagine=mysqli_real_escape_string($conn,$_POST['immagine']);
        $titolo=mysqli_real_escape_string($conn,$_POST['titolo']);
        $descrizione=mysqli_real_escape_string($conn,$_POST['descrizione']);
        $link=mysqli_real_escape_string($conn,$_POST['lin']);
    $id=$_SESSION['id'];
    $query="INSERT INTO newssalvate(titolo,descrizione,immagine,link,idutente) values('$titolo','$descrizione','$immagine','$link','$id')";
    $res1=mysqli_query($conn,$query);
    echo json_encode("true");
}


?>