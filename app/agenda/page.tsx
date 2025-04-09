"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DoorClosed } from "lucide-react";
import { cultoSchedule, monthNames, dayFullNames, shareOnWhatsApp, EventItem } from '../schedule';
import CalendarNavigation from "@/components/calendar-navigation";
import EventCard from "@/components/event-card";
import EventService from "@/services/event-service"; // Import EventService

function Calendar() {
    const searchParams = useSearchParams();
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [events, setEvents] = useState<EventItem[]>([]);

    // Fetch events and handle date from URL parameter
    useEffect(() => {
        const fetchEventsAndHandleDate = async () => {
            try {
                // Fetch events
                const fetchedEvents = await EventService.fetchEvents();
                setEvents(Array.isArray(fetchedEvents) ? fetchedEvents : []);
            } catch (error) {
                console.error("Error fetching events:", error);
                setEvents([]);
            }

            // Handle date from URL parameter
            const dateParam = searchParams.get('date');
            if (dateParam) {
                try {
                    const [year, month, day] = dateParam.split('-').map(num => parseInt(num, 10));
                    const paramDate = new Date(year, month - 1, day);
                    if (!isNaN(paramDate.getTime())) {
                        setSelectedDate(paramDate);
                    }
                } catch (e) {
                    console.error("Invalid date parameter:", e);
                }
            }
        };

        fetchEventsAndHandleDate();
    }, [searchParams]);

    const getEventInformation = () => {
        return events.filter((d) => d.date === selectedDate.toISOString().split("T")[0]);
    };

    function getCultoDetailsByDay(weekDay: number): {
        startTime: string;
        endTime: string;
        description: string;
        serviceType?: any;
    } {
        return cultoSchedule[weekDay as keyof typeof cultoSchedule] || "Não há culto neste dia.";
    }

    const handleShareEvent = (event: EventItem) => {
        shareOnWhatsApp(event, selectedDate);
    };

    return (
        <TooltipProvider>
            <div className="outline-none">
                <CalendarNavigation 
                    currentDate={selectedDate}
                    onDateChange={setSelectedDate}
                    events={events}
                />
                
                <div className="p-5">
                    <div className="flex justify-between items-end mb-2">
                        <div>
                            <h2 className="text-base sm:text-lg font-semibold">{dayFullNames[selectedDate.getDay()]}</h2>
                            <h1 className="text-4xl font-bold">{selectedDate.getDate()} de {monthNames[selectedDate.getMonth()]}</h1>
                        </div>
                    </div>
                    <div className="mt-1">
                        {
                            getEventInformation().length ? getEventInformation().map((event, idx) => (
                                <EventCard
                                    key={idx}
                                    event={event}
                                    serviceTime={getCultoDetailsByDay(selectedDate.getDay())}
                                    onShare={() => handleShareEvent(event)}
                                    isAdmin={false}
                                    date={selectedDate}
                                />
                            )) :
                            <div className="flex flex-col items-center gap-1 p-5 text-center">
                                <DoorClosed size={52} />
                                <h1 className="text-2xl font-semibold leading-none tracking-tight">Fechado!</h1>
                                <p>Infelizmente ainda não temos informações sobre esse dia ou não haverá culto.</p>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </TooltipProvider>
    );
}

export default Calendar;
