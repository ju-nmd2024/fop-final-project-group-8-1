// import startGame from "startGame.js";
// global variables
let userImage;
let gameState = false;

function preload() {
  userImage = loadImage("user.png");
}
window.preload = preload;

function setup() {
  createCanvas(500, 700);

  // Load the character
  // userImage = loadImage("user.png");
}
window.setup = setup;

class User {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // this.size = 100;
  }

  draw() {
    fill(255);
    ellipse(this.x, this.y, 100, 100);
    image(userImage, this.x, this.y, 100, 100);
  }
}

let user = new User(100, 100);
// let anotherUser = new User(200, 200);

class Platform {
  constructor(x, y) {
    this.x = Math.random() * 420;
    this.y = y;
  }

  draw() {
    noStroke();
    fill(232, 23, 136);
    rect(this.x, this.y, 80, 10, 10);
  }
}

let platform = new Platform(100, 100);

function draw() {
  // if (!gameState) {
  //   startGame(x, y);
  // } else {
  //   background(51, 53, 135);

  //   user.draw();

  //   /*
  //   anotherUser.draw();
  //   // moving the user
  //   anotherUser.y += 1;
  //   */

  //   // moving the platform
  //   //platform.x += 1;

  //   platform.draw();
  // }
  image(userImage, 100, 100, 100, 100);
}
window.draw = draw;
