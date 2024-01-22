import {gameObject} from "./gameObject.js";
import {ctx} from "./canvas.js";

class Obstacle extends gameObject {
    draw = () => {
        ctx.save();
        ctx.fillStyle = "#660000";
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        ctx.restore();
    }

}

export {Obstacle}