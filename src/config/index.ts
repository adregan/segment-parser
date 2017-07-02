import validate from './validate';
import parse from './parse';

export interface Field {
  fieldId: number;
  fieldName: string;
  start: number;
  end: number;
  size: number;
}

export interface Config {
  fields: Field[];
  name: string;
  size: number;
}

export interface SegmentParserField {
  id: number;
  name: string;
  range: [number, number];
}

export interface SegmentParserConfig {
  fields: SegmentParserField[];
  name: string;
}

export { validate, parse };
