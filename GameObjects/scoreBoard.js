import {ctx, canvas} from "../canvas.js";

let scoreBoard = {
    score: 0,

    drawScore() {
        ctx.save();
        ctx.font = "8px EarlyGameBoy";
        ctx.fillStyle = "#0095DD";
        ctx.fillText(`Score: ${scoreBoard.score}`, 8, 20);
        ctx.restore();
    }
}

export {scoreBoard}