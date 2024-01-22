import {ctx} from "./canvas.js";
import {ScrollableGameObject} from "./scrollableGameObject.js";

class Goal extends ScrollableGameObject {
    draw = () => {
        ctx.save();
        ctx.fillStyle = "#B0A1BA";
        this.getCoords()
        ctx.fillRect(this.ScrollableX, this.ScrollableY, this.dimensions.width, this.dimensions.height);
        ctx.restore();
    }
}

export {Goal}