import { BounceString } from "./bouncestring.js";

class App {
  constructor() {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    this.isDown = false;
    this.moveX = -5000;
    this.moveY = -5000;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.resize();

    window.addEventListener("pointerdown", this.onDown.bind(this), false);
    window.addEventListener("pointermove", this.onMove.bind(this), false);
    window.addEventListener("pointerup", this.onUp.bind(this), false);

    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.string = new BounceString(
      {
        x1: 50,
        y1: this.stageHeight / 2,
        x2: this.stageWidth - 50,
        y2: this.stageHeight / 2,
      },
      "#f03e3e"
    );
  }

  animate(t) {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    this.string.animate(this.ctx, this.moveX, this.moveY);
  }

  onDown(e) {
    this.isDown = true;
    this.moveX = e.clientX;
    this.moveY = e.clientY;
  }

  onMove(e) {
    if (this.isDown) {
      this.moveX = e.clientX;
      this.moveY = e.clientY;
    }
  }

  onUp(e) {
    this.isDown = false;
    this.moveX = -5000;
    this.moveY = -5000;
  }
}

window.onload = () => {
  new App();
};
