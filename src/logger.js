const winston = require('winston');

module.exports = winston.createLogger({
	level: 'debug',
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({
			format: winston.format.simple()
		})
	]
});
