<?php 

include 'auth.php';
    if (!$user = checkAuth()) exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    if(!empty($_GET['id'])){
        
    

        $query="call followandfollower('".$_GET['id']."')";
        $res1=mysqli_query($conn,$query);

        $query="SELECT * FROM temp";
        $res2=mysqli_query($conn,$query);
        $row1=mysqli_fetch_assoc($res2);
        
        $vet=array('follower'=>$row1['follower'],'follows'=>$row1['follows']);
    echo json_encode($vet);
    } else
    echo json_encode('false');

?>