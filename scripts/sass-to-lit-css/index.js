#!/usr/bin/env node

const path = require('path');
const commandLineArgs = require('command-line-args');
const sassRender = require('./compile.js').sassRender;

const options = [
    {
        name: 'source',
        alias: 's',
        type: String,
        multiple: true,
        defaultOption: true,
    },
];

const { source } = commandLineArgs(options);

if (!source) {
    console.error('Must provide a source file!');
    process.exit(-1);
}

const template = path.resolve(process.argv[1], '../template.tmpl');

for (const sourceFile of source) {
    const output = sourceFile.replace(/\.scss$/, '.css.ts');
    sassRender(sourceFile, template, output).catch((err) => {
        console.error(err);
        process.exit(-1);
    });
}
