function onResponse(response) {
    return response.json();
}

function addtext(json){

    const sez=document.querySelector('#tweet');

    const elem=document.createElement('section');
    elem.classList.add('elemento');
    elem.dataset.idpost=json.id;

    const head=document.createElement('div');
    head.classList.add('headerpost');

    const profilepic=document.createElement('img');

    const tit=document.createElement('div');
    tit.classList.add('titolo');
        
    const h1=document.createElement('h1');
    const p=document.createElement('p');

    const tes=document.createElement('div');
    tes.classList.add('testo');

    const p1=document.createElement('p');
    const imm=document.createElement('img');
    
    const datap=document.createElement('p');
    
    const int=document.createElement('div');
    int.classList.add('interazione');

    const int0=document.createElement('div');
    int0.classList.add('mipiace');

    const pmipiace=document.createElement('p');
    pmipiace.textContent=json.like;

    const love=document.createElement('img');
    love.classList.add('lovee');

    const deletee=document.createElement('img');

    const comm=document.createElement('img');
   
        
        profilepic.src=json.pic;
        head.appendChild(profilepic);
        h1.textContent=json.username;
        tit.appendChild(h1);
        datap.textContent=json.datapubblicazione;
        tit.appendChild(datap);
        head.appendChild(tit);
        elem.appendChild(head);

        if(json.testo!==null){
            p1.textContent=json.testo;
            tes.appendChild(p1);
        }
        if(json.immagine!==""){
            imm.src=json.immagine;
            tes.appendChild(imm);
            console.log("mmii");
        }
        if(json.testo!==null || json.immagine!=null)
            elem.appendChild(tes);

        love.src="elementi/heart.png";
        int0.appendChild(love);
        int0.appendChild(pmipiace);
        int.appendChild(int0);
        comm.src="elementi/commenta.png";
       
        comm.addEventListener('click',ottienicommenti);
        int.appendChild(comm);
        if(username===usernameutente){
            deletee.src="elementi/delete.png";
            deletee.addEventListener('click',deletepost);
            int.appendChild(deletee);
        }
        elem.appendChild(int);

        sez.appendChild(elem);
        
       
    
}

function onJsoncarica(json){
   
    if(json!=='false'){
    for(let c=0; c<json.length;c++){
        addtext(json[c]);
    }
    controllalike();
    } else{
        document.querySelector('#nopostfound').classList.remove('hidden');
       // document.querySelector('#nocontent').classList.remove('hidden');
    }
    document.querySelector('#postt').classList.add('colorabottone');
    document.querySelector('#followerr').classList.remove('colorabottone');
    document.querySelector('#followss').classList.remove('colorabottone');
    document.querySelector('#tweet').classList.remove('hidden');
    if(username===usernameutente)
        document.querySelector('#newssalvate').classList.remove('colorabottone'); 
}

function caricapost(){
    svuotafollower();
    if(username===usernameutente)
    svuotanews()
    svuotapagina();
    document.querySelector('#follow').classList.add('hidden');
    document.querySelector('#followers').classList.add('hidden');
    document.querySelector('#nofound').classList.add('hidden');
    document.querySelector('#nopostfound').classList.add('hidden');
    document.querySelector('#nonewssaved').classList.add('hidden');
    //document.querySelector('#nocontent').classList.remove('hidden');
    fetch("carica_post.php?username="+usernameutente).then(onResponse).then(onJsoncarica);
}

function onJsonrimuovipost(json){
    console.log(json);
}

function deletepost(event){
    const postcliccato=event.currentTarget;
    const idpostt=(postcliccato.parentNode.parentNode).dataset.idpost;
    postcliccato.parentNode.parentNode.innerHTML="";
    fetch("delete_post.php?idpost="+idpostt).then(onResponse).then(onJsonrimuovipost);
}

function svuotapagina(){
    document.querySelector('#tweet').innerHTML='';
}

function svuotafollower(){
    document.querySelector('#persone').innerHTML='';
}


function addcard(json,variabile){

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

    img.src=json.profilepic;
    h1.textContent=json.nome+" "+json.cognome;
    h2.textContent=json.username;
    info.appendChild(img);
    info.appendChild(h1);
    info.appendChild(h2);

    p.textContent="Follower: "+json.follower;
    p.classList.add('r');
    p1.textContent="  Follows: "+json.follows;
    p1.classList.add('s');
    infofollow.appendChild(p);
    infofollow.appendChild(p1);
    info.appendChild(infofollow);
    const img1=document.createElement('img');
    
    if(username!==json.username){
        img1.src="elementi/segui.png";
        img1.addEventListener('click',addfollow);
    }else
        img1.src="elementi/you.png";
    
    segui.appendChild(img1);
    
    
    card.appendChild(info);
    card.appendChild(segui);

    sez.appendChild(card);
    
    aggiungieventocard()
}

