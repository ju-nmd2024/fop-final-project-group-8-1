import StartGame from "./startGame.js";
import User from "./user.js";
import Platform from "./platform.js";

// global variables
let userImage;
let gameState = false;

function preload() {
  userImage = loadImage("./assets/user.png");
}

window.preload = preload;

function setup() {
  createCanvas(500, 700);
}
window.setup = setup;

let user = new User(100, 100, userImage);
// let anotherUser = new User(200, 200);

let platform = new Platform(100, 100);

let startGame = new StartGame(100, 100);

function draw() {
  if (!gameState) {
    startGame.draw();
  } else {
    background(51, 53, 135);
    platform.draw();

    // user.draw();
    /*
    anotherUser.draw();
    // moving the user
    anotherUser.y += 1;
    */

    // moving the platform
    //platform.x += 1;
  }

  // image(userImage, 100, 100, 100, 100);

  // // collision
  // if(
  //   dist(user) < platform
  // ) {
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
