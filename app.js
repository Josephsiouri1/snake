const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

//identify snake

class Snake {
    constructor(color, figure) {
         this.color = color;
         this.figure = figure;
    }
}


function getColor() {
    let color = "";
    let makeColor = ["red", "blue", "yellow", "pink", "purple", "white", "black", "aqua", "orange"];
    color = makeColor[Math.random() * makeColor.length-1];
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

snake.figure[0] = {
    x: 5*square,
    y: 10*square,
    next: null,
}
let snakeIndex = 0; //the index of every part in the snake array.

let j = 0; //count the number of snake parts, begins with one part.

let eatenApple = false; //in the beginning it controls if the snake ate the an apple to uppdate new snake parts.

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
    
    //movment of the snake head.
    if (directions === "Up") {
        snake.figure[0].y = snake.figure[0].y - square;
    }else if (directions === "Down") {
        snake.figure[0].y = snake.figure[0].y + square;
    } else if (directions === "Right") {
        snake.figure[0].x = snake.figure[0].x + square;
    } else if (directions === "Left") {
        snake.figure[0].x = snake.figure[0].x - square;
    } 

    //create the snake
    for (let i = 0; i < snake.figure.length; i++) {
        /*
        ctx.beginPath();
        ctx.drawImage(snakeHead, snake.figure[0].x, snake.figure[0].y)
        ctx.rect(snake.figure[i].x, snake.figure[i].y, square, square)
        ctx.fillStyle = snake.color;
        ctx.fill();
        */
    }

    if (snake.figure[0].next === null) {
        ctx.beginPath();
        ctx.rect(snake.figure[0].x, snake.figure[0].y, square, square);
        ctx.fillStyle = snake.color;
        ctx.fill();
    }
 
    let snakePartPositions = [];
    
    while (snake.figure[j].next !== null) {

        snakePart = {
            x: snake.figure[j].next.x,
            y: snake.figure[j].next.y,
        }
        
        snakePartPositions.push(snakePart);

        j+=1
    }

    for (let i = 0; i < snakePartPositions.length; i++) {
        ctx.beginPath();
        ctx.rect(snakePartPositions[i].x, snakePartPositions[i].y, square, square);
        ctx.fillStyle = snake.color;
        ctx.fill();
    }
     
    if (snake.figure[0].x === foodPosition.x && snake.figure[0].y === foodPosition.y) {
        score+=1
        snakeIndex+=1
        eatenApple = true;
        eat.play();

        foodPosition =  {
            x: Math.round(Math.random()*16+1)*square,
            y: Math.round(Math.random()*14+3)*square,
        }
    }
    
    if (eatenApple) {
        for (let i = 1; i <= snakeIndex; i++) {
            if (directions === "Up") {
                snake.figure[i-1].next = {
                    x: snake.figure[i-1].x,
                    y: snake.figure[i-1].y - square,
                    next: null,
                }
            }else if (directions === "Down") {
                snake.figure[i-1].next = {
                    x: snake.figure[i-1].x,
                    y: snake.figure[i-1].y + square,
                    next: null,
                }
            } else if (directions === "Right") {
                 snake.figure[i-1].next = {
                    x: snake.figure[i-1].x + square,
                    y: snake.figure[i-1].y,
                    next: null,
                }
            } else if (directions === "Left") {
                snake.figure[i-1].next = {
                    x: snake.figure[i-1].x - square,
                    y: snake.figure[i-1].y,
                    next: null,
                }
            } 
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

    
    if (snake.figure[0].x > 17*square || snake.figure[0].x < square || snake.figure[0].y > 17*square || snake.figure[0].y < 3*square) {
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
