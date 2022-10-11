const moment = require('moment-timezone');
const yargs = require('yargs');

moment.tz.setDefault('America/New_York');

const command = yargs.argv._[0];
const params = yargs.argv;
const validTimezones = moment.tz.names();
const countries = moment.tz.countries();

if (!command) {
  if (params.all) { // For extra credit(display all time zones)
    console.table(validTimezones);
  } else if (params.country) { // For extra credit(display time zones for specified country code)
    if (countries.includes(params.country.toUpperCase())) {
      console.table(moment.tz.zonesForCountry(params.country));
    } else {
      console.log('Usage: node tz [--country] <country code>');
      process.exit(3);
    }
  } else {
    console.log('Usage: node tz <timezone> [--format]');
    process.exit(1);
  }
} else if (validTimezones.includes(command) === false) { // For extra credit(Error checking)
  console.log('Usage: node tz <timezone> [--format]');
  process.exit(2);
} else {
  const time = moment().tz(command);
  let formattedTime;

  // Checking for format flag
  if (params.format) {
    formattedTime = time.format('dddd, MMMM Do YYYY, h:mm:ss a');
  } else {
    formattedTime = time.format();
  }

  console.log(`The time at ${command} is ${formattedTime}`);
}
