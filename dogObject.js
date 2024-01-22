import {ctx} from "./canvas.js";
import {gameObject} from "./gameObject.js";

class DogObject extends gameObject {
    draw = () => {
        ctx.save();
        ctx.fillStyle = "#7C616C";
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        ctx.restore();
    }
}

export {DogObject}