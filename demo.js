const SegmentParser = require('./lib');
const headerRecord = require('./configs/headerRecord.json');
const baseSegment = require('./configs/baseSegment.json');

const HeaderParser = new SegmentParser(headerRecord);
const BaseSegmentParser = new SegmentParser(baseSegment);
