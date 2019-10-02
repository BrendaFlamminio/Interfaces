window.addEventListener('keydown', detectarTecla);
let divGameOver=document.querySelector(".gameOver");
divGameOver.hidden=true;
let puntos=document.querySelector(".contadorMonedas");
let personaje=document.querySelector(".Acaminar");
let moneda=document.querySelector(".moneda");
let roca=document.querySelector(".roca");
let vida1=document.querySelector(".vida1");
let vida2=document.querySelector(".vida2");
let vida3=document.querySelector(".vida3");
let tecla=false;
let saltar=false;
let posicionX=1100;
let posPersonajeX=440;
let topPersonaje=370;
let colision=false;
let gameOver=false;
let contadorMonedas=0;
let vidas=3;
let mostrarRoca=true;
let escoderRoca=false;
let mostrarMoneda=true;
let escoderMoneda=false;





function gameLoop(){
detecciones();
refrescar();
renderizar();

requestAnimationFrame(gameLoop);
}

function detecciones(){
   
    //window.addEventListener('keyup', soltarTecla);
    if(roca.style.left=="190px"){
        roca.setAttribute("class","esconder");
    }
    if((moneda.style.top==topPersonaje+"px")&&(moneda.style.left==posPersonajeX+"px")){
        console.log("hola");
        contadorMonedas++;
        mostrarMoneda=false;
        escoderMoneda=true;
        moneda.setAttribute("class","esconder");

    }
    if((roca.style.left==posPersonajeX+"px")&&(saltar==false)){
        roca.setAttribute("class","explosion");
        colision=true;
        setTimeout ( function () { requestAnimationFrame (caminar);}, 2000 );
    }
}

function refrescar(){
    if(saltar==true){
        hacerSaltar();
    }

    if(posicionX>190){
        posicionX-=10;
    }
    if(posicionX==190){
        mostrarRoca=false;
        escoderRoca=true;

        setTimeout(function(){
            requestAnimationFrame(mostrarElementos);
         },0.8);
    }
    if (colision){
        personaje.setAttribute("class","chocar");
       
        vidas--;
        colision=false;
        escoderRoca=true;
    }
    if(vidas==2){
        vida3.setAttribute("class","esconder");
    }
    if(vidas==1){
        vida2.setAttribute("class","esconder");
    }
    if(vidas==0){
        vida1.setAttribute("class","esconder");
        gameOver=true;
    }
    if(gameOver){
        gameOver.hidden=false;
    }
    if(escoderRoca){
        roca.setAttribute("class","esconder");
    }
    if(mostrarRoca){
        roca.setAttribute("class","roca");
    }
    if(escoderMoneda){
        moneda.setAttribute("class","esconder");
    }
    if(mostrarMoneda){
        moneda.setAttribute("class","moneda");
    }

    
}
function renderizar(){
    if(mostrarRoca){
    roca.style.left=posicionX+"px";
    }else{
        roca.style.left=1100+"px";
    }
    if(mostrarMoneda){
        moneda.style.left=posicionX+"px";
    }else{
        moneda.style.left=1100+"px";
    }
    puntos.innerHTML=contadorMonedas;
}

function detectarTecla(evento){
    let codigo = document.layers ? evento.which : document.all ? event.keyCode : document.getElementById ? evento.keyCode : 0;
    if(codigo==38){
       
        tecla=true;
        saltar=true;
        setTimeout ( function () { requestAnimationFrame (caminar);}, 1000 );
        
    }
}

function mostrarElementos(){
  let ramndon=Math.floor(Math.random()*25);
  if(ramndon>10){
    esconderRoca = false;
    mostrarRoca = true;
  }if(ramndon<10){
    mostrarMoneda=true;
    escoderRoca=false;
  }
     
    posicionX = 1100;
  }
function hacerSaltar(){
    personaje.setAttribute("class","saltar");
}
function caminar(){
    tecla=false;
    saltar=false;
    personaje.setAttribute("class","Acaminar");
}

gameLoop();

