import {gameObject} from "./gameObject.js";
import {ctx} from "../canvas.js";

class MouseObject extends gameObject {
    constructor(width,height,x,y,imagePath) {
        super(width,height,x,y);
        this.imageObject = new Image();
        this.imageObject.addEventListener("load", this.draw)
        this.imageObject.src = imagePath;
    }

    draw = (cx, cy) => {
        ctx.save();
        ctx.drawImage(this.imageObject,this.position.x + cx,this.position.y + cy,this.dimensions.width,this.dimensions.height);
        ctx.restore();
    }

}

export {MouseObject}