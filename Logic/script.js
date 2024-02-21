import { CatObject } from '../GameObjects/catObject.js';
import { MouseObject } from '../GameObjects/mouseObject.js';
import { DogObject } from '../GameObjects/dogObject.js';
import { Obstacle } from '../GameObjects/obstacle.js';
import { Heart } from '../GameObjects/healthBar.js';
import { Goal } from '../GameObjects/goalObject.js';
import { updateCamera } from './camera.js';
import {
  collisionDetection,
  updateGameObjects,
  renderGameObjects,
} from './logicLayer.js';
import { scoreBoard } from '../GameObjects/scoreBoard.js';
import {canvas} from "../canvas.js";

// ----------------------------------------------
// Creating Arrays and Map
let mitten = new CatObject(
  './images/MittenWalk.png',
  './images/MittenWalkFlipped.png',
  './images/MittenIdle.png',
  './images/MittenIdleFlipped.png',
  './images/MittenHurt.png',
  './images/MittenHurtFlipped.png',
  4,
  './images/MittenJump.png',
  './images/MittenJumpFlipped.png',
  4,
  './images/MittenLand.png',
  './images/MittenLandFlipped.png',
  2,
  20,
  25,
  0,
  208,
  0,
  0,
  0,
  0,
  1
);
let mice = [];
let platforms = [];
let doggos = [];
let health = [
  new Heart(8, 8, 8, 30, './images/Heart.png'),
  new Heart(8, 8, 24, 30, './images/Heart.png'),
  new Heart(8, 8, 40, 30, './images/Heart.png'),
];
let house = new Goal(64, 160, 1184, 64, './images/MittenHouse.png');

const map = [
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0,
    3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 0, 0, 0, 4,
    4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0,
    0, 0, 4, 4, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0,
  ],
  [
    0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 1, 0, 2, 2, 2, 0, 0, 1, 0, 2, 2, 2, 0, 0,
    1, 0, 2, 0, 1, 0, 0, 2, 2, 2, 2, 0, 0, 0,
  ],
];

map.forEach((row, i) => {
  let currDog = null;
  row.forEach((number, j) => {
    switch (number) {
      case 1:
        const newDog = new DogObject(
          60,
          60,
          32 * j - 16,
          32 * i - 24,
          1,
          0,
          './images/DogRun.png',
          './images/DogRunFlipped.png',
          1
        );
        newDog.leftObstacle = platforms[platforms.length - 1];
        currDog = newDog;
        doggos.push(newDog);
        break;
      case 2:
        const newPlatform = new Obstacle(
          32,
          32,
          32 * j,
          32 * i,
          './images/Crate.png'
        );
        if (currDog) {
          currDog.rightObstacle = newPlatform;
          currDog = null;
        }
        // Check if platform has neighbors
        platforms.forEach((pl, idx) => {
          // has right neighbor?
          if (
            newPlatform.position.x + newPlatform.dimensions.width ===
              pl.position.x &&
            newPlatform.position.y === pl.position.y
          ) {
            newPlatform.hasRightObstacle = platforms[
              idx
            ].hasLeftObstacle = true;
          }
          // has left neighbor?
          if (
            newPlatform.position.x === pl.position.x + pl.dimensions.width &&
            newPlatform.position.y === pl.position.y
          ) {
            newPlatform.hasLeftObstacle = platforms[
              idx
            ].hasRightObstacle = true;
          }
        });
        platforms.push(newPlatform);
        break;
      case 3:
        mice.push(
          new MouseObject(
            12,
            12,
            32 * j + 12,
            32 * i + 21,
            './images/Mouse3.png'
          )
        );
        break;
      case 4:
        platforms.push(
          new Obstacle(32, 16, 32 * j, 32 * i, './images/Cloud.png')
        );
        break;
    }
  });
});
// ----------------------------------------------

// ----------------------------------------------
//Logic for resetting and starting game
//Event Listeners for Buttons


