import {ctx, canvas} from "../canvas.js";

let scoreBoard = {
    score: 0,

    drawScore() {
        ctx.save();
        ctx.font = "8px EarlyGameBoy";
        ctx.fillStyle = "#DEEBED";
        ctx.fillText(`Score: ${scoreBoard.score}`, 8, 20);
        ctx.restore();
    }
}

export {scoreBoard}