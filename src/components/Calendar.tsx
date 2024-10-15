import React from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';

export const Calendar = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Calendar</h2>
      <CalendarComponent
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  );
};