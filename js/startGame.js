import Button from "./button.js";
function setup() {
  createCanvas(500, 700);
}

function background() {
  fill(255, 30, 88);
  rect(this.x - 100, this.y - 100, 500, 700);
}

window.setup = setup;

const myButton = new Button(100, 100, 160, 40, "Hello");

function draw() {
  background(255);

  if (mouseIsPressed) {
    if (myButton.hitTest(mouseX, mouseY)) {
      background(255, 0, 0);
    }
  }

  myButton.draw();
}

window.draw = draw;
