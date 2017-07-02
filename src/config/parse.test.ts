import parse, { parseField } from './parse';

describe('parseField', () => {
  it('returns a parsed field', () => {
    const test = {
      fieldId: 4,
      fieldName: 'CCA Identifier',
      start: 13,
      end: 22,
      size: 10
    };

    const expected = {
      id: 4,
      name: 'CCA Identifier',
      range: [12, 21]
    };

    expect(parseField(test)).toEqual(expected);
  });
});

describe('parse', () => {
  it('returns a parsed config', () => {
    const test = {
      name: 'Header Record',
      size: 12,
      fields: [
        {
          fieldId: 1,
          fieldName: 'Record Descriptor',
          start: 1,
          end: 4,
          size: 4
        },
        {
          fieldId: 2,
          fieldName: 'Record Identifier',
          start: 5,
          end: 10,
          size: 6
        },
        {
          fieldId: 3,
          fieldName: 'Cycle Number',
          start: 11,
          end: 12,
          size: 2
        }
      ]
    };

    const expected = {
      name: 'Header Record',
      fields: [
        {
          id: 1,
          name: 'Record Descriptor',
          range: [0, 3]
        },
        {
          id: 2,
          name: 'Record Identifier',
          range: [4, 9]
        },
        {
          id: 3,
          name: 'Cycle Number',
          range: [10, 11]
        }
      ]
    };

    expect(parse(test)).toEqual(expected);
  });
});
