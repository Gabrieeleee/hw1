function onResponse(response) {
    return response.json();
}

function addtext(json,variabile){

    const sez=document.querySelector(variabile);

    const card=document.createElement('div');
    card.classList.add('card');
    card.dataset.idprofilo=json.id;

    const info=document.createElement('div');
    info.classList.add('informazioni');

    const img=document.createElement('img');
    const h1=document.createElement('h1');
    const h2=document.createElement('h2');

    const infofollow=document.createElement('div');
    infofollow.classList.add('inffollow');

    const p=document.createElement('p');
    const p1=document.createElement('p');

    const segui=document.createElement('div');
    segui.classList.add('segui');

    const img1=document.createElement('img');

    img.src=json.profilepic;
    h1.textContent=json.nome+" "+json.cognome;
    h2.textContent=json.username;
    info.appendChild(img);
    info.appendChild(h1);
    info.appendChild(h2);

    p.textContent="Follower: "+json.follower;
    p1.textContent="  Follows: "+json.follows;
    infofollow.appendChild(p);
    infofollow.appendChild(p1);
    info.appendChild(infofollow);

    if(username!==json.username){
        img1.src="elementi/segui.png";
        
        img1.addEventListener('click',addfollow);
    } else {
        img1.src="elementi/you.png";
    }
    segui.appendChild(img1);
    card.appendChild(info);
    card.appendChild(segui);

    sez.appendChild(card);  
}

function onJsoncarica(json){
    console.log(json);

    if(json!=='false'){
        document.querySelector('#trovato').classList.remove('hidden');
        document.querySelector('#nontrovato').classList.add('hidden');
        document.querySelector('#nocontent').classList.add('hidden');
        document.querySelector('#caricaaltributton').id=('caricaaltributton');
        for(let c=0;c<json.length;c++){
            if(c<6)
                addtext(json[c],'#persone');
            else
                utentirimanenti[c-6]=json[c];
        }
    } else{
        document.querySelector('#nontrovato').classList.remove('hidden');
        document.querySelector('#nocontent').classList.remove('hidden');
        document.querySelector('#trovato').classList.add('hidden');
        document.querySelector('#caricaaltributton').id=('hiddenn');
    }
    aggiungieventocard();
}

function caricautenti(){
    fetch("carica_utenti.php").then(onResponse).then(onJsoncarica);
}

function caricaaltriutenti(){
    if(utentirimanenti!==null){
        for(let c=0;c<utentirimanenti.length;c++){
            if(utentirimanenti[c]!==null){
            if(c<6){
                addtext(utentirimanenti[c],'#persone');
                utentirimanenti[c]=null;
            }
            else{
                ute=utentirimanenti[c];
                utentirimanenti[c]=null;
                utentirimanenti[c-6]=ute;
            }
        }
    }
        aggiungieventocard();
    }
}

function svuotaricerca(){
    const sezione=document.querySelector('#cercautente');
    sezione.innerHTML='';
}

function svuotapersone(){
    const sezione=document.querySelector('#persone');
    sezione.innerHTML='';
}

function onJsontrovautente(json){
    //utentitrovati=json
    if(json!=='false'){  
        document.querySelector('#true').classList.remove('hidden');
        document.querySelector('#close').classList.remove('hidden');
        document.querySelector('#false').classList.add('hidden');
        for(let c=0;c<json.length;c++){
            addtext(json[c],'#cercautente');
            controllasefollow(json[c].id);
        }
    }
    else{
        document.querySelector('#true').classList.add('hidden');
        document.querySelector('#false').classList.remove('hidden');
        document.querySelector('#close').classList.remove('hidden');
    }
    document.querySelector('#close').addEventListener('click',closesection);
    aggiungieventocard();
}

function closesection(event){
    svuotaricerca();
    document.querySelector('#true').classList.add('hidden');
    document.querySelector('#false').classList.add('hidden');
    document.querySelector('#close  ').classList.add('hidden');
}

