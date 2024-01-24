import {canvas} from "../canvas.js";
import {mitten} from "./script.js";

let worldWidth = 1248;
let worldHeight = 224;
let camera = {
    x: 0,
    y: 0,
    width: canvas.width, // same as canvas width
    height: canvas.height // same as canvas height
};

function updateCamera(mitten) {
    // Center the camera on the player
    camera.x = mitten.position.x - camera.width / 2;
    camera.y = mitten.position.y - camera.height / 2;

    // Clamp the camera to the game world bounds
    camera.x = Math.max(0, Math.min(camera.x, worldWidth - camera.width));
    camera.y = Math.max(0, Math.min(camera.y, worldHeight - camera.height));
}

export {updateCamera, camera, worldWidth, worldHeight}