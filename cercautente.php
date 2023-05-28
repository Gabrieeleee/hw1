<?php 
    include 'auth.php';
    if(!$user = checkAuth())exit;

    if(!empty($_GET['chiave']) || !empty($_GET['username'])){

        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
        if(!empty($_GET['chiave'])){
           
            $chiave=$_GET["chiave"];
            $chiavee=explode(' ',$_GET["chiave"]);
            $nome=mysqli_real_escape_string($conn,$chiavee[0]);
            if(isset($chiavee[1])){
                $cognome=mysqli_real_escape_string($conn,$chiavee[1]);
            } else $cognome=null;
            $query="SELECT id,nome,cognome,profilepic,username FROM utente where (nome='".$nome."' and cognome='".$cognome."') or nome='".$chiave."' or cognome='".$chiave."' or username='".$chiave."'";
        }
        else{
            $query="SELECT id,nome,cognome,profilepic,username FROM utente where username='".$_GET['username']."'";
        }
    
        $res=mysqli_query($conn,$query);
        if(mysqli_num_rows($res)>0){
        
        while($row=mysqli_fetch_assoc($res)){
            $query="call followandfollower('".$row['id']."')";
            $res1=mysqli_query($conn,$query);

            $query="SELECT * FROM temp";
            $res2=mysqli_query($conn,$query);
            $row1=mysqli_fetch_assoc($res2);
            
            
            $vet[]=array('id'=>$row['id'],'nome'=>$row['nome'],'cognome'=>$row['cognome'],'username'=>$row['username'],'profilepic'=>$row['profilepic'],'follower'=>$row1['follower'],'follows'=>$row1['follows']);
        }
        echo json_encode($vet);
        }
        else
            echo json_encode('false');
    }


?>