import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import copy from 'rollup-plugin-copy';
import { minify } from 'html-minifier-terser';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

const packageNames = [
  'button',
];

const htmlCopyTransform = (contentsRaw) => {
  let contents = contentsRaw.toString();
  const out = minify(contents, {
    removeComments: true,
    collapseWhitespace: true,
    caseSenseitive: false,
    minifyCSS: true,
    minifyJS: true
  });

  return out;
};

const configs = [];
packageNames.forEach((name) => {
  const es5 = {
    input: `dev/${name}/index.js`,
    output: {
      file: `dist/dev/${name}/index.es5.js`,
      format: 'iife',
      sourcemap: false,
    },
    plugins: [
      commonjs(),
      resolve(),
      minifyHTML(),
      terser(),
      babel({
        presets: [['@babel/preset-env', { modules: false }]],
        plugins: ['@babel/plugin-transform-runtime'],
        babelHelpers: 'runtime'
      }),
    ],
  };

  const es6 = {
    input: `dev/${name}/index.js`,
    output: {
      dir: `dist/dev/${name}`,
      format: 'es',
      sourcemap: false
    },
    plugins: [
      resolve(),
      terser(),
      copy({
        targets: [
          {
            src: `dev/${name}/index.html`,
            dest: `dist/dev/${name}`,
            transform: htmlCopyTransform,
          }
        ]
      })
    ],
  };

  configs.push(es6);
  configs.push(es5);
});

export default [
  // {
  //   // index es6
  //   input: 'demos/index.js',
  //   output: {
  //     dir: 'dist/demos',
  //     format: 'es',
  //   },
  //   plugins: [
  //     resolve(),
  //     minifyHTML(),
  //     terser(),
  //     copy({
  //       targets: [
  //         {
  //           src: 'demos/index.html',
  //           dest: 'dist/demos',
  //           transform: htmlCopyTransform,
  //         },
  //       ],
  //     }),
  //   ],
  // },
  // {
  //   // demos index es5
  //   input: 'demos/index.js',
  //   output: {
  //     file: 'dist/demos/index.es5.js',
  //     format: 'iife',
  //     sourcemap: false,
  //   },
  //   plugins: [
  //     commonjs(),
  //     resolve(),
  //     minifyHTML(),
  //     terser(),
  //     babel({
  //       presets: [['@babel/preset-env', { modules: false }]],
  //       plugins: ['@babel/plugin-transform-runtime'],
  //       babelHelpers: 'runtime'
  //     }),
  //   ],
  // },
  ...configs,
];
