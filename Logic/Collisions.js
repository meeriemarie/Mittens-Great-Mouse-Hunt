import {mitten, platforms, mice, doggos, health} from "./script.js";
import {scoreBoard} from "../GameObjects/scoreBoard.js";
import {canvas, ctx} from "../canvas.js";
import {camera} from "./camera.js";

function handleCollisions() {
    platforms.forEach((platform) => {
        if (
            mitten.position.x < platform.position.x + platform.dimensions.width &&
            mitten.position.x + mitten.dimensions.width > platform.position.x &&
            mitten.position.y < platform.position.y + platform.dimensions.height &&
            mitten.position.y + mitten.dimensions.height > platform.position.y
        ) {
            // Top collision
            if (
                mitten.velocity.y > 0 &&
                mitten.position.y + mitten.dimensions.height - mitten.velocity.y <=
                platform.position.y &&
                mitten.position.x + mitten.dimensions.width - mitten.velocity.x >=
                platform.position.x &&
                mitten.position.x - mitten.velocity.x <=
                platform.position.x + platform.dimensions.width
            ) {
                mitten.velocity.y = 0;
                mitten.position.y = platform.position.y - mitten.dimensions.height;
                mitten.midair = false;
                mitten.onPlatform = platform;
            }
            // Bottom collision
            else if (
                mitten.velocity.y < 0 &&
                mitten.position.y - mitten.velocity.y >=
                platform.position.y + platform.dimensions.height
            ) {
                mitten.velocity.y = 0;
                mitten.position.y = platform.position.y + platform.dimensions.height;
            }
            // Left collision
            if (
                mitten.velocity.x > 0 &&
                mitten.position.x + mitten.dimensions.width - mitten.velocity.x <=
                platform.position.x
            ) {
                mitten.velocity.x = 0;
                mitten.position.x =
                    platform.position.x - mitten.dimensions.width - mitten.velocity.x;
            }
            // Right collision
            else if (
                mitten.velocity.x < 0 &&
                mitten.position.x - mitten.velocity.x >=
                platform.position.x + platform.dimensions.width
            ) {
                mitten.velocity.x = 0;
                mitten.position.x = platform.position.x + platform.dimensions.width;
            }
        }
    });

    if (
        mitten.onPlatform &&
        !mitten.onPlatform.hasLeftObstacle &&
        mitten.position.y ===
        mitten.onPlatform.position.y - mitten.dimensions.height &&
        mitten.position.x + mitten.dimensions.width < mitten.onPlatform.position.x
    ) {
        mitten.midair = true;
        mitten.onPlatform = undefined;
    } else if (
        mitten.onPlatform &&
        !mitten.onPlatform.hasRightObstacle &&
        mitten.position.y ===
        mitten.onPlatform.position.y - mitten.dimensions.height &&
        mitten.position.x + mitten.dimensions.width >
        mitten.onPlatform.position.x + mitten.onPlatform.dimensions.width
    ) {
        mitten.midair = true;
        mitten.onPlatform = undefined;
    }
}

function collectMice() {
    mice.forEach((mouse, i) => {
        if (
            mitten.position.x < mouse.position.x + mouse.dimensions.width &&
            mitten.position.x + mitten.dimensions.width > mouse.position.x &&
            mitten.position.y < mouse.position.y + mouse.dimensions.height &&
            mitten.position.y + mitten.dimensions.height > mouse.position.y
        ) {
            mice.splice(i, 1);
            scoreBoard.score++;
        }
    });
}

function enemyAnimation () {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    doggos.forEach(dog => {
        if(dog.position.x + dog.dimensions.width >= dog.rightObstacle.position.x){
            ctx.save();
            dog.velocity.x *= -1;
            ctx.restore();
        }else if(dog.position.x <= dog.leftObstacle.position.x + dog.leftObstacle.dimensions.width){
            ctx.save();
            dog.velocity.x += 0.1;
            ctx.restore();
        }
    });
}

function getHit () {
    doggos.forEach(dog=> {
        health.forEach((heart,i) => {
            if (mitten.offset.left < dog.offset.right &&
                mitten.offset.right > dog.offset.left &&
                mitten.offset.top < dog.offset.bottom &&
                mitten.offset.bottom > dog.offset.top &&
                !mitten.gotHit) {
                if (mitten.offset.left < dog.offset.right) {
                    mitten.gotHit = true;
                    health.splice(i, 1);
                    setTimeout(()=>{
                        mitten.gotHit = false;
                    },2000);
                }
                if (mitten.offset.right > dog.offset.left) {
                    mitten.gotHit = true;
                    health.splice(i, 1);
                    setTimeout(()=>{
                        mitten.gotHit = false;
                    },2000);
                }
                if(mitten.offset.top < dog.offset.bottom) {
                    mitten.gotHit = true;
                    health.splice(i, 1);
                    setTimeout(()=>{
                        mitten.gotHit = false;
                    },2000);
                }
                if(mitten.offset.bottom > dog.offset.top) {
                    mitten.gotHit = true;
                    health.splice(i, 1);
                    setTimeout(()=>{
                        mitten.gotHit = false;
                    },2000);
                }

            }
        })
    })
}

export {handleCollisions, collectMice, enemyAnimation, getHit}