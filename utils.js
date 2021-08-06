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
