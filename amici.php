<?php
    include 'auth.php';
    if(!$user = checkAuth())exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $id=$_SESSION['id'];
    $query="SELECT  profilepic,nome,cognome FROM utente WHERE username= '".$_SESSION['username']."'";
    $res= mysqli_query($conn,$query);
    $row = mysqli_fetch_assoc($res);  
    
    $query1="SELECT count(id) as follower FROM follow f WHERE f.utente2='".$id."'";
    $res= mysqli_query($conn,$query1);
    $row1 = mysqli_fetch_row($res);
    
    
    $query1="SELECT count(id) as follows FROM follow f WHERE f.utente1='".$id."'";
    $res= mysqli_query($conn,$query1);
    $row2 = mysqli_fetch_row($res);  

 
    
?>


<html>
<head>
<meta charset='utf-8'>
<title>Flork</title>
<meta name='viewport' content='width=device-width, initial-scale=1'>
<script src="script/header.js" defer></script>
<script src="script/amici.js" defer></script>
<link rel="stylesheet" href="style/header.css"/>
<link rel="stylesheet" href="style/amici.css"/>
<link rel="stylesheet" href="style/card.css"/>

</head>

<body>

<header>
        <div id="left">
            <a  href="home.php"><img id="headlogo" src="elementi/logo3.png"></img></a>
        </div>
    <nav>
            <a href="home.php" ><img src="elementi/home.png"></a>
            <a href="amici.php"><img src="elementi/friends.png"></a>
            <a href="news.php"><img src="elementi/news.png"></a>
           
        </nav>

        <div id="nav2" class="hidden">
                <div></div>
                <div></div>
                 <div></div>
        </div>

        

        <div id="right">
         <a href="profilo.php?username=<?php echo($_SESSION['username']) ?>"><img id="headprof" data-username="<?php echo($_SESSION['username']) ?>" data-profilepic="<?php echo($row['profilepic']) ?>" src=" <?php echo($row['profilepic']) ?>"></a>
         <a href="logout.php"><img  src="elementi/logout.png"></a>
        </div>
    </header>
    <section id="modalenavbar" class="hidden">
    </section>
    <div id="se_us">
    
    <form name='search_user' id='search_user_name' >
                <input type="search" id="search" placeholder="Cerca un utente..." />
            </form>
   </div>
    
    <section id="ricercares">
    <div id="titleuser">
        <img id="close" class="hidden" src="elementi/close.png">
        <h1 id="true" class="hidden">Utente trovato:</h1>
        <h1 id="false" class="hidden">Nessun utente trovato.</h1>
    </div>
    
    <section id="cercautente">
     
    </section>
    </section>
    
    <section id="titolopers">
        <div id="titolicontenuti">
            <h1  id="trovato" class="hidden">Persone che potresti conoscere:</h1>
            <h1 id="nontrovato" class="hidden" >Segui tutti gli utenti disponibili.</h1>
            <img src="elementi/no-content.png" id="nocontent" class="hidden">
        </div>
        <section id="persone">
        </section>
    </section>
   
</body>
</html>