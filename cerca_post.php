<?php 
    include 'auth.php';
    if(!$user = checkAuth())exit;

    if(isset($_POST['chiave']) ){

        
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        $chiave=mysqli_real_escape_string($conn,$_POST['chiave']);
        
        $query="SELECT p.id,testo,immagine,profilepic,datapubblicazione,username FROM post p,utente u WHERE u.id=p.utente  AND testo LIKE '%".$chiave."%'";
        $res=mysqli_query($conn,$query);
        while($row1=mysqli_fetch_assoc($res)){
            $vet[]=array('id'=>$row1['id'],'username' => $row1['username'], 'testo'=>$row1['testo'], 'immagine'=>$row1['immagine'],'pic'=>$row1['profilepic'], 'datapubblicazione'=>$row1['datapubblicazione']);
            rsort($vet); 
        }
        if(!empty($vet))
        echo json_encode($vet);
        else
        echo json_encode('false');
        
    }else echo json_encode('falseeeee');
?>