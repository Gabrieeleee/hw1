<?php 
    include 'auth.php';
    if(!$user = checkAuth())exit;

    $conn=mysqli_connect("localhost","root","","flork");
    $query="SELECT  profilepic FROM utente WHERE username= '".$_SESSION['username']."'";
    $res= mysqli_query($conn,$query);
    $row = mysqli_fetch_assoc($res);   
   
    if(isset($_POST["contenutopost"])){
        
        $targetDir = "images/";
        if(isset($_FILES["file"])){
            // Allow certain file formats
            $fileName = basename($_FILES["file"]["name"]);
            $targetFilePath = $targetDir . $fileName;
            $fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);

            $allowTypes = array('jpg','png','jpeg','gif','pdf');
            if(in_array($fileType, $allowTypes)){
                move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)  ;   
            }else{
                $targetFilePath=null;
            }
        }
       
        $contenuto=mysqli_real_escape_string($conn,$_POST["contenutopost"]);

       if($targetFilePath=='images/'){
        $targetFilePath=null;
       }
        $id=$_SESSION['id'];
        $query="INSERT INTO post(testo,utente,immagine,datapubblicazione) VALUES('$contenuto','$id','$targetFilePath',NOW())";
        $res= mysqli_query($conn,$query);
    }

?>
<html>
<head>

<meta charset='utf-8'>

<title>Flork</title>
<meta name='viewport' content='width=device-width, initial-scale=1'>
<script src="script/header.js" defer></script>
<script src="script/home.js" defer></script>
<script src="script/modalecreapost.js" defer></script>
<script src="script/modalecommento.js" defer></script>
<script src="script/like.js" defer></script>
<link rel="stylesheet" href="style/home.css"/>
<link rel="stylesheet" href="style/newshome.css"/>
<link rel="stylesheet" href="style/header.css"/>
<link rel="stylesheet" href="style/modalecreapost.css"/>
<link rel="stylesheet" href="style/modalecommento.css"/>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet">

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
    <section id="main">
        <section id="navbar">
            <div id="fix">
            <section id="nav">
            <a href="profilo.php?username=<?php echo($_SESSION['username']) ?>" class="h"><img  src=" <?php echo($row['profilepic']) ?>"><?php echo($_SESSION['username']) ?></img></a>
            <a href="amici.php" class="h"><img  src=" elementi/friends.png">Utenti</a>
            <a href="news.php" class="h"><img  src=" elementi/news.png">News</a>
            </section>
            <form name='search_post' id='search_postt'>
                <input type="search" name="chiave" id="search_pos" placeholder="Cerca post..." />
            </form>
            </div>
        </section>
        <section id="contenuto">
            <section class="tweetta">
            <img src=" <?php echo($row['profilepic']) ?>"></img>
                <form name='share_post' id='share_post' method='post' enctype="multipart/form-data">
                    <textarea  name='contenutopost' id="pensiero" placeholder="A cosa stai pensando <?php echo($_SESSION["username"]) ?>?" rows=2 disabled></textarea>
                </form>
            </section>
            <section id="modal-view" class="hidden">
            </section>
            <section id="modal-view-commenti" class="hidden">
            <section id="sezionecommenti"></section>
            </section>
            
            <section id="tweet">
            
            </section>
            <h1 id="nopostfound" class="hidden"> NESSUN POST</h1>
            
        </section>
        
        <section id="newss">
            <h1>Le ultime notizie:</h1>
            <section class="news">            
            </section>
        </section>
    </section>

    <footer>

    </footer>

   
</body>
</html>