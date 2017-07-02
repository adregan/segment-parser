import { sizeMatchesPosition } from './validate';

describe('sizeMatchesPosition', () => {
  it('returns false if the positions do not cover the size provided', () => {
    expect(sizeMatchesPosition(1, 4, 5)).toBeFalsy();
    expect(sizeMatchesPosition(23, 32, 9)).toBeFalsy();
    expect(sizeMatchesPosition(56, 63, 5)).toBeFalsy();
    expect(sizeMatchesPosition(120, 215, 95)).toBeFalsy();
  })

  it('returns true if the positions do cover the size provided', () => {
    expect(sizeMatchesPosition(1, 4, 4)).toBeTruthy();
    expect(sizeMatchesPosition(23, 32, 10)).toBeTruthy();
    expect(sizeMatchesPosition(56, 63, 8)).toBeTruthy();
    expect(sizeMatchesPosition(120, 215, 96)).toBeTruthy();
  })
})
