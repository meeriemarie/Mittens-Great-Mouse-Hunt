import {ctx} from "./canvas.js";
import {ScrollableGameObject} from "./scrollableGameObject.js";

class DogObject extends ScrollableGameObject {
    draw = () => {
        ctx.save();
        ctx.fillStyle = "#7C616C";
        this.getCoords()
        ctx.fillRect(this.ScrollableX, this.ScrollableY, this.dimensions.width, this.dimensions.height);
        ctx.restore();
    }

    updateAnimation (DogObject) {
        this.position.x += this.velocity.x
        this.draw();
    }

}



export {DogObject}