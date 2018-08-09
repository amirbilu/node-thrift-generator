const path = require('path');
const Logger = require('./logger');
const handlebars = require('handlebars');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const fs = require('fs');
const glob = util.promisify(require('glob'));
const mkdirp = require('mkdirp');
handlebars.registerHelper('gen', function(languages) {
    return languages.map((lang) => `--gen ${lang}`).join(' ');
});


const defaults = {
    idl: "**/*.thrift",
    output: "./",
    executable: "thrift",
}

const thriftCli1 = handlebars.compile(`{{executable}} -v {{gen language}} -o {{output}} {{idl}}`);
const thriftCli2 = handlebars.compile(`{{executable}} -v --gen {{language}} -out {{output}} {{idl}}`);

module.exports = class {
    constructor(config) {
        const {executable, idl, output, generators, ignore, log} = {...defaults, ...config};
        this.defaults = {executable, idl, output};

        this.generators = generators;
        this.ignore = ignore;
        this.logger = Logger(log || 'info');
    }
    generate() {
        this.generators.forEach(async generator => {

            generator = {
                ...this.defaults,
                ...generator
            };

            mkdirp.sync(generator.output);

            const idls = await glob(generator.idl, {
                ignore: this.ignore
            });

            idls.forEach(async idl => {
                let command = "";
                if (Array.isArray(generator.language)) {
                    command = thriftCli1({...generator,
                        idl
                    });
                }
                else if (typeof generator.language == "string") {
                    command = thriftCli2({...generator,
                        idl
                    });
                }

                this.logger.debug(command);

                try{
                  const {
                      stdout,
                      stderror
                  } = await exec(command);

                    this.logger.debug(stdout);
                }
                catch(e){
                    this.logger.error("exception while trying to generate thrift files");
                    this.logger.debug(e);
                }
            });

        });
    }
}
