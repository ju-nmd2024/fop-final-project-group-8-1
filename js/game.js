import StartGame from "./startGame.js";
import User from "./user.js";
import Platform from "./platform.js";

// global variables
let userImage; // testa att ta bort om den faktiskt behövs
let gameState = false;
let user;
let platforms = [];

let boardWidth = 300;
let boardHeight = 500;

//game logic variables
let speed = 1;
let velocityY = 0; //user jump speed
let firstVelocityY = -8; //start velocity
let gravity = 0.4;

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
    // space between platform
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

    velocityY += gravity;
    user.y += velocityY;

    // if (hitTest(user, platform)) {
    //   velocityY = firstVelocityY; // jump off platform
    // }
    
    // collision
    let colliding = false;

    for (let platform of platforms) {
      platform.draw();
      if (platform.hitTest(user.x + 45, user.y + 110)) {
        colliding = true;
      }
    }

    if (colliding) {
      console.log("collision");

      // testing
      fill(0);
      noStroke();
      ellipse(50, 50, 50, 50);
    } else {
      console.log("free");
    }
    /*
    anotherUser.draw();
    // moving the user
    anotherUser.y += 1;
    */

    // moving the platform
    // platform.x += 1;´
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
