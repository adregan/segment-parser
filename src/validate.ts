export function positionsInvalid(start: number, end: number): boolean {
  return start >= end;
}

export function sizeInvalid(start: number, end: number, size: number): boolean {
  return end - start + 1 !== size;
}
}
