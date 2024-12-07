"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import {
  TooltipProvider,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Book, ChevronLeft, ChevronRight, Church } from "lucide-react";

// Dados do JSON
const data = {
  dates: [
    { date: "2024-10-30", prayer: "Leitura Grande Conflito" },
    { date: "2024-11-02", prayer: "Geraldo Russ" },
    { date: "2024-11-03", prayer: "Alexandre" },
    { date: "2024-11-06", prayer: "Leitura Grande Conflito" },
    { date: "2024-11-09", prayer: "Moisés" },
    { date: "2024-11-10", prayer: "Luiz Rodrigues" },
    { date: "2024-11-13", prayer: "Pr. Jonas" },
    { date: "2024-11-16", prayer: "Francisco" },
    { date: "2024-11-17", prayer: "Cicero" },
    { date: "2024-11-20", prayer: "Pr. Jonas" },
    { date: "2024-11-23", prayer: "João Pedro" },
    { date: "2024-11-24", prayer: "Jorge" },
    { date: "2024-11-27", prayer: "Gabriela" },
    { date: "2024-11-29", prayer: "José Carlos" },
    { date: "2024-11-30", prayer: "João Pedro" },
    { date: "2024-12-01", prayer: "Jorge" },
    { date: "2024-12-04", prayer: "Leitura Grande Conflito" },
    { date: "2024-12-07", prayer: "Alexandre" },
    { date: "2024-12-08", prayer: "João Pedro" },
    { date: "2024-12-11", prayer: "Leitura Grande Conflito" },
    { date: "2024-12-14", prayer: "João Pedro" },
    { date: "2024-12-18", prayer: "Leitura Grande Conflito" },
    { date: "2024-12-21", prayer: "Jorge" },
    { date: "2024-12-25", prayer: "Leitura Grande Conflito" },
    { date: "2025-01-11", prayer: "Semana das primicias" },
    { date: "2025-01-25", prayer: "Semana das primicias" },
    { date: "2025-01-26", prayer: "Semana das primicias" },
    { date: "2025-01-29", prayer: "Semana das primicias" },
    { date: "2025-01-31", prayer: "Semana das primicias" },
    { date: "2025-02-01", prayer: "Semana das primicias" },
    { date: "2025-02-02", prayer: "Semana das primicias" },
    { date: "2025-02-08", prayer: "Samuel" },
  ],
};

const cultoSchedule: any = {
  0: { // Domingo
    dayName: "Domingo",
    startTime: "19:00",
    endTime: "20:00",
  },
  3: { // Quarta-feira
    dayName: "Quarta-feira",
    startTime: "19:30",
    endTime: "20:30",
  },
  5: { // Sexta-feira
    dayName: "Sexta-feira",
    startTime: "19:00",
    endTime: "20:00",
  },
  6: { // Sábado
    dayName: "Sábado",
    startTime: "09:00",
    endTime: "12:00",
  }
};

function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
  date.setDate(date.getDate() - date.getDay()); // Começa no domingo

  while (date <= lastDayOfMonth || date.getDay() !== 0) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const dateString = date.toISOString().split("T")[0];
      const event = data.dates.find((d) => d.date === dateString);
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

  const getEventInformation = () => {
    console.log(data.dates)
    return data.dates.filter((d) => d.date === selectedDate.toISOString().split("T")[0])
  }

  function getCultoDetailsByDay(weekDay: any) {
    return cultoSchedule[weekDay] || { description: "Não há culto neste dia." };
  }

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const dayFullNames = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];

  return (
    <TooltipProvider>
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
                        date.getTime() === selectedDate.getTime() && "bg-black text-white dark:bg-white dark:text-black font-bold"
                      )}
                      onClick={() => setSelectedDate(date)}
                    >
                      <div className="text-center text-xs sm:text-base">
                        {date.getDate()}
                      </div>
                      {/* {event && (
                            <div className="text-[10px] sm:text-xs text-center mt-1">
                              <Badge variant="secondary">{event.name}</Badge>
                            </div>
                          )} */}
                    </div>

                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <h2 className="text-base sm:text-lg font-semibold">{dayFullNames[selectedDate.getDay()]}</h2>
        <h1 className="text-4xl font-bold">{selectedDate.getDate()} de {monthNames[selectedDate.getMonth()]}</h1>
        <div className="mt-1">
          {
            getEventInformation().length ? getEventInformation()
              .map((event, idx) =>
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="flex gap-1"><Church size={24} /> Culto</CardTitle>
                    <CardDescription>{getCultoDetailsByDay(selectedDate.getDay()).startTime} - {getCultoDetailsByDay(selectedDate.getDay()).endTime}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="flex"><Book size={20}/> <b>Orador(a):</b>&nbsp;{event.prayer}</p>
                  </CardContent>
                </Card>
              ) : <div className="flex flex-col items-center gap-1 p-5 text-center">
              <Church size={52} />
              <h1 className="text-2xl font-semibold leading-none tracking-tight">Fechado!</h1>
              <p>Infelizmente ainda não temos informações sobre esse dia ou não haverá culto.</p>
            </div>
          }
        </div>
      </div>
    </TooltipProvider>
  );
}

export default Calendar;
