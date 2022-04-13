const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

//create the unit
const box = 32;
//load image

const ground = new Image();
ground.src = "images/ground.png";

const foodImg = new Image();
foodImg.src = "images/food.png";
foodImg.style.width = "32px"

//höja bredden på ormen "bilden"

//create the snake

let snake = [];

snake[0] = {
    x: 9*box,
    y: 10*box,
}

// create the food

let foodPosition =  {
    x: Math.floor(Math.random()*17+1)*box,
    y: Math.floor(Math.random()*15+3)*box,
}

//create the score var

let score = 0;

//control the snake
let diration;
document.addEventListener("keydown", function(event) {
    let key = event.key;
    if(key == "ArrowLeft" && diration !== "RIGHT"){
        diration = "LEFT";
    }else if(key == "ArrowUp" && diration !== "DOWN"){
        diration = "UP";
    }else if(key == "ArrowRight" && diration !== "LEFT"){
        diration = "RIGHT";
    }else if(key == "ArrowDown" && diration !== "UP"){
        diration = "DOWN";
    }

})

//draw everything to the canvas

function draw () {
    ctx.drawImage(ground, 0,0);

    for( let i = 0; i < snake.length ; i++){
        if (i == 0) {
            ctx.fillStyle = "green";
        }
        else {
            ctx.fillStyle = "white";
        }
        ctx.fillRect(snake[i].x,snake[i].y,box,box);
      
        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x,snake[i].y,box,box);
    }

    ctx.drawImage(foodImg,foodPosition.x,foodPosition.y);
    
    //old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    // if the snake eats the food
    if(snakeX == foodPosition.x && snakeY == foodPosition.y){
        score++
        let eat = new Audio();
        eat.src = "sounds/audio_eat.mp3";
        eat.play();
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box
        }
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "45px Changa one";
    ctx.fillText(score, 2*box, 1.6*box);
}

//call draw function every 100ms

let game = setInterval(draw, 100);