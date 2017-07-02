import { Config, ParserConfig, Field, ParserField } from './index';

export default function parse(config: Config): ParserConfig {
  const { name, fields: rawFields } = config;
  const fields = rawFields.map(parseField);

  return { fields, name };
}

export function parseField(field: Field): ParserField {
  const {
    end,
    fieldId: id,
    fieldName: name,
    start,
    fieldType = 'string'
  } = field;
  const range: [number, number] = [start - 1, end - 1];

  return { id, name, range };
}
