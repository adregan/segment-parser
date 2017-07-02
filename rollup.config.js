import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'dist/SegmentParser.js',
  format: 'cjs',
  plugins: [
    resolve({
      jsnext: true,
      main: true
    }),
    commonjs({
      include: 'node_modules/**'
    })
  ],
  dest: 'lib/index.js'
};
