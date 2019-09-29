const addZero = d => {
  if (d < 10) d = '0' + 1;
  return d;
}
export const getHoursMinutesSeconds = () => {
  let d = new Date();
  let hours = addZero(d.getHours())
  let minutes = addZero(d.getMinutes())
  let seconds = addZero(d.getSeconds())
  return `${hours}:${minutes}:${seconds}`;
}

// Recebe um número, deixa com duas casas decimais e muda o ponto para vírgula
export const replaceDotWithComma = (number) => {
  return number.toFixed(2).replace(".", ",");
}