export default class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 10;

    // moving platforms
    // done with the help of chatgpt
    // https://chatgpt.com/share/6751d960-753c-800e-97d9-730a233390fd
    this.moveX =
      // 10% chance, -1 = left, 1 = right, 0 = movement
      Math.random() < 0.1 ? (Math.random() < 0.5 ? -1 : 1) : 0;
    this.moveSpeed = 2;
  }

  draw() {
    noStroke();
    fill(255);
    rect(this.x, this.y, this.width, this.height, 10);

    // updating moving platforms positions
    if (this.moveX !== 0) {
      this.x += this.moveX * this.moveSpeed;
    }
  }

  detectCollision(x, y) {
    return (
      x > this.x &&
      x < this.x + this.width &&
      y > this.y &&
      y < this.y + this.height * 3
    );
  }
}
