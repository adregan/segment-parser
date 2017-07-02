import SegmentParser from './SegmentParser';
import { Config, Field } from './config/index';

const fields: Field[] = [
  {
    fieldId: 1,
    fieldName: 'Record Descriptor',
    start: 1,
    end: 4,
    size: 4,
    fieldType: 'alphanumeric'
  },
  {
    fieldId: 2,
    fieldName: 'Record Identifier',
    start: 5,
    end: 10,
    size: 6,
    fieldType: 'alphanumeric'
  },
  {
    fieldId: 3,
    fieldName: 'Cycle Number',
    start: 11,
    end: 12,
    size: 2,
    fieldType: 'numeric'
  },
  {
    fieldId: 4,
    fieldName: 'Activity Date',
    start: 13,
    end: 20,
    size: 8,
    fieldType: 'date'
  }
];

const config: Config = {
  name: 'Header Record',
  size: 20,
  fields
};

const mockData = '0560HEADER2503162017';

describe('SegmentParser', () => {
  describe('#parse', () => {
    it('returns an object of parsed data', () => {
      const TestParser = new SegmentParser(config);
      expect(TestParser.parse(mockData)).toEqual({
        cycleNumber: 25,
        recordDescriptor: '0560',
        recordIdentifier: 'HEADER',
        activityDate: new Date('March 16, 2017')
      });
    });
  });
});
