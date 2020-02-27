class Backend {
  literales = new Array();
  reglas = new Array();
  basicas = new Array();
  resueltas = new Array();
  constructor() {
    this.literales
    this.reglas = new Array();
    // pasa el diccionario a un arreglo
    Diccionario = Diccionario.split(";");
    for (var i = Diccionario.length - 1; i >= 0; i--) {
      Diccionario[i] = Diccionario[i].split("=");
      Diccionario[i][0] = Diccionario[i][0].replace(/\s/g, '');
      this.literales.push(new Literales(Diccionario[i][0], Diccionario[i][1], Diccionario[i][2]))

    }
    Conocimiento = Conocimiento.split(";");
    for (var i = Conocimiento.length - 1; i >= 0; i--) {
      console.log(Conocimiento[i]);
    }
    // Obtiene todas las Literales y hace que conocimiento tenga un arreglo de el conocimiento
    for (var i = Conocimiento.length - 1; i >= 0; i--) { //por cada regla
      Conocimiento[i] = Conocimiento[i].replace('(', '');
      Conocimiento[i] = Conocimiento[i].replace(')->', '&');
      Conocimiento[i] = Conocimiento[i].split("&");

      for (var j = Conocimiento[i].length - 1; j >= 0; j--) { //por cada literal en la regla
        if (Conocimiento[i].length - 1 != j) {
          if (Conocimiento[i][j].charAt(0) == "!") {
            Conocimiento[i][j] = Conocimiento[i][j].replace('!', '');
          } else {
            Conocimiento[i][j] = "!" + Conocimiento[i][j];
          }
        }
        for (var k = this.literales.length - 1; k >= 0; k--) {
          if (Conocimiento[i][j] == this.literales[k].name || Conocimiento[i][j] == this.literales[k].negacion.name) {
            if (Conocimiento[i][j].charAt(0) == "!") {
              Conocimiento[i][j] = this.literales[k].negacion;
            } else {
              Conocimiento[i][j] = this.literales[k];
            }
          }
        }
      }
    }


    var it = 0;
    for (var i = Conocimiento.length - 1; i >= 0; i--) {
      for (var j = Conocimiento[i].length - 1; j >= 0; j--) {
        this.reglas.push([Conocimiento[i][j], new Array(), new Array()]);
        for (var k = Conocimiento[i].length - 1; k >= 0; k--) {
          if (k !== j) {
            this.reglas[it][1].push(Conocimiento[i][k].negacion); // la negacion por que A&B se vuelve !A->B
          }
        }
        it++;
      }
    }

    var basicas = new Array();
    for (var i = this.literales.length - 1; i >= 0; i--) {
      if (this.literales[i].basica == "1") {
        basicas.push([this.literales[i].name, this.literales[i].definicion, this.literales[i].valor]);
      }
    }
    this.basicas = basicas;
  }

  ForwardChaning(basicas) {
    this.Acomodador(basicas);
    var salir = false;
    //var salir=true;
    do {
      salir = false;
      for (var i = this.reglas.length - 1; i >= 0; i--) {
        if (this.valorcheck(this.reglas[i][0].name) == 2 && this.reglas[i][0].basica != "1") {
          console.log(i + " " + this.reglas[i][0].name);
          if (this.resolve(this.reglas[i])) {
            //alert(this.reglas[i][0].name+" was resolved");
            this.reglas[i][0].setValor(1);
            //alert(this.valorcheck(this.reglas[i][0].name));
            salir = true;
            this.reglas[i].pop;
          }
        } else {
          this.reglas[i].pop;
        }
      }
    } while (salir);
    for (var i = this.literales.length - 1; i >= 0; i--) {
      if (this.literales[i].valor == 1 && this.literales[i].basica == "0") {
        this.resueltas.push([this.literales[i].definicion]);
      }
    }
  }

  Acomodador(basicas) { // los que le llegan los guarda
    for (var i = basicas.length - 1; i >= 0; i--) {
      for (var j = this.literales.length - 1; j >= 0; j--) {
        if (basicas[i][0] == this.literales[j].name) {
          this.literales[j].setValor(basicas[i][2]);
        }
        if (basicas[i][0] == this.literales[j].negacion.name) {
          this.literales[j].negacion.setValor(basicas[i][2]);
          //alert(this.literales[j].negacion.name+" ! "+this.literales[j].negacion.valor)
        }
      }
    }
  }

  valorcheck(encontrar) {
    for (var j = this.literales.length - 1; j >= 0; j--) {
      if (encontrar == this.literales[j].name) {
        //alert(this.literales[j].name+" # "+this.literales[j].valor);
        return this.literales[j].valor;
      }
      if (encontrar == this.literales[j].negacion.name) {
        //alert(this.literales[j].name+" # "+this.literales[j].valor);
        return this.literales[j].negacion.valor;
      }
    }
  }

  resolve(reglas) {
    var nose = true;
    reglas[2] = new Array();
    if (reglas[0].name == "MIG") {
      alert("|" + reglas[0].name + "|");
    }
    console.log();
    for (var i = 0; i < reglas[1].length; i++) {
      //alert(reglas[1][i].name+" "+reglas[1][i].valor);
      if (reglas[0].name == "MIG") {
        alert(reglas[1][i].name + " 1 " + reglas[1][i].valor);
      }
      if (this.valorcheck(reglas[1][i].name) != 1) {
        nose = false;
        reglas[2].push(reglas[1][i]);
      }
    }
    if (nose) {
      return true;
    }
    return false;
  }
}
// para las literales a una classe
