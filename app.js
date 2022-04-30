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
  //randomize a color every round.
  let color = "";
  let makeColor = [
    "red",
    "blue",
    "yellow",
    "pink",
    "purple",
    "white",
    "black",
    "aqua",
    "orange",
  ];
  color = makeColor[Math.round(Math.random() * makeColor.length - 1)];
  return color;
}

const snake = new Snake(getColor(), []);

//create the unit
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

//position of the head of the snake in the beginning of every round.

snakeFigure = {
  x: 5 * square,
  y: 10 * square,
  next: null,
};

let snakeIndex = 0; //the index of every part of the snake except the head.

let eatenApple = false; //in the beginning it controls if the snake ate the an apple to uppdate new snake parts.

// create the food position in the beginning.
let foodPosition = {
  x: 14 * square,
  y: 10 * square,
};

//create the score var
let score = 0;

//control the snake
let directions;

document.addEventListener("keydown", function (event) {
  let key = event.key;
  if (key == "ArrowLeft" && directions !== "Right") {
    directions = "Left";
    left.play();
  } else if (key == "ArrowUp" && directions !== "Down") {
    directions = "Up";
    up.play();
  } else if (key == "ArrowRight" && directions !== "Left") {
    directions = "Right";
    right.play();
  } else if (key == "ArrowDown" && directions !== "Up") {
    directions = "Down";
    down.play();
  }
});
//order to reach all next parts of the snake object
function snakeNextPart(snake, numberOftimes) {
  snake = "snakeFigure[0].next";
  for (let i = 0; i < numberOftimes; i++) {
    snake += ".next";
  }
  snake = snake.replace("undefined", ""); //tar bort undefined word from text.
  return snake; //return a variable with a value "".
}
//draw everything to the canvas
function game() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  ctx.drawImage(ground, 0, 0); //draws the game field image.

  ctx.drawImage(foodImg, foodPosition.x, foodPosition.y); //draws the apple image.

  //movment of the snake head.
  if (directions === "Up") {
    snakeFigure.y = snakeFigure.y - square;
  } else if (directions === "Down") {
    snakeFigure.y = snakeFigure.y + square;
  } else if (directions === "Right") {
    snakeFigure.x = snakeFigure.x + square;
  } else if (directions === "Left") {
    snakeFigure.x = snakeFigure.x - square;
  }

  //create the snake head.
  ctx.beginPath();
  ctx.rect(snakeFigure.x, snakeFigure.y, square, square);
  ctx.drawImage(snakeHead, snakeFigure.x, snakeFigure.y);
  ctx.fillStyle = snake.color;
  ctx.fill();

  //create the snake body.

  let snakePartPositions = [];

  let j = 0; //count the number of snake parts, how many objects that have a .next that are defined.

  let snakePart = snakeNextPart(snakeFigure.next, j);
  window[snakePart];

  while (snakePart !== null) {
    snakeBody = {
      x: snakePart.x,
      y: snakePart.y,
    };

    snakePartPositions.unshift(snakePart);

    j += 1;
    snakePart = snakeNextPart(snakeFigure.next, j);
  }

  for (let i = 0; i < snakePartPositions.length; i++) {
    ctx.beginPath();
    ctx.rect(snakePartPositions[i].x, snakePartPositions[i].y, square, square);
    ctx.fillStyle = snake.color;
    ctx.fill();
  }

  if (snakeFigure.x === foodPosition.x && snakeFigure.y === foodPosition.y) {
    score += 1;
    snakeIndex += 1;
    eatenApple = true;
    eat.play();

    foodPosition = {
      x: Math.round(Math.random() * 16 + 1) * square,
      y: Math.round(Math.random() * 14 + 3) * square,
    };
  }

  if (eatenApple) {
    for (let i = 1; i <= snakeIndex; i++) {
      if (directions === "Up") {
        if (i >= 2) {
          let snakePart = snakeNextPart(snakeFigure.next, i - 1);
          window[snakePart] = ""; //convert the string to a variable with the value "" in the beginning.
          snakePart = {
            x: snakeFigure.x,
            y: snakeFigure.y,
            next: null,
          };
        } else {
          snakeFigure.next = {
            x: snakeFigure.x,
            y: snakeFigure.y,
            next: null,
          };
        }
      } else if (directions === "Down") {
        if (i >= 2) {
          let snakePart = snakeNextPart(snakeFigure.next, i - 1);
          window[snakePart] = ""; //convert the string to a variable with the value "" in the beginning.
          snakePart = {
            x: snakeFigure.x,
            y: snakeFigure.y,
            next: null,
          };
        } else {
          snakeFigure.next = {
            x: snakeFigure.x,
            y: snakeFigure.y,
            next: null,
          };
        }
      } else if (directions === "Right") {
        if (i >= 2) {
          let snakePart = snakeNextPart(snakeFigure.next, i - 1);
          window[snakePart] = ""; //convert the string to a variable with the value "" in the beginning.
          snakePart = {
            x: snakeFigure.x,
            y: snakeFigure.y,
            next: null,
          };
        } else {
          snakeFigure.next = {
            x: snakeFigure.x,
            y: snakeFigure.y,
            next: null,
          };
        }
      } else if (directions === "Left") {
        if (i >= 2) {
          let snakePart = snakeNextPart(snakeFigure.next, i - 1);
          window[snakePart] = ""; //convert the string to a variable with the value "" in the beginning.
          snakePart = {
            x: snakeFigure.x,
            y: snakeFigure.y,
            next: null,
          };
        } else {
          snakeFigure.next = {
            x: snakeFigure.x,
            y: snakeFigure.y,
            next: null,
          };
        }
      }
    }
  }

  if (
    snakeFigure.x > 17 * square ||
    snakeFigure.x < square ||
    snakeFigure.y > 17 * square ||
    snakeFigure.y < 3 * square
  ) {
    console.log("gameOver");
    dead.play();
  }
  //canvas.width canvas.hight
  //maybe change background shop

  ctx.font = "40px Verdana";
  ctx.fillStyle = "white";
  ctx.fillText(score, 3 * square, 1.6 * square);
}

//call draw function every 100ms
setInterval(game, 100);
