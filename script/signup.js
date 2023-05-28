
function controllapassword(event){
    const password=document.querySelector('.password input');
    
    if(!/^[a-zA-Z0-9_]{8,100}$/.test(password.value)){
        password.classList.add('errore');
        document.querySelector('.password span').textContent="La passowrd deve contenere 8 caratteri e lettere e/o numeri!"
    } else{
        password.classList.remove('errore');
        document.querySelector('.password span').textContent="";
        
    }
    
}

function cotrollaverificapassword(event){
    const passwordd=document.querySelector('.verifica_password input');
    const password=document.querySelector('.password input');
    
    if(passwordd.value!==password.value){
        passwordd.classList.add('errore');
        document.querySelector('.verifica_password span').textContent="La password non corrisponde!"
        
    } else{
        passwordd.classList.remove('errore');
        document.querySelector('.verifica_password span').textContent="";
       
    }
}

function controllanome(event){
    const nome=document.querySelector('.nome input');
    
    if(nome.value.length<1){
        nome.classList.add('errore');
        document.querySelector('.nome span').textContent="il nome deve contenere almeno 1 carattere!"
        
    } else{
        nome.classList.remove('errore');
        document.querySelector('.nome span').textContent="";
        
    }
    
}

function controllacognome(event){
    const cognome=document.querySelector('.cognome input');
   
    
    if(cognome.value.length<1){
        cognome.classList.add('errore');
        document.querySelector('.cognome span').textContent="Il cognome deve contenere almeno 1 carattere!"
        
        
    } else{
        cognome.classList.remove('errore');
        document.querySelector('.cognome span').textContent="";
       
    }
    
}

function Jsoncontrollausername(json){
    console.log(json);
    
    const username=document.querySelector('.username input');
    if(json=="true"){
       
        username.classList.add('errore');
        document.querySelector('.username span').textContent="Username già utilizzato!"
        
    }
    else{
        username.classList.remove('errore');
        document.querySelector('.username span').textContent="";
       
    }
}

function controllausername(event){
   
    const username=document.querySelector('.username input');
    if(!/^[a-zA-Z0-9_]{5,100}$/.test(username.value)){
        username.classList.add('errore');
        document.querySelector('.username span').textContent="La username deve contenere 5 caratteri e lettere e/o numeri!"
       
    } else{
        const usern=encodeURIComponent(String(username.value));
        console.log(usern);
        fetch("controllausername.php?q="+usern).then(onResponse).then(Jsoncontrollausername);
    } 
    
}

function Jsoncontrollaemail(json){
    console.log(json);
    const email=document.querySelector('.email input');
    if(json=="true"){
        email.classList.add('errore');
        document.querySelector('.email span').textContent="Email già utilizzata!"
        
    }else{
        email.classList.remove('errore');
        document.querySelector('.email span').textContent=""
        
    }
}

function onResponse(response) {
  
    return response.json();
}


function controllaemail(event){
    const email=document.querySelector('.email input');
    email.classList.remove('errore');
    
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(email.value).toLowerCase())) {
        email.classList.add('errore');
        document.querySelector('.email span').textContent="L' email non è valida!"
       
    } else{
        const emaill=encodeURIComponent(String(email.value)).toLowerCase();
        console.log(emaill);
        fetch("controllaemail.php?q="+emaill).then(onResponse).then(Jsoncontrollaemail);
    
    }
    
}

function checkUpload(event) {
   
    const upload_original = document.getElementById('upload_original');
    document.querySelector('#upload .file_name').textContent = upload_original.files[0].name;
    const o_size = upload_original.files[0].size;
    const mb_size = o_size / 1000000;
    document.querySelector('#upload .file_size').textContent = mb_size.toFixed(2)+" MB";
    const ext = upload_original.files[0].name.split('.').pop();
    
    if (o_size >= 7000000) {
        document.querySelector('.fileup').textContent = "Le dimensioni del file superano 7 MB";
        document.querySelector('.fileup').classList.add('errore');
        submit.disabled=true;
        
    } else if (!['jpeg', 'jpg', 'png', 'gif'].includes(ext))  {
        document.querySelector('.fileup').textContent = "Le estensioni consentite sono .jpeg, .jpg, .png e .gif";
        document.querySelector('.fileup').classList.add('errore');
        submit.disabled=true;
        
    } else {
       document.querySelector('.fileup').classList.remove('errore');
       document.querySelector('.fileup').textContent = "";
       console.log("non so0");
       submit.disabled=false;
    }
}

document.querySelector('.password input').addEventListener('blur',controllapassword);
document.querySelector('.verifica_password input').addEventListener('blur',cotrollaverificapassword);
document.querySelector('.password input').addEventListener('focusout',cotrollaverificapassword);
document.querySelector('#upload_original').addEventListener('change', checkUpload);

if(document.querySelector('.email input')!==null && document.querySelector('.username input')!==null ){
document.querySelector('.email input').addEventListener('blur',controllaemail);
document.querySelector('.username input').addEventListener('blur',controllausername);
document.querySelector('.nome input').addEventListener('blur',controllanome);
document.querySelector('.cognome input').addEventListener('blur',controllacognome);
}


submit=document.querySelector('input[type=submit]');

