import {CatObject} from "./catObject.js"
import {MouseObject} from "./mouseObject.js";
import {DogObject} from "./dogObject.js";
import {Obstacle} from "./obstacle.js";
import {Heart} from "./healthBar.js";
import {Goal} from "./goalObject.js";
import {collisionDetection, updateGameObjects, renderGameObjects} from "./logicLayer.js"

let mitten = new CatObject(16,16,0,208,0,0,0,0);
let mice = [];
let platforms = [];
let doggos = [];
let health = [
    new Heart(8,8,8,30,0,0,0,0),
    new Heart(8,8,24,30,0,0,0,0),
    new Heart(8,8,40,30,0,0,0,0)
];
let house = [];



const map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,2,2,2,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,2,2,0,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,4],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,2,2,0,0,0,0,0,3,0,0,4,4],
    [0,0,0,0,0,0,2,0,0,0,2,3,0,0,0,0,0,0,2,2,0,0,0,0,0,0,0,0,0,0,2,2,0,0,4,4],
    [0,0,0,0,2,2,2,0,1,0,2,2,2,0,0,1,0,2,2,2,0,0,1,0,0,0,0,1,0,2,2,2,2,0,4,4]
]

map.forEach((row, i) => {
    row.forEach((number, j) => {
        switch (number) {
            case 1:
                doggos.push(new DogObject(16,16,32*j + 8,32*i + 16,1,0,0,0))
                break;
            case 2:
                platforms.push(new Obstacle(32,32, 32*j, 32*i,0,0,0,0))
                break;
            case 3:
                mice.push(new MouseObject(8,8,32 * j + 12,32 * i + 24,0,0,0,0))
                break;
            case 4:
                house.push(new Goal(32,32,32*j,32*i,0,0,0,0))
                break;
        }

    })
})


function gameLoop(){
    collisionDetection();
    updateGameObjects();
    renderGameObjects();
    requestAnimationFrame(gameLoop);
}


function keyEventDown(eventInformation) {
    switch (eventInformation.key) {
        case "a":
            mitten.isMoving = true;
            mitten.velocity.x = -4;
            break;
        case "d":
            mitten.isMoving = true;
            mitten.velocity.x = 4;
            break;
        case " ":
            if (!mitten.midair) {
                mitten.velocity.y = -9;
                mitten.midair = true;
            }
            break;
    }
}

function keyEventUp(eventInformation) {
    switch (eventInformation.key) {
        case "a":
            mitten.isMoving = false;
            mitten.velocity.x = 0;
            break;
        case "d":
            mitten.isMoving = false;
            mitten.velocity.x = 0;
            break;
    }
}



addEventListener("keydown", keyEventDown);
addEventListener("keyup", keyEventUp);
console.log(health)
requestAnimationFrame(gameLoop);

export {platforms, mitten, mice, doggos, health, house, map}