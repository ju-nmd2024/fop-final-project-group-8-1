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
  // https://chatgpt.com/c/67464124-f5cc-800e-90d5-c1dff2e7af29

  handleMouseClick() {
    // Check if the button was clicked
    if (this.button.hitTest(mouseX, mouseY)) {
      return true; // Button was clicked
    }
    return false;
  }
}
