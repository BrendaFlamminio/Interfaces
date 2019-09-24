
function ejercicio2(){
let elemento=document.querySelector(".elemento0");
elemento.addEventListener('click',transformacionRandom);

function transformacionRandom(){
let num=0;
num=Math.floor((Math.random() * 9));

elemento.setAttribute("class","elemento"+num);
elemento="elemento"+num;
elemento=document.querySelector("."+elemento);
elemento.addEventListener('click',transformacionRandom);
}

document.addEventListener("mousedown",moverAnimacion);
}
function moverAnimacion(e){
let x= e.layerX;
let y= e.layerY;
console.log("llegue");

let animacion =document.getElementsByClassName(".animacion");
animacion.style.left=x+"px;";
animacion.style.top=y+"px;";
}

function ejercicio5(){
window.addEventListener("mousedown", ratonPulsado, false);
window.addEventListener("mouseup", ratonSoltado, false);
window.addEventListener("mousemove", ratonMovido, false);

var xInic, yInic;
var estaPulsado = false;

function ratonPulsado(evt) { 
    //Obtener la posición de inicio
    xInic = evt.clientX;
    yInic = evt.clientY;    
    estaPulsado = true;
    document.getElementById("conejito").unselectable = true;
}

function ratonMovido(evt) {
    if(estaPulsado) {
        //Calcular la diferencia de posición
        var xActual = evt.clientX;
        var yActual = evt.clientY;    
        var xInc = xActual-xInic;
        var yInc = yActual-yInic;
        xInic = xActual;
        yInic = yActual;
        
        //Establecer la nueva posición
    let element = document.getElementById("conejito");
        var position = getPosicion(element);
     element.style.top = (position[0] + yInc) + "px";
        element.style.left = (position[1] + xInc) + "px";
    }
}

function ratonSoltado(evt) {
    estaPulsado = false;
}

/*
 * Función para obtener la posición en la que se encuentra el
 * element indicado como parámetro.
 * Retorna un array con las coordenadas x e y de la posición
 */
function getPosicion(element) {
    var posicion = new Array(2);
    if(document.defaultView && document.defaultView.getComputedStyle) {
        posicion[0] = parseInt(document.defaultView.getComputedStyle(element, null).getPropertyValue("top"))
        posicion[1] = parseInt(document.defaultView.getComputedStyle(element, null).getPropertyValue("left"));
    } else {
        //Para Internet Explorer
        posicion[0] = parseInt(element.currentStyle.top);             
        posicion[1] = parseInt(element.currentStyle.left);               
    }      
    return posicion;
}
}


