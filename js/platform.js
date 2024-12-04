export default class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 10;
  }

  draw() {
    noStroke();
    fill(255);
    rect(this.x, this.y, this.width, this.height, 10);
  }

  detectCollision(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }
}
