<?php 

    include 'auth.php';
    if(!$user = checkAuth())exit;

if(!empty($_GET["idpost"])){

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);


    $idpost=mysqli_real_escape_string($conn,$_GET["idpost"]);
    $var=$_SESSION['id'];

    $query="SELECT id FROM likee WHERE utente= '".$var."' and idpost='".$_GET['idpost']."'" ;
    $res1=mysqli_query($conn,$query);

    $vet[]=array( 'idpost'=>$idpost);
    if(mysqli_num_rows($res1)>0){
        echo json_encode($vet);
    } else
    echo json_encode ('false');


    mysqli_close($conn);
}

?>