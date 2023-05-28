<?php 
    include 'auth.php';
    if(!$user = checkAuth())exit;

if(!empty($_GET["idpost"])){

$conn=mysqli_connect("localhost","root","","flork");

$idpost=mysqli_real_escape_string($conn,$_GET["idpost"]);




$var=$_SESSION['id'];

$query="DELETE FROM likee where utente='".$var."' and idpost='".$idpost."'";
$res1=mysqli_query($conn,$query);

echo json_encode('ok');

mysqli_close($conn);
}

?>