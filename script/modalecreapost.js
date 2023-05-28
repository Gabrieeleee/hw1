function goModal(event){
    const sec=document.createElement('section');
    sec.classList.add('tweettamodale');

    
    const separatore=document.createElement('div');
    const div0=document.createElement('div');
    div0.classList.add('head');
    const img0=document.createElement('img');
    img0.src="elementi/close.png";
    const titolo=document.createElement('h1');
    titolo.textContent="Crea post";

    div0.appendChild(separatore);
    div0.appendChild(titolo);
    div0.appendChild(img0);

    const div=document.createElement('div');
    const img=document.createElement('img');
    const nome=document.createElement('p');

    img.src=pic;
    nome.textContent=username;
    div.classList.add('tit');
    
    const form=document.createElement('form');
    form.name='share_post';
    form.id='share_post';
    form.method='post';
    form.enctype="multipart/form-data";

    const text=document.createElement('textarea');
    text.id="pensiero";
    text.name='contenutopost';
    text.placeholder="A cosa stai pensando?";
    text.maxlength=200;
    text.rows=10;
    

    const label=document.createElement('label');
    const imglabel=document.createElement('img');
    imglabel.src="elementi/gallery.png";

    label.appendChild(imglabel);

    const input=document.createElement('input');
    input.type="file";
    input.name="file";
    input.classList.add('hidden');
    label.appendChild(input);
    
    const submit=document.createElement('input');
    submit.type="submit";
    submit.classList.add('inviacreapost');
    
    
    sec.appendChild(div0);
    div.appendChild(img);
    div.append(nome);
    sec.appendChild(div);
    form.appendChild(text);
    form.appendChild(label);
    form.appendChild(submit);
    sec.appendChild(form);

    document.body.classList.add('no-scroll');
    modalView.style.top = window.pageYOffset + 'px';
  modalView.appendChild(sec);
  modalView.classList.remove('hidden');

  const chiudi = document.querySelector('.head img');
chiudi.addEventListener('click', onModalClick);
}
function onModalClick() {
    document.body.classList.remove('no-scroll');
    modalView.classList.add('hidden');
    modalView.innerHTML = '';
  }

const tweet=document.querySelector('.tweetta');
tweet.addEventListener('click', goModal);

const modalView = document.querySelector('#modal-view');

                