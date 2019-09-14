class Circulo {
  constructor(coordenadaX ,coordenadaY,color) {
  this.x=coordenadaX;
  this.y=coordenadaY;
  this.color =color;
  this.tamaño=10;
  this.soyCentro=false;
  }

crearCirculo(x,y){
    ctx.fillStyle =this.color;
    ctx.beginPath();
    ctx.arc(this.x,this.y,this.tamaño, 0 , Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }
getPosX(){
  return this.x;
}
getPosY(){
  return this.y;
}
gettamaño(){
  return this.tamaño;
}
setearValores(cambie,rgbCentro){
  if(cambie==true){
    this.color=rgbCentro;
console.log(rgbCentro);
  }
  this.tamaño = 7;
  this.soyCentro=true;

}
esCentro(){
  if(this.soyCentro == true){
    return true;
  }
  return false;
}
estaTocado(px,py){
  let dist = Math.sqrt((Math.pow((px-this.x),2))+(Math.pow((py-this.y),2)));
   if(dist>this.tamaño+10){
     return false;
   }
   else{
     return true;
   }
  }
  setCoordenadas(px,py){
    this.x=px;
    this.y=py;
  }
  setColor(rgb){
  this.color=rgb;
  }

}
