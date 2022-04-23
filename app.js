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
       color = makeColor[Math.random() * makeColor.length-1];
    }
    return (color);
}

const snake = new Snake(getColor(), []);

//create the units
const square = 32;

//load image

const ground = new Image();
ground.src = "images/ground.png";

const foodImg = new Image();
foodImg.src = "images/food.png";

const snakeHead = new Image();
snakeHead.src = "images/snakeHead.jpg"; //ritas inte

const left = new Audio();
left.src = "sounds/audio_left.mp3";

const right = new Audio();
right.src = "sounds/audio_right.mp3";

const up = new Audio();
up.src = "sounds/audio_up.mp3";

const down = new Audio();
down.src = "sounds/audio_down.mp3";

const dead = new Audio();
dead.src = "sounds/audio_dead.mp3";

const eat = new Audio();
eat.src = "sounds/audio_eat.mp3";

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
        left.play();
    }else if(key == "ArrowUp" && directions !== "Down"){
        directions = "Up";
        up.play();
    }else if(key == "ArrowRight" && directions !== "Left"){
        directions = "Right";
        right.play();
    }else if(key == "ArrowDown" && directions !== "Up"){
        directions = "Down";
        down.play();
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
        ctx.drawImage(snakeHead, snake.length[0].x, snake.length[0].y)
        ctx.rect(snake.length[i].x, snake.length[i].y, square, square)
        ctx.fillStyle = snake.color;
        ctx.fill();
    }


    //ctx.moveTo(newHeadX,newHeadY);

    if (snake.length[0].x === foodPosition.x && snake.length[0].y === foodPosition.y) {
        score+=1
        eat.play();
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

    
    if (snake.length[0].x > 17*square || snake.length[0].x < square || snake.length[0].y > 17*square || snake.length[0].y < 3*square) {
        console.log("gameOver");
        dead.play();
    }
    //canvas.width canvas.hight
    //maybe change background shop

    ctx.font = "40px Verdana";
    ctx.fillStyle = "white"
    ctx.fillText(score, 3*square, 1.6*square)
}

//call draw function every 100ms
setInterval(game, 150);
