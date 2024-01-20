import {mitten, platforms, mice} from "./script.js";
import {scoreBoard} from "./scoreBoard.js";
// import {interpolateValueToFPS} from "./FPSHelper.js";


/*
function checkCollision(mitten, platforms) {
    if(mitten.position.x < platforms.position.x + platforms.dimensions.width &&
        mitten.position.x + mitten.dimensions.width > platforms.position.x)
        if (mitten.position.y < platforms.position.y + platforms.dimensions.height &&
            mitten.position.y + mitten.dimensions.height > platforms.position.y){
            return true;
        }
}

// Check collision between player and platforms
function handleCollisions() {
    platforms.forEach(platform => {
        if (checkCollision(mitten, platform)) {
            if (mitten.velocity.y > 0 && mitten.position.y + mitten.dimensions.height - mitten.velocity.y <= platform.position.y) {
                mitten.velocity.y = 0;
                mitten.position.y = platform.position.y - mitten.dimensions.height - mitten.velocity.y;
                // Top collision
                if (mitten.position.x > platform.position.x
                    && mitten.position.x + mitten.dimensions.width < platform.position.x + platform.dimensions.width) {
                    mitten.midair = false;
                } else {
                    mitten.midair = true;
                }
            } else if (mitten.velocity.y < 0 && mitten.position.y - mitten.velocity.y >= platform.position.y + platform.dimensions.height) {
                mitten.velocity.y = 0;
                mitten.position.y = platform.position.y + platform.dimensions.height + mitten.velocity.y;
                // Bottom collision
            } else if (mitten.velocity.x > 0 && mitten.position.x + mitten.velocity.x >= platform.position.x + mitten.velocity.x) {
                mitten.velocity.x = 0;
            } else {
                mitten.position.x = platform.position.x - mitten.dimensions.width - mitten.velocity.x;
            }
        }
    });
}
 */

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
                mitten.position.x = platform.position.x - mitten.dimensions.width;
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
    });
}






export {handleCollisions}