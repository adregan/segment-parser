const SegmentParser = require('./lib');
const headerRecord = require('./configs/headerRecord.json');
const baseSegment = require('./configs/baseSegment.json');

const headerSample = `0560HEADER341234567890               333333333303162017100419840701201707022017BANANAS FOR LYFE                        1234 MAIN ST NOTOWN                                                                             2125555555                                                                                                                                                                                                         `;

function main() {
  const HeaderParser = new SegmentParser(headerRecord);
  const BaseSegmentParser = new SegmentParser(baseSegment);

  console.log(HeaderParser.parse(headerSample));
}

main();
