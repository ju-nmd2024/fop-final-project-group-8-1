// global variables
let userImage;

function setup() {
  createCanvas(800, 500);

  // Load the character
  userImage = loadImage("assets/user.png");
}

class User {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // this.size = 100;
  }

  draw() {
    image(userImage, this.x, this.y, 100, 100);
  }
}

let user = new User(100, 100);
// let anotherUser = new User(200, 200);

class Platform {
  constructor(x, y) {
    this.x = x;
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
  background(51, 53, 135);

  user.draw();

  /*
  anotherUser.draw();
  // moving the user
  anotherUser.y += 1;
  */

  // moving the platform
  platform.x += 1;

  platform.draw();
}
