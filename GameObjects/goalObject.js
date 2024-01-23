import {ctx} from "../canvas.js";
import {gameObject} from "./gameObject.js";

class Goal extends gameObject {
    draw = (cx, cy) => {
        ctx.save();
        ctx.fillStyle = "#B0A1BA";
        ctx.fillRect(this.position.x + cx, this.position.y +cy, this.dimensions.width, this.dimensions.height);
        ctx.restore();
    }
}

export {Goal}