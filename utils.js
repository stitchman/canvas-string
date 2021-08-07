export function distance(x1, y1, x2, y2) {
  const x = x2 - x1;
  const y = y2 - y1;
  return Math.sqrt(x * x + y * y);
}

export function lineCircle(x1, y1, x2, y2, cx, cy, r) {
  const lineLength = distance(x1, y1, x2, y2);
  const point =
    ((x2 - x1) * (cx - x1) + (y2 - y1) * (cy - y1)) / lineLength ** 2;
  const px = x1 + (x2 - x1) * point;
  const py = y1 + (y2 - y1) * point;
  if (distance(px, py, cx, cy) < r) {
    return true;
  } else {
    return false;
  }
}

export function getQuadraticCurveValue(p1, cp, p2, t) {
  return (1 - t) ** 2 * p1 + 2 * t * (1 - t) * cp + t ** 2 * p2;
}

export function getQuadraticCurvePoint(x1, y1, cx, cy, x2, y2, t) {
  return {
    x: getQuadraticCurveValue(x1, cx, x2, t),
    y: getQuadraticCurveValue(y1, cy, y2, t),
  };
}
