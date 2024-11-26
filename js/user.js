export default class User {
  constructor(x, y, userImage) {
    this.x = x;
    this.y = y;
    this.userImage = userImage;
    // this.size = 100;
  }

  draw() {
    fill(255);
    ellipse(this.x, this.y, 100, 100);
    image(this.userImage, this.x, this.y, 100, 100);
  }
}
