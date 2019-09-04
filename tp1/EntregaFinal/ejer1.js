
//Ejercicio 1
var columnas=5;
var filas=3;
var matriz = [];



function funcion1(){
  limpiarTexto();
  ocultarForm();
  text.innerHTML+='Los resultados se encuentran en la consola :D.';
  canvas.width=width;
  canvas.height=height;

  crearMatriz();
  console.log(matriz);
  console.log(valorMaximo());
  console.log(valorPromedioPorFila());
  console.log(paresMayoresImparesMenores());
}

function crearMatriz() {
  for(let i=0; i<columnas; i++) {
    matriz[i] = [];
  }
  cargarMatriz();
}
function cargarMatriz(){
  for(let y=0;y<filas;y++){
    for(let x=0;x<columnas;x++){
      matriz[y][x]= Math.floor(Math.random() * 200);
    }
  }
}

function valorMaximo() {
  let mayor =0;
  for(let y=0;y<filas;y++){
    for(let x=0;x<columnas;x++){
      if((mayor==0)||(matriz[y][x]> mayor)){
        mayor = matriz[y][x];
      }
    }
  }
  return mayor;
}

function valorPromedioPorFila(){
  let promedio = [];
  let fila;
  for(let y=0;y<filas;y++){
    fila = 0;
    for(let x=0;x<columnas;x++){
      fila+=matriz[y][x];
    }
    promedio[y] = fila/filas;
  }
  return promedio;
}

function paresMayoresImparesMenores() {
  let resultado =[];
  let mayor;
  let menor;
  for (var y = 0; y < filas; y++){
    mayor=0;
    menor=99999;
    if(!( y %2 )){
      for (var x = 0; x < columnas; x++) {
        if(matriz[y][x]>mayor){
          mayor=matriz[y][x];
        }
      }
      resultado[y]=mayor;
    }
    else {
      for (var x = 0; x < columnas; x++){
        if(matriz[y][x]<menor){
          menor=matriz[y][x];
        }
      }
      resultado[y]=menor;
    }
  }
  return resultado;
}

//DECLARACIONES

var canvas= document.getElementById('canvas');
var ctx= canvas.getContext("2d");
var width =canvas.width;
var height=canvas.height;
var text=document.querySelector('.texto');
let imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
function ocultarForm(){
  let div = document.querySelector('.form');
  div.hidden=true;
  let boton = document.querySelector('.boton');
  boton.hidden=true;
}
function limpiarTexto() {
  text.innerHTML='';
}
//Ejercicio 2
function funcion2() {
  limpiarTexto();
  ocultarForm();
  canvas.width=width;
  canvas.height=height;
  text.innerHTML+='Pintar una región rectangular de un color utilizando el Contexto de HTML5.';
  ctx.fillStyle = "#6EFF33";
  ctx.fillRect(0,0,width,height);
}
//Ejercicio 3
function funcion3(){
  limpiarTexto();
  ocultarForm();
  canvas.width=width;
  canvas.height=height;
  text.innerHTML+='Pintar una región rectangular de un color utilizando la estructura de ImageData.';

  var imageData = ctx.createImageData(width, height);

  for (let x=0; x<width; x++){
    for(let y=0; y<height; y++){
      setPixel(imageData, x , y ,215, 44, 78, 100);
    }
  }
  ctx.putImageData(imageData, 0,0);
}
function setPixel (imageData, x , y , r , g , b ,a )
{
  index = (x + y * imageData.width)* 4;
  imageData.data[index+0] = r;
  imageData.data[index+1] = g;
  imageData.data[index+2] = b;
  imageData.data[index+3] = a;
}

//Ejercicio 4
function funcion4() {
  limpiarTexto();
  ocultarForm();
  canvas.width=width;
  canvas.height=height;
  text.innerHTML+='Pintar un rectángulo utilizando un gradiente';

  let r=0;
  let b =0;
  let g =0;
  let a=255;
  let color=0;
  var imageData = ctx.createImageData(width, height);

  for (let x=0; x<height; x++){
    color++;
    for(let y=0; y<width; y++){

      setPixel(imageData, y , x ,r, g, b,a);
    }
    if(color>2){
      r+=1;
      g+=1;
      b+=1;
      color=0;
    }
  }
  ctx.putImageData(imageData, 0,0);
}

function setPixel (imageData, x , y , r , g , b ,a ){
  index = (x + y * imageData.width)* 4;
  imageData.data[index+0] = r;
  imageData.data[index+1] = g;
  imageData.data[index+2] = b;
  imageData.data[index+3] = a;
}

function funcion6() {
  limpiarTexto();
  canvas.width=width;
  canvas.height=height;
  mostrarForm();
  text.innerHTML+='Cargar una imagen y aplicarle un filtro de escala de grises.';
}

function mostrarForm(){
  let div = document.querySelector('.form');
  div.hidden=false;
  let boton = document.querySelector('.boton');
  boton.hidden=false;
}

function guardarOpcion(){
  var url=document.getElementById("opciones").value;
  cargarImagen(url);
}

function cargarImagen(url) {
  var imagen = new Image();
  imagen.src="./imagenes/" +url+ ".jpg";
  //imagen.crossOrigin = 'Anonymous';
  imagen.onload = function (){
    canvas.width=this.width;
    canvas.height=this.height;
    ctx.drawImage(this,0,0);
    imageData = ctx.getImageData(0,0,this.width,this.height);

  }
}
aplicarFiltro();

function aplicarFiltro() {

  for(let y = 0; y < imageData.width; y++){
    for(let x = 0; x < imageData.height; x++){

      let rojo = getRojo(imageData, y, x);
      let verde = getVerde(imageData, y, x);
      let azul = getAzul(imageData, y, x);

      let gris = (rojo + verde + azul) / 3;

      setPixel(imageData, y, x, gris, gris, gris,255);
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function getRojo(imageData, x, y){
  let index = (x + y *  imageData.width) * 4;
  return imageData.data[index+0];
}
function getVerde(imageData, x, y){
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index+1];
}
function getAzul(imageData, x, y){
  let index = (x + y * imageData.width) * 4;
  return imageData.data[index+2];
}


function funcion5() {
  limpiarTexto();
  ocultarForm();
  canvas.width=width;
  canvas.height=height;
  text.innerHTML+='Pintar un rectángulo en, utilizando un gradiente que vaya de negro a amarillo, y de amarillo a rojo.';
  let r=0;
  let b =0;
  let g =0;
  let a=255;
  let color=0;
  var imageData = ctx.createImageData(width, height);

  for (let x=0; x<width; x++){

    for(let y=0; y<height; y++){

      setPixel(imageData, x , y ,r, g, b,a);
    }
    if(x<width/2){
      r+=1;
      g+=1;
      b-=1;
      color=0;
    }else {
      r+=1;
      b-=1;
      g-=1;
    }

  }
  ctx.putImageData(imageData, 0,0);
}
