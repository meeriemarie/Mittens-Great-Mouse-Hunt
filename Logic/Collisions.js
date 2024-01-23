import {mitten, platforms, mice, doggos, health, house} from "./script.js";
import {scoreBoard} from "../GameObjects/scoreBoard.js";
import {resetGame} from "./logicLayer.js";

function handleCollisions () {
    platforms.forEach(platform => {
        if (
            mitten.position.x < platform.position.x + platform.dimensions.width &&
            mitten.position.x + mitten.dimensions.width > platform.position.x &&
            mitten.position.y < platform.position.y + platform.dimensions.height &&
            mitten.position.y + mitten.dimensions.height > platform.position.y
        ) {
            // Top collision
            if (mitten.velocity.y > 0 && mitten.position.y + mitten.dimensions.height - mitten.velocity.y <= platform.position.y) {
                mitten.velocity.y = 0;
                mitten.position.y = platform.position.y - mitten.dimensions.height;
                mitten.midair = false;
                mitten.onBox = true;
            }
            // Bottom collision
            else if (
                mitten.velocity.y < 0 &&
                mitten.position.y - mitten.velocity.y >= platform.position.y + platform.dimensions.height
            ) {
                mitten.velocity.y = 0;
                mitten.position.y = platform.position.y + platform.dimensions.height;
            }
            // Left collision
            if (mitten.velocity.x > 0 && mitten.position.x + mitten.dimensions.width - mitten.velocity.x <= platform.position.x) {
                mitten.velocity.x = 0;
                mitten.position.x= platform.position.x - mitten.dimensions.width - mitten.velocity.x;
            }
            // Right collision
            else if (
                mitten.velocity.x < 0 &&
                mitten.position.x - mitten.velocity.x >= platform.position.x + platform.dimensions.width
            ) {
                mitten.velocity.x = 0;
                mitten.position.x = platform.position.x + platform.dimensions.width;
            }
        }
        /*else if(mitten.velocity.y === 0 && mitten.position.y === platform.position.y - mitten.dimensions.height && mitten.onBox &&
            mitten.position.x + mitten.dimensions.width < platform.position.x + platform.dimensions.width &&
            mitten.position.x - mitten.dimensions.width > platform.position.x){
            mitten.midair = true;
            mitten.onBox = false;
        }*/
    });

}

/*
function checkIfMidAir(mittenX, platformX, platformWidth) {
    return (mittenX < platformX || mittenX > (platformX + platformWidth));
}
 */

function collectMice () {
    mice.forEach((mouse, i) => {
        if (mitten.position.x < mouse.position.x + mouse.dimensions.width &&
            mitten.position.x + mitten.dimensions.width > mouse.position.x &&
            mitten.position.y < mouse.position.y + mouse.dimensions.height &&
            mitten.position.y + mitten.dimensions.height > mouse.position.y) {
            mice.splice(i, 1);
            scoreBoard.score ++;
        }
    })
}

function enemyAnimation () {
    doggos.forEach (dog => {
        platforms.forEach (platform => {
            if(dog.position.x + dog.dimensions.width + dog.velocity.x >= platform.position.x &&
                dog.position.x + dog.velocity.x <= platform.position.x + platform.dimensions.width) {
                dog.velocity.x *= -1;
            }
        })
    })
}

function getHit () {
    doggos.forEach(dog=> {
        health.forEach((heart,i) => {
            if (mitten.position.x < dog.position.x + dog.dimensions.width &&
                mitten.position.x + mitten.dimensions.width > dog.position.x &&
                mitten.position.y < dog.position.y + dog.dimensions.height &&
                mitten.position.y + mitten.dimensions.height > dog.position.y &&
                !mitten.gotHit) {
                mitten.gotHit = true;
                health.splice(i, 1);
                setTimeout(()=>{
                    mitten.gotHit = false;
                },2000);
            }
        })
    })
}

function finishLine () {
    house.forEach( block => {
        if (mitten.position.x + mitten.dimensions.width >= block .position.x) {
            alert("Congrats! You made it back home.")
            resetGame();
        }
    })
}



export {handleCollisions, collectMice, enemyAnimation, getHit, finishLine}