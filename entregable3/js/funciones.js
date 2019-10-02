
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
let colision=false;
let gameOver=false;
let contadorMonedas=0;
let vidas=3;



function gameLoop(){
detecciones();
refrescar();
renderizar();

requestAnimationFrame(gameLoop);
}

function detecciones(){
    window.addEventListener('keydown', detectarTecla);
    //window.addEventListener('keyup', soltarTecla);
    if(roca.style.left=="190px"){
        roca.setAttribute("class","esconder");
    }
    if(moneda.style.left==posPersonajeX+"px"){
        contadorMonedas++;
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
    if (colision){
        personaje.setAttribute("class","chocar");
        roca.setAttribute("class","explosion");
        vidas--;
    }
    if(vidas==2){
        vida3=perderVida;
    }
    if(vidas==1){
        vida2=perderVida;
    }
    if(vidas==0){
        vida1=perderVida;
        gameOver=true;
    }

    
}
function renderizar(){
    roca.style.left=posicionX+"px";
    moneda.style.left=posicionX+"px";
}

function detectarTecla(evento){
    let codigo = document.layers ? evento.which : document.all ? event.keyCode : document.getElementById ? evento.keyCode : 0;
    if(codigo==38){
        tecla=true;
        saltar=true;
        setTimeout ( function () { requestAnimationFrame (caminar);}, 1000 );
        
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

gameLoop();

