import { useState } from 'react';
import { DateTimePicker as DateTimePickerComponent } from '@/components/ui/date-time-picker';

interface DateTimePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
  className?: string;
}

export const DateTimePicker = ({ value, onChange, className }: DateTimePickerProps) => {

  const [date, setDate] = useState<Date | undefined>(value);

  const handleChange = (date: Date | undefined) => {
    console.log(date);
    setDate(date);
    onChange(date);
  };

  return <DateTimePickerComponent value={date} onChange={handleChange} className={className} />;
};