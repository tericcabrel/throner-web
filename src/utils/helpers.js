import moment from 'moment';

export const parseResponseMessage = (message) => {
  const array = message.split(':::');

  try{
    const object = JSON.parse(array.length === 3 ? array[2] : array[0]);

    if(object.error || object.errorType) {
      return {
        error: true,
        message: object.error || object.errorType || object.toString()
      }
    }
  } catch (e) {
    console.log('Response Parsing Error Message => ', e.toString());
  }

  return {
    error: null,
    processId: array[1],
    data: JSON.parse(array[2]),
  }
};

export const readableHumanSize = (bytes, decimalPoint = 2) => {
  if (bytes === 0) {
    return '0 Byte';
  }

  const k = 1024,
    dm = decimalPoint || 2,
    sizes = ['Bytes', 'Ko', 'Mo', 'Go', 'To', 'Po', 'Eo', 'Zo', 'Yo'],
    i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const loadJS = (src) => {
  const ref = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
};

export const getDateDifference = (momentStart, momentEnd) => {
  const ms = momentEnd.diff(momentStart);
  return moment.duration(ms)
};

export const formatNumber = (number) => {
  return number < 10 ? `0${number}` : number
};

export const getDurationInSecond = (momentStart, momentEnd) => {
  const duration = getDateDifference(momentStart, momentEnd);
  const hoursInSecond = parseInt(duration.hours()) * 3600;
  const minutesInSecond = parseInt(duration.minutes()) * 60;
  const second = parseInt(duration.seconds());

  return hoursInSecond + minutesInSecond + second
};

export const durationToHumanReadable = (duration) => {
  const minutesInSecond = duration % 3600;
  const hours = (duration - minutesInSecond) / 3600;
  const seconds = minutesInSecond % 60;
  const minutes = (minutesInSecond - seconds) / 60;

  return `${hours > 0 ? formatNumber(hours) + 'h' : ''} ${minutes > 0 ? formatNumber(minutes) + 'min' : ''} ${seconds}s`;
};

export const round = (number, decimal = 2) => {
  const power = Math.pow(10, decimal);
  return Math.round(power * number) / power;
};

export const batteryVoltageToPercent = (voltage) => {
  const minVoltage = process.env.REACT_APP_VOLTAGE_MIN || 0;
  const maxVoltage = process.env.REACT_APP_VOLTAGE_MAX || 1;

  const maxVoltageInterval = maxVoltage - minVoltage;
  const currentVoltageInterval = maxVoltage - +voltage;
  const percent = 100 - (currentVoltageInterval / maxVoltageInterval) * 100;

  return round(percent, 0);
};
