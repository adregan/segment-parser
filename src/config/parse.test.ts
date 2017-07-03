import parse, { parseField } from './parse';
import { Config } from './index';

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
      name: 'ccaIdentifier',
      range: [12, 22],
      convertTo: 'alphanumeric'
    };

    expect(parseField(test)).toEqual(expected);
  });
});

describe('parse', () => {
  it('returns a parsed config', () => {
    const test: Config = {
      name: 'Header Record',
      size: 12,
      fields: [
        {
          fieldId: 1,
          fieldName: 'Record Descriptor',
          start: 1,
          end: 4,
          size: 4,
          fieldType: 'date'
        },
        {
          fieldId: 2,
          fieldName: 'Record Identifier',
          start: 5,
          end: 10,
          size: 6,
          fieldType: 'numeric'
        },
        {
          fieldId: 3,
          fieldName: 'Cycle Number',
          start: 11,
          end: 12,
          size: 2,
          fieldType: 'alphanumeric'
        }
      ]
    };

    const expected = {
      name: 'headerRecord',
      size: 12,
      fields: [
        {
          id: 1,
          name: 'recordDescriptor',
          range: [0, 4],
          convertTo: 'date'
        },
        {
          id: 2,
          name: 'recordIdentifier',
          range: [4, 10],
          convertTo: 'numeric'
        },
        {
          id: 3,
          name: 'cycleNumber',
          range: [10, 12],
          convertTo: 'alphanumeric'
        }
      ]
    };

    expect(parse(test)).toEqual(expected);
  });
});
