<?php
/*
session_start();
if(!isset($_SESSION["username"])){
   
    header("Location: http://localhost/Homework1/log-in/login.php");
    exit;
}


$conn=mysqli_connect("localhost","root","","flork");

$query="SELECT profilepic FROM utente WHERE username= '".$_SESSION['username']."'";
$res= mysqli_query($conn,$query);
$row = mysqli_fetch_assoc($res);

echo json_encode($row['profilepic']);
*/?>