function onJsoncaricafollowe(json){
    if(json!=='false'){
        for(let c=0;c<json.length;c++){
            addcard(json[c],'#persone');
        }
        controllasefollow(json);
    }else{
        document.querySelector('#nofound').classList.remove('hidden');
        document.querySelector('#nocontent').classList.remove('hidden');
    }
}

function mostrafollower(){
    svuotapagina();
    svuotafollower();
    svuotanews()
    document.querySelector('#postt').classList.remove('colorabottone');
    document.querySelector('#followerr').classList.add('colorabottone');
    document.querySelector('#followss').classList.remove('colorabottone');
    document.querySelector('#tweet').classList.add('hidden');
    if(username===usernameutente)
        document.querySelector('#newssalvate').classList.remove('colorabottone');
    document.querySelector('#followers').classList.remove('hidden');
    document.querySelector('#follow').classList.add('hidden');
    document.querySelector('#nofound').classList.add('hidden');
    document.querySelector('#nonewssaved').classList.add('hidden');
    document.querySelector('#nopostfound').classList.add('hidden');
    document.querySelector('#nocontent').classList.add('hidden');
    fetch("carica_utenti.php?id="+idprofilo+"&azione=follower").then(onResponse).then(onJsoncaricafollowe);
}

function mostrafollowss(){
    svuotapagina();
    svuotafollower();
    svuotanews()
    document.querySelector('#postt').classList.remove('colorabottone');
    document.querySelector('#followerr').classList.remove('colorabottone');
    if(username===usernameutente)
        document.querySelector('#newssalvate').classList.remove('colorabottone');
    document.querySelector('#followss').classList.add('colorabottone');
    document.querySelector('#follow').classList.remove('hidden');
    document.querySelector('#followers').classList.add('hidden');
    document.querySelector('#nofound').classList.add('hidden');
    document.querySelector('#nonewssaved').classList.add('hidden');
    document.querySelector('#nopostfound').classList.add('hidden');
    document.querySelector('#nocontent').classList.add('hidden');
    fetch("carica_utenti.php?id="+idprofilo+"&azione=follows").then(onResponse).then(onJsoncaricafollowe);
}

function vaialprofiloo(event){
    card=event.currentTarget;
    window.location.assign('profilo.php?username='+card.querySelector('.informazioni h2').textContent);
}

function aggiungieventocard(){
    const card=document.querySelectorAll('.card');
    for(const box of card){
        box.addEventListener('click',vaialprofiloo);
    }
}




function addtheaddfollowmainheader(){
    const img1=document.querySelector('#segui');
    img1.addEventListener('click',addfollowheader);
}

function addfollowheader(event){
    const imgcliccata=event.currentTarget;
    imgcliccata.src="elementi/seguigia.png";
    imgcliccata.removeEventListener('click',addfollowheader);
    imgcliccata.addEventListener('click',rimuovifollowheader);
    const usernamecliccato=imgcliccata.parentNode.parentNode.querySelector('#profileinformation h2');
    fetch("addfollow.php?id="+usernamecliccato.textContent).then(onResponse).then(aggiornafollowandfollower);
}

function controllasefollowheader(){
    fetch("controllasefollow.php?id="+idprofilo).then(onResponse).then(onJsonverificafollowheader);
}

function onJsonverificafollowheader(json){
    const img=document.querySelectorAll('.segui img');
    if(json!=='false'){
        const imgcliccata=document.querySelector('#segui');
        imgcliccata.src="elementi/seguigia.png";
        imgcliccata.removeEventListener('click',addfollowheader);
        imgcliccata.addEventListener('click',rimuovifollowheader);        
    } else{
        console.log("non mi segue");
    }
}

function rimuovifollowheader(event){
    const imgcliccata=event.currentTarget;
    imgcliccata.src="elementi/segui.png";
    imgcliccata.addEventListener('click',addfollowheader);
    imgcliccata.removeEventListener('click',rimuovifollowheader);
    fetch("removefollow.php?id="+idprofilo).then(onResponse).then(aggiornafollowandfollower);
}

function aggiornafollowandfollower(){
    fetch("reloadfollowandfollower.php?id="+idprofilo).then(onResponse).then(onJsonaggiornato);
}

function onJsonaggiornato(json){
    const boh=document.querySelector('#profileinformation p');
    boh.textContent="Followers: "+json.follower+" "+  "Follows: "+json.follows;
}



function svuotanews(){
    document.querySelector('#news').innerHTML='';
}

