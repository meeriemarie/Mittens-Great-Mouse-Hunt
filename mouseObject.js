import {gameObject} from "./gameObject.js";
import {ctx} from "./canvas.js";

class MouseObject extends gameObject {
    draw = () => {
        ctx.save();
        ctx.fillStyle = "#BA3B46";
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        ctx.restore();
    }

}

export {MouseObject}