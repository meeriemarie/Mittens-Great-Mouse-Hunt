import {collectMice, handleCollisions, enemyAnimation, getHit} from "./Collisions.js";
import {canvas, ctx} from "../canvas.js";
import {scoreBoard} from "../GameObjects/scoreBoard.js";
import {mice, mitten, platforms, doggos, health, house, gameOver, finishLine} from "./script.js";
import {camera} from "./camera.js";


function collisionDetection () {
    finishLine();
    gameOver();
    handleCollisions();
    enemyAnimation();
    getHit();
    collectMice();
}


function updateGameObjects () {
    doggos.forEach(dog => {
        dog.updateAnimation();
    })
    mitten.updatePosition();
}

function renderGameObjects () {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    mitten.draw(-camera.x, -camera.y);
    health.forEach(heart => {
        heart.draw();
    })
    doggos.forEach(dog => {
        dog.draw(-camera.x, -camera.y);
    })
    mice.forEach(mouse => {
        mouse.draw(-camera.x, -camera.y);
    });
    platforms.forEach(platform => {
        platform.draw(-camera.x, -camera.y);
    });
    house.draw(-camera.x, -camera.y)
    scoreBoard.drawScore();
}

export {collisionDetection, updateGameObjects, renderGameObjects}