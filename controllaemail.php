<?php

if(isset($_GET["q"])){
    
    $conn=mysqli_connect("localhost","root","","flork");

    $email=mysqli_real_escape_string($conn,$_GET["q"]);

    $query = "SELECT email FROM utente WHERE email ='".$email."'";
    
    $res= mysqli_query($conn,$query);

    if(mysqli_num_rows($res)>0){
        echo json_encode('true');
    }   else
    echo json_encode('false');

    

    mysqli_close($conn);
}
?>