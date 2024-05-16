const moment = require("moment-timezone");

function isValidDate(dateString, format) {
  if (!dateString) {
    return false;
  }
  return moment(dateString, format, true).isValid();
}

function sortDates(startDate, endDate) {
  console.log(`startDate, endDate =============================`, startDate, endDate);
  const date1 = new Date(startDate);
  const date2 = new Date(endDate);

  if (date1.getTime() <= date2.getTime()) {
    return { $gte: date1.toISOString().slice(0, 10), $lte: date2.toISOString().slice(0, 10) };
  } else {
    return { $lte: date1.toISOString().slice(0, 10), $gte: date2.toISOString().slice(0, 10) };
  }
}
module.exports = { isValidDate, sortDates };
// [date2.toISOString().slice(0, 10), date1.toISOString().slice(0, 10)];
