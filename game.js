function setup() {
  createCanvas(800, 500);
}

class User {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    // this.size = 100;
  }

  draw() {
    fill(255, 255, 0);
    ellipse(this.x, this.y, 100);
  }
}

let user = new User(100, 100);
// let anotherUser = new User(200, 200);

function draw() {
  background(51, 53, 135);

  user.draw();
  /*
  // moving the user
  user.x += 1;

  anotherUser.draw();
  // moving the user
  anotherUser.y += 1;
  */
}
