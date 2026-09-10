export function clampPhotoOffset(
  offset: number,
  viewportWidth: number,
  trackWidth = 504,
) {
  return Math.max(Math.min(0, viewportWidth - trackWidth), Math.min(0, offset));
}
export function horizontalDrag(dx: number, dy: number) {
  return Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy);
}