function addnews(json){
    console.log(json);
    
    const news=document.createElement('section');
    news.classList.add('news');
    news.dataset.link=json.link;
    
    const titolo=document.createElement('div');
    titolo.classList.add('titoloo');
    
    const left=document.createElement('div');
    left.classList.add('left');

    const img=document.createElement('img');
    img.src="elementi/news.png";

    const h1=document.createElement('h1');
    h1.textContent=json.titolo;
    console.log(h1);
    
    left.appendChild(img);
    left.appendChild(h1);
    titolo.appendChild(left);

    const right=document.createElement('div');
    right.classList.add('right');

    const img1=document.createElement('img');
    img1.src="elementi/saved.png";
    img1.addEventListener('click',deletenews);

    right.appendChild(img1);
    titolo.appendChild(right);

    const contenuto=document.createElement('div');
    contenuto.classList.add('contenuto');

    const p=document.createElement('p');
    p.classList.add('descrizione');

    p.textContent=(json.descrizione).substring(0,300)+"...";

    
    const a=document.createElement('a');
    a.textContent="Link";
    a.href=json.link;

    contenuto.appendChild(p);
    
    contenuto.appendChild(a);

    const immagine=document.createElement('div');
    immagine.classList.add('immagineovideo');

    const img2=document.createElement('img');
    img2.src=json.immagine;

    immagine.appendChild(img2);


    const qualcosa=document.createElement('div');
    qualcosa.classList.add('qualcosa');

    news.appendChild(immagine);
    qualcosa.appendChild(titolo);
    qualcosa.appendChild(contenuto);
    news.appendChild(qualcosa);
    
    news.addEventListener('click',addlink);
    document.querySelector('#news').appendChild(news);

    
}

function deletenews(event){
    event.stopPropagation();
    const newsclicc=event.currentTarget;
    const linkknews=newsclicc.parentNode.parentNode.parentNode.parentNode.dataset.link;
    newsclicc.parentNode.parentNode.parentNode.parentNode.innerHTML="";
    fetch("delete_news.php?link="+linkknews).then(onResponse).then(onJsonDelete);
}

function onJsonDelete(json){
    console.log(json);
}

function addlink(event){
    const clicc=event.currentTarget;
    window.open(clicc.dataset.link);
}

function onJsoncaricanewssalvate(json){
    console.log(json);
    if(json!=='false')
        for(let c=0; c<json.length;c++){
        
            console.log("ciao");
            console.log(json[c]);
            console.log("miao");
            addnews(json[c]);
            
        } 
    else{
    document.querySelector('#nonewssaved').classList.remove('hidden');
    document.querySelector('#nocontent').classList.remove('hidden');
    }
}

function caricanewssalvate(){
    svuotapagina();
    svuotafollower();
    svuotanews();
    document.querySelector('#postt').classList.remove('colorabottone');
    document.querySelector('#followerr').classList.remove('colorabottone');
    document.querySelector('#followss').classList.remove('colorabottone');
    document.querySelector('#newssalvate').classList.add('colorabottone');
    document.querySelector('#follow').classList.add('hidden');
    document.querySelector('#followers').classList.add('hidden');
    document.querySelector('#nofound').classList.add('hidden');
    document.querySelector('#nopostfound').classList.add('hidden');
    document.querySelector('#nocontent').classList.add('hidden');
    fetch("carica_news_salvate.php").then(onResponse).then(onJsoncaricanewssalvate);
}

function modifica(event){
    window.location.assign('modificaprofilo.php'); 
}

const usernameutente=document.querySelector('#profileinformation h2').dataset.username;
const idprofilo=document.querySelector('#profileinformation h2').dataset.idprofile;

var utenticaricati;

if(usernameutente!=="undefined"){
    controllasefollowheader();
    
    caricapost();
    if(username!==usernameutente)
    addtheaddfollowmainheader();
    const postt=document.querySelector('#postt');
    postt.addEventListener('click',caricapost);
    
    const followerr=document.querySelector('#followerr');
    followerr.addEventListener('click',mostrafollower);
    
    const followss=document.querySelector('#followss');
    followss.addEventListener('click',mostrafollowss);
    
    if(username===usernameutente){
    const newssalvate=document.querySelector('#newssalvate');
    newssalvate.addEventListener('click',caricanewssalvate);
    
    const modoficaprofilo=document.querySelector('#modify');
    modoficaprofilo.addEventListener('click',modifica);
    }
    } else{
        document.querySelector('#utente').innerHTML="";
        document.querySelector('#main').innerHTML="";
        console.log("ciao");
        document.querySelector('#errore').classList.remove('hidden');
    }
