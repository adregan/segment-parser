import { positionsInvalid, createOverlapCheck, sizeInvalid } from './validate';

describe('positionsInvalid', () => {
  it('returns true if the start is equal to the end', () => {
    [1, 2, 3, 4, 5].forEach(n => expect(positionsInvalid(n, n)).toBeTruthy());
  });

  it('returns true if the start is greater than the end', () => {
    [1, 2, 3, 4, 5].forEach(n =>
      expect(positionsInvalid(n * 2, n)).toBeTruthy()
    );
  });

  it('returns false if the start less than the end', () => {
    [1, 2, 3, 4, 5].forEach(n =>
      expect(positionsInvalid(n, n * 2)).toBeFalsy()
    );
  });
});

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

describe('createOverlapCheck', () => {
  it('returns a checkOverlap function', () => {
    expect(createOverlapCheck()).toBeInstanceOf(Function);
  });
});

describe('checkOverlap', () => {
  it('returns false with a conflicting value if ranges overlap', () => {
    const checkOverlap = createOverlapCheck();

    expect(checkOverlap(1, 4, 'fieldOne')).toEqual({ overlaps: false });
    expect(checkOverlap(5, 15, 'fieldTwo')).toEqual({ overlaps: false });
    expect(checkOverlap(14, 20, 'fieldThree')).toEqual({
      overlaps: true,
      conflicting: 'fieldTwo'
    });
  });
});
