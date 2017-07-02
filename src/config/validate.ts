import { isEmpty, range } from "lodash";
import { Config } from "./index";

export default function validate(config: Config): Config {
  const { fields, size, name } = config;
  if (isEmpty(fields) || !size || isEmpty(name)) {
    throw Error("Valid configurations must provide fields, a name, and a size");
  }

  const checkOverlap = createOverlapCheck();

  let computedSize = 0;
  for (let field of fields) {
    const { fieldName: name, size, start, end } = field;

    if (positionsInvalid(start, end)) {
      throw Error(
        `The start of the field '${name}' cannot be greater than or equal to the end`
      );
    }

    if (sizeInvalid(start, end, size)) {
      throw Error(
        `The start and end positions do not equal to the size of ${name}`
      );
    }

    const { overlaps, conflicting } = checkOverlap(start, end, name);
    if (overlaps) {
      throw Error(
        `The positions of '${name}' overlap the positions of '${conflicting}'`
      );
    }

    computedSize += size;
  }

  if (computedSize !== size) {
    throw Error(
      "The computed size of all fields does not match the given segment size"
    );
  }

  return config;
}

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
