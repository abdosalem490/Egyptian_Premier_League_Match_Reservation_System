module.exports.formatDate = (date) => {
  return (date.getDate() < 10 ? '0' : '') + date.getDate() + '/' + ((date.getMonth() + 1) < 10 ? '0' : '')
    + (date.getMonth() + 1) + '/' + date.getFullYear()
}

module.exports.formatTime = (date) => {
  let hours = date.getHours();
  let AmPm = hours >= 12 ? 'PM' : 'AM';
  hours %= 12;
  return (hours < 10 ? '0' : '') + hours + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + ' ' + AmPm;
}