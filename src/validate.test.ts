import { positionsInvalid, createOverlapCheck, sizeInvalid } from './validate';

describe('sizeInvalid', () => {
  it('returns true if the positions do not cover the size provided', () => {
    expect(sizeInvalid(1, 4, 5)).toBeTruthy();
    expect(sizeInvalid(23, 32, 9)).toBeTruthy();
    expect(sizeInvalid(56, 63, 5)).toBeTruthy();
    expect(sizeInvalid(120, 215, 95)).toBeTruthy();
  });

  it('returns false if the positions do cover the size provided', () => {
    expect(sizeInvalid(1, 4, 4)).toBeFalsy();
    expect(sizeInvalid(23, 32, 10)).toBeFalsy();
    expect(sizeInvalid(56, 63, 8)).toBeFalsy();
    expect(sizeInvalid(120, 215, 96)).toBeFalsy();
  });
});

