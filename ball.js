import { getQuadraticCurvePoint } from "./utils.js";

export class Ball {
  constructor(x, y, radius, speed, string) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = speed;
    this.radius = radius;
    this.string = string;
    this.color = "#fcc419";

    this.stringPoints = [];
  }

  animate(ctx, isDown) {
    this.vy += 0.1;

    this.x += this.vx
    this.y += this.vy;

    this.updateStringPoint();

    this.isTouchString(isDown, this.string);

    ctx.fillStyle = this.color;
    this.stringPoints.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 3, 0, Math.PI * 2, false);
      ctx.fill();
      ctx.closePath();
    });

    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fill();
  }

  isTouchString(isDown, string) {
    if (this.y >= this.getP(this.x).y - this.radius) {
     
      
      if(string.points[1].vy !==0 ) {
        this.vx += string.points[1].vx;
        this.vy += string.points[1].vy;
      } else{
        
        this.x = this.x;
        this.y  = this.getP(this.x).y - this.radius;
       (!isDown)? this.maxPt = { x: this.x, y: this.y}: this.maxPt = this.getMaxPt(this.x, string.points[1].x, string.points[1].y);

        this.vx += (this.maxPt.x - this.x)/1000 ;
        this.vx *= 0.95;
        this.vy += (this.maxPt.y - this.y)/1000;
        this.vy *= -0.5;
      }
    }
  }

  getP (x) {
    for (let i = 0; i < this.ranges.length; i++) {
      if (x >= this.ranges[i].x1 && x <= this.ranges[i].x2) {
        return this.getP2(x, this.ranges[i]);
      }
    }
    return this.radius;
  }

  getP2(x, range) {
    const total = 200;
    let pt = getQuadraticCurvePoint(range.x1, range.y1, range.cx, range.cy, range.x2, range.y2, 0);
    let prevX = pt.x;
    for (let i = 1; i < total; i++) {
      const t = i / total;
      pt = getQuadraticCurvePoint(range.x1, range.y1, range.cx, range.cy, range.x2, range.y2, t);

      if (x >= prevX && x <= pt.x) {
        return pt;
      }
      prevX = pt.x;
    }
    return pt;
  }

  updateStringPoint() {
    const pt = this.string.points;
    this.ranges = [
      {
        x1: pt[0].x,
        y1: pt[0].y,
        cx: pt[0].x,
        cy: pt[0].y,
        x2: (pt[0].x + pt[1].x) / 2,
        y2: (pt[0].y + pt[1].y) / 2,
      },
      {
        x1: (pt[0].x + pt[1].x) / 2,
        y1: (pt[0].y + pt[1].y) / 2,
        cx: pt[1].x,
        cy: pt[1].y,
        x2: (pt[1].x + pt[2].x) / 2,
        y2: (pt[1].y + pt[2].y) / 2,
      },
      {
        x1: (pt[1].x + pt[2].x) / 2,
        y1: (pt[1].y + pt[2].y) / 2,
        cx: pt[2].x,
        cy: pt[2].y,
        x2: pt[2].x,
        y2: pt[2].y,
      },
    ]

    const total = 10;
    const gap = 1 / total;
    this.ranges.forEach((range, i) => {
      for(let j = 0; j < total; j++) {
        const point = getQuadraticCurvePoint(range.x1, range.y1, range.cx, range.cy, range.x2, range.y2, gap * j);
        this.stringPoints[total * i + j] = point;
      }
    })
  }

  getMaxPt(x,cx, cy) {
    const pY = [];
    this.stringPoints.forEach((point, i) => {
      pY[i] = point.y;
    })
    const maxPY = Math.max(...pY);
    if (cy > maxPY) {
      const maxIndex = pY.indexOf(maxPY);
      return this.stringPoints[maxIndex];
    } else if (x < cx) {
      return this.stringPoints[0];
    } else {
      return this.stringPoints[this.stringPoints.length - 1];
    }
  }

}