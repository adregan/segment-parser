import validate from './validate';
import parse from './parse';

type FieldType = 'alphanumeric' | 'numeric' | 'date';
export type ConversionType = FieldType;

export interface Field {
  fieldId: number;
  fieldName: string;
  start: number;
  end: number;
  size: number;
  fieldType?: FieldType;
}

export interface Config {
  fields: Field[];
  name: string;
  size: number;
}

export interface ParserField {
  id: number;
  name: string;
  range: [number, number];
  convertTo: FieldType;
}

export interface ParserConfig {
  fields: ParserField[];
  name: string;
  size: number;
}

export { validate, parse as parseConfig };
