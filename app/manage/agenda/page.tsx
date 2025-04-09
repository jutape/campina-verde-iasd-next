"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { DoorClosed } from "lucide-react";
import { cultoSchedule, monthNames, dayFullNames, EventItem, shareOnWhatsApp,  } from '../../schedule';
import EventFormDrawer, { eventQuestions } from "@/components/event-form-drawer";
import eventService from "@/services/event-service";
import YouTubeSearchDrawer from "@/components/youtube-search-drawer";
import { YouTubeVideo } from "@/services/youtube-service";
import CalendarNavigation from "@/components/calendar-navigation";
import EventCard from "@/components/event-card";
import { toast } from "@/hooks/use-toast";

function Calendar() {
    const searchParams = useSearchParams();
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [events, setEvents] = useState<EventItem[]>([]);
    const [activeQuestion, setActiveQuestion] = useState<keyof typeof eventQuestions | undefined>(undefined);
    const [initialInputValue, setInitialInputValue] = useState("");
    const [isNewEvent, setIsNewEvent] = useState(false);
    const mainContainerRef = useRef<HTMLDivElement>(null);
    const [isYouTubeSearchOpen, setIsYouTubeSearchOpen] = useState(false);
    const [currentHymnType, setCurrentHymnType] = useState<string>("");
    const [youtubeSearchTitle, setYoutubeSearchTitle] = useState("");
    const [youtubeSearchDescription, setYoutubeSearchDescription] = useState("");
    const [initialSecondaryValue, setInitialSecondaryValue] = useState("");

    // Handle date from URL parameter - fixed to prevent timezone issues
    useEffect(() => {
        const dateParam = searchParams.get('date');
        if (dateParam) {
            try {
                // Fix the timezone issue by parsing the date properly
                const [year, month, day] = dateParam.split('-').map(num => parseInt(num, 10));
                
                // Create date with local timezone (month is 0-indexed in JS Date)
                const paramDate = new Date(year, month - 1, day);
                
                // Check if date is valid
                if (!isNaN(paramDate.getTime())) {
                    setSelectedDate(paramDate);
                }
            } catch (e) {
                console.error("Invalid date parameter:", e);
            }
        }
        
        // Load events when component mounts
        loadEvents();
    }, [searchParams]);

    // Load events from API
    const loadEvents = async () => {
        try {
            const fetchedEvents = await eventService.getAllEvents();
            setEvents(fetchedEvents);
        } catch (error) {
            console.error("Error loading events:", error);
            toast({
                title: "Erro ao carregar eventos",
                description: "Não foi possível carregar os eventos. Tente novamente mais tarde.",
                variant: "destructive",
            });
        }
    };

    // Update local events state when event service changes
    const refreshEvents = async () => {
        const refreshedEvents = await eventService.getAllEvents();
        setEvents(refreshedEvents);
    };

    const getEventInformation = () => {
        const dateString = selectedDate.toISOString().split("T")[0];
        const event = events.find(event => event.date === dateString);
        return event ? [event] : [];
    }

    function getCultoDetailsByDay(weekDay: number): {
        startTime: string;
        endTime: string;
        description: string;
        serviceType?: any;
    } {
        return cultoSchedule[weekDay as keyof typeof cultoSchedule] || "Não há culto neste dia.";
    }

    // Handle form submission from the drawer with support for secondary values
    const handleFormSubmit = async (value: string, secondaryValue?: string) => {
        if (!activeQuestion) return;
        
        const dateString = selectedDate.toISOString().split("T")[0];
        const field = eventQuestions[activeQuestion].field;
        const secondaryField = eventQuestions[activeQuestion].secondaryField;
        
        // For musical messages, allow only specifying the performer
        const isMusicalMessage = field.toString().toLowerCase().includes('musicalmessage');
        if (isMusicalMessage && !value && !secondaryValue) {
            // If neither field is provided, do nothing
            handleDrawerClose();
            return;
        }
        
        try {
            if (isNewEvent) {
                // Creating a new event
                const newEvent: EventItem = { 
                    date: dateString,
                    prayer: field === 'prayer' ? (value || 'A confirmar') : 'A confirmar'
                };
                
                // Set the appropriate field if it's not prayer
                if (field !== 'prayer' && value) {
                    newEvent[field] = value;
                }
                
                // Set the secondary field if provided
                if (secondaryField && secondaryValue) {
                    newEvent[secondaryField] = secondaryValue;
                }
                
                const createdEvent = await eventService.createEvent(newEvent);
                if (createdEvent) {
                    refreshEvents();
                    toast({
                        title: "Evento criado",
                        description: "O evento foi criado com sucesso.",
                    });
                }
            } else {
                // Update existing event
                const updates: Partial<EventItem> = {};
                
                // Only include main field in updates if provided
                if (value || !isMusicalMessage) {
                    updates[field] = value;
                }
                
                // Include secondary field in updates if provided
                if (secondaryField && secondaryValue !== undefined) {
                    updates[secondaryField] = secondaryValue;
                }
                
                const updatedEvent = await eventService.updateEvent(dateString, updates);
                if (updatedEvent) {
                    refreshEvents();
                    toast({
                        title: "Evento atualizado",
                        description: "O evento foi atualizado com sucesso.",
                    });
                }
            }
        } catch (error) {
            console.error("Error saving event:", error);
            toast({
                title: "Erro ao salvar",
                description: "Não foi possível salvar as alterações. Tente novamente.",
                variant: "destructive",
            });
        }
        
        // Close the drawer and reset states
        handleDrawerClose();
    };

    const handleDrawerClose = () => {
        // Focus the main container before closing the drawer
        if (mainContainerRef.current) {
            mainContainerRef.current.focus();
        }
        
        // Wait a moment before updating state to allow focus to settle
        setTimeout(() => {
            setIsDrawerOpen(false);
            setActiveQuestion(undefined);
            setInitialInputValue("");
            setInitialSecondaryValue("");
            setIsNewEvent(false);
        }, 50);
    };

    const handleSelectOption = (option: keyof typeof eventQuestions) => {
        const currentEvents = getEventInformation();
        
        // Make sure we have events
        if (currentEvents.length === 0) return;
        
        const event = currentEvents[0];
        const field = eventQuestions[option].field;
        const secondaryField = eventQuestions[option].secondaryField;
        
        const currentValue = event[field] || "";
        const currentSecondaryValue = secondaryField ? event[secondaryField] || "" : "";
        
        setActiveQuestion(option);
        setIsNewEvent(false);
        setInitialInputValue(currentValue);
        setInitialSecondaryValue(currentSecondaryValue);
        setIsDrawerOpen(true);
    };

    const startNewEvent = () => {
        setActiveQuestion('begin');
        setInitialInputValue("");
        setIsNewEvent(true);
        setIsDrawerOpen(true);
    };

    const handleOpenYouTubeSearch = (type: keyof typeof eventQuestions) => {
        const question = eventQuestions[type];
        const fieldName = question.field as string;
        setCurrentHymnType(fieldName);
        setYoutubeSearchTitle(`Buscar ${question.title}`);
        setYoutubeSearchDescription(question.description);
        setIsYouTubeSearchOpen(true);
    };

    const handleSelectYouTubeVideo = async (video: YouTubeVideo) => {
        const dateString = selectedDate.toISOString().split("T")[0];
        const currentEvents = getEventInformation();
        
        if (currentEvents.length === 0) {
            const newEvent: EventItem = {
                date: dateString,
                prayer: 'A confirmar'
            };
            
            newEvent[currentHymnType] = video.title;
            newEvent[`${currentHymnType}Url`] = video.url;
            
            const createdEvent = await eventService.createEvent(newEvent);
            if (createdEvent) {
                refreshEvents();
                
                // If this is a musical message, open the form to add the performer name
                if (currentHymnType.includes("MusicalMessage")) {
                    const questionKey = Object.keys(eventQuestions).find(
                        (key) => eventQuestions[key as keyof typeof eventQuestions].field === currentHymnType
                    ) as keyof typeof eventQuestions;
                    
                    if (questionKey) {
                        setTimeout(() => {
                            handleSelectOption(questionKey);
                        }, 100);
                    }
                }
            }
        } else {
            const updatedEvent = await eventService.updateEvent(dateString, {
                [currentHymnType]: video.title,
                [`${currentHymnType}Url`]: video.url
            });
            if (updatedEvent) {
                refreshEvents();
                
                // If this is a musical message, open the form to add the performer name
                if (currentHymnType.includes("MusicalMessage")) {
                    const questionKey = Object.keys(eventQuestions).find(
                        (key) => eventQuestions[key as keyof typeof eventQuestions].field === currentHymnType
                    ) as keyof typeof eventQuestions;
                    
                    if (questionKey) {
                        setTimeout(() => {
                            handleSelectOption(questionKey);
                        }, 100);
                    }
                }
            }
        }
    };

    const handleShareEvent = (event: EventItem) => {
        shareOnWhatsApp(event, selectedDate);
    };

    return (
        <TooltipProvider>
            <div 
                ref={mainContainerRef} 
                tabIndex={-1} 
                className="outline-none min-h-screen"
            >
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
                            getEventInformation().length ? getEventInformation().map((event) => (
                                <EventCard
                                    key={event.date}
                                    event={event}
                                    serviceTime={getCultoDetailsByDay(selectedDate.getDay())}
                                    onShare={() => handleShareEvent(event)}
                                    onEdit={handleSelectOption}
                                    onYouTubeSearch={handleOpenYouTubeSearch}
                                    isAdmin={true}
                                    date={selectedDate} // Make sure this date is being passed correctly
                                />
                            )) :
                            <div className="flex flex-col items-center gap-1 p-5 text-center">
                                <DoorClosed size={52} />
                                <h1 className="text-2xl font-semibold leading-none tracking-tight">Fechado!</h1>
                                <p>Infelizmente ainda não temos informações sobre esse dia ou não haverá culto.</p>
                                <Button onClick={startNewEvent}>Iniciar evento</Button>
                            </div>
                        }
                    </div>
                </div>

                <EventFormDrawer 
                    isOpen={isDrawerOpen}
                    onClose={handleDrawerClose}
                    onSubmit={handleFormSubmit}
                    activeQuestion={activeQuestion ? eventQuestions[activeQuestion] : undefined}
                    initialValue={initialInputValue}
                    initialSecondaryValue={initialSecondaryValue}
                />

                <YouTubeSearchDrawer
                    isOpen={isYouTubeSearchOpen}
                    onClose={() => setIsYouTubeSearchOpen(false)}
                    onSelect={handleSelectYouTubeVideo}
                    title={youtubeSearchTitle}
                    description={youtubeSearchDescription}
                />
            </div>
        </TooltipProvider>
    );
}

export default Calendar;
