
var canvas= document.getElementById('canvas');
var ctx= canvas.getContext("2d");
var poligono = new Poligono();
let contadorCirculos=0;
var activo=true; // acepta o no los ciruclos
var divCerrar=document.querySelector('.divCerrar');
divCerrar.hidden=false;
let mover=false; // permite mover o no la figura dependiendo si el poligono esta cerrado
let figuraDectada=null;
var tecla=false; //si la letra esta siendo precionada
let color=250 // va ir cambiando segun la rueda del mouse
let cambie=false; //para saber si el color del punto centro debe cambiar



function estructurar(e){
  if(activo==true){
let  x=e.layerX;
let  y=e.layerY;
console.log("Coordenada en x "+x);
console.log("Coordenada en y "+y);
let circulo=new Circulo(x,y,"rgb(200,0,0)"); //Los circulos comunes se dibujan en rojo simpre
circulo.crearCirculo();
contadorCirculos++;
poligono.addFigura(circulo);
poligono.unirFigura(x,y);
}
}

function limpiarCanvas(){
  contadorCirculos=3;
  cerrar();
  contadorCirculos=0;
  ctx.clearRect(0, 0,500,500);
  this.activo=true;
  poligono.limpiarArreglo();
    divCerrar.hidden=false;
    poligono =new Poligono;
}

function cerrar(){
if(contadorCirculos>=3){
  poligono.cerrar();
  activo=false;
  divCerrar.hidden=true;
  contadorCirculos=0;
}
}

function detectarClick(e){
  var px = e.layerX;
  var py= e.layerY;
  this.figuraDectada = poligono.detectarClick(px,py)
   if(this.figuraDectada != null){
   this.mover=true;
   }
}


function moverlos(e){
    if(activo==false){
  var pX = e.layerX;
  var pY = e.layerY;
	if (this.mover){
		if(this.figuraDectada.esCentro()){
  		var moverX = pX - this.figuraDectada.getPosX();
  		var moverY = pY - this.figuraDectada.getPosY();
  		this.figuraDectada.setCoordenadas(pX,pY);
  		poligono.moverFigura(moverX,moverY);
  		}else{
  		this.figuraDectada.setCoordenadas(pX,pY);
  		actualizar();
		}
	}
}
}

function actualizar(cambie){
this.poligono.redibujar(cambie);
}

function soltar(e){
   this.mover = false;
   this.figuraDectada=null;
 }

 function borrarPunto(e){
   var px = e.layerX;
   var py= e.layerY;
   this.figuraDectada = poligono.detectarClick(px,py)
    if(this.figuraDectada != null){
      poligono.borrarCirculo(this.figuraDectada);
      actualizar();
    }
   actualizar();
 }
 function cambiarTono(e){
   if(tecla ==true){
   if((e.deltaY >0)&&(color > 0)&&((color <=255))){ // arriba
     color-=5;

   }
   if((e.deltaY <0)&& ((color >= 0)&&((color <255)))){ //abajo
     color+=5;
   }
 }
   poligono.cambiarColores(color);
   cambie=true;
   actualizar(cambie);

 }

 function teclaApretada(e){
   if((e.key == "c")||(e.key=="C")){
   tecla=true;
 }
}
function soltarTecla(e){
  if((e.key == "c")||(e.key=="C")){
  tecla=false;
  cambie=false;
}
}

canvas.addEventListener("click",estructurar);
canvas.addEventListener('mousedown',detectarClick);
canvas.addEventListener('mousemove',moverlos);
canvas.addEventListener('mouseup',soltar);
canvas.addEventListener('mousewheel',cambiarTono);
document.addEventListener('keydown',teclaApretada);
document.addEventListener('keyup',soltarTecla);
canvas.addEventListener('dblclick',borrarPunto);
