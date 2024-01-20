import {canvas, ctx} from "./canvas.js";
import {gameObject} from "./gameObject.js";
// import {startGameClock, setNewTick, setDefaultFrameRate, interpolateValueToFPS} from "./FPSHelper.js";

class CatObject extends gameObject {
    isMoving = false;
    midair = false;

    updatePosition (CatObject) {
        this.velocity.x += this.acceleration.x;
        //Apply Gravity in midair
        if (this.midair) {
            this.velocity.y += this.forces.gravity;
        }

        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Check for landing on the ground
        if (this.position.y >= canvas.height - this.dimensions.height) {
            this.velocity.y = 0;
            this.position.y = canvas.height - this.dimensions.height;
            this.midair = false;
        }

        this.draw();
    }
}

export {CatObject}