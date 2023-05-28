<?php

if(isset($_GET["q"])){
    
    $conn=mysqli_connect("localhost","root","","flork");

    $username=mysqli_real_escape_string($conn,$_GET["q"]);

    $query = "SELECT username FROM utente WHERE username ='".$username."'";
    
    $res= mysqli_query($conn,$query);

    if(mysqli_num_rows($res)>0){
        echo json_encode('true');
    }   else
    echo json_encode('false');

    

    mysqli_close($conn);
}
?>