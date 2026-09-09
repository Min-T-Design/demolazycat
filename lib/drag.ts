export function clampPhotoOffset(offset: number, viewportWidth: number) {
  return Math.max(Math.min(0, viewportWidth - 504), Math.min(0, offset));
}
export function horizontalDrag(dx: number, dy: number) {
  return Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(dy);
}
