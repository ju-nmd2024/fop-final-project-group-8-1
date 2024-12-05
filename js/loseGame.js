import { losePicture } from "./game.js";
import Button from "./button.js";

export default class LoseGame {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.button = new Button(75, 330, 160, 40, "PLAY AGAIN");
    this.score = 0;
  }

  // update score
  setScore(score) {
    this.score = score;
  }

  draw() {
    // background
    image(losePicture, 0, 0, 300, 500);

    // "play" button
    this.button.draw();

    // score display
    fill(243, 199, 87);
    textSize(20);
    textStyle(BOLD);
    text(`Your Score: ${this.score}`, this.x - 17, this.y + 150);
  }

  // clicking the "play" button
  // handleMouseClick was done with the help of chatgpt
  // https://chatgpt.com/share/674e2496-132c-800e-a609-a8b078341f15
  handleMouseClick() {
    // Check if the button was clicked
    if (this.button.hitTest(mouseX, mouseY)) {
      return true; // Button was clicked
    }
    return false;
  }
}
