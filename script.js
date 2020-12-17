//	import {Nota} from "./Modelo.js";
// Clase Nota

class Nota {
  constructor(id, titulo, texto, fecha) {
    // Declaración de variables
    this.id = id;
    this.titulo = titulo;
    this.texto = texto;
    this.fecha = fecha;
  }
}

var notas = [];
var cont = 0;
var canCreate = true;
var edit = true;
var notaE = null;

window.onload = () => {
  //localStorage.clear();
  if (localStorage.getItem("notas") != null) {
    var notasC = JSON.parse(localStorage.getItem("notas"));
    //cargarNotas();
    for (var i = 0; i < notasC.length; i++) {
      cont = i + 1;
      cargarNotas(notasC[i]);
      console.log(notasC[i].id);
    }
  }
  cont = cont + 1;
}

function eliminar() {
  localStorage.clear();
  location.reload();
}

function cargarNotas(nota) {
  let id = "postit" + cont;
  var division = document.getElementById("bloque");

  var divNota = document.createElement("div");
  divNota.setAttribute("id", id);
  divNota.setAttribute("class", "postit");
  divNota.setAttribute("contenteditable", "false");
  divNota.setAttribute("style", "height:auto;width:150px");
  divNota.addEventListener("mousedown", function() {
    movernota(event)
  });
  var divcerrar = document.createElement("div");
  divcerrar.setAttribute("align", "right");
  var diva = document.createElement("a");
  diva.addEventListener("click", function() {
    cerrar(event)
  });
  //diva.setAttribute("onclick","cerrar(event)");
  diva.setAttribute("contenteditable", "false");

  diva.textContent = "[X]";
  var dive = document.createElement("a");
  dive.addEventListener("click", function() {
    editar(event)
  });
  dive.setAttribute("contenteditable", "false");
  dive.setAttribute("class", "editar" + cont);
  dive.textContent = "[EDIT]";
  divcerrar.appendChild(dive);
  divcerrar.appendChild(diva);
  var divp = document.createElement("p");
  divp.setAttribute("contenteditable", "false");
  divp.setAttribute("class", "titulo" + cont);
  divp.setAttribute("style", "font-weight:bold;");
  divp.textContent = nota.titulo;
  var divp2 = document.createElement("p");
  divp2.setAttribute("contenteditable", "false");
  divp2.setAttribute("class", "texto" + cont);
  divp2.setAttribute("style", "word-wrap:break-word");
  divp2.textContent = nota.texto;

	var divp3 = document.createElement("p");
  var fecha = Date.parse(nota.fecha);
	var fechahoy = new Date();
	var diffMs = (fechahoy - fecha);
	var min = Math.round(((diffMs % 86400000) % 3600000) / 60000);
	divp3.textContent= min + " min";

  var boton = document.createElement("button");
  boton.setAttribute("align", "right");
  boton.addEventListener("click", confirmar);
  //boton.setAttribute("onclick", "confirmar()");
  boton.setAttribute("style", "visibility:hidden");
  boton.setAttribute("class", "boton" + cont);
  boton.textContent = "Aceptar";

  divNota.appendChild(divcerrar);


  divNota.appendChild(divp);
  divNota.appendChild(divp2);
  divNota.appendChild(divp3);
  divNota.appendChild(boton);
  division.appendChild(divNota);
  notas.push(new Nota(id, nota.titulo, nota.texto, nota.fecha));

}


function editar(evento) {
  if (edit) {
    canCreate = false;
    edit = false;
    var id = evento.target.parentNode.parentNode.id;
    console.log("EDIT: " + id.substr(6, id.length));
    let boton = document.getElementsByClassName("boton" + id.substr(6, id.length));
    boton[0].style.visibility = "visible";
    let titulo = document.getElementsByClassName("titulo" + id.substr(6, id.length));
    let texto = document.getElementsByClassName("texto" + id.substr(6, id.length));
    titulo[0].setAttribute("contenteditable", "true");
    texto[0].setAttribute("contenteditable", "true");
    let pos;
    for (let i = 0; i < notas.length; i++) {
      if (id == notas[i].id) {
        pos = i;
        notaE = new Nota(notas[i].id, notas[i].titulo, notas[i].texto, notas[i].fecha);
        notas.splice(i, 1);
      }
    }
  }
}

