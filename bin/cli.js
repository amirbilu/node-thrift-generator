#!/usr/bin/env node
const Generator = require('../src');
const logger = require('../src/logger');
const argv = require('optimist').argv;
const path = require('path');

let config = {};
try{
  config = require(path.resolve(argv.config || 'package.json'))['thrift-generator'];
}
catch(e){
  console.error("no config file provided, or config file is corrutpted")
  process.exit(1);
}

new Generator(config).generate();
