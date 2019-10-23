let instrucciones=document.querySelector(".instrucciones");
instrucciones.hidden=false;
let animacionFondo=document.querySelector(".pizarra");
window.addEventListener('keydown', detectarTecla);
let divGameOver=document.querySelector(".gameOver");
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
roca.setAttribute("class","esconder");
moneda.setAttribute("class","esconder");
let partida;
let tecla=false;
let saltar=false;
let posicionX=900;
let posPersonajeX=200;
let topPersonaje=400;
let topMoneda=400;
let colision=false;
let gameOver=false;
let contadorMonedas=0;
let vidas=3;
let mostrarRoca=false;
let mostrarMoneda=false;
let jugar=false;
detenerAnimaciones();
desactivarElementos();
divGameOver.hidden=false;
texto.innerHTML= "¿Estas listo para comenzar a jugar?";

function activarElementos(){
    mostrarRoca=true;
    mostrarMoneda=true;
}
function desactivarElementos(){
    mostrarRoca=false;
    mostrarMoneda=false;
}
function detenerAnimaciones(){
    animacionFondo.style.animationPlayState = "paused";
    personaje.style.animationPlayState = "paused";
   
}
function comenzarAnimaciones(){
    animacionFondo.style.animationPlayState = "running";
    personaje.style.animationPlayState = "running";
}

function gameLoop(){
    if(!colision){
        detecciones();
    }

    refrescar();
    renderizar();

    partida=requestAnimationFrame(gameLoop);
    sleep(0.05);
    
}

function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

function detecciones(){
    
    if((topMoneda==topPersonaje && posicionX==posPersonajeX && saltar==true && mostrarMoneda==true)){
        contadorMonedas++;
        mostrarMoneda=false;
        moneda.setAttribute("class","esconder");

    }
    if(!colision && (roca.style.left==posPersonajeX+"px")&&(saltar==false)){
        colision=true;
        setTimeout ( function () { 
            requestAnimationFrame (caminar);
            roca.setAttribute("class","esconder");
        }, 2000 );
        
    }
}

function refrescar(){
    if(saltar==true){
        hacerSaltar();
    }

    if(posicionX>20){
        posicionX-=20;
    }
    if(posicionX==20){
        mostrarRoca=false;
        mostrarMoneda=false;
        setTimeout(function(){
            requestAnimationFrame(mostrarElementos);
         },1200);
    }

    if (colision){
        personaje.setAttribute("class","chocar");
        detenerAnimaciones();
        desactivarElementos();
        vidas--;
        colision=false;
        setTimeout(function () { 
            requestAnimationFrame(comenzarAnimaciones);
             }, 2000); 
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
  
    if(mostrarRoca){
        roca.setAttribute("class","roca");
    }else{
        roca.setAttribute("class","esconder");
    }
   
    if(mostrarMoneda){
        moneda.setAttribute("class","moneda");
    }else{
        moneda.setAttribute("class","esconder");
    }
    if(gameOver==true && vidas==0){
        instrucciones.hidden=false;
        divGameOver.hidden=false;
        texto.innerHTML= "GAME OVER";
        mostrarMoneda=false;
        mostrarRoca=false;
        jugar=false;
        personaje.setAttribute("class","chocar");
        detenerAnimaciones();

    }
    if(contadorMonedas==5){
        instrucciones.hidden=false;
        divGameOver.hidden=false;
        texto.innerHTML= "Felicitaciones Ganaste";
        jugar=false;
        detenerAnimaciones();
        desactivarElementos();

    }

    
}
function renderizar(){
    if(mostrarRoca){
    roca.style.left=posicionX+"px";
    }else{
        roca.style.left=900+"px";
    }
    if(mostrarMoneda){
        moneda.style.left=posicionX+"px";
    }else{
        moneda.style.left=900+"px";
    }
    puntos.innerHTML=contadorMonedas;
}

function detectarTecla(evento){
    let codigo = document.layers ? evento.which : document.all ? event.keyCode : document.getElementById ? evento.keyCode : 0;
    if(codigo==38){
        tecla=true;
        saltar=true;
        setTimeout ( function () { requestAnimationFrame (caminar);}, 0800 );
        
    }
}

function mostrarElementos(){
    if(jugar==true){
  let ramndon=Math.floor(Math.random()*25);
  if(ramndon>10){
    mostrarRoca = true;
  }if(ramndon<10){
    mostrarMoneda=true;
    mostrarRoca=false;
  }
    posicionX = 900;
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
 posicionX=900;
 tecla=false;
 saltar=false;
 colision=false;
 gameOver=false;
 contadorMonedas=0;
 vidas=3;
 roca.setAttribute("class","roca");
moneda.setAttribute("class","moneda");
vida1.setAttribute("class","vida1");
vida2.setAttribute("class","vida2");
vida3.setAttribute("class","vida3");
divGameOver.hidden=true;
instrucciones.hidden=true;
jugar=true;
comenzarAnimaciones();
activarElementos();

gameLoop();
}