function crear() {
  if (canCreate) {
    canCreate = false;
    var division = document.getElementById("bloque");

    var divNota = document.createElement("div");
    divNota.setAttribute("id", "postit" + cont);
    divNota.setAttribute("class", "postit");
    divNota.setAttribute("contenteditable", "false");
    divNota.setAttribute("style", "height:auto;width:150px");
    divNota.addEventListener("mousedown", function() {
      movernota(event)
    });

    var divcerrar = document.createElement("div");
    divcerrar.setAttribute("align", "right");

    var diva = document.createElement("a");
    diva.addEventListener("click", function() {
      cerrar(event)
    });
    diva.setAttribute("contenteditable", "false");
    diva.textContent = "[X]";

    var dive = document.createElement("a");
    dive.addEventListener("click", function() {
      editar(event)
    });
    dive.setAttribute("contenteditable", "false");
    dive.setAttribute("class", "editar" + cont);
    dive.setAttribute("style", "visibility:hidden");
    dive.textContent = "[EDIT]";
    divcerrar.appendChild(dive);
    divcerrar.appendChild(diva);

    var divp = document.createElement("p");
    divp.setAttribute("contenteditable", "true");
    divp.setAttribute("class", "titulo" + cont);
    divp.setAttribute("style", "font-weight:bold;");
    divp.textContent = "Titulo";

    var divp2 = document.createElement("p");
    divp2.setAttribute("contenteditable", "true");
    divp2.setAttribute("class", "texto" + cont);
    divp2.setAttribute("style", "word-wrap:break-word");
    divp2.textContent = "Aqui va el texto..";

    var divp3 = document.createElement("p");
    divp3.setAttribute("class", "fecha" + cont);
    divp3.setAttribute("contenteditable", "false");
		divp3.textContent="0 min";

    var boton = document.createElement("button");
    boton.setAttribute("align", "right");
    boton.addEventListener("click", confirmar);
    boton.setAttribute("class", "boton" + cont);
    boton.textContent = "Aceptar";
    divNota.appendChild(divcerrar);
    divNota.appendChild(divp);
    divNota.appendChild(divp2);
		divNota.appendChild(divp3);
    divNota.appendChild(boton);
    division.appendChild(divNota);
  }
}


function confirmar() {
  if (notaE !== null) {
    let idE = notaE.id.substr(6, notaE.id.length);
    var boton = document.getElementsByClassName("boton" + idE);
    boton[0].style.visibility = "hidden";
    canCreate = true;
    let titulo = document.getElementsByClassName("titulo" + idE);
    let texto = document.getElementsByClassName("texto" + idE);
    titulo[0].setAttribute("contenteditable", "false");
    texto[0].setAttribute("contenteditable", "false");
    notaE.titulo = titulo[0].textContent;
    notaE.texto = texto[0].textContent;
    notas.push(notaE);
    localStorage.setItem("notas", JSON.stringify(notas));
    edit = true;
    notaE = null

  } else {
    var boton = document.getElementsByClassName("boton" + cont);
    var editarBt = document.getElementsByClassName("editar" + cont);
    //boton[0].remove();
    boton[0].style.visibility = "hidden";
    editarBt[0].style.visibility = "visible";
    canCreate = true;
    let id = "postit" + cont;
    let titulo = document.getElementsByClassName("titulo" + cont);
    let texto = document.getElementsByClassName("texto" + cont);
    let fechaN = new Date();

    titulo[0].setAttribute("contenteditable", "false");
    texto[0].setAttribute("contenteditable", "false");

    titulo = titulo[0].textContent;
    texto = texto[0].textContent;



    notas.push(new Nota(id, titulo, texto, fechaN));
    localStorage.setItem("notas", JSON.stringify(notas));
    console.log("id : " + id);
    console.log("titulo : " + titulo);
    console.log("texto : " + texto);
    cont = cont + 1;
  }
}

function cambiartexto(evento) {
  try {
    var valor = evento.target.id;
    id = document.getElementById(valor);
    id.contenteditable = "true";
  } catch (error) {
    console.log("Error Cambiar texto");
  }
}

function cerrar(evento) {
  var id = evento.target.parentNode.parentNode.id;
  for (let i = 0; i < notas.length; i++) {
    if (id == notas[i].id) {
      notas.splice(i, 1);
    }
  }
  document.getElementById(id).remove();
  localStorage.setItem("notas", JSON.stringify(notas));
}

function movernota(evento) {
  try {
    var valor = evento.target.id;
    id = document.getElementById(valor);
    id.style.position = 'absolute';
    id.style.zIndex = 1000;

    document.body.append(id);

    function moveAt(pageX, pageY) {
      id.style.left = pageX - id.offsetWidth / 2 + 'px';
      id.style.top = pageY - id.offsetHeight / 2 + 'px';
    }
    moveAt(event.pageX, event.pageY);

    function onMouseMove(event) {
      moveAt(event.pageX, event.pageY);
    }

    document.addEventListener('mousemove', onMouseMove);

    id.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      id.onmouseup = null;
    };
  } catch (error) {
    console.log("Error Mover Nota");
  }
};
