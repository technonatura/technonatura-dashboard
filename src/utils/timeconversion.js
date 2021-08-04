module.exports.monthConversion = (moonInNum) => {
  switch (moonInNum) {
    case 0:
      return "Jan";
    case 1:
      return "Feb";
    case 2:
      return "March";
    case 3:
      return "Apr";
    case 4:
      return "May";
    case 5:
      return "Jun";
    case 6:
      return "Jul";
    case 7:
      return "Aug";
    case 8:
      return "Sep";
    case 9:
      return "Oct";
    case 10:
      return "Nov";
    case 11:
      return "Dec";
    default:
      return "Jan";
  }
};

module.exports.dayConversion = (day) => {
  switch (day) {
    case 0:
      return "Sun";
    case 1:
      return "Mon";
    case 2:
      return "Tue";
    case 3:
      return "Wed";
    case 4:
      return "Thu";
    case 5:
      return "Fri";
    case 6:
      return "Sat";
    default:
      return "Sun";
  }
};

module.exports.timeConversion = (time) => {
  const timeString = time.toString();

  if (timeString.length === 1) {
    return `0${timeString}`;
  }

  return timeString;
};
