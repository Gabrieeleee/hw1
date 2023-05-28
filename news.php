<?php 
    include 'auth.php';
    if(!$user = checkAuth())exit;
    $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);
    $query="SELECT  profilepic FROM utente WHERE username= '".$_SESSION['username']."'";
    $res= mysqli_query($conn,$query);
    $row = mysqli_fetch_assoc($res);  
?>

<html>
<head>
<meta charset='utf-8'>
<title>Flork</title>
<meta name='viewport' content='width=device-width, initial-scale=1'>
<script src="script/news.js" defer></script>
<script src="script/header.js" defer></script>
<link rel="stylesheet" href="style/news.css"/>
<link rel="stylesheet" href="style/header.css"/>

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
         <a href="profilo.php?username=<?php echo($_SESSION['username']) ?>"><img id="headprof" data-username="<?php echo($_SESSION['username']) ?>" data-profilepic="<?php echo($row['profilepic']) ?>" src=" <?php echo($row['profilepic']) ?>"></a>
         <a href="logout.php"><img  src="elementi/logout.png"></a>
        </div>
    </header>
    <section id="modalenavbar" class="hidden">
    </section>
    
    <div class="ricarica">
        <img id="caricanews" src="elementi/nextpage.png">
    </div>
  
    <section id="news">   
    </section>

    
</body>
</html>