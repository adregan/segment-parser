export function sizeMatchesPosition(
  start: number,
  end: number,
  size: number
): boolean {
  return end - start + 1 === size;
}