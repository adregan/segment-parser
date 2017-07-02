import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'dist/SegmentParser.js',
  format: 'iife',
  moduleName: 'SegmentParser',
  plugins: [resolve({ jsnext: true, main: true }), commonjs()],
  dest: 'lib/browser.js'
};
