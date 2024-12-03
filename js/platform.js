export default class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 10;
  }

  draw() {
    noStroke();
    fill(232, 23, 136);
    rect(this.x, this.y, this.width, this.height, 10);
  }

  hitTest(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height
    );
  }
}


