import validate, {
  positionsInvalid,
  createOverlapCheck,
  sizeInvalid
} from './validate';
import { Field } from './index';

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

describe('validate', () => {
  it('throws if the config is missing fields, name, or size', () => {
    const error =
      'Valid configurations must provide fields, a name, and a size';
    const fields: Field[] = [
      {
        fieldId: 1,
        fieldName: 'cool',
        start: 1,
        end: 4,
        size: 4,
        fieldType: 'alphanumeric'
      }
    ];

    expect(() => validate({ fields: [], name: 'NoFields', size: 301 })).toThrow(
      error
    );
    expect(() => validate({ fields, name: 'NoSize', size: 0 })).toThrow(error);
    expect(() => validate({ fields, name: '', size: 234 })).toThrow(error);
  });

  it('throws if the computed field size is not the same as the segment size', () => {
    const error =
      'The computed size of all fields does not match the given segment size';

    const fields: Field[] = [
      {
        fieldId: 1,
        fieldName: 'cool',
        start: 1,
        end: 4,
        size: 4,
        fieldType: 'alphanumeric'
      },
      {
        fieldId: 2,
        fieldName: 'super',
        start: 5,
        end: 10,
        size: 6,
        fieldType: 'alphanumeric'
      }
    ];

    expect(() => validate({ fields, name: 'BadSize', size: 8 })).toThrow(error);
  });

  it('throws if it encounters a field with an invalid position', () => {
    const name = 'BadPos';
    const error = `The start of the field '${name}' cannot be greater than or equal to the end`;
    const fields: Field[] = [
      {
        fieldId: 1,
        fieldName: name,
        start: 5,
        end: 4,
        size: 4,
        fieldType: 'alphanumeric'
      }
    ];

    expect(() => validate({ fields, name: 'InvPos', size: 4 })).toThrow(error);
  });

  it('throws if it encounters a field with an invalid size', () => {
    const name = 'BadSize';
    const error = `The start and end positions do not equal to the size of ${name}`;
    const fields: Field[] = [
      {
        fieldId: 1,
        fieldName: name,
        start: 1,
        end: 4,
        size: 5,
        fieldType: 'alphanumeric'
      }
    ];

    expect(() => validate({ fields, name: 'BadSize', size: 5 })).toThrow(error);
  });

  it('throws if the positions of 2 fields overlap', () => {
    const error = `The positions of 'fieldThree' overlap the positions of 'fieldTwo'`;
    const fields: Field[] = [
      {
        fieldId: 1,
        fieldName: 'fieldOne',
        start: 1,
        end: 4,
        size: 4,
        fieldType: 'alphanumeric'
      },
      {
        fieldId: 2,
        fieldName: 'fieldTwo',
        start: 5,
        end: 10,
        size: 6,
        fieldType: 'alphanumeric'
      },
      {
        fieldId: 3,
        fieldName: 'fieldThree',
        start: 8,
        end: 15,
        size: 8,
        fieldType: 'alphanumeric'
      }
    ];

    expect(() => validate({ fields, name: 'Overlap', size: 18 })).toThrow(
      error
    );
  });

  it('returns the config if valid', () => {
    const fields: Field[] = [
      {
        fieldId: 1,
        fieldName: 'fieldOne',
        start: 1,
        end: 4,
        size: 4,
        fieldType: 'alphanumeric'
      },
      {
        fieldId: 2,
        fieldName: 'fieldTwo',
        start: 5,
        end: 10,
        size: 6,
        fieldType: 'alphanumeric'
      },
      {
        fieldId: 3,
        fieldName: 'fieldThree',
        start: 11,
        end: 15,
        size: 5,
        fieldType: 'alphanumeric'
      }
    ];

    const config = {
      fields,
      name: 'GoodConfig',
      size: 15
    };

    expect(validate(config)).toEqual(config);
  });
});
