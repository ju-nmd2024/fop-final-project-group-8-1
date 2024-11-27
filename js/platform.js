export default class Platform {
  constructor(w, y) {
    this.x = Math.random() * w;
    this.y = y;
  }

  draw() {
    noStroke();
    fill(232, 23, 136);
    rect(this.x, this.y, 80, 10, 10);
  }
}

let platform = new Platform(100, 100);
