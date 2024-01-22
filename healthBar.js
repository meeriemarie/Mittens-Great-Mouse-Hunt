import {ctx} from "./canvas.js";
import {gameObject} from "./gameObject.js";

class Heart extends gameObject {

    draw() {
        console.log("trying to draw :(")
        ctx.save();
        //ctx.font = "8px EarlyGameBoy";
        ctx.fillStyle = "#D8829D";
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        ctx.restore();
    }
}

export {Heart}