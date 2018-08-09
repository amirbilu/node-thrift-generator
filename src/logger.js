const winston = require('winston');
const colors = require('colors');

const format = winston.format.combine(
	winston.format.label(
		{
			label: colors.green('[thrift-generator]')
		}
	),
  winston.format.colorize(),
	winston.format.printf(info => `${info.level} ${info.label} ${info.message}`)
);

module.exports = (level) => winston.createLogger({
	level: level,
	format: format,
	transports: [
		new winston.transports.Console()
	]
});
