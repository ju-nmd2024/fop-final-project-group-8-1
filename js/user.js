export default class User {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.userImage = loadImage("./assets/user.png");
  }

  draw() {
    // user
    image(this.userImage, this.x, this.y, 100, 110);

    // move user with arrow keys
    const speed = 2;
    // left arrow
    if (keyIsDown(37)) {
      this.x -= speed;
      // right arrow
    } else if (keyIsDown(39)) {
      this.x += speed;
    }
  }
}