function search(event){
    event.preventDefault();
    svuotaricerca();
    const input=document.querySelector('#search');
    const value= encodeURIComponent(input.value);
    fetch("cercautente.php?chiave="+value).then(onResponse).then(onJsontrovautente);
}

function controllasefollow(id){
    console.log(id);
    fetch("controllasefollow.php?id="+id).then(onResponse).then(onJsonverificafollow);
}

function onJsonverificafollow(json){
    console.log(json);
    const uttrovati=document.querySelectorAll('#cercautente .card');
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

function addfollow(event){
    event.stopPropagation();

    const imgcliccata=event.currentTarget;
    imgcliccata.src="elementi/seguigia.png";
    imgcliccata.removeEventListener('click',addfollow);
    imgcliccata.addEventListener('click',removefollow);
    const usernamecliccato=imgcliccata.parentNode.parentNode.querySelector('.informazioni h2');
    
    profilocliccato=imgcliccata.parentNode.parentNode;
    const idprofilocliccato=profilocliccato.dataset.idprofilo;

    const uttrovati=document.querySelectorAll('#cercautente .card');
        if(uttrovati.length!==0)
            for(let i=0; i<uttrovati.length;i++){
                if(idprofilocliccato===uttrovati[i].dataset.idprofilo){
                    idd=uttrovati[i].dataset.idprofilo
                    userr=uttrovati[i].querySelector('.informazioni h2').textContent; 
                }
            }
    fetch("addfollow.php?id="+usernamecliccato.textContent).then(onResponse).then(onJsonamicoaggiunto);
}

function onJsonamicoaggiunto(json){
    svuotapersone();
    caricautenti();  
    const uttrovati=document.querySelectorAll('#cercautente .card');
    if(uttrovati.length!==0){
        for(let c=0;c<uttrovati.length;c++){
            if(profilocliccato.dataset.idprofilo===uttrovati[c].dataset.idprofilo){
                controllasefollow(uttrovati[c].dataset.idprofilo);
            }
        }
        aggiornafollowandfollower1();
    }
}


function removefollow(event){
    event.stopPropagation();
    const imgcliccata=event.currentTarget;
    
    imgcliccata.src="elementi/segui.png";
    imgcliccata.addEventListener('click',addfollow);
    imgcliccata.removeEventListener('click',removefollow);
  
    idd=imgcliccata.parentNode.parentNode.dataset.idprofilo
    userr=imgcliccata.parentNode.parentNode.querySelector('.informazioni h2').textContent; 
      
    fetch("removefollow.php?id="+imgcliccata.parentNode.parentNode.dataset.idprofilo).then(onResponse).then(onJsonamicorimosso);    
}

function onJsonamicorimosso(json){
    svuotapersone();
    caricautenti();   
    aggiornafollowandfollower1();
}

function aggiornafollowandfollower1(){
    fetch("reloadfollowandfollower.php?id="+idd).then(onResponse).then(onJsonaggiornato1);
}

function onJsonaggiornato1(json){
    const boh=document.querySelectorAll('.inffollow');
    
    for(const box of boh){
        if(box.parentNode.parentNode.dataset.idprofilo===idd){
            box.firstChild.textContent="Followers: "+json.follower;
            box.lastChild.textContent="Follows: "+json.follows;
        }
    }
}

function vaialprofilo(event){
    card=event.currentTarget;
    window.location.assign('profilo.php?username='+card.querySelector('.informazioni h2').textContent);
}

function aggiungieventocard(){
    const card=document.querySelectorAll('.card');
    for(const box of card){
        box.addEventListener('click',vaialprofilo);
    }
}


var profilocliccato;
var utentirimanenti=[];

const searchbuttonn=document.querySelector('#search_user_name');
searchbuttonn.addEventListener('submit',search);

const caricaaltr=document.createElement('button');
caricaaltr.id="caricaaltributton";
caricaaltr.textContent="Carica utenti"
caricaaltr.addEventListener('click',caricaaltriutenti);
document.querySelector('#titolopers').appendChild(caricaaltr);


caricautenti();