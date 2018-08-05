const fs = require('fs');
const path = require('path');
const logger = require('./logger');

const packageJSON = path.join(process.cwd(), 'package.json');

module.exports = {};

if(fs.existsSync(packageJSON)){
  module.exports = require(packageJSON)["thrift-generator"] || {};
}
