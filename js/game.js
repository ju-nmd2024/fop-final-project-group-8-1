import StartGame from "./startGame.js";
import User from "./user.js";
import Platform from "./platform.js";

// global variables
let gameState = false;
let user;
let platforms = [];

let boardWidth = 300;
let boardHeight = 500;

//game logic variables
let speed = 1;
let velocityY = 0; //user jump speed
let firstVelocityY = -10; //start velocity
let gravity = 0.4;
let score = 0;

function preload() {
  user = new User(100, 300);
}
window.preload = preload;

function setup() {
  createCanvas(boardWidth, boardHeight);

  velocityY = firstVelocityY;

  for (let i = 0; i < 10; i++) {
    let randomX = Math.random() * width;
    let randomY = Math.random() * height;

    let newPlatform = new Platform(randomX, randomY);

    // with the help of chatgpt, double check!!
    // https://chatgpt.com/c/674e240e-cc24-800e-927a-4bc164234dae
    // space between platforms
    let overlaps = platforms.some((platform) => {
      return !(
        newPlatform.x + newPlatform.width + 20 < platform.x ||
        newPlatform.x > platform.x + platform.width + 20 ||
        newPlatform.y + newPlatform.height + 20 < platform.y ||
        newPlatform.y > platform.y + platform.height + 20
      );
    });

    if (!overlaps) {
      platforms.push(newPlatform);
    }
  }
}

window.setup = setup;

// function newPlatform() {}

// let anotherUser = new User(200, 200);

let startGame = new StartGame(100, 100);

function draw() {
  if (!gameState) {
    startGame.draw();
  } else {
    background(51, 53, 135);

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
    while (platforms.length > 0 && platforms[0].y >= boardHeight) {
      platforms.shift(); // removes first element from array

      // Add a new platform at the top of the screen
      let randomX = Math.random() * width; // Random X position
      let newPlatform = new Platform(randomX, 200); // Y = 0 to start at the top
      platforms.push(newPlatform); // Add the new platform to the array
    }

    /*
    anotherUser.draw();
    // moving the user
    anotherUser.y += 1;
    */

    // moving the platform
    // platform.x += 1;

    // // score
    // updateScore();
    // fill(0); // Black color
    // textSize(16);
    // text(`Score: ${score}`, 5, 20);
    context.fillStyle = "black";
    context.font = "16px sans-serif";
    context.fillText(score, 5, 20);
  }
}
window.draw = draw;

function mousePressed() {
  if (!gameState) {
    if (startGame.handleMouseClick()) {
      gameState = true;
    }
  }
}

window.mousePressed = mousePressed;

function updateScore() {
  let points = Math.floor(50 * Math.random());

  if (velocity < 0) {
    maxScore += points;
    if (score < maxScore) {
      score = maxScore;
    }
  } else if (velocity >= 0) {
    maxScore -= points;
  }
}

// function updateScore() {
//   if (velocityY < 0) {
//     // Only update the score when the user is moving upwards
//     let points = Math.abs(Math.floor(user.y)); // Score based on upward movement
//     score = Math.max(score, points); // Keep the highest score
//   }
// }

window.updateScore = updateScore;
