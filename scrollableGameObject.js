import {ctx, canvas} from "./canvas.js";
import {gameObject} from "./gameObject.js";
import {CatObject} from "./catObject.js";
import {mitten} from "./script.js";

class ScrollableGameObject extends gameObject {
    ScrollableX = 0
    ScrollableY = 0

    getCoords = () => {
        this.ScrollableX = (this.position.x - mitten.position.x)%canvas.width;
        this.ScrollableY = this.position.y;
    }
}

export {ScrollableGameObject}