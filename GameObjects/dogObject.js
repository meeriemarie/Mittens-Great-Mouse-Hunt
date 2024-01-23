import {ctx} from "../canvas.js";
import {gameObject} from "./gameObject.js";

class DogObject extends gameObject {
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