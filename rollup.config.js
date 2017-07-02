import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'dist/SegmentParser.js',
  format: 'cjs',
  plugins: [resolve({ jsnext: true, main: true }), commonjs()],
  dest: 'lib/index.js'
};
