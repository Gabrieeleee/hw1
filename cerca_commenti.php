<?php 
    include 'auth.php';
    if(!$user = checkAuth())exit;

    if(!empty($_GET['idpost'])){

        $conn=mysqli_connect("localhost","root","","flork");

        $query="SELECT username from utente u, post p where u.id=p.utente and p.id='".$_GET['idpost']."'";
        $res1=mysqli_query($conn,$query);
        $row1=mysqli_fetch_assoc($res1);    

        $query="SELECT c.id,profilepic,username,testo from commento c, utente u where u.id=c.idutente and idpost='".$_GET['idpost']."'";
        $res2=mysqli_query($conn,$query);

        while($row2=mysqli_fetch_assoc($res2)){
            $vet[]=array('idcommento'=>$row2['id'],'profilepic'=>$row2['profilepic'], 'username'=>$row2['username'], 'testo'=>$row2['testo'], 'proprietario'=>$row1['username'], 'idpost'=>$_GET['idpost']);
        }

        if(!empty($vet))
        echo json_encode($vet);
        else
        echo json_encode(array('proprietario'=>$row1['username'], 'numcomm'=>'0', 'idpost'=>$_GET['idpost']));

    }
?>