document.addEventListener("keydown", function(evento) {
    if (evento.keyCode == 32) {
        console.log("salta");
        if (!nivel.muerto) {
           saltar(); 
        } else {
            nivel.velocidad = 9;
            nube.velocidad = 2;
            nivel.puntuacion = 0;
            nivel.muerto = false;
            cactus.x = ancho + 100;
            nube.x = 400;
        }
    }
});

var ancho = 700;
var alto = 300;
var canvas, ctx;
var imgRex, imgNube, imgCactus, imgSuelo;

function cargaImagenes() {
    imgRex = new Image();
    imgRex.src = "img/rex.png";

    imgNube = new Image();
    imgNube.src = "img/nube.png";

    imgCactus = new Image();
    imgCactus.src = "img/cactus.png";

    imgSuelo = new Image();
    imgSuelo.src = "img/suelo.png";
}

function inicializa() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    cargaImagenes();
}

function borraCanvas() {
    canvas.width = ancho;
    canvas.height = alto;
}

var suelo = 200;
var trex = {
    y: suelo,
    vy: 0,
    gravedad: 2,
    salto: 28,
    vymax: 9,
    saltando: false
};
var cactus = {
    x: ancho + 100,
    y: suelo - 20
};
var nube = {
    x: 400,
    y: 100,
    velocidad: 2
};
var suelog = {
    x: 0,
    y: suelo
};
var nivel = {
    velocidad: 9,
    puntuacion: 0,
    muerto: false
};

function dibujaNube() {
    ctx.drawImage(imgNube, 0, 0, 123, 50, nube.x, nube.y, 82, 31);
}

function dibujaCactus() {
    ctx.drawImage(imgCactus, 0, 0, 67, 110, cactus.x, cactus.y, 38, 75);
}

function dibujaSuelo() {
    ctx.drawImage(imgSuelo, suelog.x, 0, 700, 30, 0, suelog.y, 700, 30);
}

function dibujaRex() {
    ctx.drawImage(imgRex, 0, 0, 142, 153, 100, trex.y, 50, 50);
}

function gravedad() {
    if (trex.saltando) {
        if(trex.y - trex.vy - trex.gravedad > suelo) {
            trex.saltando = false;
            trex.vy = 0;
            trex.y = suelo;
        } else {
            trex.vy -= trex.gravedad;
            trex.y -= trex.vy;
        }
    }
}

function logicaNube() {
    if (nube.x < -100) {
        nube.x = ancho + 100;
    } else {
        nube.x -= nube.velocidad;
    }
}

function logicaCactus() {
    if (cactus.x < -100) {
        cactus.x = ancho + 100;
        nivel.puntuacion++;
    } else {
        cactus.x -= nivel.velocidad;
    }
}

function logicaSuelo() {
    if (suelog.x > 700) {
        suelog.x = 0;
    } else {
        suelog.x += nivel.velocidad;
    }
}

function saltar() {
    if (trex.saltando == false) trex.vy = trex.salto;
    trex.saltando = true;
}

function colision() {
    if (cactus.x >= 100 && cactus.x <= 150) {
        if (trex.y >= (suelo - 20)) {
            nivel.muerto = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
        }
    }
}

function puntuacion() {
    ctx.font = "30px impact";
    ctx.fillStyle = "#555";
    ctx.fillText(nivel.puntuacion, 600, 50);
    if (nivel.muerto) {
        ctx.font = "60px impact";
        ctx.fillText("GAME OVER", 240, 150);
    }
}

//bucle principal

var FPS = 50;
setInterval(function() {
    principal();
}, 1000 / FPS);

function principal() {
    borraCanvas();
    gravedad();
    colision();
    logicaCactus();
    logicaNube();
    dibujaCactus();
    dibujaNube();
    //dibujaSuelo();
    dibujaRex();
    puntuacion();
}
