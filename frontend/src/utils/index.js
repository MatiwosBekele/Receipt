import { toWords } from 'number-to-words';

export function numberToWords(num) {
  // Convert string to a float if necessary
  const number = parseFloat(num);

  if (isNaN(number)) {
    throw new Error('Input is not a valid number');
  }

  // Ensure the number is formatted to two decimal places (for cents)
  const [integerPart, decimalPart] = number.toFixed(2).split('.');

  // Convert the integer part and decimal part to words
  const integerWords = toWords(integerPart);
  const decimalWords = toWords(decimalPart);

  // Capitalize the first letter of each word
  const result = `${integerWords} and ${decimalWords} cents only`;
  return capitalizeFirstLetter(result);
}
const capitalizeFirstLetter = (str) => {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
export function formatDateAndTime(dateString) {
  const dateObj = new Date(dateString);

  // Format the date
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // getMonth() is zero-based
  const year = dateObj.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  // Format the time
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  const formattedTime = `${hours}:${minutes}`;

  return { date: formattedDate, time: formattedTime };
}
export function convertDateFormat(dateString) {
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}
