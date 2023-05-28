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
        elem.appendChild(int);

        sez.appendChild(elem);
        
       
    
}

function onJsoncarica(json){
    
    if(json!=='false'){
        for(let c=0; c<json.length;c++){
            addtext(json[c]);
        }

        controllalike();
        aggiungieventoprofilo();
    }else{
        console.log( document.querySelector('#nopostfound'));
        document.querySelector('#nopostfound').classList.remove('hidden');
    }
    const fine=document.createElement('img');
    fine.src="elementi/no-content.png";
    fine.classList.add('nessunpost');
    document.querySelector('#tweet').appendChild(fine);
}


function caricapost(){
    fetch("carica_post.php").then(onResponse).then(onJsoncarica);
}

function vaialprofilo(event){
    elem=event.currentTarget;
    window.location.assign('profilo.php?username='+elem.parentNode.querySelector('.titolo h1').textContent);
}

function aggiungieventoprofilo(){
    const elemento=document.querySelectorAll('.elemento');
    for(const box of elemento){
        box.firstChild.firstChild.addEventListener('click',vaialprofilo);
    }
}




function vaiallink(event){
    window.open(event.currentTarget.dataset.link);
}

function addnews(json){

    const news=document.createElement('section');
    news.classList.add('news');
    
    const titolo=document.createElement('div');
    titolo.classList.add('titoloo');

    const left=document.createElement('div');
    left.classList.add('left');

    const img=document.createElement('img');
    img.src="elementi/news.png";

    const h1=document.createElement('h1');
    h1.textContent=json.title;

    left.appendChild(img);
    left.appendChild(h1);
    titolo.appendChild(left);

    const contenuto=document.createElement('div');
    contenuto.classList.add('contenuto');

    const p=document.createElement('p');
    p.classList.add('descrizione');
    p.textContent=(json.description).substring(0,200)+"...";

    const p1=document.createElement('p');
    p1.classList.add('autore');
    p1.textContent=json.creator;

    contenuto.appendChild(p);
    contenuto.appendChild(p1);

    news.appendChild(titolo);
    news.appendChild(contenuto);
    
    news.dataset.link=json.link;
    news.addEventListener('click',vaiallink);
    document.querySelector('#newss').appendChild(news);
}

function onJsonvisualizza(json){    
    for(let c=0;c<json.results.length;c++){
        if(c>=5) break;
        if(json.results[c].description!==null)
            addnews(json.results[c]);
    }
}

function ottieninews(){
    fetch("ottieni_news.php").then(onResponse).then(onJsonvisualizza);
}


function search_post(event){
    event.preventDefault();
    const form=document.querySelector("#search_postt");
    const form_data={method: 'post', body: new FormData(form)};
    fetch("cerca_post.php",form_data).then(onResponse).then(onJsontrovapost);
}

function svuota_pagina(){
    document.querySelector('#tweet').innerHTML="";
}

function onJsontrovapost(json){
    
    svuota_pagina();
    if(json!=='false'){
        const imgclose=document.createElement('img');
        imgclose.src="elementi/close.png";
        imgclose.id="close";
        imgclose.addEventListener('click',closesearch);
        const twe=document.querySelector('#tweet');
        twe.appendChild(imgclose);

    for(let c=0; c<json.length;c++){
        addtext(json[c]);
    }

    controllalike();
    aggiungieventoprofilo();

    } else{
        console.log( document.querySelector('#nopostfound'));
        document.querySelector('#nopostfound').classList.remove('hidden');
    }
}

function closesearch(){
    svuota_pagina();
    caricapost();
}


const searchpostbutton=document.querySelector('#search_postt');
searchpostbutton.addEventListener('submit',search_post);

caricapost();
ottieninews();