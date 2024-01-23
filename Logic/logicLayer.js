import {collectMice, handleCollisions, enemyAnimation, getHit, finishLine} from "./Collisions.js";
import {canvas, ctx} from "./canvas.js";
import {scoreBoard} from "./scoreBoard.js";
import {mice, mitten, platforms, doggos, health, house, map} from "./script.js";
import {Heart} from "./healthBar.js";
import {MouseObject} from "./mouseObject.js";

function resetGame () {
    mitten.position.x = mitten.startPosition.x;
    mitten.position.y = mitten.startPosition.y;
    mice.forEach(mouse => {
        mouse.position.x = mouse.startPosition.x;
        mouse.position.y = mouse.startPosition.y;
    });
    doggos.forEach(dog => {
        dog.position.x = dog.startPosition.x;
        dog.position.y = dog.startPosition.y;
    });

    let _health = [
        new Heart(8,8,8,30,0,0,0,0),
        new Heart(8,8,24,30,0,0,0,0),
        new Heart(8,8,40,30,0,0,0,0)
    ];

    for(let heart of _health){
        health.push(heart)
        heart.draw();

    }

    map.forEach((row, i) => {
        row.forEach((number, j) => {
            switch (number) {
                case 3:
                    mice.push(new MouseObject(8,8,32 * j + 12,32 * i + 24,0,0,0,0))
                    break;
            }
        })
    })

    scoreBoard.score = 0;
}


function gameOver () {
    if (health.length === 0) {
        alert("Game Over");
        resetGame();
    }
}



function collisionDetection () {
    handleCollisions();
    enemyAnimation();
    getHit();
    collectMice();
    finishLine();
    gameOver();
}


function updateGameObjects () {
    doggos.forEach(dog => {
        dog.updateAnimation();
    })
    mitten.updatePosition();
}

function renderGameObjects () {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    mitten.draw();
    health.forEach(heart => {
        heart.draw();
    })
    doggos.forEach(dog => {
        dog.draw();
    })
    mice.forEach(mouse => {
        mouse.draw();
    });
    platforms.forEach(platform => {
        platform.draw();
    });
    house.forEach(block => {
        block.draw();
    })
    scoreBoard.drawScore();
}


export {collisionDetection, updateGameObjects, renderGameObjects, resetGame}