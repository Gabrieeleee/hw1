function onJsonamicoaggiunto(json){
    console.log(json);
    aggiornafollowandfollower1();
    if(username===usernameutente)
    aggiornafollowandfollower();
}



function addfollow(event){
    event.stopPropagation();

    const imgcliccata=event.currentTarget;
    imgcliccata.src="elementi/seguigia.png";
    imgcliccata.removeEventListener('click',addfollow);
    imgcliccata.addEventListener('click',removefollow);
    const usernamecliccato=imgcliccata.parentNode.parentNode.querySelector('.informazioni h2');
    
    profilocliccato=imgcliccata.parentNode.parentNode;
    const idprofilocliccato=profilocliccato.dataset.idprofilo;

    const uttrovati=document.querySelectorAll('#persone .card');
        if(uttrovati.length!==0)
            for(let i=0; i<uttrovati.length;i++){
                if(idprofilocliccato===uttrovati[i].dataset.idprofilo){
                    idd=uttrovati[i].dataset.idprofilo
                   
                    
                }
            }
    fetch("addfollow.php?id="+usernamecliccato.textContent).then(onResponse).then(onJsonamicoaggiunto);
}
    



function onJsonverificafollow(json){
    console.log(json);
    const uttrovati=document.querySelectorAll('#persone .card');
    if(json!=='false'){
       for(let c=0;c<uttrovati.length;c++){
            if(uttrovati[c].dataset.idprofilo===json){
                const img=uttrovati[c].querySelector('.segui img');
                img.src="elementi/seguigia.png";
                img.removeEventListener('click',addfollow);
                img.addEventListener('click',removefollow);
                    
            } 
        }
    } 
}


function controllasefollow(json){
    console.log(json);
    for(let i=0;i<json.length;i++){
        console.log(json[i].id);
        fetch("controllasefollow.php?id="+json[i].id).then(onResponse).then(onJsonverificafollow);
    }
}


function removefollow(event){
    event.stopPropagation();
    const imgcliccata=event.currentTarget;
    
    imgcliccata.src="elementi/segui.png";
    imgcliccata.addEventListener('click',addfollow);
    imgcliccata.removeEventListener('click',removefollow);
  
    idd=imgcliccata.parentNode.parentNode.dataset.idprofilo
   
      
    fetch("removefollow.php?id="+imgcliccata.parentNode.parentNode.dataset.idprofilo).then(onResponse).then(onJsonamicorimosso);    
}


function onJsonamicorimosso(json){
    console.log(json);
    aggiornafollowandfollower1();
    if(username===usernameutente)
    aggiornafollowandfollower();
    
}

var idd;


function aggiornafollowandfollower1(){
    fetch("reloadfollowandfollower.php?id="+idd).then(onResponse).then(onJsonaggiornato1);
}


function onJsonaggiornato1(json){
    const boh=document.querySelectorAll('.inffollow');
    console.log(boh[0].lastChild);
    for(const box of boh){
        if(box.parentNode.parentNode.dataset.idprofilo===idd){
            box.firstChild.textContent="Followers: "+json.follower;
            box.lastChild.textContent="Follows: "+json.follows;
        }
    }
}