#!/usr/bin/env node

const path = require('path');
const logger = require('./logger');
const handlebars = require('handlebars');
const util = require('util');
const exec  = util.promisify(require('child_process').exec);
const fs = require('fs');
const glob = util.promisify(require('glob'));
const config = require('./config');
const mkdirp = require('mkdirp');
handlebars.registerHelper('gen', function(languages) {
  return languages.map((lang)=>`--gen ${lang}`).join(' ');
});

if(typeof config.generators != "object"){
  logger.debug("no generators found. nothing to do");
  process.exit(0);
}

const defaults = {
  idl: "**/*.thrift",
  output: "./"
}

function mkdirIfNotExists(dir){
  if (!fs.existsSync(dir))
    mkdirp.sync(dir);
}

const thriftCli1 = handlebars.compile(`thrift {{gen languages}} -o {{output}} {{idl}}`);
const thriftCli2 = handlebars.compile(`thrift --gen {{language}} -out {{output}} {{idl}}`);

config.generators.forEach(async generator=>{
  generator = {...defaults, ...generator};
  mkdirIfNotExists(generator.output);

  const idls = await glob(generator.idl, {ignore: config.ignore});
  idls.forEach(async idl => {
    if(generator.languages){
      command = thriftCli1({...generator, idl});
    }

    if(generator.language){
      command = thriftCli2({...generator, idl});
    }

    logger.debug(command);
    const {stdout, stderror}  = await exec(command);

  });

});
