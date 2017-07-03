import camelCase from 'lodash/camelCase';
import { Config, ParserConfig, Field, ParserField } from './index';

/**
 * parses a field config into a parser config
 * @param {Config} config - The configuration object
 * @return {ParserConfig} config the segment parser uses to parse data
 */
export default function parse(config: Config): ParserConfig {
  const { name: rawName, fields: rawFields, size } = config;
  const fields = rawFields.map(parseField);
  const name = camelCase(rawName);

  return { fields, name, size };
}

/**
 * parses an individual field into a parser field
 * @param {Field} field - the raw field config
 * @return {ParserField} the field info used to parse data
 */
export function parseField(field: Field): ParserField {
  const { end, fieldId: id, fieldName, start, fieldType } = field;
  const range: [number, number] = [start - 1, end];
  const convertTo = fieldType || 'alphanumeric';
  const name = camelCase(fieldName);

  return { id, name, range, convertTo };
}
