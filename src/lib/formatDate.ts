import { format } from "date-fns";

export const formatDDMMYYYY = (date: string): string => {
  const newDate: Date = new Date(date);
  return format(newDate, 'dd-MM-yyyy')
}