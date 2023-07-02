// Game constants & variables

let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 7;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }]; //snake head array as size of it also increases when it eats food
food = { x: 6, y: 7 }; // food is not array as it is a particle

//Game functions
//Game loop

function main(ctime) {
  window.requestAnimationFrame(main);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // collision with yourself
  for (let i = 1; i < snakeArr.length; i++) {
    // any snake array index collide with snake head
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  // come out of loop
  //if collide with the wall or grid of 0-18

  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
}
function gameEngine() {
  //part 1: updating snake variables and food

  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();

    inputDir = { x: 0, y: 0 }; //as snake collide again come to it's starting point
    alert("Game over press any key to play again");
    //again a new game started after anyone press the key to play again
    snakeArr = [{ x: 13, y: 15 }]; //initial head position
    musicSound.play();
    score = 0;
  }
  //if snake had eaten the food increase the score and change the food position

  // how snake will eat?- when food and snake head coordinates matched

  if (snakeArr[0].x == food.x && snakeArr[0].y == food.y) {
    foodSound.play();

    score = score + 1;

    scoreBox.innerHTML = "Score : " + score;
    snakeArr.unshift({
      // unshift add one head again in front of array
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    // now update food randomly
    let a = 2;
    let b = 16;
    // now generate food randomly between a and b
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Now moving the snake

  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }; //to remove refrrencing problem, create as a new object
  }
  (snakeArr[0].x = snakeArr[0].x + inputDir.x),
    (snakeArr[0].y = snakeArr[0].y + inputDir.y),
    //part 2: Display snake and food

    //display snake element
    (board.innerHTML = ""); // empty board
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");

    snakeElement.style.gridRowStart = e.y; //Adding css through js
    snakeElement.style.gridColumnStart = e.x;

    if (index == 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //Display food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Game main logic starts here

//starts here other than high score

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  //if any key pressed start the game

  inputDir = { x: 0, y: 1 }; //start the game
  moveSound.play(); // as game start play the move sound
  musicSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
