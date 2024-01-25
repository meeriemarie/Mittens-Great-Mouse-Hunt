import {canvas, ctx} from "../canvas.js";
import {gameObject} from "./gameObject.js";
import {doggos, platforms} from "../Logic/script.js";


class DogObject extends gameObject {
    imageObject;
    spriteWidth = 1;
    spriteHeight = 1;
    currentSourceXPosition = 0;
    currentSourceYPosition = 0;
    imageScaleFactor = 0.5;
    animDurationPerSprite = 1;
    currentDurationOfSprite = 0;
    spritesPerRow = 1;
    currentAnimation = {
        "startSprite": 0,
        "endSprite": 0,
        "currentSprite": 0
    }
    imageReady = false;

    velocity = {
        "x": 0,
        "y": 0
    }

    constructor(width,height,x,y,velocity_x,velocity_y,imagePath,animDurationPerSprite,imageScaleFactor) {
        super(width,height,x,y);
        this.velocity.x = velocity_x;
        this.velocity.y = velocity_y;
        this.imageObject = new Image();
        this.imageObject.addEventListener("load", this.onImageLoaded)
        this.imageObject.src = imagePath;
        this.animDurationPerSprite = animDurationPerSprite;
        this.imageScaleFactor = imageScaleFactor;
        this.calculateSpriteRowCount();
    }

    onImageLoaded = () => {
        this.imageReady = true;
        this.calculateSpriteRowCount();
    }
    calculateSpriteRowCount = () => {
        this.spritesPerRow = this.imageObject.naturalWidth / this.spriteWidth;
    }

    flipAnimSprite = () => {
        this.currentDurationOfSprite++;
        if (this.currentDurationOfSprite <= this.animDurationPerSprite) {
            return;
        }

        this.currentAnimation.currentSprite++;
        if (this.currentAnimation.currentSprite > this.currentAnimation.endSprite) {
            this.currentAnimation.currentSprite = this.currentAnimation.startSprite;
        }
        this.calculatePositionOfSprite(this.currentAnimation.currentSprite);
        this.currentDurationOfSprite = 0;
    }

    startAnimation = (startSprite, endSprite) => {
        this.currentAnimation.startSprite = startSprite;
        this.currentAnimation.endSprite = endSprite;
        this.currentAnimation.currentSprite = startSprite;
    }

    calculatePositionOfSprite = (spriteIndex) => {
        let rowOfSprite = Math.floor(spriteIndex / this.spritesPerRow);
        this.currentSourceYPosition = rowOfSprite * this.spriteHeight;
        let columnSprite = spriteIndex % this.spritesPerRow;
        this.currentSourceXPosition = columnSprite * this.spriteWidth;
    }

    draw (cx,cy) {
        ctx.save();
        ctx.drawImage(this.imageObject, this.currentSourceXPosition, this.currentSourceYPosition, this.spriteWidth, this.spriteHeight, this.position.x +cx, this.position.y +cy, this.spriteWidth * this.imageScaleFactor, this.spriteHeight * this.imageScaleFactor);
        ctx.restore();
    }
    updateAnimation (DogObject) {
        this.position.x += this.velocity.x
        this.draw();
    }

}



export {DogObject}