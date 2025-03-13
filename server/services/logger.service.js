const fs = require('fs');

const logsDir = './logs';

if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

function getTime() {
  let now = new Date();
  return now.toUTCString();
}

function doLog(line, level = 'Debug') {
  line = `${getTime()} - ${level} - ${line}  \n`;
  fs.appendFileSync('./logs/backend.log', line);
}

module.exports = {
  debug(line) {
    doLog(line, 'Debug');
  },
  info(line) {
    doLog(line, 'Info');
  },
  warm(line) {
    doLog(line, 'Warm');
  },
  error(line) {
    doLog(line, 'Error');
  },
};
