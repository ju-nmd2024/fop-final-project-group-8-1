export default class Platform {
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
