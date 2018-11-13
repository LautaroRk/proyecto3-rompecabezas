/*FALTA: -Evitar la acumulacion de instrucciones en la lista.
         -Mostrar cronómetro y movimientos en tiempo real y con formato de reloj digital.
         -Agregar botón de Reiniciar.
         -Terminar de diseñar el cartel ganador que reemplace el alert.
         -Terminar la funcionalidad del cartelGanador agregando y quitando clases en HTML.
         -Agregar opción de ocultar imagen objetivo.
         -Reemplazar flechas de ultimo movimiento por imagenes de las flechas del teclado.
         -¿? Agregar niveles de dificultad (grillas más grandes o niveles de mezcla) 
         y variedad de imagenes. */

// Arreglo que contiene las intrucciones del juego 
var instrucciones = ["Utilizar las flechas o clickear sobre una pieza para moverla hacia la posición vacía.","Ordenar las piezas hasta alcanzar la imagen objetivo."];
// Arreglo para ir guardando los movimientos que se vayan realizando
var movimientos = [];
var movimientosHTML = document.getElementById('movimientos');
var logrosMovimientosHTML = document.getElementById('logros-movimientos');

// Representación de la grilla. Cada número representa a una pieza.
// El 9 es la posición vacía
var grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

/* Variables para guardar la posición de la pieza vacía. 
Esta posición comienza siendo la [2, 2]*/
var filaVacia = 2;
var columnaVacia = 2;

/* Función para ecorrer el arreglo de instrucciones pasado por parámetro. 
Cada elemento de este arreglo se muestra en la lista con id 'lista-instrucciones'.*/
function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++){
      mostrarInstruccionEnLista(instrucciones[i],"lista-instrucciones");
    }
}

// Chequear si el rompecabezas esta en la posicion ganadora
function chequearSiGano() {
    var grillaGanadora = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];
    for (var i = 0; i < grilla.length; i++){
      for (var j = 0; j < grilla[i].length; j++){
        if (grilla[i][j] !== grillaGanadora[i][j]){
          return false;
        }
      }
    }
    return true;
}

// Inicializar cronómetro 
var segundos = 0;
var minutos = 0;
var segundosHTML = document.getElementById('segundos');
var minutosHTML = document.getElementById('minutos');
var logrosTiempoHTML = document.getElementById('logros-tiempo');

function inicializarCronometro() {
  segundos = 0;
  minutos = 0;
  segundosHTML.innerHTML = ':00';
  minutosHTML.innerHTML = '00';
}

function contarSegundos() {
  segundos++;
  if(segundos == 60){
    segundos = 0;
    minutos++;
  }
  actualizarCronometroEnPantalla();
}

function actualizarCronometroEnPantalla() {
  var seg = '';
  var min = '';

  if (segundos == 0) {
    seg = ':00';
  }else if (segundos < 10) {
    seg = ':' + '0' + segundos;
  }else{
    seg = ':' + segundos;
  }

  if (minutos == 0) {
    min = '00'
  }else if (minutos < 10) {
    min = '0' + minutos;
  }else{
    min = '' + minutos;
  }

  segundosHTML.innerHTML = seg;
  minutosHTML.innerHTML = min;
  logrosTiempoHTML.innerHTML = 'Tiempo: ' + min + seg;
}


var cartelGanador = document.getElementById('contenedor-cartel');

function ocultarCartelGanador() {
  cartelGanador.classList.add('oculto');
}


//Cartel que avisa que ganaste el juego, tiempo transcurrido y cantidad de movimientos
function mostrarCartelGanador() {
  logrosMovimientosHTML.innerHTML = 'Movimientos: ' + movimientosHTML.innerHTML;
  clearInterval(cronometro);
  // if (minutos >= 1){
  //   alert("Mejor tarde que nunca...\n\nTiempo: " + minutos + "minuto(s), " + segundos + "segundo(s)" + "\nCantidad de movimientos: " + movimientos.length);
  // }else if (minutos < 2 && segundos > 10){
  //   alert("¡Buen trabajo!\n\nTiempo: " + segundos + " segundos" + "\nCantidad de movimientos: " + movimientos.length);
  // }else{
  //   alert("¡IMPECABLE!\n\nTiempo: " + segundos + " segundo(s)!" + "\nCantidad de movimientos: " + movimientos.length);
  // }
  // cartelGanador.classList.replace('oculto', 'activo');
  cartelGanador.classList.remove('oculto');
  // cartelGanador.addEventListener('click', ocultarCartelGanador());
}

// Función que intercambia las posiciones de dos piezas en la grilla.
function intercambiarPosicionesGrilla(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    var pos1Anterior = grilla[filaPos1][columnaPos1];

    grilla[filaPos1][columnaPos1] = grilla[filaPos2][columnaPos2];
    grilla[filaPos2][columnaPos2] = pos1Anterior;
}

