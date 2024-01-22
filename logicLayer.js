import {collectMice, handleCollisions} from "./Collisions.js";
import {canvas, ctx} from "./canvas.js";
import {scoreBoard} from "./scoreBoard.js";
import {mice, mitten, platforms, doggos} from "./script.js";


function collisionDetection () {
    handleCollisions();
    collectMice();
}


function updateGameObjects () {
    mitten.updatePosition();
}

function renderGameObjects () {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    mitten.draw();
    doggos.forEach(dog => {
        dog.draw();
    })
    mice.forEach(mouse => {
        mouse.draw();
    });
    platforms.forEach(platform => {
        platform.draw();
    });
    scoreBoard.drawScore();
}


export {collisionDetection, updateGameObjects, renderGameObjects}