function resetGame() {
  mitten.position.x = mitten.startPosition.x;
  mitten.position.y = mitten.startPosition.y;
  mice.forEach((mouse) => {
    mouse.position.x = mouse.startPosition.x;
    mouse.position.y = mouse.startPosition.y;
  });
  doggos.forEach((dog) => {
    dog.position.x = dog.startPosition.x;
    dog.position.y = dog.startPosition.y;
  });

  health = [];
  let _health = [
    new Heart(8, 8, 8, 30, './images/Heart.png'),
    new Heart(8, 8, 24, 30, './images/Heart.png'),
    new Heart(8, 8, 40, 30, './images/Heart.png'),
  ];

  for (let heart of _health) {
    health.push(heart);
    heart.draw();
  }

  map.forEach((row, i) => {
    row.forEach((number, j) => {
      switch (number) {
        case 3:
          mice.push(
            new MouseObject(
              12,
              12,
              32 * j + 12,
              32 * i + 21,
              './images/Mouse3.png'
            )
          );
          break;
      }
    });
  });

  scoreBoard.score = 0;
}

const StartButton = document.querySelector(".startGame");
const RestartButton = document.querySelectorAll(".restartGame")
const MenuButton = document.querySelectorAll(".menuBtn")
const StartScreen = document.getElementById("start-screen")
const GameOverScreen = document.getElementById("game-over")
const FinishScreen = document.getElementById("congrats")

StartButton.addEventListener("click", () => {
    //gameLoop();
    StartScreen.style.display = 'none';
    canvas.style.display = 'inline-block';
})

MenuButton.forEach((el) => {
el.addEventListener("click", () => {
    GameOverScreen.style.display = 'none';
    FinishScreen.style.display = 'none';
    StartScreen.style.display = 'inline-block';
  })
});

RestartButton.forEach((el) => {
  el.addEventListener("click", () => {
    resetGame();
    GameOverScreen.style.display = 'none';
    FinishScreen.style.display = 'none';
    canvas.style.display = 'inline-block';
  })
});



function gameOver() {
  if (health.length === 0) {
    GameOverScreen.style.display = 'inline-block';
    canvas.style.display = 'none';
    //alert('Oh nyo, you lost!');
    resetGame();
  }
}

function finishLine() {
  if (mitten.position.x + mitten.dimensions.width >= house.position.x) {
    FinishScreen.style.display = 'inline-block';
    canvas.style.display = 'none';
    //alert('congrats! You made it back home');
  }
}

// ----------------------------------------------

// ----------------------------------------------
// Game Loop and Controls

function gameLoop() {
  updateGameObjects();
  collisionDetection();
  updateCamera(mitten);
  renderGameObjects();
  requestAnimationFrame(gameLoop);
}

function keyEventDown(eventInformation) {
  switch (eventInformation.key) {
    case 'a':
      mitten.isMoving = true;
      mitten.flipped = true;
      mitten.velocity.x = -4;
      break;
    case 'd':
      mitten.isMoving = true;
      mitten.flipped = false;
      mitten.velocity.x = 4;
      break;
    case ' ':
      if (!mitten.midair) {
        mitten.velocity.y = -9;
        mitten.midair = true;
      }
      break;
  }
}

function keyEventUp(eventInformation) {
  switch (eventInformation.key) {
    case 'a':
      mitten.isMoving = false;
      mitten.velocity.x = 0;
      break;
    case 'd':
      mitten.isMoving = false;
      mitten.velocity.x = 0;
      break;
  }
}

addEventListener('keydown', keyEventDown);
addEventListener('keyup', keyEventUp);
console.log(health);
requestAnimationFrame(gameLoop);

export {
  platforms,
  mitten,
  mice,
  doggos,
  health,
  house,
  map,
  gameLoop,
  gameOver,
  resetGame,
  finishLine,
};
