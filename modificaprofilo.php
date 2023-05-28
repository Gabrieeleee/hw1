<?php 
    session_start();
    
    include 'dati.php';
   
    $error['password']=NULL;
    $error['verifica_password']=NULL;
    $error['img']=NULL;
    
    $conn=mysqli_connect("localhost","root","","flork");

    
    
    if(!empty($_POST['password']) && !empty($_POST['verifica_password'])){
        if(!preg_match('/^[a-zA-Z0-9_]{7,100}$/', $_POST['password'])){
            $error['password'] = "*Caratteri password insufficienti";
        } else if($_POST['password'] !== $_POST['verifica_password']) {
            $error['verifica_password'] = "*Le passoword non corrispondono";
        }
        else{
            $password=mysqli_real_escape_string($conn,$_POST["password"]);
            $password = password_hash($password, PASSWORD_BCRYPT);
        }
    }

    if(empty($_SESSION['link'])){
        $statusMsg = '';
        $targetDir = "profileimages/";
    
            if(isset($_FILES["file"])){
            $fileName = basename($_FILES["file"]["name"]);
            
            $targetFilePath = $targetDir . $fileName;
            $fileType = pathinfo($targetFilePath,PATHINFO_EXTENSION);
            if($fileType!==""){
            $allowTypes = array('jpg','png','jpeg','gif','pdf');
            if(in_array($fileType, $allowTypes)){
                move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)  ;   
            }else{
                $error['img'] = '*Formato non ammesso.';
            }
        }
        else $targetFilePath="";
        }
    } else if(!empty($_SESSION['link'])){
        $targetFilePath=$_SESSION['link'];
    }  
    unset($_SESSION['link']);

    if(!empty($_POST["password"]) || !empty($targetFilePath) )
    if($error['img'] ===null && $error['password']===null &&  $error['verifica_password']===null){
           
        if(empty($targetFilePath) &&  !empty($_POST["password"]))
            $query="UPDATE utente SET  passwordd='".$password."' WHERE username='".$_SESSION['username']."'";
        else if(empty($_POST["password"]) && empty($_POST['verifica_password']) && !empty($targetFilePath) ){
            $query="UPDATE utente SET profilepic='".$targetFilePath."' WHERE username='".$_SESSION['username']."'";
        } else if(!empty($password) && !empty($_POST['verifica_password']) && !empty($targetFilePath) ) {
            $query="UPDATE utente SET passwordd='".$password."' , profilepic='".$targetFilePath."' WHERE username='".$_SESSION['username']."'";
        }
        $res= mysqli_query($conn,$query);
        $usern=$_SESSION['username'];
        header("Location: profilo.php?username=".$usern);
    }
    else{
        $errore = true;
    }


    $query="SELECT  profilepic,nome,cognome,datadinascita,email,passwordd FROM utente WHERE username= '".$_SESSION['username']."'";
    $res= mysqli_query($conn,$query);
    $row = mysqli_fetch_assoc($res);  
    
        $query="call followandfollower('".$_SESSION['id']."')";
            $res1=mysqli_query($conn,$query);

            $query="SELECT * FROM temp";
            $res2=mysqli_query($conn,$query);
            $row1=mysqli_fetch_assoc($res2);
            
            $vet=array('follower'=>$row1['follower'],'follows'=>$row1['follows']);
        
?>

<html>
<head>

    <meta charset='utf-8'>
    <title>Flork</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <script src="script/header.js" defer></script>
    <script src='script/signup.js' defer></script>
    
    <script src='script/addimgfromimgur.js' defer></script>
    <script src='script/modificaprofilo.js' defer></script>
    <link rel="stylesheet" href="style/imgur.css"/>
    <link rel="stylesheet" href="style/home.css"/>
    <link rel="stylesheet" href="style/profilo.css"/>
    <link rel="stylesheet" href="style/header.css"/>
    <link rel="stylesheet" href="style/signup.css"/>
    <link rel="stylesheet" href="style/modificaprofilo.css"/>
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
         <a href="profilo.php?username=<?php echo($_SESSION['username']) ?>"><img id="headprof" data-username="<?php echo($_SESSION['username']) ?>" data-profilepic="<?php echo($row['profilepic']) ?>" src="<?php echo($row['profilepic']) ?>"></a>
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
                <h1><?php echo($row['nome']." ".$row['cognome']) ?></h1>
                <h2><?php echo($_SESSION['username']) ?></h2>
                <p>Followers: <?php echo($vet['follower']) ?> Follows: <?php echo($vet['follows']) ?> </<p>
                
            </div>
        </div>  


<section class="main">
    <section id="dati">
        <h1>Modofica i tuoi dati!</h1>
        <form name='nome_form' method='post' enctype="multipart/form-data" >
          
            <p class="password">
                <input type='password' name='password' placeholder="Nuova password" >
                <span  class="pass"><?php if($error['password']!=null)echo($error['password']) ?></span>
            </p>
            <p class="verifica_password">
                <input type='password' name='verifica_password' placeholder="Verifica password" >
                <span  class="pass"><?php if($error['verifica_password']!=null)echo($error['verifica_password']);?></span>
            </p>
            <h1>Cambia immagine di profilo</h1>
            <p class="file">
            <input type='file' name='file' accept='.jpg, .jpeg, image/gif, image/png' id="upload_original">
                        <div id="upload"><div class="file_name">Seleziona un file...</div><div class="file_size"></div></div>
                
            </p>
        
            <p id="imma">
            Oppure scegli un'immagine di default:
            <img id="gallery" src="elementi/gallery.png" >
            </p>
            <span class="fileup"><?php if($error['img']!=null)echo($error['img']) ?></span>

            <p>
                <label>&nbsp;<input type='submit'  disabled></label>
            </p>
        </form>
       
        <?php 
        if(isset($errore)){
            echo "<p class='errorephp'>";
            echo "Credenziali non valide.";
            echo "</p>";
        }
    ?>
        <section id="modal-view" class="hidden" >
        </section>
    </section>
</section>
</section>
<footer>
    <h1>Flork © Copyright 2023 by Gabriele Florio</h1>
</footer>
</body>
</html>



