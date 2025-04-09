"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { dayNames, monthNames } from "@/app/schedule";

interface CalendarNavigationProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  events?: Array<{ date: string; [key: string]: any }>;
}

export default function CalendarNavigation({
  currentDate,
  onDateChange,
  events = [],
}: CalendarNavigationProps) {
  const [currentMonth, setCurrentMonth] = useState<Date>(
    new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  );

  // Update currentMonth when currentDate changes externally
  useEffect(() => {
    setCurrentMonth(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1));
  }, [currentDate]);

  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  );
  
  const lastDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  );
  
  const weeks = [];

  const date = new Date(firstDayOfMonth);
  date.setDate(date.getDate() - date.getDay()); // Start on Sunday

  while (date <= lastDayOfMonth || date.getDay() !== 0) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const dateString = date.toISOString().split("T")[0];
      const event = events.find((d) => d.date === dateString);
      week.push({
        date: new Date(date),
        event,
      });
      date.setDate(date.getDate() + 1);
    }
    weeks.push(week);
  }

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  return (
    <div className="p-2 sm:p-4">
      <div>
        <div className="flex justify-between items-center">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-base sm:text-lg font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h1>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div>
        <div className="overflow-x-auto mt-6">
          <div className="grid grid-cols-7 gap-1 sm:gap-2 justify-items-center">
            {dayNames.map((day) => (
              <div
                key={day}
                className="text-center font-semibold text-xs sm:text-sm"
              >
                {day}
              </div>
            ))}
            {weeks.map((week, idx) => (
              <React.Fragment key={idx}>
                {week.map(({ date, event }, idx2) => (
                  <div
                    key={idx2}
                    className={cn(
                      "rounded-full w-8 h-8 flex justify-center items-center transition-all ease-linear",
                      date.getMonth() !== currentMonth.getMonth() &&
                      "text-gray-400",
                      event && "bg-blue-200 dark:bg-green-100 text-black font-bold",
                      date.getTime() === currentDate.getTime() && "bg-black text-white dark:bg-white dark:text-black font-bold"
                    )}
                    onClick={() => onDateChange(date)}
                  >
                    <div className="text-center text-xs sm:text-base">
                      {date.getDate()}
                    </div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
