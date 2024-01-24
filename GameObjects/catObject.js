import {canvas} from "../canvas.js";
import {gameObject} from "./gameObject.js";
import {worldWidth,worldHeight} from "../Logic/camera.js";

class CatObject extends gameObject {
    isMoving = true;
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
        if (this.position.y >= worldHeight - this.dimensions.height) {
            this.velocity.y = 0;
            this.position.y = worldHeight - this.dimensions.height;
            this.midair = false;
        }
        if (this.position.y <= 0) {
            this.velocity.y = 0;
            this.midair = true
        }
        if (this.position.x <= 0) {
            this.velocity.x = 0;
            this.position.x = 0;
        }
        if (this.position.x + this.dimensions.width >= worldWidth) {
            this.velocity.x = 0;
            this.position.x = worldWidth - this.dimensions.width;
        }

        this.draw();
    }
}

export {CatObject}