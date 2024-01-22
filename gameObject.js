import {ctx} from "./canvas.js";
class gameObject {
    position = {
        "x": 0,
        "y": 0
    }

    dimensions = {
        "width": 0,
        "height": 0
    }

    forces = {
        "gravity": .5
    }

    velocity = {
        "x": 0,
        "y": 0
    }

    acceleration = {
        "x": .5,
        "y": .5
    }

    previousPosition = {
        "x": 0,
        "y": 0
    }

    storeCurrentPosition = () => {
        //backup most recent position
        this.previousPosition.x = this.position.x;
        this.previousPosition.y = this.position.y;
    }

    restorePreviousPosition = () => {
        this.position.x = this.previousPosition.x;
        this.position.y = this.previousPosition.y;
    }

    startPosition = {
        "x": this.position.x,
        "y": this.position.y
    }

    constructor(width,height,x,y,velocity_x,velocity_y,acceleration_x,acceleration_y) {
        this.dimensions.width = width;
        this.dimensions.height = height;
        this.position.x = x;
        this.position.y = y;
        this.startPosition.x = x;
        this.startPosition.y = y;
        this.velocity.x = velocity_x;
        this.velocity.y = velocity_y;
        this.acceleration.x = acceleration_x;
        this.acceleration.y = acceleration_y;
    }

    draw() {
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
    }

    updatePosition () {

    }
}

export {gameObject}