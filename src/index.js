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
    output: "./"
}

function mkdirIfNotExists(dir) {
    if (!fs.existsSync(dir))
        mkdirp.sync(dir);
}

const thriftCli1 = handlebars.compile(`thrift {{gen languages}} -o {{output}} {{idl}}`);
const thriftCli2 = handlebars.compile(`thrift --gen {{language}} -out {{output}} {{idl}}`);


module.exports = class {
    constructor(config) {
        this.config = config;
        this.logger = Logger(config.log || 'info');
    }
    generate() {
        this.config.generators.forEach(async generator => {
            generator = {...defaults,
                ...generator
            };
            mkdirIfNotExists(generator.output);

            const idls = await glob(generator.idl, {
                ignore: this.config.ignore
            });

            let command = "";
            idls.forEach(async idl => {
                if (generator.languages) {
                    command = thriftCli1({...generator,
                        idl
                    });
                }

                if (generator.language) {
                    command = thriftCli2({...generator,
                        idl
                    });
                }

                this.logger.debug(command);

                const {
                    stdout,
                    stderror
                } = await exec(command);

            });

        });
    }
}
