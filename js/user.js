export default class User {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    //this.userImage = loadImage("./assets/user.png");
    // this.size = 100;
  }

  draw() {
    fill(255);
    ellipse(this.x, this.y, 100, 100);
    image(this.userImage, this.x, this.y, 100, 100);
  }
}
