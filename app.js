const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

//identify snake

class Snake {
    constructor(color, length) {
         this.color = color;
         this.length = length;
    }
}


function getColor() {
    let color = "";
    let makeColor = ["red", "blue", "yellow", "pink", "purple", "white", "black", "aqua", "orange"];
    for (let i = 0; i < makeColor.length ; i++) {
       color = color + makeColor[Math.random() * makeColor.length];
    }
    return (code);
}

const snake = new Snake(getColorCode(), []);

//create the units
const square = 32;

//load image

const ground = new Image();
ground.src = "images/ground.png";

const foodImg = new Image();
foodImg.src = "images/food.png";

const snakeHead = new Image();
snakeHead.src = "images/snakeHead.png";
snakeHead.width = "32px"; //how to change size.

//position of the head of the snake

snake.length[0] = {
    x: 5*square,
    y: 10*square,
}
// create the snake position in the beginning.

oldHeadX = snake.length[0].x;
oldHeadY = snake.length[0].y;
// create the food position in the beginning.

let foodPosition =  {
    x: 14*square,
    y: 10*square,
}

//create the score var

let score = 0;

//control the snake
let directions;


document.addEventListener("keydown", function(event) {
    let key = event.key;
    if(key == "ArrowLeft" && directions !== "Right"){
        directions = "Left";
    }else if(key == "ArrowUp" && directions !== "Down"){
        directions = "Up";
    }else if(key == "ArrowRight" && directions !== "Left"){
        directions = "Right";
    }else if(key == "ArrowDown" && directions !== "Up"){
        directions = "Down";
   }
})

//draw everything to the canvas
function game() {

    ctx.clearRect(0, 0, innerWidth, innerHeight);

    ctx.drawImage(ground, 0,0);

    ctx.drawImage(foodImg, foodPosition.x, foodPosition.y);

    if (directions === "Up") {
        snake.length[0].y = snake.length[0].y - square;
    }else if (directions === "Down") {
        snake.length[0].y = snake.length[0].y + square;
    } else if (directions === "Right") {
        snake.length[0].x = snake.length[0].x + square;
    } else if (directions === "Left") {
        snake.length[0].x = snake.length[0].x - square;
    } 

    //create the snake

    for (let i = 0; i < snake.length.length; i++) {
        ctx.beginPath();
        ctx.rect(snake.length[i].x, snake.length[i].y, square, square)
        ctx.fillStyle = snake.color;
        ctx.fill();
    }


    //ctx.moveTo(newHeadX,newHeadY);

    if (snake.length[0].x === foodPosition.x && snake.length[0].y === foodPosition.y) {
        score+=1
        let newPart = {
            x: oldHeadX,
            y: oldHeadY,
        }
        snake.length.unshift(newPart);
        foodPosition =  {
            x: Math.round(Math.random()*16+1)*square,
            y: Math.round(Math.random()*14+3)*square,
        }
    }

    if (directions === "Up") {
        oldHeadY = oldHeadY - square
    }else if (directions === "Down") {
        oldHeadY = oldHeadY + square
    } else if (directions === "Right") {
        oldHeadX = oldHeadX + square
    } else if (directions === "Left") {
        oldHeadX = oldHeadX - square
    } 

    
    if (snake.length[0].x > 18*square || snake.length[0].x < square || snake.length[0].y > 18*square || snake.length[0].y < 3*square) {
        console.log("gameOver");
    }
    //canvas.width canvas.hight
    //maybe change background shop

    ctx.font = "40px Verdana";
    ctx.fillStyle = "white"
    ctx.fillText(score, 3*square, 1.6*square)
}

//call draw function every 100ms
setInterval(game, 150);
