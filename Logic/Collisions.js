import { mitten, platforms, mice, doggos, health } from './script.js';
import { scoreBoard } from '../GameObjects/scoreBoard.js';
import { canvas, ctx } from '../canvas.js';
import { camera } from './camera.js';

function handleCollisions() {
  platforms.forEach((platform) => {
    if (
      mitten.position.x < platform.position.x + platform.dimensions.width &&
      mitten.position.x + mitten.dimensions.width > platform.position.x &&
      mitten.position.y < platform.position.y + platform.dimensions.height &&
      mitten.position.y + mitten.dimensions.height > platform.position.y
    ) {
      // Top collision
      if (
        mitten.velocity.y > 0 &&
        mitten.position.y + mitten.dimensions.height - mitten.velocity.y <=
          platform.position.y &&
        mitten.position.x + mitten.dimensions.width - mitten.velocity.x >=
          platform.position.x &&
        mitten.position.x - mitten.velocity.x <=
          platform.position.x + platform.dimensions.width
      ) {
        mitten.velocity.y = 0;
        mitten.position.y = platform.position.y - mitten.dimensions.height;
        mitten.midair = false;
        mitten.onPlatform = platform;
      }
      // Bottom collision
      else if (
        mitten.velocity.y < 0 &&
        mitten.position.y - mitten.velocity.y >=
          platform.position.y + platform.dimensions.height
      ) {
        mitten.velocity.y = 0;
        mitten.position.y = platform.position.y + platform.dimensions.height;
      }
      // Left collision
      if (
        mitten.velocity.x > 0 &&
        mitten.position.x + mitten.dimensions.width - mitten.velocity.x <=
          platform.position.x
      ) {
        mitten.velocity.x = 0;
        mitten.position.x =
          platform.position.x - mitten.dimensions.width - mitten.velocity.x;
      }
      // Right collision
      else if (
        mitten.velocity.x < 0 &&
        mitten.position.x - mitten.velocity.x >=
          platform.position.x + platform.dimensions.width
      ) {
        mitten.velocity.x = 0;
        mitten.position.x = platform.position.x + platform.dimensions.width;
      }
    }
  });

  if (
    mitten.onPlatform &&
    !mitten.onPlatform.hasLeftObstacle &&
    mitten.position.y ===
      mitten.onPlatform.position.y - mitten.dimensions.height &&
    mitten.position.x + mitten.dimensions.width < mitten.onPlatform.position.x
  ) {
    mitten.midair = true;
    mitten.onPlatform = undefined;
  } else if (
    mitten.onPlatform &&
    !mitten.onPlatform.hasRightObstacle &&
    mitten.position.y ===
      mitten.onPlatform.position.y - mitten.dimensions.height &&
    mitten.position.x + mitten.dimensions.width >
      mitten.onPlatform.position.x + mitten.onPlatform.dimensions.width
  ) {
    mitten.midair = true;
    mitten.onPlatform = undefined;
  }
}

function collectMice() {
  mice.forEach((mouse, i) => {
    if (
      mitten.position.x < mouse.position.x + mouse.dimensions.width &&
      mitten.position.x + mitten.dimensions.width > mouse.position.x &&
      mitten.position.y < mouse.position.y + mouse.dimensions.height &&
      mitten.position.y + mitten.dimensions.height > mouse.position.y
    ) {
      mice.splice(i, 1);
      scoreBoard.score++;
    }
  });
}

function enemyAnimation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  doggos.forEach((dog) => {
    if (dog.position.x + dog.dimensions.width >= dog.rightObstacle.position.x) {
      ctx.save();
      dog.velocity.x *= -1;
      ctx.restore();
    } else if (
      dog.position.x <=
      dog.leftObstacle.position.x + dog.leftObstacle.dimensions.width
    ) {
      ctx.save();
      dog.velocity.x += 0.1;
      ctx.restore();
    }
  });
}

// Checks if two boxes intersect with each other
// If this is the case it outputs true else false
// Takes two box objects as inputs. Objects must have the following properties:
// x,y,width,height
function doesIntersect(box1, box2) {
  // Compute bottom right corner of both boxes
  const box1BotRight = { x: box1.x + box1.width, y: box1.y + box1.height };
  const box2BotRight = { x: box2.x + box2.width, y: box2.y + box2.height };

  // Check if either box is area 0
  if (
    box1.width <= 0 ||
    box1.height <= 0 ||
    box2.width <= 0 ||
    box2.height <= 0
  )
    return false;

  // Check if one rectangle is on the left side of the other
  if (box1BotRight.x < box2.x || box2BotRight.x < box1.x) return false;

  // Check if one rectangle is above the other
  if (box1BotRight.y < box2.y || box2BotRight.y < box1.y) return false;

  return true;
}

function getHit() {
  doggos.forEach((dog) => {
    const mittenPos = {
      x: mitten.position.x,
      y: mitten.position.y,
      height: mitten.dimensions.height,
      width: mitten.dimensions.width,
    };
    const dogPos = {
      x: dog.position.x,
      y: dog.position.y,
      height: dog.dimensions.height,
      width: dog.dimensions.width,
    };
    if (!mitten.gotHit && doesIntersect(mittenPos, dogPos)) {
      mitten.gotHit = true;
      health.splice(health.length - 1, 1);
      setTimeout(() => {
        mitten.gotHit = false;
      }, 2000);
    }
  });
}

export { handleCollisions, collectMice, enemyAnimation, getHit };
