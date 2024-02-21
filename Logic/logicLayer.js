import {collectMice, handleCollisions, enemyAnimation, getHit} from "./Collisions.js";
import {canvas, ctx} from "../canvas.js";
import {scoreBoard} from "../GameObjects/scoreBoard.js";
import {mice, mitten, platforms, doggos, health, house, gameOver, finishLine} from "./script.js";
import {camera, worldHeight, worldWidth} from "./camera.js";

const background = new Image();
background.src = "./images/Background.png";

function drawBackground () {
    ctx.drawImage(background,0,0,1165,600,0,0,canvas.width,canvas.height);
}


function collisionDetection () {
    finishLine();
    gameOver();
    handleCollisions();
    //enemyAnimation();
    getHit();
    collectMice();
}


function updateGameObjects () {
    doggos.forEach(dog => {
        ctx.save();
        if(dog.position.x + dog.dimensions.width >= dog.rightObstacle.position.x || dog.position.x <= dog.leftObstacle.position.x + dog.leftObstacle.dimensions.width){
            dog.velocity.x *= -1;
            dog.flipped = !dog.flipped;
        }
        dog.updateAnimation();
        ctx.restore();
    })
    mitten.updatePosition();
}

function renderGameObjects () {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    drawBackground();
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