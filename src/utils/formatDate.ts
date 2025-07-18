import { format } from 'date-fns';

export function formateDate(timestamp: number) {
  const date = new Date(timestamp);
  return format(date, 'dd/MM/y HH:mm');
}
