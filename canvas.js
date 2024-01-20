let canvas = document.getElementById("game-canvas");
let ctx = canvas.getContext("2d");

let canvasBoundaries = {
    "getTopBoundary": () => {
        return 0;
    },
    "getLeftBoundary": () => {
        return 0;
    },
    "getBottomBoundary": () => {
        return canvas.height;
    },
    "getRightBoundary": () => {
        return canvas.width;
    }
}

export {ctx, canvas, canvasBoundaries}