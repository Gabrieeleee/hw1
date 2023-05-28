<?php

include 'auth.php';
if(!$user = checkAuth())exit;

$conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

$id=$_SESSION['id'];
if(empty($_GET['username'])){
    
    //$vet=array();
    $query="SELECT p.id,testo,p.immagine,u.profilepic,p.datapubblicazione,username FROM post p,utente u, follow f WHERE u.id=p.utente AND p.utente=f.utente2 and f.utente1='".$id."'  ";
    $res1=mysqli_query($conn,$query);
    
    while($row1 = mysqli_fetch_assoc($res1)){
        $query2="SELECT COUNT(l.id) as nlike from likee l, post p where p.id=l.idpost and p.id='".$row1['id']."'";
        $res2=mysqli_query($conn,$query2);
        $row2=mysqli_fetch_assoc($res2);
        $vet[]=array('id'=>$row1['id'],'username' => $row1['username'], 'testo'=>$row1['testo'], 'immagine'=>$row1['immagine'],'pic'=>$row1['profilepic'], 'datapubblicazione'=>$row1['datapubblicazione'],'like'=>$row2['nlike']);
        rsort($vet);    
    }



} else{
    $query="SELECT p.id,testo,immagine,profilepic,datapubblicazione,username FROM post p,utente u WHERE u.id=p.utente AND u.username= '".$_GET['username']."'";
    $res1=mysqli_query($conn,$query);
    while($row1 = mysqli_fetch_assoc($res1)){
        $query2="SELECT COUNT(l.id) as nlike from likee l, post p where p.id=l.idpost and p.id='".$row1['id']."'";
        $res2=mysqli_query($conn,$query2);
        $row2=mysqli_fetch_assoc($res2);
        $vet[]=array('id'=>$row1['id'],'username' => $row1['username'], 'testo'=>$row1['testo'], 'immagine'=>$row1['immagine'],'pic'=>$row1['profilepic'], 'datapubblicazione'=>$row1['datapubblicazione'],'like'=>$row2['nlike']);
        rsort($vet);    
    } 
}


if(isset($vet))
        echo json_encode($vet);
else
echo json_encode("false");



?>