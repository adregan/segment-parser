import {
  Config,
  ParserConfig,
  validate,
  parseConfig,
  ConversionType
} from './config/index';

type Parsed = string | number | Date;
interface ParsedData {
  [key: string]: Parsed;
}

export default class SegmentParser {
  config: ParserConfig;
  constructor(rawConfig: Config) {
    this.config = parseConfig(validate(rawConfig));
  }

  parse(input: string): ParsedData {
    const { fields } = this.config;

    return fields.reduce((accum, field) => {
      const { name, range, convertTo } = field;
      const data = this.convert(input.slice(...range), convertTo);

      return { ...accum, [name]: data };
    }, {});
  }

  private convert(s: string, convertTo: ConversionType): Parsed {
    switch (convertTo) {
      case 'numeric':
        return parseInt(s);

      case 'date':
        const re = /(\d{2})(\d{2})(\d{4})/;
        const [, month, day, year] = re.exec(s);
        return new Date(`${month}/${day}/${year}`);

      default:
        return s;
    }
  }
}