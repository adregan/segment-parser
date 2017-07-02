import validate from './validate';
import parse from './parse';

export interface Field {
  field: number;
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

export { validate, parse };
