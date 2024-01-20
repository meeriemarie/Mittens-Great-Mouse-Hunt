import {gameObject} from "./gameObject.js";
import {ctx} from "./canvas.js";

class Obstacle extends gameObject {

    isRigid = true;

   /*
    onCollision = (otherObject) => {
        // Check if collision is from the top
        if (otherObject.position.y + otherObject.dimensions.height <= this.position.y &&
            otherObject.position.x + otherObject.dimensions.width >= this.position.x &&
            otherObject.position.x <= this.position.x + this.dimensions.width) {
            otherObject.velocity.y = 0;
            otherObject.acceleration.y = 0;
            otherObject.position.y = this.position.y - otherObject.dimensions.height;
            console.log("collided");
        // Handle side collisions
        //} else if (otherObject.position.x + otherObject.dimensions.width >= this.position.x &&
          //          otherObject.position.x <= this.position.x + this.dimensions.width){
          //  otherObject.velocity.x = 0;
        // Handle bottom collision
        } else if (otherObject.position.y <= this.position.y + this.dimensions.height) {
            otherObject.velocity.y = 0;
        }
    }
    */


    draw = () => {
        ctx.save();
        ctx.fillStyle = "#660000";
        ctx.fillRect(this.position.x, this.position.y, this.dimensions.width, this.dimensions.height);
        ctx.restore();
    }

}

export {Obstacle}