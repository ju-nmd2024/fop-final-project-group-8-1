import StartGame from "./startGame.js";
import User from "./user.js";
import Platform from "./platform.js";
import LoseGame from "./loseGame.js";

// global variables
let gameState = false;
let user;
let platforms = [];

let boardWidth = 300;
let boardHeight = 500;

//game logic variables
let speed = 1;
let velocityY = 0; //user jump speed
let firstVelocityY = -9; //start velocity
let gravity = 0.4;
let score = 0;
let maxScore = 0;
let gameOver = false;

// importing images done with the help of Lova & Emelie
export let startPicture;
export let losePicture;
export let gameScreen;

function preload() {
  user = new User(100, 300);

  startPicture = loadImage("assets/startGame.png");
  losePicture = loadImage("assets/loseGame.png");
  gameScreen = loadImage("assets/gameScreen.png");
}
window.preload = preload;

function setup() {
  createCanvas(boardWidth, boardHeight);

  velocityY = firstVelocityY;

  for (let i = 0; i < 100; i++) {
    let randomX = Math.random() * width;
    let randomY = Math.random() * height * 2 - height;

    let newPlatform = new Platform(randomX, randomY);

    // with the help of chatgpt, double check!!
    // https://chatgpt.com/c/674e240e-cc24-800e-927a-4bc164234dae
    // space between platforms
    let overlaps = platforms.some((platform) => {
      return !(
        newPlatform.x + newPlatform.width + 50 < platform.x ||
        newPlatform.x > platform.x + platform.width + 50 ||
        newPlatform.y + newPlatform.height + 50 < platform.y ||
        newPlatform.y > platform.y + platform.height + 50
      );
    });

    if (!overlaps) {
      platforms.push(newPlatform);
    }
  }
}

window.setup = setup;

let startGame = new StartGame(100, 100);
let loseGame = new LoseGame(100, 100);

function draw() {
  if (!gameState) {
    startGame.draw();
  } else if (gameOver) {
    loseGame.draw();
  } else {
    image(gameScreen, 0, 0, 300, 500);

    // user logic
    user.draw();
    user.y = user.y + speed;

    //done with help of a youtube video
    //https://www.youtube.com/watch?v=pHFtOYU-a20&feature=youtu.be
    if (user.x > boardWidth) {
      user.x = -100;
    } else if (user.x + 100 < 0) {
      user.x = boardWidth;
    }

    // collision from youtube video
    velocityY += gravity;
    user.y += velocityY;

    for (let platform of platforms) {
      platform.draw();
      if (velocityY < 0 && user.y < (boardHeight * 3) / 4) {
        platform.y -= firstVelocityY; // slide platform down
      }

      if (platform.detectCollision(user.x + 45, user.y + 110)) {
        velocityY = firstVelocityY; // Jump off platform
      }
    }

    // clear platforms and add new platform
    while (platforms[0].y >= boardHeight) {
      platforms.shift(); // removes first element from array
    }

      if (platforms[platforms.length - 1].y > 0) {
        // Add a new platform at the top of the screen
        let randomX = Math.random() * width; // Random X position
        let randomY = -50 + Math.random() * -50;
        let newPlatform = new Platform(randomX, randomY);
  
      platforms.push(newPlatform); // Add the new platform to the array
    }

    // moving the platform
    // platform.x += 1;

    // help from the same youtube video as before
    // // score
    updateScore();
    fill(255);
    textSize(16);
    text(`Score: ${score}`, 5, 20);

    if (user.y > boardHeight) {
      gameOver = true;
      loseGame.setScore(score);
    }
  }
}

window.draw = draw;

function mousePressed() {
  if (!gameState) {
    if (startGame.handleMouseClick()) {
      gameState = true;
    }
  } else if (gameOver) {
    if (loseGame.handleMouseClick()) {
      resetGame();
    }
  }
}

window.mousePressed = mousePressed;

// help from the same youtube video as before
function updateScore() {
  let points = Math.floor(1);

  if (velocityY < 0) {
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  } else if (velocityY >= 0) {
    maxScore -= points;
  }
}

window.updateScore = updateScore;

// Done with the help of chatgpt
// https://chatgpt.com/c/67504f28-e27c-800e-b92b-7027ae2d2387
function resetGame() {
  gameOver = false;
  score = 0;
  maxScore = 0;
  velocityY = firstVelocityY;
  user.y = 300;
  user.x = 100;
  platforms = [];

  for (let i = 0; i < 10; i++) {
    let randomX = Math.random() * width;
    let randomY = Math.random() * height;
    platforms.push(new Platform(randomX, randomY));
  }
}

window.resetGame = resetGame;
