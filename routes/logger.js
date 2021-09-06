var winston = require('winston');
var winstonDaily = require('winston-daily-rotate-file');
var moment = require('moment'); //날짜 format 처리 관련 모듈

function timeStampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS');
};
function _customFormatter(options) {
    return options.timestamp() +
            ' ['+ options.level.toUpperCase() + ']' +
            '['+ options.meta.loggerName + '] ' +
            (!options.meta.clientMessage ? options.message : options.meta.clientMessage);
}

let logger = new winston.createLogger({
    transports: [
        new (winstonDaily)({
            name: 'info-file',
            filename: './log/server',
            datePattern: '_YYYY-MM-DD',
            //colorize: false,
            //maxsize: 50000000,
            //maxFiles: 1000,
            zippedArchive: true, // 압축여부
            level: 'info',// 최소 레벨
                          // emerg: 0,
                          // alert: 1,
                          // crit: 2,
                          // error: 3,
                          // warning: 4,
                          // notice: 5,
                          // info: 6,
                          // debug: 7
            showLevel: true,
            //json: false,
            timestamp: timeStampFormat,
            format				:	winston.format.printf(
				          info				=>	`${moment().format("YYYY-MM-DD HH:mm:ss")} [${info.level.toUpperCase()}] - ${info.message}`
			       )
        }),
        new (winston.transports.Console)({
            name: 'debug-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            timestamp: timeStampFormat,
            format				:	winston.format.printf(
				          info				=>	`${moment().format("YYYY-MM-DD HH:mm:ss")} [${info.level.toUpperCase()}] - ${info.message}`
			       )
        })
    ],
    exceptionHandlers: [
        new (winstonDaily)({
            name: 'exception-file',
            filename: './log/exception',
            datePattern: '_YYYY-MM-DD',
            colorize: false,
            maxsize: 50000000,
            maxFiles: 1000,
            level: 'error',
            showLevel: true,
            zippedArchive: true, // 압축여부
            timestamp: timeStampFormat,
            format				:	winston.format.printf(
				          info				=>	`${moment().format("YYYY-MM-DD HH:mm:ss")} [${info.level.toUpperCase()}] - ${info.message}`
			       )
        }),
        new (winston.transports.Console)({
            name: 'exception-console',
            colorize: true,
            level: 'debug',
            showLevel: true,
            timestamp: timeStampFormat,
            format				:	winston.format.printf(
				          info				=>	`${moment().format("YYYY-MM-DD HH:mm:ss")} [${info.level.toUpperCase()}] - ${info.message}`
			       )
        })
    ]
});
module.exports = logger;
