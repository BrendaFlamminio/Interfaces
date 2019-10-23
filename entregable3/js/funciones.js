window.addEventListener('keydown', detectarTecla);
let divGameOver=document.querySelector(".gameOver");
divGameOver.hidden=true;
let texto = document.querySelector(".texto");
let otraPartida = document.querySelector(".botonReinicio");
otraPartida.addEventListener("click", reiniciar);
let puntos=document.querySelector(".contador");
let personaje=document.querySelector(".Acaminar");
let moneda=document.querySelector(".moneda");
let roca=document.querySelector(".roca");
let vida1=document.querySelector(".vida1");
let vida2=document.querySelector(".vida2");
let vida3=document.querySelector(".vida3");
let partida;
let tecla=false;
let saltar=false;
let posicionX=1100;
let posPersonajeX=440;
let topPersonaje=400;
let topMoneda=400;
let colision=false;
let gameOver=false;
let contadorMonedas=0;
let vidas=3;
let mostrarRoca=true;
let escoderRoca=false;
let mostrarMoneda=true;
let escoderMoneda=false;
let jugar=true;





function gameLoop(){

detecciones();
refrescar();
renderizar();

partida=requestAnimationFrame(gameLoop);
    
}

function detecciones(){
    
    if((topMoneda==topPersonaje && posicionX==posPersonajeX && saltar==true && mostrarMoneda==true)){
        contadorMonedas++;
        mostrarMoneda=false;
        escoderMoneda=true;
        moneda.setAttribute("class","esconder");

    }
    if((roca.style.left==posPersonajeX+"px")&&(saltar==false)){
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
        mostrarMoneda=false;
        escoderMoneda=true;
        setTimeout(function(){
            requestAnimationFrame(mostrarElementos);
         },0.8);
    }

    if (colision){
        personaje.setAttribute("class","chocar");
        vidas--;
        colision=false;
        
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
        jugar=false;
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
    if(gameOver==true && vidas==0){
        divGameOver.hidden=false;
        texto.innerHTML= "GAME OVER";
        mostrarMoneda=false;
        mostrarRoca=false;
        jugar=false;
        personaje.setAttribute("class","chocar");

    }
    if(contadorMonedas==10){
        divGameOver.hidden=false;
        texto.innerHTML= "Felicitaciones Ganaste";
        jugar=false;

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
    if(jugar==true){
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
}
function hacerSaltar(){
    personaje.setAttribute("class","saltar");
}
function caminar(){
    tecla=false;
    saltar=false;
    personaje.setAttribute("class","Acaminar");
}

function reiniciar(){
caminar();
 posicionX=1100;
 tecla=false;
 saltar=false;
 colision=false;
 gameOver=false;
 contadorMonedas=0;
 vidas=3;
 mostrarRoca=true;
 escoderRoca=false;
 mostrarMoneda=true;
 escoderMoneda=false;
vida1.setAttribute("class","vida1");
vida2.setAttribute("class","vida2");
vida3.setAttribute("class","vida3");
divGameOver.hidden=true;
jugar=true;

}
gameLoop();

