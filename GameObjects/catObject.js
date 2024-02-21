import { canvas, ctx } from '../canvas.js';
import { gameObject } from './gameObject.js';
import { worldWidth, worldHeight } from '../Logic/camera.js';

class CatObject extends gameObject {
  isMoving = false;
  onPlatform = undefined;
  spriteWidth = 0;
  spriteHeight = 0;
  frameIndex = 0;
  fps = 10;
  then = Date.now();
  now = Date.now();
  elapsed = this.now - this.then;
  leftObstacle = null;
  rightObstacle = null;
  flipped = false;
  scaleFactor = 0;
  gotHit = false;

  velocity = {
    x: 0,
    y: 0,
  };

  acceleration = {
    x: 0.5,
    y: 0.5,
  };

  cropNr = 10;

  offsetNr = 10;

  offset = {
    top: this.position.y + this.offsetNr,
    bottom: this.position.y + this.spriteHeight - this.offsetNr,
    left: this.position.x + this.offsetNr,
    right: this.position.x + this.spriteWidth - this.offsetNr,
  };

  constructor(
    imagePath,
    imagePathFlipped,
    imagePathIdle,
    imagePathIdleFlipped,
    imagePathHurt,
    imagePathHurtFlipped,
    numFrameHurt,
    imagePathJump,
    imagePathJumpFlipped,
    numFrameJump,
    imagePathLand,
    imagePathLandFlipped,
    numFrameLand,
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
    this.imagePathHurt = new Image();
    this.imagePathHurt.src = imagePathHurt;
    this.imagePathHurtFlipped = new Image();
    this.imagePathHurtFlipped.src = imagePathHurtFlipped;
    this.imageObjectIdle = new Image();
    this.imageObjectIdle.src = imagePathIdle;
    this.imageObjectIdleFlipped = new Image();
    this.imageObjectIdleFlipped.src = imagePathIdleFlipped;
    this.numFrameHurt = numFrameHurt;

    this.imageObjectJump = new Image();
    this.imageObjectJump.src = imagePathJump;
    this.imageObjectJumpFlipped = new Image();
    this.imageObjectJumpFlipped.src = imagePathJumpFlipped;
    this.numFrameJump = numFrameJump;
    this.imageObjectLand = new Image();
    this.imageObjectLand.src = imagePathLand;
    this.imageObjectLandFlipped = new Image();
    this.imageObjectLandFlipped.src = imagePathLandFlipped;
    this.numFrameLand = numFrameLand;

    this.velocity.x = velocity_x;
    this.velocity.y = velocity_y;
    this.acceleration.x = acceleration_x;
    this.acceleration.y = acceleration_y;
    this.spriteWidth = width;
    this.spriteHeight = height;
    this.sx =
      ((this.frameIndex * this.spriteWidth) % this.imageObject.width) *
        this.spriteWidth +
      this.cropNr;
    this.sy =
      ((this.frameIndex * this.spriteWidth) / this.imageObject.width) *
        this.spriteHeight +
      this.cropNr;
    this.scaleFactor = scaleFactor;
  }

  draw = (cx, cy) => {
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    ctx.save();
    let drawnImage = this.imageObject;
    let drawnImageFlipped = this.imageObjectFlipped;

    let totalFrames = 8;
    if (this.gotHit) {
      drawnImage = this.imagePathHurt;
      drawnImageFlipped = this.imagePathHurtFlipped;
      totalFrames = this.numFrameHurt;
    } else if (!this.isMoving) {
      drawnImage = this.imageObjectIdle;
      drawnImageFlipped = this.imageObjectIdleFlipped;
    }
    if (this.midair) {
      if (this.velocity.y >= 0) {
        drawnImage = this.imageObjectLand;
        drawnImageFlipped = this.imageObjectLandFlipped;
        totalFrames = this.numFrameLand;
      } else {
        drawnImage = this.imageObjectJump;
        drawnImageFlipped = this.imageObjectJumpFlipped;
        totalFrames = this.numFrameJump;
      }
    }
    this.animate(drawnImage, drawnImageFlipped, totalFrames);

    ctx.drawImage(
      this.flipped ? drawnImageFlipped : drawnImage,
      this.sx,
      this.sy,
      this.spriteWidth,
      this.spriteHeight,
      this.position.x + cx,
      this.position.y + cy,
      this.dimensions.width * this.scaleFactor,
      this.dimensions.height * this.scaleFactor
    );
    ctx.beginPath();
    ctx.rect(
      this.position.x + cx,
      this.position.y + cy,
      this.dimensions.width * this.scaleFactor,
      this.dimensions.height * this.scaleFactor
    );
    ctx.stroke();
    ctx.fillStyle = 'red';
    ctx.fillRect(this.position.x + cx, this.position.y + cy, 1, 1);
    ctx.fillRect(
      this.position.x + cx + this.dimensions.width * this.scaleFactor,
      this.position.y + cy,
      1,
      1
    );
    ctx.fillRect(
      this.position.x + cx,
      this.position.y + cy + this.dimensions.height * this.scaleFactor,
      1,
      1
    );
  };

  updatePosition(CatObject) {
    this.velocity.x += this.acceleration.x;
    const oldV = this.velocity.y;
    //Apply Gravity in midair
    if (this.midair) {
      this.velocity.y += this.forces.gravity;
    }
    if (oldV < 0 && this.velocity.y >= 0) this.frameIndex = 0;
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
  }

  animate(dI, dIF, totalFrames) {
    if (this.elapsed > 2000 / this.fps) {
      this.then = this.now - (this.elapsed % (2000 / this.fps));
      if (this.frameIndex > totalFrames - 1) this.frameIndex = 0;
      if (this.frameIndex < 0) this.frameIndex = totalFrames - 1;
      const sW = dI.width / totalFrames;
      this.sx = ((this.frameIndex * sW) % dI.width) + this.cropNr;
      this.sy =
        Math.floor((this.frameIndex * sW) / dI.width) * this.spriteHeight +
        this.cropNr;
      this.flipped ? this.frameIndex-- : this.frameIndex++;
    }
  }
}

export { CatObject };
