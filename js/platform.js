export default class Platform {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 10;

    this.moveX =
      // 10% chance, -1 = left, 1 = right, 0 = movement
      Math.random() < 0.1 ? (Math.random() < 0.5 ? -1 : 1) : 0;
    this.moveSpeed = 2;

    this.breakable = Math.random() < 0.1;
    this.broken = false;
  }

  draw() {
    if (this.broken) {
      return;
    }

    noStroke();
    fill(this.breakable ? (196, 35, 35) : 255);
    rect(this.x, this.y, this.width, this.height, 10);

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
    {
      if (this.breakable) {
        this.broken = true;
      }
      return true;
    }
    return false;
  }
}
