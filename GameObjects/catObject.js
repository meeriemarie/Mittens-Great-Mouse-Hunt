import { canvas, ctx } from '../canvas.js';
import { gameObject } from './gameObject.js';
import { worldWidth, worldHeight } from '../Logic/camera.js';

class CatObject extends gameObject {
  isMoving = true;
  onPlatform = undefined;

  velocity = {
    x: 0,
    y: 0,
  };

  acceleration = {
    x: 0.5,
    y: 0.5,
  };

  constructor(
    imagePath,
    width,
    height,
    x,
    y,
    velocity_x,
    velocity_y,
    acceleration_x,
    acceleration_y
  ) {
    super(width, height, x, y);
    this.imageObject = new Image();
    this.imageObject.addEventListener('load', this.draw);
    this.imageObject.src = imagePath;
    this.velocity.x = velocity_x;
    this.velocity.y = velocity_y;
    this.acceleration.x = acceleration_x;
    this.acceleration.y = acceleration_y;
  }

  draw = (cx, cy) => {
    ctx.save();
    ctx.drawImage(
      this.imageObject,
      5,
      5,
      30,
      30,
      this.position.x + cx,
      this.position.y + cy,
      this.dimensions.width,
      this.dimensions.height
    );
    ctx.restore();
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
}

export { CatObject };
