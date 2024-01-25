import {ctx} from "../canvas.js";
import {gameObject} from "./gameObject.js";

class Heart extends gameObject {

    constructor(width,height,x,y,imagePath) {
        super(width,height,x,y);
        this.imageObject = new Image();
        this.imageObject.addEventListener("load", this.draw)
        this.imageObject.src = imagePath;
    }

    draw = () => {
        ctx.save();
        ctx.drawImage(this.imageObject,this.position.x,this.position.y,this.dimensions.width,this.dimensions.height);
        ctx.restore();
    }
}

export {Heart}