const BOUNCE = 0.92;

import { lineCircle } from "./utils.js";

export class BounceString {
  constructor(pos, color) {
    const middleX = (pos.x1 + pos.x2) / 2;
    const middleY = (pos.y1 + pos.y2) / 2;

    this.points = [
      {
        x: pos.x1,
        y: pos.y1,
        ox: pos.x1,
        oy: pos.y1,
        vx: 0,
        vy: 0,
      },
      {
        x: middleX,
        y: middleY,
        ox: middleX,
        oy: middleY,
        vx: 0,
        vy: 0,
      },
      {
        x: pos.x2,
        y: pos.y2,
        ox: pos.x2,
        oy: pos.y2,
        vx: 0,
        vy: 0,
      },
    ];

    this.detect = 10;
    this.color = color;
  }

  animate(ctx, moveX, moveY) {
    ctx.beginPath();
    ctx.fillStyle = "#fcc419";
    ctx.arc(moveX, moveY, 10, 0, Math.PI * 2, false);
    ctx.fill();

    ctx.beginPath();
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 4;

    if (
      lineCircle(
        this.points[0].x,
        this.points[0].y,
        this.points[2].x,
        this.points[2].y,
        moveX,
        moveY,
        this.detect
      )
    ) {
      this.detect = 500;
      let tx = (this.points[1].x + moveX) / 2;
      let ty = moveY;
      this.points[1].vx = tx - this.points[1].x;
      this.points[1].vy = ty - this.points[1].y;
    } else {
      this.detect = 10;
      let tx = this.points[1].ox;
      let ty = this.points[1].oy;
      this.points[1].vx += tx - this.points[1].x;
      this.points[1].vx *= BOUNCE;
      this.points[1].vy += ty - this.points[1].y;
      this.points[1].vy *= BOUNCE;
    }

    this.points[1].x += this.points[1].vx;
    this.points[1].y += this.points[1].vy;

    let prevX = this.points[0].x;
    let prevY = this.points[0].y;
    ctx.moveTo(prevX, prevY);

    for (let i = 1; i < this.points.length; i++) {
      const cx = (prevX + this.points[i].x) / 2;
      const cy = (prevY + this.points[i].y) / 2;

      ctx.quadraticCurveTo(prevX, prevY, cx, cy);

      prevX = this.points[i].x;
      prevY = this.points[i].y;
    }

    ctx.lineTo(prevX, prevY);
    ctx.stroke();
  }
}
