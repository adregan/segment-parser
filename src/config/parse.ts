import { camelCase } from 'lodash';
import { Config, ParserConfig, Field, ParserField } from './index';

export default function parse(config: Config): ParserConfig {
  const { name: rawName, fields: rawFields } = config;
  const fields = rawFields.map(parseField);
  const name = camelCase(rawName);

  return { fields, name };
}

export function parseField(field: Field): ParserField {
  const { end, fieldId: id, fieldName, start, fieldType } = field;
  const range: [number, number] = [start - 1, end];
  const convertTo = fieldType || 'alphanumeric';
  const name = camelCase(fieldName);

  return { id, name, range, convertTo };
}
