const moment = require('moment-timezone');
const yargs = require('yargs');

moment.tz.setDefault('America/New_York');

const targetTimezone = yargs.argv._[0];
const params = yargs.argv;
const validTimezones = moment.tz.names();

if (!targetTimezone) {
  console.log('Usage: node < script - file > <timezone>');
  process.exit(1);
} else if (validTimezones.includes(targetTimezone) === false) {
  console.log('Please enter a valid time zone');
  process.exit(2);
} else {
  const time = moment().tz(targetTimezone);
  let formattedTime;

  // Checking for format flag
  if (params.format) {
    formattedTime = time.format('dddd, MMMM Do YYYY, h:mm:ss a');
  } else {
    formattedTime = time.format();
  }

  console.log(`The time at ${targetTimezone} is ${formattedTime}`);
}
