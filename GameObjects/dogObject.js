import { canvas, ctx } from '../canvas.js';
import { gameObject } from './gameObject.js';

class DogObject extends gameObject {
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
  offsetNr = 14;

  offset = {
    top: this.position.y + this.offsetNr,
    bottom: this.position.y + this.spriteHeight - this.offsetNr,
    left: this.position.x + this.offsetNr,
    right: this.position.x + this.spriteWidth - this.offsetNr,
  };

  constructor(
    width,
    height,
    x,
    y,
    velocity_x,
    velocity_y,
    imagePath,
    imagePathFlipped,
    scaleFactor
  ) {
    super(width, height, x, y);
    this.velocity.x = velocity_x;
    this.velocity.y = velocity_y;
    this.imageObject = new Image();
    this.imageObject.src = imagePath;
    this.imageObjectFlipped = new Image();
    this.imageObjectFlipped.src = imagePathFlipped;
    this.spriteWidth = width;
    this.spriteHeight = height;
    this.yCrop = width - height;
    this.sx = (this.frameIndex * this.spriteWidth) % this.imageObject.width;
    this.sy =
      Math.floor(
        (this.frameIndex * this.spriteWidth) / this.imageObject.width
      ) *
        this.spriteHeight +
      this.yCrop;
    this.scaleFactor = scaleFactor;
  }

  draw(cx = 0, cy = 0) {
    this.now = Date.now();
    this.elapsed = this.now - this.then;
    ctx.drawImage(
      this.flipped ? this.imageObjectFlipped : this.imageObject,
      this.sx,
      this.sy,
      this.spriteWidth,
      this.spriteHeight,
      this.position.x + cx,
      this.position.y + cy,
      this.spriteWidth * this.scaleFactor,
      this.spriteHeight * this.scaleFactor
    );
    this.animate();
  }

  animate() {
    if (this.elapsed > 1000 / this.fps) {
      this.then = this.now - (this.elapsed % (1000 / this.fps));
      this.flipped ? this.frameIndex-- : this.frameIndex++;
      if (this.frameIndex >= this.totalFrames && !this.flipped)
        this.frameIndex = 0;
      if (this.frameIndex <= 0 && this.flipped) this.frameIndex = 7;
      this.sx = (this.frameIndex * this.spriteWidth) % this.imageObject.width;
      this.sy =
        Math.floor(
          (this.frameIndex * this.spriteWidth) / this.imageObject.width
        ) *
          this.spriteHeight +
        this.yCrop;
    }
  }

  updateAnimation(cx, cy) {
    this.position.x += this.velocity.x;
    this.draw(cx, cy);
  }

  /*
  currentSourceXPosition = 0;
  currentSourceYPosition = 0;
  currentDurationOfSprite = 0;
  currentAnimation = {
    startSprite: 0,
    endSprite: 0,
    currentSprite: 0,
  };
  imageReady = false;

  onImageLoaded = () => {
    this.imageReady = true;
    this.calculateSpriteRowCount();
  };
  calculateSpriteRowCount = () => {
    this.spritesPerRow = this.imageObject.naturalWidth / this.spriteWidth;
  };

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
  };

  startAnimation = (startSprite, endSprite) => {
    this.currentAnimation.startSprite = startSprite;
    this.currentAnimation.endSprite = endSprite;
    this.currentAnimation.currentSprite = startSprite;
  };

  calculatePositionOfSprite = (spriteIndex) => {
    let rowOfSprite = Math.floor(spriteIndex / this.spritesPerRow);
    this.currentSourceYPosition = rowOfSprite * this.spriteHeight;
    let columnSprite = spriteIndex % this.spritesPerRow;
    this.currentSourceXPosition = columnSprite * this.spriteWidth;
  };

  draw(cx, cy) {
    ctx.save();

    ctx.drawImage(
      this.imageObject,
      5,
      5,
      this.spriteWidth,
      this.spriteHeight,
      this.position.x + cx,
      this.position.y + cy,
      this.spriteWidth * this.imageScaleFactor,
      this.spriteHeight * this.imageScaleFactor
    );
    ctx.restore();
  }

   */
}

export { DogObject };
