import { losePicture } from "./game.js";
import Button from "./button.js";

export default class LoseGame {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.button = new Button(75, 330, 160, 40, "PLAY AGAIN");
    this.score = 0;
  }

  setScore(score) {
    this.score = score;
  }

  draw() {
    image(losePicture, 0, 0, 300, 500);

    this.button.draw();

    // score
    fill(243, 199, 87);
    textSize(20);
    textStyle(BOLD);
    text(`Your Score: ${this.score}`, this.x - 17, this.y + 150);
  }

  // handleMouseClick was done with the help of chatgpt
  // https://chatgpt.com/c/67464124-f5cc-800e-90d5-c1dff2e7af29

  handleMouseClick() {
    // Check if the button was clicked
    if (this.button.hitTest(mouseX, mouseY)) {
      return true; // Button was clicked
    }
    return false;
  }
}
