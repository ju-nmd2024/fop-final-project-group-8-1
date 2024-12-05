import { startPicture } from "./game.js";
import Button from "./button.js";

export default class StartGame {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.button = new Button(75, 330, 160, 40, "PLAY");
  }

  draw() {
    image(startPicture, 0, 0, 300, 500);

    this.button.draw();
  }

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
