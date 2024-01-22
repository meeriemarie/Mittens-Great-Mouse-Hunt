import {canvas} from "./canvas.js";
import {gameObject} from "./gameObject.js";

class CatObject extends gameObject {
    isMoving = false;
    midair = false;
    gotHit = false;

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