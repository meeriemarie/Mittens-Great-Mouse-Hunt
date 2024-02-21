import { canvas, ctx } from '../canvas.js';
import { gameObject } from './gameObject.js';
import { worldWidth, worldHeight } from '../Logic/camera.js';

class CatObject extends gameObject {
  isMoving = true;
  onPlatform = undefined;
  spriteWidth = 0;
  spriteHeight = 0;
  frameIndex = 0;
  totalFrames = 8;
  fps = 10;
  then = Date.now();
  now = Date.now();
  elapsed = this.now - this.then;
  leftObstacle = null;
  rightObstacle = null;
  flipped = false;
  scaleFactor = 0;

  velocity = {
    x: 0,
    y: 0,
  };

  acceleration = {
    x: 0.5,
    y: 0.5,
  };

  cropNr = 5;

  offsetNr = 10;

  offset = {
    top: this.position.y + this.offsetNr,
    bottom: this.position.y + this.spriteHeight - this.offsetNr,
    left: this.position.x + this.offsetNr,
    right: this.position.x + this.spriteWidth - this.offsetNr
  }

  constructor(
    imagePath,
    imagePathFlipped,
    width,
    height,
    x,
    y,
    velocity_x,
    velocity_y,
    acceleration_x,
    acceleration_y,
    scaleFactor
  ) {
    super(width, height, x, y);
    this.imageObject = new Image();
    this.imageObject.addEventListener('load', this.draw);
    this.imageObject.src = imagePath;
    this.imageObjectFlipped = new Image();
    this.imageObjectFlipped.src = imagePathFlipped;
    this.velocity.x = velocity_x;
    this.velocity.y = velocity_y;
    this.acceleration.x = acceleration_x;
    this.acceleration.y = acceleration_y;
    this.spriteWidth = width;
    this.spriteHeight = height;
    this.sx = (this.frameIndex * this.spriteWidth % this.imageObject.width) + this.cropNr;
    this.sy = (Math.floor(this.frameIndex * this.spriteWidth / this.imageObject.width) * this.spriteHeight  + this.cropNr);
    this.scaleFactor = scaleFactor;
  }

  draw = (cx, cy) => {
    ctx.save();
    ctx.drawImage(
        this.flipped ? this.imageObjectFlipped : this.imageObject,
        this.sx,
        this.sy,
        this.spriteWidth,
        this.spriteHeight,
        this.position.x + cx,
        this.position.y + cy,
        this.dimensions.width * this.scaleFactor,
        this.dimensions.height * this.scaleFactor
    );
    this.animate();
  };

  updatePosition(CatObject) {
    this.velocity.x += this.acceleration.x;
    //Apply Gravity in midair
    if (this.midair) {
      this.velocity.y += this.forces.gravity;
    }

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    // Check for landing on the ground
    if (this.position.y >= worldHeight - this.dimensions.height) {
      this.velocity.y = 0;
      this.position.y = worldHeight - this.dimensions.height;
      this.midair = false;
    }
    if (this.position.x <= 0) {
      this.velocity.x = 0;
      this.position.x = 0;
    }
    if (this.position.x + this.dimensions.width >= worldWidth) {
      this.velocity.x = 0;
      this.position.x = worldWidth - this.dimensions.width;
    }

    this.draw();
  }

  animate() {
    if (this.elapsed > 1000 / this.fps) {
      this.then = this.now - (this.elapsed % (1000 / this.fps));
      this.flipped ? this.frameIndex-- :  this.frameIndex++ ;
      if (this.frameIndex >= this.totalFrames && !this.flipped) this.frameIndex = 0;
      if (this.frameIndex <= 0 && this.flipped) this.frameIndex = 7;
      this.sx = this.frameIndex * this.spriteWidth % this.imageObject.width;
      this.sy = Math.floor(this.frameIndex * this.spriteWidth / this.imageObject.width) * this.spriteHeight;
    }
  }
}

export { CatObject };
