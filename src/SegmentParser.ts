import {
  Config,
  ParserConfig,
  validateConfig,
  parseConfig,
  ConversionType
} from './configUtils/index';

type Parsed = string | number | Date;
interface ParsedData {
  [key: string]: Parsed;
}

/** A segent parser */
export default class SegmentParser {
  config: ParserConfig;

  /**
   * Create a Parser
   * The segments we are parsing are generally long strings where the data is
   * structured by position. To parse these, we structure information about the
   * fields in a configuration object:
   *
   * ```
   * {
   *   name: string,
   *   size: number,
   *   fields: [
   *     {
   *       fieldId: number,
   *       fieldName: string,
   *       fieldType: 'alphanumeric' | 'numeric' | 'date',
   *       start: number,
   *       end: number,
   *       size: number
   *     }
   *   ]
   * }
   * ```
   *
   * where the size given in the config must equal the sum of all of the fields'
   * sizes. Similarly, a field's start and end position must account for
   * the same size as the given field's size.
   * @param {Config} config - config object
   */
  constructor(rawConfig: Config) {
    this.config = parseConfig(validateConfig(rawConfig));
  }

  /**
   * Will parse input according to the config
   * @param {string} input - the data for a given segment
   * @return {Object} parsed - the data parsed into a javascript object
   */
  parse(input: string): ParsedData {
    const { fields, size } = this.config;

    if (input.length !== size) {
      throw Error(
        'The provided data does not match the length for this section'
      );
    }

    return fields.reduce((accum, field) => {
      const { name, range, convertTo } = field;
      const data = this.convert(input.slice(...range), convertTo);

      return { ...accum, [name]: data };
    }, {});
  }

  /**
   * Converts the string value into other types
   * @param {string} val - the string value to convert
   * @param {'alphanumeric' | 'numeric' | 'date'} convertTo - The type to convert
   *     the value to.
   * @return {string | number | Date} the converted value
   */
  private convert(val: string, convertTo: ConversionType): Parsed {
    switch (convertTo) {
      case 'numeric':
        return parseInt(val);

      // TODO: Handle timestamps
      case 'date':
        const re = /(\d{2})(\d{2})(\d{4})/;
        const [, month, day, year] = re.exec(val);
        return new Date(`${month}/${day}/${year}`);

      default:
        return val.trim();
    }
  }
}
