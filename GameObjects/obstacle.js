import {gameObject} from "./gameObject.js";
import {ctx} from "../canvas.js";

class Obstacle extends gameObject {
    draw = (cx, cy) => {
        ctx.save();
        ctx.fillStyle = "#660000";
        ctx.fillRect(this.position.x +cx, this.position.y +cy, this.dimensions.width, this.dimensions.height);
        ctx.restore();
    }

}

export {Obstacle}