const winston = require('winston');

module.exports = (level) => winston.createLogger({
	level: level,
	format: winston.format.json(),
	transports: [
		new winston.transports.Console({
			format: winston.format.simple()
		})
	]
});
