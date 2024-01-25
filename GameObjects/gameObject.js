import {ctx} from "../canvas.js";
import {camera} from "../Logic/camera.js";

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

    previousPosition = {
        "x": 0,
        "y": 0
    }

    startPosition = {
        "x": this.position.x,
        "y": this.position.y
    }

    constructor(width,height,x,y) {
        this.dimensions.width = width;
        this.dimensions.height = height;
        this.position.x = x;
        this.position.y = y;
        this.startPosition.x = x;
        this.startPosition.y = y;
    }

    draw(cx,cy) {
        ctx.fillRect(this.position.x +cx, this.position.y +cy, this.dimensions.width, this.dimensions.height);
    }

    updatePosition () {

    }
}

export {gameObject}