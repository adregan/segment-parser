const SegmentParser = require('./lib');
const headerRecord = require('./configs/headerRecord.json');
const baseSegment = require('./configs/baseSegment.json');

const headerSample =
  '0560HEADER341234567890               333333333303162017100419840701201707022017BANANAS FOR LYFE                        1234 MAIN ST NOTOWN                                                                             2125555555                                                                                                                                                                                                         ';

const baseSample =
  '006010804195404342311234567890          34555555555544444444448888888888M34070420160000000001200000  30 M2000     3000     941123456789000000000000000  XJ50000    2300     1500     05232017042320150000000006042017                 1DOE                      JOHN                COOL                J5555555550220188921255555551Q US1234 MAIN ST                    APT 23                          STICKS              ME90909    YR';

function main() {
  const HeaderParser = new SegmentParser(headerRecord);
  const BaseSegmentParser = new SegmentParser(baseSegment);

  console.log(HeaderParser.parse(headerSample));
  console.log(BaseSegmentParser.parse(baseSample));
}

main();
