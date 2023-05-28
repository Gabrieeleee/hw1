function verificaseenablesubmit(){
    console.log("io");
    let flag=0;
    const input=document.querySelectorAll('input[type=password]');
    const sp=document.querySelectorAll('.pass');
    console.log(sp);
    for(let c=0;c<2;c++){
        console.log(sp[c].innerHTML);
        console.log(input[c].value.length);
        if( sp[c].innerHTML===""){
            submit.disabled=false;
        }
        else{
            submit.disabled=true;
            flag=1;
            break;
            
        }
    }

    if(flag===0){
    const spanfile=document.querySelector('.fileup');
    console.log(spanfile);
    if(spanfile.innerHTML==="")
        submit.disabled=false;
        else
        submit.disabled=true;
    }
}



function verificasecaricataimgfromimgur(){
    const im=document.querySelector('#gallery').dataset.linkimg;
    if(im!==undefined){
        submit.disabled=false;
        document.querySelector('.fileup').classList.remove('errore');
       document.querySelector('.fileup').textContent = "";
        verificaseenablesubmit();
    }
}

document.querySelector('#upload_original').addEventListener('change',verificaseenablesubmit);
document.querySelector('#modal-view').addEventListener('click',verificasecaricataimgfromimgur);
submit=document.querySelector('input[type=submit]');
document.querySelector('.password input').addEventListener('focusout',verificaseenablesubmit);
document.querySelector('.verifica_password input').addEventListener('focusout',verificaseenablesubmit);


