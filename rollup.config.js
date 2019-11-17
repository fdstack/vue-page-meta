import { terser } from 'rollup-plugin-terser';
import copy from 'rollup-plugin-copy';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import alias from '@rollup/plugin-alias';
import buble from '@rollup/plugin-buble';
import replace from '@rollup/plugin-replace';
import generatePackageJson from 'rollup-plugin-generate-package-json'

const outDir = 'dist/';
const fileName = 'vue-page-meta';
const exportName = 'VuePageMeta';
const pkg = require('./package.json');

const basePlugins = [
  replace({ 'process.env.NODE_ENV': '"production"' }),
  commonjs(),
  alias({
    resolve: ['.jsx', '.js', '.ts', '.tsx', '.vue'],
  }),
  typescript({
    tsconfig: false,
    experimentalDecorators: true,
    module: 'es2015'
  }),
  buble(),
];

export default [
  {
    input: './src/vue-page-meta.ts',
    external: [
      'vue'
    ],
    output: [
      {
        format: 'esm',
        file: `${outDir}${fileName}.esm.js`,
        exports: 'named',
        name: exportName,
      },
      {
        format: 'cjs',
        file: `${outDir}${fileName}.cjs.js`,
        exports: 'named',
        name: exportName,
      },
    ],
    plugins: [
      ...basePlugins,
      generatePackageJson({
        baseContents: {
          'name': pkg.name,
          'version': pkg.version,
          'repository': pkg.repository,
          "license": "MIT",
          'main': `./${fileName}.cjs.js`,
          'module': `./${fileName}.esm.js`,
          'peerDependencies': {
            'vue': '^2.6.10',
            "vue-router": "^3.1.3"
          }
        }
      }),
      copy({
        targets: [
          { src: [ 'README.md', 'LICENSE' ], dest: 'dist' },
        ]
      }),
    ]
  },
  {
    input: './src/vue-page-meta.ts',
    external: [
      'vue',
    ],
    output: {
      format: 'iife',
      file: `${outDir}${fileName}.js`,
      exports: 'named',
      name: exportName,
      globals: {
        vue: 'Vue'
      }
    },
    plugins: [
      ...basePlugins,
      terser({
        ecma: 5
      })
    ]
  }
]
