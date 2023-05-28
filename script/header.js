function onJsontrovautente(json){
    window.location.assign('profilo.php?username='+json[0].username);
}

function search(event){
    event.preventDefault();
    const input=document.querySelector('#search');
    const value= encodeURIComponent(input.value);
    fetch("cercautente.php?username="+value).then(onResponse).then(onJsontrovautente);
}

function gotoModal(event){
    const ahome=document.createElement('a');
    ahome.href="home.php";
    ahome.textContent="Home";

    const afriends=document.createElement('a');
    afriends.href="amici.php";
    afriends.textContent="Amici";

    const anews=document.createElement('a');
    anews.href="news.php";
    anews.textContent="News";

    
    const aprofilo=document.createElement('a');
    aprofilo.href="profilo.php?username="+username;
    aprofilo.textContent="Profilo";

    
    const amodifica=document.createElement('a');
    amodifica.href="modificaprofilo.php";
    amodifica.textContent="Modifica profilo"
    
    const alogout=document.createElement('a');
    alogout.href="logout.php";
    alogout.textContent="Logout";

    const nav=document.createElement('nav');
    nav.classList.add('navmobile');

    nav.appendChild(ahome);
    nav.appendChild(afriends);
    nav.appendChild(anews);
    nav.appendChild(aprofilo);
    nav.appendChild(alogout);

    const img0=document.createElement('img');
    img0.src="elementi/close.png";
    img0.addEventListener('click',onModalClickclose);

    const div=document.createElement('div');
    div.classList.add('contenitore');

    const div0=document.createElement('div');
    div0.classList.add('contenitoreimg');

    div0.appendChild(amodifica);
    div0.appendChild(img0);
    div.appendChild(nav);
    modalViewnav.appendChild(div0);
    modalViewnav.appendChild(div);

    document.body.classList.add('no-scroll');
    modalViewnav.style.top = window.pageYOffset + 'px';
    modalViewnav.classList.remove('hidden');
}

function onModalClickclose() {
    document.body.classList.remove('no-scroll');
    modalViewnav.classList.add('hidden');
    modalViewnav.innerHTML = '';
  }


const username=document.querySelector('#right img').dataset.username;
const pic=document.querySelector('#right img').dataset.profilepic;
  
const searchbutton=document.querySelector('#search_user');
if(searchbutton!==null)
searchbutton.addEventListener('submit',search);


const navbarmobile=document.querySelector('#nav2');
navbarmobile.addEventListener('click',gotoModal);

const modalViewnav = document.querySelector('#modalenavbar');