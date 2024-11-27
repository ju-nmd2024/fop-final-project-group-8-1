import StartGame from "./startGame.js";
import User from "./user.js";
import Platform from "./platform.js";

// global variables
let userImage; // testa att ta bort om den faktiskt behövs
let gameState = false;
let user;
let platforms = [];

function preload() {
  user = new User(100, 100);
}
window.preload = preload;

function setup() {
  createCanvas(300, 500);

  for (let i = 0; i < 10; i++) {
    let randomX = Math.random() * width;
    let randomY = Math.random() * height;

    platforms.push(new Platform(randomX, randomY));
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

    for (let platform of platforms) {
      platform.draw();
    }

    user.draw();
    /*
    anotherUser.draw();
    // moving the user
    anotherUser.y += 1;
    */

    // moving the platform
    // platform.x += 1;
  }

  // // collision
  // if (dist(user) < platform) {
  //   console.log("collision");
  // } else {
  //   console.log("free");
  // }
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
