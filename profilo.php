<?php
    
    include 'auth.php';
    if(!$user = checkAuth())exit;

    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

    if(!empty($_GET['username']) && $_GET['username']!="undefined"){
        $flag=0;
        $query="SELECT id, profilepic,nome,cognome FROM utente WHERE username= '".$_GET['username']."'";
        $res= mysqli_query($conn,$query);
        $row = mysqli_fetch_assoc($res);  
        if($row['id']!==null){
            $query1="SELECT count(id) as follower FROM follow f WHERE f.utente2='".$row['id']."'";
            $res= mysqli_query($conn,$query1);
            $row1 = mysqli_fetch_row($res);
            
            
            $query1="SELECT count(id) as follows FROM follow f WHERE f.utente1='".$row['id']."'";
            $res= mysqli_query($conn,$query1);
            $row2 = mysqli_fetch_row($res);  

            $query= "SELECT profilepic FROM utente WHERE id='".$_SESSION['id']."'";
            $res= mysqli_query($conn,$query);
            $row3 = mysqli_fetch_row($res);  
        }else $flag=1;
} else $flag=1;
?>


<html>
<head>
<meta charset='utf-8'>
<title>Flork</title>
<meta name='viewport' content='width=device-width, initial-scale=1'>

<link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">
<script src="script/header.js" defer></script>
<script src="script/like.js" defer></script>
<script src="script/addremovefollow.js" defer></script>
<script src="script/profilo.js" defer></script>
<script src="script/modalecommento.js" defer></script>

<link rel="stylesheet" href="style/home.css"/>
<link rel="stylesheet" href="style/profilo.css"/>
<link rel="stylesheet" href="style/header.css"/>
<link rel="stylesheet" href="style/card.css"/>
<link rel="stylesheet" href="style/news.css"/>
<link rel="stylesheet" href="style/modalecommento.css"/>
</head>


<body>


<header>
        <div id="left">
            <a  href="home.php"><img id="headlogo" src="elementi/logo3.png"></img></a>
            <form name='search_user' id='search_user' >
                <input type="search" id="search" placeholder="Cerca un utente..." />
            </form>
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
         <a href="profilo.php?username=<?php echo($_SESSION['username']) ?>"><img id="headprof" data-username="<?php echo($_SESSION['username']) ?>" data-profilepic="<?php echo($row3[0]) ?>" src=" <?php echo($row3[0]) ?>"></a>
         <a href="logout.php"><img  src="elementi/logout.png"></a>
        </div>
    </header>
    <section id="modalenavbar" class="hidden">
    </section>  

    <section id="utente">
        <div id="informazionigenerali">
            <div id="profilepic">
                <img src="<?php echo($row['profilepic']) ?>">
            </div>
            <div id="profileinformation">
                <h1><?php if($flag!=1) echo($row['nome']." ".$row['cognome']) ?></h1>
                <h2 data-idprofile="<?php if($flag!=1) echo($row['id']); else echo("undefined"); ?>" data-username="<?php if($flag!=1) echo($_GET['username']); else echo("undefined"); ?>"><?php if($flag!=1) echo($_GET['username']) ?></h2>
                <p>Followers: <?php if($flag!=1) echo($row1[0]) ?> Follows: <?php if($flag!=1) echo($row2[0]) ?> </<p>
                <div id="interazione">
                    <?php if($_GET['username']!==$_SESSION['username']) echo(" <img id="."segui"." src="."elementi/segui.png"."> Segui")  ?>
                   
                </div>
            </div>
        </div>
        
        <div id="navbarutente">
                <div>
                    <button id="postt" >Post</button>
                    <button id="followerr">Followers</button>
                    <button id="followss">Follows</button>
                    <?php if($_GET['username']==$_SESSION['username'])echo("<button id="."newssalvate".">News Salvate</button>")?>
                </div>
                <div>
                <?php if($_GET['username']==$_SESSION['username'])echo("<button id="."modify"." type="."submit"." href="."logout.php".">Modifica Profilo</button>")?>
                </div>
                
           
        </div>
        
    </section>
    <section id="main">
        <section id="navbar">
        </section>

        <section id="contenuto">
            <h1 class="hidden" id="nopostfound">L'utente non ha ancora caricato nessun post</h1>
            <section id="tweet" class="hidden"> 
            </section> 

            <section id="modal-view-commenti" class="hidden">
            <section id="sezionecommenti"></section>
            </section>
            <h1 class="hidden" id="followers">Followers:</h1>
            <h1 class="hidden" id="follow">Follows:</h1>
            <h1 class="hidden" id="nofound">Nessun utente.</h1>
            <h1 class="hidden" id="nonewssaved">Nessun news salvata.</h1>
            <img src="elementi/no-content.png" id="nocontent" class="hidden">
            <section id="persone" >
            </section>
            <section id="news">
                
            </section>
        </section>
        
        <section id="newss">

        </section>
    </section>

    <section id="errore" class="hidden">
        <img src="elementi/nothing.svg" class="nothing">
        <h1>NESSUN UTENTE TROVATO</h1>
    </section>
    

    <footer>

    </footer>

   
</body>
</html>