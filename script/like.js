function cercapost(json){
    const like=document.querySelectorAll('.lovee');
        for(const box of like){
                  
            if(box.parentNode.parentNode.parentNode.dataset.idpost===json[0].idpost){
                box.src="elementi/heartred.png";
                box.addEventListener('click',rimuovilike);
                box.removeEventListener('click',mettilike)
                break;
            
        }
    }
}

function onJsoncontrollalike(json){
    if(json!=='false'){
        cercapost(json);
    }
}

function controllalike(){
    const like=document.querySelectorAll('.lovee');
    for(const box of like){
        const elem=(box.parentNode.parentNode).parentNode;
        box.addEventListener('click',mettilike);
        fetch("controllalike.php?idpost="+elem.dataset.idpost).then(onResponse).then(onJsoncontrollalike);
    }
    
}

function onJson(json){
   console.log(json);
}

function mettilike(event){
    const img=event.currentTarget;
    img.src="elementi/heartred.png";
    img.removeEventListener('click',mettilike);
    img.addEventListener('click',rimuovilike);
    img.parentNode.querySelector('.mipiace p').textContent=parseInt(img.parentNode.querySelector('.mipiace p').textContent)+1;
    console.log(img.parentNode.parentNode.parentNode.dataset.idpost);
    fetch("aggiungi_like.php?idpost="+img.parentNode.parentNode.parentNode.dataset.idpost).then(onResponse).then(onJson);
}

function rimuovilike(event){
    const img=event.currentTarget;
    img.src="elementi/heart.png";
    img.addEventListener('click',mettilike);
    img.removeEventListener('click',rimuovilike);
    img.parentNode.querySelector('.mipiace p').textContent=parseInt(img.parentNode.querySelector('.mipiace p').textContent)-1;
   fetch("rimuovi_like.php?idpost="+img.parentNode.parentNode.parentNode.dataset.idpost).then(onResponse).then(onJson);
}



