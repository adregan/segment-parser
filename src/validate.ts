export function positionsInvalid(start: number, end: number): boolean {
  return start >= end;
}

export function sizeInvalid(start: number, end: number, size: number): boolean {
  return end - start + 1 !== size;
}

export function createOverlapCheck() {
  let seenRanges = new Map();

  return function checkOverlap(
    start: number,
    end: number,
    name: string
  ): { overlaps: boolean; conflicting?: string } {
    for (let position of range(start, end + 1)) {
      const conflicting = seenRanges.get(position);
      if (conflicting) {
        return { overlaps: true, conflicting };
      }
      seenRanges.set(position, name);
    }

    return { overlaps: false };
  };
}
