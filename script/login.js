function controllapassword(event){
    const password=document.querySelector('.password input');
    if(password.value.length<8){
        password.classList.add('errore');
        document.querySelector('.password span').textContent="La passowrd deve contenere 8 caratteri!"
    } else{
        password.classList.remove('errore');
        document.querySelector('.password span').textContent=""
    }
    
}

function controllausername(event){
    const username=document.querySelector('.username input');
    console.log(username);
    if(username.value.length<5){
        username.classList.add('errore');
        document.querySelector('.username span').textContent="Lo username deve contenere almeno 5 caratteri!"
    } else{
        username.classList.remove('errore');
        document.querySelector('.username span').textContent="";  
    }
    
}

function onResponse(response) {
  
    return response.json();
}


document.querySelector('.username input').addEventListener('blur',controllausername);
document.querySelector('.password input').addEventListener('blur',controllapassword);
