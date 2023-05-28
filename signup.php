<?php 
    session_start();
    
    include 'dati.php';
   

    if(isset($_SESSION["username"])){
       
        header("Location: home.php");
        exit;
    }
    $error['nome']=NULL;
    $error['cognome']=NULL;
    $error['email']=NULL;
    $error['username']=NULL;
    $error['password']=NULL;
    $error['dtn']=NULL;
    $error['img']=NULL;
    
    
    if(isset($_POST["username"]) && isset($_POST["password"]) && isset($_POST["nome"]) && isset($_POST["cognome"])  && isset($_POST["email"])  && isset($_POST["dtn"])){
        
        $cont=0;
        $conn = mysqli_connect($dbconfig['host'], $dbconfig['user'], $dbconfig['password'], $dbconfig['name']);

        //NOME
        if(empty($_POST['nome'])){
            $error['nome'] = "*Nome obbligatorio";
            $cont++;    
        } else if(strlen($_POST['nome'])<1){
            $error['nome'] = "*Nome troppo corto";
            $cont++;
        }

        //COGNOME
        if(empty($_POST['cognome'])){
            $error['cognome'] = "*Cognome obbligatorio";
            $cont++;    
        } else if(strlen($_POST['cognome'])<1){
            $error['cognome'] = "*Cognome troppo corto";
            $cont++;
        }

        //EMAIL
        
        if(empty($_POST['email'])){
            $error['email'] = "*Email obbligatoria";
            $cont++;    
        }
        else if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            $error['email'] = "*Email non valida";
            $cont++;
        } else {
            $email=mysqli_real_escape_string($conn,$_POST["email"]);
            $query = "SELECT email FROM utente WHERE email ='".$email."'";
            $res= mysqli_query($conn,$query);
            if(mysqli_num_rows($res)>0){
                $error['email']="*Email gia utilizzata";
                $cont++;
            }
        }

        //USERNAME
        if(empty($_POST['username'])){
            $error['username'] = "*Username obbligatorio";
            $cont++;    
        }
        else if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
            $error['username'] = "*Username non valido";
            $cont++;
        } else {
            $username=mysqli_real_escape_string($conn,$_POST["username"]);
            $query = "SELECT email FROM utente WHERE username='".$username."'";
            $res= mysqli_query($conn,$query);
            if(mysqli_num_rows($res)>0){
                $error['username']="*Username gia utilizzato";
                $cont++;
            }
        }

        //PASSWORD
        if(empty($_POST['password'])){
            $error['password'] = "*Password obbligatoria";
            $cont++;    
        } else if (!preg_match('/^[a-zA-Z0-9_]{7,100}$/', $_POST['password'])) {
            $error['password'] = "*Password non valida";
            $cont++;
        } else{
            $password=mysqli_real_escape_string($conn,$_POST["password"]);
            $password = password_hash($password, PASSWORD_BCRYPT);
        }

        
        
        
        if(empty($_POST['dtn'])){
            $error['dtn'] = "*Data di nascita obbligatoria";
            $cont++; 
        }
        
        //password=password_hash($password,PASSWORD_BCRYPT);

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
                        $cont++;
                    }
                }  
        } 
        }else if(!empty($_SESSION['link'])){
            $targetFilePath=$_SESSION['link'];
        }

        unset($_SESSION['link']);

        if($cont==0){

            $nome=mysqli_real_escape_string($conn,$_POST["nome"]);
            $cognome=mysqli_real_escape_string($conn,$_POST["cognome"]);
            $datadinascita=mysqli_real_escape_string($conn,$_POST["dtn"]);

            $nomee=ucfirst($nome);
            $cognomee=ucfirst($cognome);
            if($targetFilePath==='profileimages/')
                $targetFilePath="elementi/user.png";
                $query="INSERT INTO utente(nome,cognome,profilepic,email,passwordd,username,datadinascita) VALUES('$nomee','$cognomee','$targetFilePath','$email','$password','$username','$datadinascita')";
            
            $res= mysqli_query($conn,$query);

            $query="SELECT id from utente where username='".$username."'";
            $res=mysqli_query($conn,$query);
            $row=mysqli_fetch_row($res);
            $_SESSION['id']=$row[0];
            $_SESSION["username"] = $_POST["username"];
            header("Location: home.php");
            exit;
        }
        else{
            $errore = true;
        }
        
        mysqli_close($conn);
    }
           
?>

<html>
<head>

    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Flork</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <script src='script/signup.js' defer></script>
    <script src='script/addimgfromimgur.js' defer></script>
    <link rel="stylesheet" href="style/signup.css"/>
    <link rel="stylesheet" href="style/imgur.css"/>
</head>
<body>
<section class="main">
    
       

    <section id="dati">
        <h1>Iscriviti!</h1>
    <form name='nome_form' method='post' enctype="multipart/form-data">
        <p class="nome">
             <input type='text' name='nome' placeholder="Nome ">
             <span><?php  if($error['nome']!=null) echo($error['nome']) ?></span>
        </p>
        <p class="cognome">
            <input type='text' name='cognome' placeholder="Cognome">
           <span><?php if($error['cognome']!=null) echo($error['cognome']) ?></span>
        </p>
       
        <p class="dtn">
            <input type='date' name='dtn' placeholder="Data Di Nascita">
            <span><?php if($error['dtn']!=null) echo($error['dtn']) ?></span>
        </p>
        <p class="email">
             <input type='text' name='email' placeholder="Email">
             <span><?php if($error['email']!=null)echo($error['email']) ?></span>
        </p>
        <p class="username">
             <input type='text' name='username'  placeholder="Username" >
             <span><?php if($error['username']!=null)echo($error['username']) ?></span>
        </p>
        <p class="password">
            <input type='password' name='password' placeholder="Password">
            <span class="pass"><?php if($error['password']!=null)echo($error['password']) ?></span>
        </p>
        <p class="verifica_password">
                <input type='password' name='verifica_password' placeholder="Verifica password" >
                <span class="pass"></span>
            </p>
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
            <label>&nbsp;<input type='submit'></label>
        </p>
    </form>
    
    <section id="modal-view" class="hidden" >
            </section>
    <div>
    <?php 
        if(isset($errore)){
            echo "<p class='errorephp'>";
            echo "Credenziali non valide.";
            echo "</p>";
        }
    ?>
<p class="subm">
    <a href="login.php">Hai già un account? Effettua il login</a>
    </p>
    </div>
    </section>

    </section>
</body>
</html>