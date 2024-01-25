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

// ----------------------------------------------
// Creating Arrays and Map
let mitten = new CatObject(
  './images/MittenIdle.png',
  30,
  30,
  0,
  208,
  0,
  0,
  0,
  0
);
let mice = [];
let platforms = [];
let doggos = [];
let health = [
    new Heart(8,8,8,30, "./images/Heart.png"),
    new Heart(8,8,24,30,"./images/Heart.png"),
    new Heart(8,8,40,30,"./images/Heart.png")
];
let house = new Goal(64, 160, 1184, 64);

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
    1, 0, 0, 0, 0, 1, 0, 2, 2, 2, 2, 0, 0, 0,
  ],
];

map.forEach((row, i) => {
    row.forEach((number, j) => {
        switch (number) {
            case 1:
                doggos.push(new DogObject(60, 60, 32 * j - 16, 32 * i - 16, 1, 0, "./images/DogRun.png", 8, 1))
                break;
            case 2:
                const newPlatform = new Obstacle(
                    32,
                    32,
                    32 * j,
                    32 * i,
                    './images/Crate.png'
                );
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
                mice.push(new MouseObject(12, 12, 32 * j + 12, 32 * i + 21, "./images/Mouse.png"))
                break;
            case 4:
                platforms.push(new Obstacle(32, 16, 32 * j, 32 * i, "./images/Branch.png"))
                break;
        }
    });
});
// ----------------------------------------------

// ----------------------------------------------
//Logic for resetting and starting game
//Event Listeners for Buttons
/*
const StartButton = document.querySelector(".startGame");
const RestartButton = document.querySelectorAll(".restartGame")
const MenuButton = document.querySelector(".menuBtn")
const StartScreen = document.querySelector("#start-screen")
const GameOverScreen = document.querySelector("#game-over")
const FinishScreen = document.querySelector("#congrats")
*/

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

  let _health = [
    new Heart(8, 8, 8, 30, "./images/Heart.png"),
    new Heart(8, 8, 24, 30, "./images/Heart.png"),
    new Heart(8, 8, 40, 30, "./images/Heart.png"),
  ];

  for (let heart of _health) {
    health.push(heart);
    heart.draw();
  }

  map.forEach((row, i) => {
    row.forEach((number, j) => {
      switch (number) {
        case 3:
          mice.push(new MouseObject(8, 8, 32 * j + 12, 32 * i + 24, "./images/Mouse.png"));
          break;
      }
    });
  });

     _health = [
        new Heart(8,8,8,30, "./images/Heart.png"),
        new Heart(8,8,24,30, "./images/Heart.png"),
        new Heart(8,8,40,30, "./images/Heart.png")
    ];

    for(let heart of _health){
        health.push(heart)
        heart.draw();

    }

    map.forEach((row, i) => {
        row.forEach((number, j) => {
            switch (number) {
                case 3:
                    mice.push(new MouseObject(8,8,32 * j + 12,32 * i + 24,"./images/Mouse.png"))
                    break;
            }
        })
    })

    scoreBoard.score = 0;
}
/*
StartButton.addEventListener("click", () => {
    gameLoop();
    StartScreen.style.display = 'none';
    canvas.style.display = 'inline-block';
})

RestartButton.forEach(button) {
    button.addEventListener()
}
 */

function gameOver() {
  if (health.length === 0) {
    //GameOverScreen.style.display = 'inline-block';
    //canvas.style.display = 'none';
    alert('Oh nyo, you lost!');
    resetGame();
  }
}

function finishLine() {
  if (mitten.position.x + mitten.dimensions.width >= house.position.x) {
    //FinishScreen.style.display = 'inline-block';
    //canvas.style.display = 'none';
    alert('congrats! You made it back home');
    resetGame();
  }
}

// ----------------------------------------------

// ----------------------------------------------
// Game Loop and Controls

function gameLoop() {
  collisionDetection();
  updateGameObjects();
  updateCamera(mitten);
  renderGameObjects();
  requestAnimationFrame(gameLoop);
}

function keyEventDown(eventInformation) {
  switch (eventInformation.key) {
    case 'a':
      mitten.isMoving = true;
      mitten.velocity.x = -4;
      break;
    case 'd':
      mitten.isMoving = true;
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
