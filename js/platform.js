export default class Platform {
  constructor(x, y) {
    // this.x = Math.random() * 420;
    this.x = x;
    this.y = y;
  }

  draw() {
    noStroke();
    fill(232, 23, 136);
    rect(this.x, this.y, 80, 10, 10);
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

// let platform = new Platform(100, 100);
