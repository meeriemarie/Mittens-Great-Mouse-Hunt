import {ctx} from "../canvas.js";
import {gameObject} from "./gameObject.js";

class DogObject extends gameObject {
    velocity = {
        "x": 0,
        "y": 0
    }

    constructor(width,height,x,y,velocity_x,velocity_y) {
        super(width,height,x,y);
        this.velocity.x = velocity_x;
        this.velocity.y = velocity_y;
    }
    draw = (cx, cy) => {
        ctx.save();
        ctx.fillStyle = "#7C616C";
        ctx.fillRect(this.position.x +cx, this.position.y +cy, this.dimensions.width, this.dimensions.height);
        ctx.restore();
    }

    updateAnimation (DogObject) {
        this.position.x += this.velocity.x
        this.draw();
    }

}



export {DogObject}