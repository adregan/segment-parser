import {
  Config,
  SegmentParserConfig,
  Field,
  SegmentParserField
} from './index';

export default function parse(config: Config): SegmentParserConfig {
  const { name, fields: rawFields } = config;
  const fields = rawFields.map(parseField);

  return { fields, name };
}

export function parseField(field: Field): SegmentParserField {
  const { end, fieldId: id, fieldName: name, start } = field;
  const range: [number, number] = [start - 1, end - 1];

  return { id, name, range };
}
