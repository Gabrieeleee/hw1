<?php 
    session_start();

    if(isset($_SESSION["username"])){
       
        header("Location: home.php");
        exit;
    }
    
    $error['username'] =NULL;
    $error['password'] =NULL;
    if(isset($_POST["username"]) && isset($_POST["password"])){
       $cont=0; 
        $conn=mysqli_connect("localhost","root","","flork");
    
    if(empty($_POST['username'])){
        $error['username'] = "*Username obbligatorio";
        $cont++;  
        
        echo($cont);  
    }
    else if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $_POST['username'])) {
        $error['username'] = "*Username non valido";
        $cont++;
        
        echo($cont);
    } else {
        $username=mysqli_real_escape_string($conn,$_POST["username"]);
    }


    if(empty($_POST['password'])){
        $error['password'] = "*Password obbligatoria";
        $cont++;  
        echo($cont);  
        
    } else if (strlen($_POST["password"]) < 8) {
        $error['password'] = "*Caratteri password insufficienti";
        $cont++;
        
        echo($cont);
    } else{
        $password=mysqli_real_escape_string($conn,$_POST["password"]);
    }


    if($error['username']===null &&  $error['password']===null ){
        $query= "SELECT id,username,passwordd FROM utente WHERE username = '".$username."'";
        $res= mysqli_query($conn,$query);
        $row=mysqli_fetch_assoc($res);
        
        if(mysqli_num_rows($res)>0){
            if (password_verify($_POST['password'], $row['passwordd'])) {
                $_SESSION["username"] = $_POST["username"];
                $_SESSION["id"]=$row['id'];
                header("Location: home.php");
                exit;
            }else{
                $errore = true;
            }
        }
        else{
            $errore = true;
        }
    }else{
        $errore = true;
    }
    }
?>

<html>
<head>

    <meta charset='utf-8'>
    <meta http-equiv='X-UA-Compatible' content='IE=edge'>
    <title>Flork</title>
    <meta name='viewport' content='width=device-width, initial-scale=1'>
    <script src="script/login.js" defer></script>
    <link rel="stylesheet" href="style/login.css"/>
</head>
<body>
<section class="main">
    
       

    <section id="dati">
        <h1>Effettua l'accesso!</h1>
    <form name='nome_form' method='post'>
        <p class="username">
             <input type='text' name='username'  placeholder="Username" >
             <span><?php if($error['username']!=null)echo($error['username']) ?></span>
        </p>
        <p class="password">
            <input type='password' name='password' placeholder="Password">
            <span><?php if($error['password']!=null)echo($error['password']) ?></span>
        </p>
        <p>
           <input type='submit'>
        </p>
    </form>

    <div>
    <?php 
        if(isset($errore)){
            echo "<p class='errorephp'>";
            echo "Dati errati!";
            echo "</p>";
        }
    ?>
<p class="subm">
    <a href="signup.php">Non hai un account? Registrati</a>
    </p>
    </div>
    </section>

    </section>
</body>
</html>