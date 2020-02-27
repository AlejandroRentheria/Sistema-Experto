class Literales {
  name;
  definicion;
  valor = 2;
  basica;
  negacion;

  constructor(name, definicion, basica) {
    this.name = name;
    this.basica = basica;
    if (name.charAt(0) != '!') {
      this.negacion = new Literales("!" + name, definicion, basica);
      this.negacion.negacion = this;
      this.definicion = definicion;
    } else {
      this.negacion = null;
      this.definicion = "No " + definicion;
    }
  }

  setValor(newValor) {
    if (newValor == 0) {
      this.valor = 0;
      this.negacion.valor = 1;
    }
    if (newValor == 1) {
      this.valor = 1;
      this.negacion.valor = 0;
    }
    if (newValor == 2) {
      this.valor = 2;
      this.negacion.valor = 2;
    }
  }
}