// Actualiza la posición de la pieza vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}


// Para chequear si la posicón está dentro de la grilla.
function posicionValida(fila, columna) {
    return fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2;
}

// Movimiento de piezas
function moverEnDireccion(direccion) {
  var nuevaFilaPiezaVacia;
  var nuevaColumnaPiezaVacia;

  // Mueve pieza hacia abajo, reemplazandola con la blanca
  if (direccion === codigosDireccion.ABAJO) {
    nuevaFilaPiezaVacia = filaVacia - 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  // Mueve pieza hacia arriba, reemplazandola con la blanca
  else if (direccion === codigosDireccion.ARRIBA) {
    nuevaFilaPiezaVacia = filaVacia + 1;
    nuevaColumnaPiezaVacia = columnaVacia;
  }
    
  // Mueve pieza hacia la derecha, reemplazandola con la blanca
  else if (direccion === codigosDireccion.DERECHA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia - 1;
  }
    
  // Mueve pieza hacia la izquierda, reemplazandola con la blanca
  else if (direccion === codigosDireccion.IZQUIERDA) {
    nuevaFilaPiezaVacia = filaVacia;
    nuevaColumnaPiezaVacia = columnaVacia + 1;
  }

  // Agrega la última dirección al arreglo de movimientos
  // La función actualizarUltimoMovimiento lo muestra en pantalla
  // Se chequea si la nueva posición es válida, si lo es, se intercambia. 

    if (posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        movimientos.push(direccion);
        movimientosHTML.innerHTML++;
        actualizarUltimoMovimiento(direccion);
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    }
}

// NO FUNCIONA. Funciones para mostrar y ocultar el boton de reinicio
var botonReiniciar = document.getElementById('reiniciar');

function mostrarBoton(boton) {
  boton.classList.remove('ocultar');
}

function ocultarBoton(boton) {
  boton.classList.add('ocultar');
}


/* FUNCION YA IMPLEMENTADA: codigosDireccion es un objeto que te permite reemplazar
el uso de números confusos en tu código. Para referirte a la dir
izquierda, en vez de usar el número 37, ahora podés usar:
codigosDireccion.IZQUIERDA. Esto facilita mucho la lectura del código. */
var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}

/* FUNCION YA IMPLEMENTADA: Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza
el intercambio en la pantalla (DOM). Para que funcione debera estar implementada
la funcion intercambiarPosicionesGrilla() */
function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
  // Intercambio posiciones en la grilla
  var pieza1 = grilla[fila1][columna1];
  var pieza2 = grilla[fila2][columna2];

  intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
  intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

}

/* FUNCION YA IMPLEMENTADA: Intercambio de posiciones de los elementos del DOM que representan
las fichas en la pantalla */

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
  // Intercambio posiciones en el DOM
  var elementoPieza1 = document.getElementById(idPieza1);
  var elementoPieza2 = document.getElementById(idPieza2);

  var padre = elementoPieza1.parentNode;

  var clonElemento1 = elementoPieza1.cloneNode(true);
  var clonElemento2 = elementoPieza2.cloneNode(true);

  padre.replaceChild(clonElemento1, elementoPieza2);
  padre.replaceChild(clonElemento2, elementoPieza1);
}

/* Actualiza la representación visual del último movimiento 
en la pantalla, representado con una flecha. */
function actualizarUltimoMovimiento(direccion) {
  ultimoMov = document.getElementById('flecha');
  switch (direccion) {
    case codigosDireccion.ARRIBA:
      ultimoMov.innerHTML = '<img src="images/arriba.png" alt="arriba">';
      break;
    case codigosDireccion.ABAJO:
      ultimoMov.innerHTML = '<img src="images/abajo.png" alt="abajo">';
      break;
    case codigosDireccion.DERECHA:
      ultimoMov.innerHTML = '<img src="images/derecha.png" alt="derecha">';
      break;
    case codigosDireccion.IZQUIERDA:
      ultimoMov.innerHTML = '<img src="images/izquierda.png" alt="izquierda">';
      break;
  }
}

/* FUNCION YA IMPLEMENTADA: Esta función permite agregar una instrucción a la lista
con idLista. Se crea un elemento li dinámicamente con el texto 
pasado con el parámetro "instrucción". */
function mostrarInstruccionEnLista(instruccion, idLista) {
  var ul = document.getElementById(idLista);
  var li = document.createElement("li");
  li.textContent = instruccion;
  ul.appendChild(li);
}

/* FUNCION YA IMPLEMENTADA (setTimeout agregado porque el cronómetro empezaba a 
correr mientras mezclaba el tablero): 
Función que mezcla las piezas del tablero una cantidad de veces dada.
Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
se mezclará todo el tablero. */

