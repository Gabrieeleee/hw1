<?php 
    session_start();
    if(!isset($_SESSION["username"])){
       
        header("Location: login.php");
        exit;
    }

    $conn=mysqli_connect("localhost","root","","flork");

    $query="SELECT nome,cognome,username,profilepic FROM utente WHERE NOT username='".$username."'";
    $res=mysqli_query($conn,$query);
    

    while( ($row = mysqli_fetch_assoc($res))){
        $vet[]=array('nome'=>$row['nome'], 'cognome'=>$row['cognome'],'username'=>$row['username'],'profilepic'=>$row['profilepic']);
    }

    echo json_encode($vet);
    
?>