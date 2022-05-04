const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

//identify snake

class Snake {
  constructor(color) {
    this.color = color;
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

const snake = new Snake(getColor());

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
};

let snakePartPositions = []; //the coordinates of every part in the snake.

let snakePartNumber = 0; //the index of every part of the snake except the head.

let eatenApple = false; //in the beginning it controls if the snake ate the an apple to uppdate new snake parts.

let NumberOfsnakeParts = []; //to only add a part while the snake ate an apple.

// create the food position in the beginning.
let foodPosition = {
  x: 14 * square,
  y: 10 * square,
};

//create the score var
let score = 0;

//control the snake
let directions = null;

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

//draw everything to the canvas
function game() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  ctx.drawImage(ground, 0, 0); //draws the game field image.

  ctx.drawImage(foodImg, foodPosition.x, foodPosition.y); //draws the apple image.

  let snakePart = {
    //the added part gets the previous positions of the head.
    x: snakeFigure.x,
    y: snakeFigure.y,
  };
  snakePartPositions.push(snakePart); //put an item at the end of the list next to the heads.

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

  if (snakeFigure.x === foodPosition.x && snakeFigure.y === foodPosition.y) {
    score += 1;
    snakePartNumber += 1;
    eat.play();

    foodPosition = {
      x: Math.round(Math.random() * 16 + 1) * square,
      y: Math.round(Math.random() * 14 + 3) * square,
    };
  }

  //create the snake body.

  if (snakePartPositions.length > snakePartNumber) {
    snakePartPositions.shift(); // remove the furthet item from the snake parts if have more than our tail size.
  }
  for (let i = 0; i < snakePartPositions.length; i++) {
    let part = snakePartPositions[i];
    ctx.beginPath();
    ctx.rect(part.x, part.y, square, square);
    ctx.fillStyle = snake.color;
    ctx.fill();
  }

  //create the snake head.
  ctx.beginPath();
  ctx.rect(snakeFigure.x, snakeFigure.y, square, square);
  ctx.drawImage(snakeHead, snakeFigure.x, snakeFigure.y);
  ctx.fillStyle = "#006064";
  ctx.fill();

  function snakeHitItSelf(snakeBody, snakeHead) {
    for (let i = 0; i < snakeBody.length; i++) {
      if (snakeHead.x === snakeBody[i].x && snakeHead.y === snakeBody[i].y) {
        return true;
      }
    }
  }

  if (
    snakeFigure.x > 17 * square ||
    snakeFigure.x < square ||
    snakeFigure.y > 17 * square ||
    snakeFigure.y < 3 * square ||
    snakeHitItSelf(snakePartPositions, snakeFigure)
  ) {
    dead.play();
    clearInterval(gameFunction);
    playAgain.style.width = "15vw";
    options.style.width = "15vw";
    playAgain.innerHTML = "PLAY AGAIN";
    options.innerHTML = "OPTIONS";
    gameOver.innerHTML = "Game Over";
  }

  ctx.font = "40px Verdana";
  ctx.fillStyle = "white";
  ctx.fillText(score, 3 * square, 1.6 * square);
}
//make that you can win.
//call draw function every 100ms, starts the game.

let start = document.getElementById("start-button");

let playAgain = document.getElementById("play-again");

let gameOver = document.getElementById("gameOver");

let play = document.getElementsByClassName("play");

let options = document.getElementById("options");

let slow = document.getElementById("slow");
let normal = document.getElementById("normal");
let fast = document.getElementById("fast");

let back = document.getElementById("back");

options.addEventListener("click", function () {
  start.style.width = "0vw";
  start.innerHTML = "";
  options.style.width = "0vw";
  options.innerHTML = "";
  slow.style.width = "15vw";
  normal.style.width = "15vw";
  fast.style.width = "15vw";
  back.style.width = "15vw";
  slow.innerHTML = "SLOW";
  normal.innerHTML = "NORMAL";
  fast.innerHTML = "FAST";
  back.innerHTML = "BACK";
});

back.addEventListener("click", function () {
  slow.style.width = "0vw";
  normal.style.width = "0vw";
  fast.style.width = "0vw";
  back.style.width = "0vw";
  slow.innerHTML = "";
  normal.innerHTML = "";
  fast.innerHTML = "";
  back.innerHTML = "";
  start.style.width = "15vw";
  start.innerHTML = "START";
  options.style.width = "15vw";
  options.innerHTML = "OPTIONS";
});

let levels = document.getElementsByClassName("levels");

for (let i = 0; i < levels.length; i++) {
  levels[i].addEventListener("click", function () {
    for (let i = 0; i < levels.length; i++) {
      if (levels[i].classList.contains("chosen-level")) {
        levels[i].classList.remove("chosen-level");
      }
    }
    levels[i].classList.add("chosen-level");
  });
}
playAgain.addEventListener("click", function () {
  snakeFigure = {
    x: 5 * square,
    y: 10 * square,
  };
  foodPosition = {
    x: 14 * square,
    y: 10 * square,
  };
  snakePartPositions = [];
  directions = null;
  gameOver.innerHTML = "";
});
for (let i = 0; i < play.length; i++) {
  play[i].addEventListener("click", function () {
    play[i].style.width = "0vw";
    play[i].innerHTML = "";
    options.style.width = "0vw";
    options.innerHTML = "";
    let idArray = [];
    let chosenLevelArray = [];
    for (let i = 0; i < levels.length; i++) {
      if (levels[i].classList.contains("chosen-level")) {
        for (let j = 0; j < levels[i].attributes.length; j++) {
          if (levels[i].attributes[j].value === "slow") {
            idArray.push("slow");
          } else if (levels[i].attributes[j].value === "normal") {
            idArray.push("normal");
          } else {
            chosenLevelArray.push(true);
          }
        }
      }
    }
    if (idArray.includes("slow")) {
      gameFunction = setInterval(game, 200);
    } else if (idArray.includes("normal")) {
      gameFunction = setInterval(game, 150);
    } else {
      gameFunction = setInterval(game, 100);
    }
    if (chosenLevelArray.filter((x) => x === true).length == levels.length) {
      //if all three levels dosen't contain the "chosen-level" class it automatically make the level normal.
      gameFunction = setInterval(game, 150);
    }
  });
}
