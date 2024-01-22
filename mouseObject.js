import {ScrollableGameObject} from "./scrollableGameObject.js";
import {ctx} from "./canvas.js";

class MouseObject extends ScrollableGameObject {
    draw = () => {
        ctx.save();
        ctx.fillStyle = "#BA3B46";
        this.getCoords()
        ctx.fillRect(this.ScrollableX, this.ScrollableY, this.dimensions.width, this.dimensions.height);
        ctx.restore();
    }

}

export {MouseObject}