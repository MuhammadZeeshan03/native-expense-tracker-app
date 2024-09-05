export function getFormattedDate(date: Date) {

  const isValidDate = date.toString() !== 'Invalid Date';

  if (!isValidDate) {
    return '';
  }

  return date.toISOString().slice(0, 10);
}

export function getDateMinusDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), (date.getDate() - days));
}