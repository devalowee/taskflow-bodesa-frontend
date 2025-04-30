import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDDMMYYYY = (date: string): string => {
  const newDate: Date = new Date(date);
  return format(newDate, 'dd-MM-yyyy')
}

export const formatForTooltip = (date: string): string => {
  const newDate: Date = new Date(date);
  return format(newDate, 'MMM dd, hh:mm a', { locale: es })
}
