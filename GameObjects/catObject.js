import {canvas} from "../canvas.js";
import {gameObject} from "./gameObject.js";
import {worldWidth,worldHeight} from "../Logic/camera.js";

class CatObject extends gameObject {
    isMoving = true;
    midair = false;

    velocity = {
        "x": 0,
        "y": 0
    }

    acceleration = {
        "x": .5,
        "y": .5
    }

    constructor(width,height,x,y,velocity_x,velocity_y,acceleration_x,acceleration_y) {
        super(width,height,x,y);
        this.velocity.x = velocity_x;
        this.velocity.y = velocity_y;
        this.acceleration.x = acceleration_x;
        this.acceleration.y = acceleration_y;
    }

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