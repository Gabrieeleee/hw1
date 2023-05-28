
function onResponse(response) {
    return response.json();
}

function addnews(json){

    const news=document.createElement('section');
    news.classList.add('news');
    news.dataset.link=json.link;
    news.addEventListener('click',vaiallink);

    const titolo=document.createElement('div');
    titolo.classList.add('titoloo');

    const left=document.createElement('div');
    left.classList.add('left');

    const img=document.createElement('img');
    img.src="elementi/news.png";

    const h1=document.createElement('h1');
    h1.textContent=(json.title).substring(0,100)+"...";
    

    left.appendChild(img);
    left.appendChild(h1);
    titolo.appendChild(left);

    const right=document.createElement('div');
    right.classList.add('right');

    const img1=document.createElement('img');
    img1.src="elementi/save.png";
    img1.addEventListener('click',savenews);

    right.appendChild(img1);
    titolo.appendChild(right);

    const contenuto=document.createElement('div');
    contenuto.classList.add('contenuto');

    const p=document.createElement('p');
    p.classList.add('descrizione');
    
    p.textContent=(json.description).substring(0,300)+"...";

    const p1=document.createElement('p');
    p1.classList.add('autore');
    p1.textContent=json.creator;

    const a=document.createElement('a');
    a.textContent="Link";
    a.href=json.link;

    contenuto.appendChild(p);
    contenuto.appendChild(p1);
    contenuto.appendChild(a);

    const immagine=document.createElement('div');
    immagine.classList.add('immagineovideo');

    const img2=document.createElement('img');
    const video=document.createElement('video');
    if(json.image_url!==null){
        if(json.image_url.substr(-3)==="jpg" || json.image_url.substr(-3)==="png")
        img2.src=json.image_url;
        else img2.src="elementi/noimage.jpg";
    }
    else if(json.video_url!==null) {
        video.controls=true;
        video.src=json.video_url;
    }
    else img2.src="elementi/noimage.jpg";

    immagine.appendChild(img2);


    const qualcosa=document.createElement('div');
    qualcosa.classList.add('qualcosa');

    news.appendChild(immagine);
    qualcosa.appendChild(titolo);
    qualcosa.appendChild(contenuto);
    news.appendChild(qualcosa);
    

    document.querySelector('#news').appendChild(news);

    
}


function onJsonvisualizza(json){    
    svuotapagina()
    
    verificasegiasalvato(json);
    nextpage=json.nextPage;
    const img=document.querySelector('#caricanews');
    img.addEventListener('click',caricaaltri);

    for(let c=0;c<json.results.length;c++){
        if(json.results[c].description!==null){
            addnews(json.results[c]);
        }
    }
    
}

function svuotapagina(){
   document.querySelector('#news').innerHTML=""; 
}

function ottieninews(){
    fetch("ottieni_news.php").then(onResponse).then(onJsonvisualizza);
}
function caricaaltri(){
    fetch("ottieni_news.php?page="+nextpage).then(onResponse).then(onJsonvisualizza);
}

function savenews(event){
    event.stopPropagation();
    const imcliccata=event.currentTarget;
   
    const news=imcliccata.parentNode.parentNode.parentNode.parentNode;
    const immagine=news.querySelector('.immagineovideo img').src;
    const titolo=news.querySelector('.titoloo h1').textContent;
    const descrizione=news.querySelector('.descrizione').textContent;
    const lin=news.querySelector('.contenuto a').href;

    imcliccata.src="elementi/saved.png";
    imcliccata.removeEventListener('click',savenews);
    imcliccata.addEventListener('click',deletenews);
    
    const form_data=new FormData();
    form_data.append('titolo',titolo);
    form_data.append('immagine',immagine);
    form_data.append('descrizione',descrizione);
    form_data.append('lin',lin);
   
    fetch("save_news.php",{
        method: 'POST',
        body: form_data
    }).then(onResponse).then(onJsonsaved);
   
}

function onJsonsaved(json){
    console.log(json);
}


function vaiallink(event){
    window.open(event.currentTarget.dataset.link);
}


function verificasegiasalvato(json){
    for(let c=0; c<json.results.length;c++){
        fetch("controlla_news_salvate.php?link="+json.results[c].link).then(onResponse).then(onJsongiasalvato);
    }
}

function onJsongiasalvato(json){
    if(json!==null){
        const news=document.querySelectorAll('.news');
        for(const box of news){
            if(json.id!==null)
                if(box.dataset.link==json.link){
                    box.querySelector('.right img').src="elementi/saved.png";
                    box.querySelector('.right img').removeEventListener('click',savenews);
                    box.querySelector('.right img').addEventListener('click',deletenews);
                }
        }
    }
}


function deletenews(event){
    event.stopPropagation();
    const box=event.currentTarget;
    box.src="elementi/save.png";
    box.addEventListener('click',savenews);
    box.removeEventListener('click',deletenews);
    fetch("delete_news.php?link="+box.parentNode.parentNode.parentNode.parentNode.dataset.link).then(onResponse).then(onJsonremoved);
}

function onJsonremoved(json){
    console.log(json);
}



var nextpage;
ottieninews();
