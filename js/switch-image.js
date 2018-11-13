var imagenesId = ['pieza1','pieza2','pieza3','pieza4','pieza5',
'pieza6','pieza7','pieza8','imagen-objetivo','imagen-final'];
var pikachu = ['<img src="images/11.jpg">','<img src="images/12.jpg">',
'<img src="images/13.jpg">','<img src="images/14.jpg">','<img src="images/15.jpg">',
'<img src="images/16.jpg">','<img src="images/17.jpg">','<img src="images/18.jpg">',
'<img src="images/objetivo-2.jpg">','<img src="images/final-2.jpg">'];

function reemplazarImagenes (imagen){
    for (var i = 0; i < imagenesId.length; i++) {
        document.getElementById(imagenesId[i]).innerHTML = imagen[i];
    }
}

reemplazarImagenes(pikachu);
