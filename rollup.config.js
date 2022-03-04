import typescript from 'rollup-plugin-typescript2'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'

export default [
  // ES Modules
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.es.js', format: 'es',
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          exclude: ["example/**"]
        }
      }),
      babel({ extensions: ['.ts'] }),
    ],
  },

  // UMD
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.min.js',
      format: 'umd',
      name: 'positions',
      indent: false,
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          exclude: ["example/**"]
        }
      }),
      babel({ extensions: ['.ts'], exclude: 'node_modules/**', exclude: 'example/**' }),
      terser(),
    ],
  },
]