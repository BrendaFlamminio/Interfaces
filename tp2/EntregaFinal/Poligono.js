class Poligono  {
  constructor() {
    this.figuras= [];
    this.index= 0;
    this.canvas=document.getElementById('canvas');
    this.puntoCentro;
    this.rgbLineas="rgb(255,247,0)";
    this.rgbCentro="rgb(0,255,0)";
  }
  addFigura(circulo){
    this.figuras[this.index]=circulo;
    this.index++;
  }
  unirFigura(c,z){
    if(this.index > 1){
      let x = this.figuras[this.index-2].getPosX();
      let y = this.figuras[this.index-2].getPosY();
      ctx.strokeStyle = this.rgbLineas;
      ctx.moveTo(x,y);
      ctx.lineTo(c,z);
      ctx.stroke();
    }
  }
  encontrarCentro(cambie){
    var puntos = this.figuras;
    var centroide = {x: 0, y: 0};
    for(var i = 0; i < puntos.length; i++){
      var punto = puntos[i];
      centroide.x += punto.getPosX();
      centroide.y += punto.getPosY();
    }
    centroide.x /= puntos.length;
    centroide.y /= puntos.length;
    var circulo = new Circulo(centroide.x,centroide.y,"rgb(54,255,0)");
    circulo.setearValores(cambie,this.rgbCentro);
    circulo.crearCirculo(centroide.x,centroide.y);
    this.puntoCentro=circulo;

  }
  limpiarArreglo(){
    for(var i = 0; i < this.figuras.length; i++){
      this.figuras.splice();
    }
    this.index=0;
  }

  detectarClick(px,py){
    for(var i =0;i<this.figuras.length;i++){
      if(this.figuras[i].estaTocado(px,py)){
        return this.figuras[i];
      }
      if(this.puntoCentro!=null){
        if (this.puntoCentro.estaTocado(px,py)){
          return this.puntoCentro;
        }
      }}
    }
    moverFigura(x,y){
      for(let i=0;i<this.figuras.length;i++){
        this.figuras[i].setCoordenadas(this.figuras[i].getPosX()+x,this.figuras[i].getPosY()+y);
      }
      ctx.clearRect(0, 0, 500, 500);
      var primero = null;
      var segundo = null;
      for(let i=0;i<this.figuras.length;i++){
        primero = segundo;
        segundo = this.figuras[i];
        this.figuras[i].crearCirculo();
        if (primero != null)
        {
          this.volverUnir(primero,segundo);
        }
      }
      this.volverUnir(segundo,this.figuras[0]);
      this.puntoCentro.crearCirculo();
    }

    volverUnir(primero,segundo){
      ctx.strokeStyle = this.rgbLineas;
      ctx.moveTo(primero.getPosX(),primero.getPosY());
      ctx.lineTo(segundo.getPosX(),segundo.getPosY());
      ctx.stroke();
    }

    redibujar(cambie){
      ctx.clearRect(0, 0, 500, 500);
      var primero = null;
      var segundo = null;
      for(let i=0;i<this.figuras.length;i++){
        primero = segundo;
        segundo = this.figuras[i];
        this.figuras[i].crearCirculo();
        if (primero != null)
        {
          this.volverUnir(primero,segundo);
        }
      }
      this.volverUnir(segundo,this.figuras[0]);
      this.encontrarCentro(cambie);

      this.puntoCentro.crearCirculo();
    }


    cerrar(){
      let  x= this.figuras[0].getPosX();
      let  y= this.figuras[0].getPosY();
      ctx.strokeStyle = "#FFFF00";
      ctx.lineTo(x,y);
      ctx.stroke();
      this.encontrarCentro();
    }

    borrarCirculo(figuraDectada){
      for(var i = 0; i < this.figuras.length; i++){
        if(this.figuras[i]==figuraDectada){
        this.figuras.splice(i,1);
    }
  }
}
 cambiarColores(color){
   for (var i = 0; i < this.figuras.length; i++) {
       this.figuras[i].setColor("rgb("+color+",0,0)");
     }
    this.rgbCentro=("rgb(0,"+color+",0)");
    this.rgbLineas=("rgb("+color+","+color+",0)");

 }
}
