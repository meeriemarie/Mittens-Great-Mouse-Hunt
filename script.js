import {CatObject} from "./catObject.js"
import {canvas,ctx} from "./canvas.js";
import {MouseObject} from "./mouseObject.js";
import {Obstacle} from "./obstacle.js";
// import {startGameClock, setNewTick, setDefaultFrameRate, interpolateValueToFPS} from "./FPSHelper.js";
import {scoreBoard} from "./scoreBoard.js";
import{handleCollisions} from "./Collisions.js";

let mitten = new CatObject(16,16,0,208,0,0,0,0);

let mice = [
    new MouseObject(8,8,60,216,0,0,0,0,),
    new MouseObject(8,8,166,184,0,0,0,0)
    ];

let platforms = [
    new Obstacle(32,32,150,192,0,0,0,0),
    new Obstacle(32,32,182,192,0,0,0,0),
    //new Obstacle(32,32,182,160,0,0,0,0),
    //new Obstacle(32,32,50,124,0,0,0,0),
    //new Obstacle(32,32,38,124,0,0,0,0)
];

function updateGameObjects () {
    mitten.updatePosition();
}

function renderGameObjects () {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    mitten.draw();
    mice.forEach(mouse => {
        mouse.draw();
    });
    platforms.forEach(platform => {
        platform.draw();
    });
    scoreBoard.drawScore();
}

function gameLoop(){
    handleCollisions();
    updateGameObjects();
    renderGameObjects();
    requestAnimationFrame(gameLoop);
}


function keyEventDown(eventInformation) {
    switch (eventInformation.key) {
        case "a":
            mitten.isMoving = true;
            mitten.velocity.x = -4;
            break;
        case "d":
            mitten.isMoving = true;
            mitten.velocity.x = 4;
            break;
        case " ":
            if (!mitten.midair) {
                mitten.velocity.y = -9;
                mitten.midair = true;
            }
            break;
    }
}

function keyEventUp(eventInformation) {
    switch (eventInformation.key) {
        case "a":
            mitten.isMoving = false;
            mitten.velocity.x = 0;
            break;
        case "d":
            mitten.isMoving = false;
            mitten.velocity.x = 0;
            break;
    }
}



addEventListener("keydown", keyEventDown);
addEventListener("keyup", keyEventUp);
requestAnimationFrame(gameLoop);

export {platforms, mitten, mice}