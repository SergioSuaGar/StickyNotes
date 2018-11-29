

//VISTA

function vistaCorcho() {
    var corcho = document.createElement("div");
    corcho.setAttribute("id","corcho");
    var botonAñadir = document.createElement("button");
    botonAñadir.innerText="Añadir Nota";
    botonAñadir.setAttribute("onclick","crearNota()")
    corcho.appendChild(botonAñadir);
    document.body.appendChild(corcho);

}

function vistaNota(nota) {
    var divRaiz = document.createElement("div");
    divRaiz.setAttribute("class","nota");
    var titulo = document.createElement("h2");
    titulo.innerHTML=nota.titulo;
    divRaiz.appendChild(titulo);
    var texto = document.createElement("p");
    texto.innerHTML=nota.texto;
    divRaiz.appendChild(texto);
    var fecha = document.createElement("p");
    fecha.innerHTML=nota.fecha;
    divRaiz.appendChild(fecha);
    var modificar = document.createElement("button");
    modificar.innerHTML="Modificar";
    modificar.addEventListener("click", modificarNota);
    divRaiz.appendChild(modificar);
    var eliminar = document.createElement("button");
    eliminar.innerHTML="Eliminar";
    eliminar.addEventListener("click", eliminarNota);
    divRaiz.appendChild(eliminar);
    return divRaiz;
}

// MODELO

class Nota{
    constructor(titulo,texto){
        this.titulo=titulo;
        this.texto=texto;
        this.fecha=new Date();
    }
}
var array=[];

// CONTROLADOR

function crearNota(){
    var titulo = prompt("Titulo de la nota");
    var texto= prompt("Texto");
    array.push(new Nota(titulo,texto));
    document.getElementById("corcho").appendChild(vistaNota(array[array.length-1]));
    guardarLocalStorage();
}

function modificarNota(e) {
    var tituloNuevo = prompt("Titulo de la nota");
    var textoNuevo= prompt("Texto");
    var pos = [...document.getElementsByClassName("nota")].indexOf(e.target.parentElement);
    array[pos].titulo = tituloNuevo;
    array[pos].texto = textoNuevo;
    document.getElementsByClassName("nota")[pos].children[0].innerHTML=tituloNuevo;
    document.getElementsByClassName("nota")[pos].children[1].innerHTML=textoNuevo;
    guardarLocalStorage();
}

function eliminarNota(e) {
    var pos = [...document.getElementsByClassName("nota")].indexOf(e.target.parentElement);
    array.splice(pos,1);
    document.getElementsByClassName("nota")[pos].remove();
    guardarLocalStorage();

}

function guardarLocalStorage(){
    localStorage.setItem("Notas", JSON.stringify(array));
}

function obtenerLocalStorage(){
    if(localStorage.getItem("Notas")){
        let arrayAux = JSON.parse(localStorage.getItem("Notas"));
        for (let i=0;i<arrayAux.length;i++){
            array.push(arrayAux[i]);
            document.getElementById("corcho").appendChild(vistaNota(array[array.length-1]));
        }
    }else{
        console.log("No hay Notas guardadas");
    }
}
window.onload = function() {
    vistaCorcho();
    obtenerLocalStorage();
};