function mezclarPiezas(veces) {
  if (veces <= 0) {
    return;
  }
  
  var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA,
      codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA
    ];

  var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
  moverEnDireccion(direccion);

  setTimeout(function() {
      mezclarPiezas(veces - 1);
    }, 100);

  inicializarCronometro();
  movimientos = [];    
  movimientosHTML.innerHTML = '0';
  logrosMovimientosHTML.innerHTML = '0';
}

/* FUNCION YA IMPLEMENTADA: Esta función captura las teclas presionadas por el usuario. Javascript
permite detectar eventos, por ejemplo, cuando una tecla es presionada y en 
base a eso hacer algo. No es necesario que entiendas como funciona esto ahora, 
en el futuro ya lo vas a aprender. Por ahora, sólo hay que entender que cuando
se toca una tecla se hace algo en respuesta, en este caso, un movimiento */
function capturarTeclas() {
  document.body.onkeydown = (function(evento) {
    if (evento.which === codigosDireccion.ABAJO ||
      evento.which === codigosDireccion.ARRIBA ||
      evento.which === codigosDireccion.DERECHA ||
      evento.which === codigosDireccion.IZQUIERDA) {

      moverEnDireccion(evento.which);

        var gano = chequearSiGano();
        if (gano) {
          setTimeout(function() {
              mostrarCartelGanador();
              }, 400);
            }
            evento.preventDefault();
        }
    })
}

//No funciona. Probar generar una grilla invisible arriba de la otra que mantenga las posiciones fijas.
function moverPiezaClickeada(fila, columna) {

  if(fila - 1 === filaVacia && columna === columnaVacia) {
    moverEnDireccion(codigosDireccion.ARRIBA);
  }

  else if(fila + 1 === filaVacia && columna === columnaVacia) {
    moverEnDireccion(codigosDireccion.ABAJO);
  }

  else if(fila === filaVacia && columna - 1 === columnaVacia) {
    moverEnDireccion(codigosDireccion.IZQUIERDA);
  }

  else if(fila === filaVacia && columna + 1 === columnaVacia) {
    moverEnDireccion(codigosDireccion.DERECHA);
  }

  var gano = chequearSiGano();
  if (gano) {
    setTimeout(function() {
        mostrarCartelGanador();
    }, 400);
  }
}

/* Al iniciar se muestran las instrucciones, se mezclan las piezas y se inicializa 
el cronómetro. */
var cronometro;
var veces = 30;

function iniciar() {
  ocultarCartelGanador();
  mezclarPiezas(veces);
  clearInterval(cronometro);
  cronometro = setInterval('contarSegundos()', 1000);
  capturarTeclas();
}

// Ejecutamos la función iniciar y mostrarInstrucciones
iniciar();
mostrarInstrucciones(instrucciones);

//Para cambiar el dibujo del rompecabezas
  //Arreglo que recorre las imagenes.HTML 
  var imagenesId = ['pieza1','pieza2','pieza3','pieza4','pieza5',
  'pieza6','pieza7','pieza8','imagen-objetivo','imagen-final'];

  //Arreglos para cada imagen
  var cuarto = ['<img src="images/1.jpg">','<img src="images/2.jpg">',
  '<img src="images/3.jpg">','<img src="images/4.jpg">','<img src="images/5.jpg">',
  '<img src="images/6.jpg">','<img src="images/7.jpg">','<img src="images/8.jpg">',
  '<img src="images/objetivo.png">','<img src="images/imagen-completa.jpg">'];

  var pikachu = ['<img src="images/11.jpg">','<img src="images/12.jpg">',
  '<img src="images/13.jpg">','<img src="images/14.jpg">','<img src="images/15.jpg">',
  '<img src="images/16.jpg">','<img src="images/17.jpg">','<img src="images/18.jpg">',
  '<img src="images/1objetivo.png">','<img src="images/1imagen-completa.jpg">'];

  var oreja = ['<img src="images/21.jpg">','<img src="images/22.jpg">',
  '<img src="images/23.jpg">','<img src="images/24.jpg">','<img src="images/25.jpg">',
  '<img src="images/26.jpg">','<img src="images/27.jpg">','<img src="images/28.jpg">',
  '<img src="images/2objetivo.png">','<img src="images/2imagen-completa.jpg">'];

  var flores = ['<img src="images/31.jpg">','<img src="images/32.jpg">',
  '<img src="images/33.jpg">','<img src="images/34.jpg">','<img src="images/35.jpg">',
  '<img src="images/36.jpg">','<img src="images/37.jpg">','<img src="images/38.jpg">',
  '<img src="images/3objetivo.png">','<img src="images/3imagen-completa.jpg">'];

  //Función que reemplaza la etiqueta de HTML de cada imagen
  function reemplazarImagenes (imagen){
      for (var i = 0; i < imagenesId.length; i++) {
          document.getElementById(imagenesId[i]).innerHTML = imagen[i];
      }
      ocultarCartelGanador();
      mezclarPiezas(veces);
  }

  // reemplazarImagenes(flores);