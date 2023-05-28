<?php 

include 'auth.php';
if (!$user = checkAuth()) exit;


    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
   $query="SELECT * from newssalvate where idutente='".$_SESSION['id']."'";
    $res1=mysqli_query($conn,$query);
    while($row=mysqli_fetch_assoc($res1)){
        $vet[]=array('id'=>$row['id'],'titolo'=>$row['titolo'],'descrizione'=>$row['descrizione'],'immagine'=>$row['immagine'],'link'=>$row['link']);
    }
    if(!empty($vet))
    echo json_encode($vet);
    else
    echo json_encode('false');
?>