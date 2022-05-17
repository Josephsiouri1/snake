const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

//identify snake

class Snake {
  constructor(color, head, body) {
    this.color = color;
    this.head = head;
    this.body = body;
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

//create the unit
const SQUARE = 32;

let snake = new Snake( //defines the snake object
  getColor(),
  {
    //position of the head of the snake in the beginning of every round.
    x: 5 * SQUARE,
    y: 10 * SQUARE,
  },
  []
);
//load image

const ground = new Image();
ground.src = "images/ground.png";

const foodImg = new Image();
foodImg.src = "images/food.png";

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

const win = new Audio();
win.src = "sounds/game-won.mp3";

const eat = new Audio();
eat.src = "sounds/audio_eat.mp3";

let snakePartNumber = 0; //the index of every part of the snake except the head.

// create the food position in the beginning.
let foodPosition = {
  x: 14 * SQUARE,
  y: 10 * SQUARE,
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
  let gameOver = document.getElementById("gameOver");

  ctx.clearRect(0, 0, innerWidth, innerHeight);

  ctx.drawImage(ground, 0, 0); //draws the game field image.

  ctx.drawImage(foodImg, foodPosition.x, foodPosition.y); //draws the apple image.

  let snakePart = {
    //the added part gets the previous positions of the head.
    x: snake.head.x,
    y: snake.head.y,
  };
  snake.body.push(snakePart); //put an item at the end of the list next to the heads.

  //movment of the snake head.
  if (directions === "Up") {
    snake.head.y = snake.head.y - SQUARE;
  } else if (directions === "Down") {
    snake.head.y = snake.head.y + SQUARE;
  } else if (directions === "Right") {
    snake.head.x = snake.head.x + SQUARE;
  } else if (directions === "Left") {
    snake.head.x = snake.head.x - SQUARE;
  }

  if (snake.head.x === foodPosition.x && snake.head.y === foodPosition.y) {
    score += 1;
    snakePartNumber += 1;
    eat.play();

    foodPosition = {
      x: Math.round(Math.random() * 16 + 1) * SQUARE,
      y: Math.round(Math.random() * 14 + 3) * SQUARE,
    };
    for (let i = 0; i < snake.body.length; i++) {
      if (
        snake.body[i].x === foodPosition.x &&
        snake.body[i].y === foodPosition.y
      ) {
        foodPosition = {
          x: Math.round(Math.random() * 16 + 1) * SQUARE,
          y: Math.round(Math.random() * 14 + 3) * SQUARE,
        };
      }
    }
  }

  //create the snake body.

  if (snake.body.length > snakePartNumber) {
    snake.body.shift(); // remove the furthet item from the snake parts if have more than our tail size.
  }
  for (let i = 0; i < snake.body.length; i++) {
    ctx.beginPath();
    ctx.rect(snake.body[i].x, snake.body[i].y, SQUARE, SQUARE);
    ctx.fillStyle = snake.color;
    ctx.fill();
  }

  //create the snake head.
  ctx.beginPath();
  ctx.rect(snake.head.x, snake.head.y, SQUARE, SQUARE);
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
    snake.head.x > 17 * SQUARE ||
    snake.head.x < SQUARE ||
    snake.head.y > 17 * SQUARE ||
    snake.head.y < 3 * SQUARE ||
    snakeHitItSelf(snake.body, snake.head)
  ) {
    dead.play();
    clearInterval(gameFunction);
    gameOver.innerHTML = "Game Over";
  }

  if (score === 62) {
    //when the score is 62 the player wins.
    win.play();
    clearInterval(gameFunction);
    gameOver.innerHTML = "YOU WON";
  }

  ctx.font = "40px Verdana";
  ctx.fillStyle = "white";
  ctx.fillText(score, 3 * SQUARE, 1.6 * SQUARE);
}

function gameSettings() {
  let start = document.getElementById("start-button");

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

  start.addEventListener("click", function () {
    start.style.width = "0vw";
    start.innerHTML = "";
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
    } //call draw function every 100ms or 150ms or 200ms, to start the game in diffrent levels.
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
gameSettings();
