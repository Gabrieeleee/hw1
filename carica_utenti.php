<?php 

include 'auth.php';
    if (!$user = checkAuth()) exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    if(!empty($_GET['id'])){
        if(($_GET['azione'])==='follower')
            $query="SELECT id,nome,cognome,profilepic,username from utente where id  IN (select u.id from utente u, follow f where u.id=f.utente1 and f.utente2='".$_GET['id']."') and id not in(select id from utente where id='".$_GET['id']."')";
        else
        $query="SELECT id,nome,cognome,profilepic,username from utente where id  IN (select u.id from utente u, follow f where u.id=f.utente2 and f.utente1='".$_GET['id']."') and id not in(select id from utente where id='".$_GET['id']."')";

    }else
    $query="SELECT id,nome,cognome,profilepic,username from utente where id NOT IN (select u.id from utente u, follow f where u.id=f.utente2 and f.utente1='".$_SESSION['id']."') and id not in(select id from utente where id='".$_SESSION['id']."')";
    
    $res=mysqli_query($conn,$query);
    if(mysqli_num_rows($res)>0){
    while($row = mysqli_fetch_assoc($res)){

        $query="call followandfollower('".$row['id']."')";
        $res1=mysqli_query($conn,$query);

        $query="SELECT * FROM temp";
        $res2=mysqli_query($conn,$query);
        $row1=mysqli_fetch_assoc($res2);
        
        $vet[]=array('id'=>$row['id'],'nome'=>$row['nome'],'cognome'=>$row['cognome'],'username'=>$row['username'],'profilepic'=>$row['profilepic'],'follower'=>$row1['follower'],'follows'=>$row1['follows']);
    }
    echo json_encode($vet);
    } else
    echo json_encode('false');
   
?>