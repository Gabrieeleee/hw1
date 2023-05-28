
function addimg(json){

    const diiv=document.querySelector('.divv');
    const img=document.createElement('img');
    img.classList.add('imm');
    img.src=json.link;

    img.addEventListener('click',selezionaimmagine);

    diiv.appendChild(img);
}

function onJsonmodal(json){
    console.log(json);

    
    const posimg=document.createElement('section');
    posimg.classList.add('posizioneimm');

    const div=document.createElement('div');
    div.classList.add('divv');

    const titolo=document.createElement('div');
    titolo.classList.add('titolo');
    const h1=document.createElement('h1');
    h1.textContent="Scegli un'immagine";
    const img=document.createElement('img');
    img.classList.add('close');
    img.src="elementi/close.png";

    titolo.appendChild(h1);
    titolo.appendChild(img);
    posimg.appendChild(titolo);

    modalView.appendChild(posimg);
    modalView.appendChild(div);

    for(let c=0;c<json.data.length;c++){
        addimg(json.data[c]);
    }

    const div1=document.createElement('div');
    div1.classList.add('divvv');
    const butt=document.createElement('button');
    butt.classList.add('butt');
    butt.disabled=true;
    butt.textContent="Seleziona";
    butt.addEventListener('click',invialinkimmagine);
    div1.appendChild(butt);
    posimg.appendChild(div);
    posimg.appendChild(div1);

   
    document.body.classList.add('no-scroll');
    modalView.style.top = window.pageYOffset + 'px';
  
    modalView.classList.remove('hidden');

   const chiudi = document.querySelector('.titolo img');
   chiudi.addEventListener('click', onModalClick);
}

function cercaimgimgur(event){
    butt.removeEventListener('click', cercaimgimgur);
    fetch("addimgfromimgur.php").then(onResponse).then(onJsonmodal);
}



function onModalClick() {
    
    butt.addEventListener('click', cercaimgimgur);
    document.body.classList.remove('no-scroll');
    modalView.classList.add('hidden');
    modalView.innerHTML = '';
  }

const butt=document.querySelector('#imma');
butt.addEventListener('click', cercaimgimgur);

const modalView = document.querySelector('#modal-view');

var link;
                
function selezionaimmagine(event){

    const imcliccata=event.currentTarget;
    const immagini=imcliccata.parentNode.querySelectorAll('img');

    for(const box of immagini){
        box.classList.add('addopacity');
    }
    imcliccata.classList.remove('addopacity');

    link=imcliccata.src;
   
    document.querySelector('.butt').disabled=false;
}

function invialinkimmagine(event){
    console.log("dati.php?link="+link);
    document.querySelector('#gallery').dataset.linkimg=link;
    console.log(document.querySelector('#gallery'));
    fetch("dati.php?link="+link).then(onResponse).then(onjsonqualcosaaa);
    onModalClick();
}

function onjsonqualcosaaa(json){
    console.log(json);
}