import StartGame from "./startGame.js";
import User from "./user.js";
import Platform from "./platform.js";
import LoseGame from "./loseGame.js";

// global variables
let gameState = false;
let user;
let platforms = [];
let fallingPlatforms = [];

let boardWidth = 300;
let boardHeight = 500;

let speed = 1; // user falling speed
let velocityY = 0; //user jump speed
let firstVelocityY = -9; // user start velocity
let gravity = 0.4; // user gravity
let score = 0;
let maxScore = 0;
let gameOver = false;

// importing images
// done with the help of Lova Venema & Emelie Kryger
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

    // space between platforms
    // with the help of chatgpt, double check!!
    // https://chatgpt.com/share/6751d9ec-79e4-800e-bc73-9de36e656ba4
    let overlaps = platforms.some((platform) => {
      return !(
        newPlatform.x + newPlatform.width + 50 < platform.x ||
        newPlatform.x > platform.x + platform.width + 50 ||
        newPlatform.y + newPlatform.height + 50 < platform.y ||
        newPlatform.y > platform.y + platform.height + 50
      );
    });

    // adding platform if it doesn't overlap
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
    // background
    image(gameScreen, 0, 0, 300, 500);
    // user logic
    user.draw();
    // user falling
    user.y = user.y + speed;

    // user appering from each side when going from the opposite side
    // done with help of a youtube video
    // https://www.youtube.com/watch?v=pHFtOYU-a20&feature=youtu.be
    if (user.x > boardWidth) {
      user.x = -100;
    } else if (user.x + 100 < 0) {
      user.x = boardWidth;
    }

    // user gravity and movement
    velocityY += gravity;
    user.y += velocityY;

    // update platforms
    // done with help of a youtube video
    // https://www.youtube.com/watch?v=pHFtOYU-a20&feature=youtu.be
    for (let i = platforms.length - 1; i >= 0; i--) {
      let platform = platforms[i];
      platform.draw();

      // moving platforms down when user moves up
      if (velocityY < 0 && user.y < (boardHeight * 3) / 4) {
        platform.y -= firstVelocityY; // slide platform down
      }

      // user platform collision
      if (platform.detectCollision(user.x + 45, user.y + 110)) {
        // jump off platform
        if (platform.breakable === true) {
          // creating two smaller falling platforms

          // let leftPiece = new Platform(
          //   platform.x,
          //   platform.y,
          //   platform.width / 2
          // );
          // let rightPiece = new Platform(
          //   platform.x + platform.width / 2,
          //   platform.y,
          //   platform.width / 2
          // );

          // // make the platforms fall
          // leftPiece.falling = true;
          // rightPiece.falling = true;

          // // adding to falling platforms array
          // fallingPlatforms.push(leftPiece, rightPiece);

          // removing original platform
          platforms.splice(i, 1);
        } else {
          // jump normally on regular platforms
          velocityY = firstVelocityY;
        }
      }
    }

    // clear platforms and add new platform
    while (platforms[0].y >= boardHeight) {
      // removing first element from array
      platforms.shift();
    }

    if (platforms[platforms.length - 1].y > 0) {
      // Add a new platform at the top of the screen
      let randomX = Math.random() * width; // Random X position
      let randomY = -50 + Math.random() * -50; // Y position
      let newPlatform = new Platform(randomX, randomY);

      // Add new platform to the array
      platforms.push(newPlatform);
    }

    // updating falling platforms
    for (let i = fallingPlatforms.length - 1; i >= 0; i--) {
      let fallingPlatform = fallingPlatforms[i];
      fallingPlatform.draw();
      // making it fall down
      fallingPlatform.y += 3;

      if (fallingPlatform.y > boardHeight) {
        // removing when out of screen
        fallingPlatforms.splice(i, 1);
      }
    }

    // update score
    // done with help of a youtube video
    // https://www.youtube.com/watch?v=pHFtOYU-a20&feature=youtu.be
    updateScore();
    fill(255);
    textSize(16);
    text(`Score: ${score}`, 5, 20);

    // end game if user falls off the screen
    if (user.y > boardHeight) {
      gameOver = true;

      // final score in lose screen
      loseGame.setScore(score);
    }
  }
}

window.draw = draw;

function mousePressed() {
  if (!gameState) {
    if (startGame.handleMouseClick()) {
      gameState = true; // start game
    }
  } else if (gameOver) {
    if (loseGame.handleMouseClick()) {
      resetGame(); // restart game
    }
  }
}

window.mousePressed = mousePressed;

// update score
// done with help of a youtube video
// https://www.youtube.com/watch?v=pHFtOYU-a20&feature=youtu.be
function updateScore() {
  // adding/ subtracting points
  let points = Math.floor(1);

  if (velocityY < 0) {
    // adding points when user goes up
    maxScore += points;
    if (score < maxScore) {
      // update current score
      score = maxScore;
    }
  } else if (velocityY >= 0) {
    // redusing points when user goes down
    maxScore -= points;
  }
}

window.updateScore = updateScore;

// Done with the help of chatgpt
// https://chatgpt.com/share/6751c9f5-3330-800e-bec7-640fbd612e62
function resetGame() {
  gameOver = false;
  score = 0;
  maxScore = 0;
  velocityY = firstVelocityY;
  user.y = 300;
  user.x = 100;
  platforms = [];

  // platforms
  for (let i = 0; i < 10; i++) {
    let randomX = Math.random() * width;
    let randomY = Math.random() * height * 2 - height;
    platforms.push(new Platform(randomX, randomY));
  }
}

window.resetGame = resetGame;
