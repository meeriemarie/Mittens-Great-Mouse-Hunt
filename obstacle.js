import {ScrollableGameObject} from "./scrollableGameObject.js";
import {ctx} from "./canvas.js";

class Obstacle extends ScrollableGameObject {
    draw = () => {
        ctx.save();
        ctx.fillStyle = "#660000";
        this.getCoords()
        ctx.fillRect(this.ScrollableX, this.ScrollableY, this.dimensions.width, this.dimensions.height);
        ctx.restore();
    }

}

export {Obstacle}