function addcommento(json){
    const com=document.querySelector('#sezionecommenti');
    
    const img=document.createElement('img');
    img.classList.add('immagindelprofilo');
    img.src=json.profilepic;

    const p=document.createElement('h2');
    p.classList.add('username');
    p.textContent=json.username;

    const p1=document.createElement('p');
    p1.classList.add('testo');
    p1.textContent=json.testo;

    const div=document.createElement('div');
    div.dataset.idcommento=json.idcommento;
    const div1=document.createElement('div');
    div.classList.add('primo');
    div1.classList.add('secondo');

    div1.appendChild(p);
    div1.appendChild(p1);

    if(username===p.textContent){
    const deletecommimg=document.createElement('img');
    deletecommimg.classList.add('deleteimg');
    deletecommimg.src="elementi/delete.png";
    deletecommimg.addEventListener('click',deletecommento);
    div1.appendChild(deletecommimg);
    }
    div.appendChild(img);
    div.appendChild(div1);
    

    div.dataset.idcommento=json.idcommento;
    com.appendChild(div);

    
}

function scrivicommento(){
    const com=document.querySelector('#sezionecommenti');
    
    const img=document.createElement('img');
    img.classList.add('immagindelprofilo');
    img.src=pic;

    const diiv=document.createElement('div');
    diiv.classList.add('formcommento');

    const text=document.createElement('textarea');
    text.rows=3;
    text.maxlength=200;
    text.name='contenutocommento';
    text.classList.add('scrivitesto');
    text.placeholder="Inserisci un commento";
    

    const submit=document.createElement('button');
    submit.textContent="Invia";
    submit.classList.add('pulsinvia');
    submit.addEventListener('click',aggiungicommentodb);

    const div=document.createElement('div');
    div.classList.add('primo');
    

    diiv.appendChild(text);
    
    diiv.appendChild(submit);

    div.appendChild(img);
    div.appendChild(diiv);
    

    com.appendChild(div);
}

function onJsonaggiungicommento(json){
    
    const separatore=document.createElement('div');

    const div0=document.createElement('div');
    div0.classList.add('head');

    const img0=document.createElement('img');
    img0.src="elementi/close.png";

    const titolo=document.createElement('h1');
    if(json.numcomm!=='0'){
        titolo.textContent="Post di "+json[0].proprietario;
        titolo.dataset.idpost=json[0].idpost;
    }
    else{
        titolo.textContent="Post di "+json.proprietario;
        titolo.dataset.idpost=json.idpost;
    }

    div0.appendChild(separatore);
    div0.appendChild(titolo);
    div0.appendChild(img0);

    com.appendChild(div0);
        
    scrivicommento();

    if(json.numcomm!=='0'){
        for(let c=0;c<json.length;c++){
            addcommento(json[c]);
        }
    }

    document.body.classList.add('no-scroll');
    modalViewcomm.style.top = window.pageYOffset + 'px';
    modalViewcomm.classList.remove('hidden');

    const chiudi = document.querySelector('.head img');
    chiudi.addEventListener('click', onModalClickcomm);

}


function onResponse(response) {
    return response.json();
}

function ottienicommenti(event){
    
    const postcliccato=event.currentTarget;
    fetch("cerca_commenti.php?idpost="+postcliccato.parentNode.parentNode.dataset.idpost).then(onResponse).then(onJsonaggiungicommento);
}

function svuotacommenti(){
    document.querySelector('#sezionecommenti').innerHTML='';
}

function onJsonaggiungicommentodb(json){
    
    document.querySelector('.formcommento textarea').value="";   
    aggiungicommentoallafine(json);
}

function aggiungicommentodb(event){

    const invcomm=event.currentTarget;
    const contenuto=invcomm.parentNode.querySelector('textarea');
    const idpostcommentato=document.querySelector('.head h1').dataset.idpost;

    if(contenuto.value!=="")
    fetch("aggiungi_commento.php?idpost="+idpostcommentato+"&value="+contenuto.value).then(onResponse).then(onJsonaggiungicommentodb)
}

function aggiungicommentoallafine(json){
    const sez=document.querySelector('#sezionecommenti');

    const img=document.createElement('img');
    img.classList.add('immagindelprofilo');
    img.src=pic;

    const p=document.createElement('h2');
    p.classList.add('username');
    p.textContent=username;

    const p1=document.createElement('p');
    p1.classList.add('testo');
    p1.textContent=json.testo;

    const div=document.createElement('div');
    div.dataset.idcommento=json.idcommento;
    console.log(json.idcommento);
    const div1=document.createElement('div');
    div.classList.add('primo');
    div1.classList.add('secondo');

    div1.appendChild(p);
    div1.appendChild(p1);

    const deletecommimg=document.createElement('img');
    deletecommimg.classList.add('deleteimg');
    deletecommimg.src="elementi/delete.png";

    deletecommimg.addEventListener('click',deletecommento);

    div1.appendChild(deletecommimg);

    div.appendChild(img);
    div.appendChild(div1);
    

    com.appendChild(div);
}

function deletecommento(event){
    const commcliccato=event.currentTarget;
    const idcommento=commcliccato.parentNode.parentNode.dataset.idcommento;
    console.log(idcommento);
    commcliccato.parentNode.parentNode.innerHTML="";
    fetch("delete_commento.php?idcommento="+idcommento).then(onResponse).then(onJsondeleted);
}

function onJsondeleted(json){
    console.log(json);
}

function onModalClickcomm() {
    document.body.classList.remove('no-scroll');
    modalViewcomm.classList.add('hidden');
    com.innerHTML = '';
  }

const com=document.querySelector('#sezionecommenti');
const modalViewcomm=document.querySelector('#modal-view-commenti');

var usernamepostcliccato;
var datapubpostcliccato;