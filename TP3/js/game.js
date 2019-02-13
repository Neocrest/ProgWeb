var animFrame = window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            window.oRequestAnimationFrame      ||
            window.msRequestAnimationFrame     ||
            null;

//Canvas
var divArena;
var canArena;
var conArena;
var ArenaWidth = 500;
var ArenaHeight = 300;

//Background
var imgBackground;
var xBackgroundOffset = 0;
var xBackgroundSpeed = 1;
var backgroundWidth = 1782;
var backgroundHeight = 600;

///////////////////////////////////
//Keys
var keys = {
    UP: 38,
    DOWN: 40,
    SPACE: 32,
    ENTER: 13
};

var keyStatus = {};

function keyDownHandler(event) {
    "use strict";
    var keycode = event.keyCode,
        key;
    for (key in keys) {
        if (keys[key] === keycode) {
            keyStatus[keycode] = true;
            event.preventDefault();
        }
    }
}
function keyUpHandler(event) {
   var keycode = event.keyCode,
            key;
    for (key in keys)
        if (keys[key] == keycode) {
            keyStatus[keycode] = false;
        }

    }
///////////////////////////////////


var score = 0;
/////////////////////////////////
// Hero Player
var imgPlayer = new Image();
imgPlayer.src = "./assets/Ship/Spritesheet_64x29.png";
var xPlayer = 20;
var yPlayerSpeed = 10;
var yPlayer = 100;
var PlayerHeight = 15;
var PlayerWidth = 32;
var PlayerImgHeight = 29;
var PlayerImgWidth = 64;
var spritePlayer=0;
/////////////////////////////////



function updateScene() {
    "use strict";
    xBackgroundOffset = (xBackgroundOffset - xBackgroundSpeed) % backgroundWidth;
}
function updateItems() {
    "use strict";
    clearItems();

    var keycode;
    for (keycode in keyStatus) {
            if(keyStatus[keycode] == true){
                if(keycode == keys.UP) {
                    yPlayer -= yPlayerSpeed;
                }
                if(keycode == keys.DOWN) {
                    yPlayer += yPlayerSpeed;
                }
                if(keycode == keys.Space) {
                    //shoot
                }
            }
        keyStatus[keycode] = false;
    }
}
function drawScene() {
    "use strict";
    canArena.style.backgroundPosition = xBackgroundOffset + "px 50px" ;
    conArena = canArena.getContext("2d");
    conArena.font = "20px Impact";
    conArena.fillText("Score : " + score + "",0,0);

}
function drawPlayer() {
  "use strict";
      if(spritePlayer>3){
          spritePlayer=0;
      }
        conArena.clearRect(xPlayer,yPlayer,PlayerWidth,PlayerHeight);
        conArena.drawImage(imgPlayer, 0, PlayerImgHeight*spritePlayer, PlayerImgWidth, PlayerImgHeight, xPlayer, yPlayer, PlayerWidth, PlayerHeight);
        spritePlayer++;
      requestAnimationFrame(drawPlayer);
      //si millis dépasse 5, la latence se fait ressentir sur le déplacement du joueur (problème de sync)
      pausecomp(3);
  }
function drawItems() {
    "use strict";
    conArena.drawImage(imgPlayer, 0,0,PlayerImgWidth,PlayerImgHeight, xPlayer,yPlayer,PlayerWidth,PlayerHeight);
}
function clearItems() {
    "use strict";
    conArena.clearRect(xPlayer,yPlayer,PlayerWidth,PlayerHeight);
}

function updateGame() {
    "use strict";
    updateScene();
    updateItems();
}

function drawGame() {
    "use strict";
    drawScene();
    drawPlayer();
    drawItems();
}


function mainloop () {
    "use strict";
    updateGame();
    drawGame();
}

function recursiveAnim () {
    "use strict";
    mainloop();
    animFrame( recursiveAnim );
}

function init() {
    "use strict";
      divArena = document.getElementById("arena");
    canArena = document.createElement("canvas");
    canArena.setAttribute("id", "canArena");
    conArena = canArena.getContext("2d");
    divArena.appendChild(canArena);



window.addEventListener("keydown", keyDownHandler, false);
window.addEventListener("keyup", keyUpHandler, false);

    animFrame( recursiveAnim );

}

window.addEventListener("load", init, false);


function pausecomp(millis)  {
        var date = new Date();
        var curDate = null;
        do {            curDate = new Date();} while(curDate-date < millis);
    }
