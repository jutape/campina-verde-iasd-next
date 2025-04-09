import { Book, Church, Music } from "lucide-react";
import { 
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardDescription 
} from "@/components/ui/card";
import { EventItem } from "@/app/schedule";
import EventOptions from "./event-options";
import { eventQuestions } from "./event-form-drawer";

interface EventCardProps {
    event: EventItem;
    serviceTime: { startTime: string; endTime: string; };
    onShare: () => void;
    onEdit?: (questionKey: keyof typeof eventQuestions) => void;
    onYouTubeSearch?: (questionKey: keyof typeof eventQuestions) => void;
    isAdmin?: boolean;
    date?: Date;
}

export default function EventCard({
    event,
    serviceTime,
    onShare,
    onEdit,
    onYouTubeSearch,
    isAdmin = false,
    date
}: EventCardProps) {
    // Debug to verify date is received correctly
    console.log("EventCard received date:", date);
    
    const isSaturday = date && date.getDay() === 6;
    
    // Helper function to render musical message sections
    const renderMusicalMessage = (title: string, messageName?: string, messageUrl?: string, performer?: string) => {
        if (!messageName && !performer) return null;
        
        return (
            <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                    <Music size={20} className="mr-2" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-medium">{title}:</p>
                    {messageName && messageUrl ? (
                        <a 
                            href={messageUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline break-words"
                        >
                            {messageName}
                        </a>
                    ) : messageName ? (
                        <p className="text-sm break-words">{messageName}</p>
                    ) : null}
                    
                    {performer && (
                        <p className="text-xs text-gray-600 mt-1">
                            {messageName ? "Por: " : ""}{performer}
                        </p>
                    )}
                </div>
            </div>
        );
    };
    
    return (
        <Card className="mb-4">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="flex gap-1"><Church size={24} /> Culto</CardTitle>
                    <CardDescription>{serviceTime.startTime} - {serviceTime.endTime}</CardDescription>
                </div>
                <EventOptions 
                    event={event} 
                    onShare={onShare}
                    onEdit={onEdit}
                    onYouTubeSearch={onYouTubeSearch}
                    isAdmin={isAdmin}
                    date={date} // Make sure the date is being passed
                />
            </CardHeader>
            <CardContent>
                {isSaturday ? (
                    <div>
                        <h3 className="font-semibold mb-3">Escola Sabatina</h3>
                        <div className="space-y-2 ml-4 mb-6">
                            {/* Sabbath School fields */}
                            {event.sabbathSchoolHymn && (
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <Music size={20} className="mr-2" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium">Hino da revista:</p>
                                        {event.sabbathSchoolHymnUrl ? (
                                            <a 
                                                href={event.sabbathSchoolHymnUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:underline break-words"
                                            >
                                                {event.sabbathSchoolHymn}
                                            </a>
                                        ) : (
                                            <p className="text-sm break-words">{event.sabbathSchoolHymn}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {event.sabbathSchoolAdultTeacher && (
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <Book size={20} className="mr-2" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium">Professor(a) - Adultos:</p>
                                        <p className="text-sm break-words">{event.sabbathSchoolAdultTeacher}</p>
                                    </div>
                                </div>
                            )}
                            
                            {event.sabbathSchoolYouthTeacher && (
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <Book size={20} className="mr-2" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium">Professor(a) - Jovens:</p>
                                        <p className="text-sm break-words">{event.sabbathSchoolYouthTeacher}</p>
                                    </div>
                                </div>
                            )}
                            
                            {renderMusicalMessage(
                                "Mensagem musical", 
                                event.sabbathSchoolMusicalMessage,
                                event.sabbathSchoolMusicalMessageUrl,
                                event.sabbathSchoolMusicalMessagePerformer
                            )}
                        </div>

                        <h3 className="font-semibold mb-3">Culto Divino</h3>
                        <div className="space-y-2 ml-4">
                            {/* Divine Service fields */}
                            {event.divineServiceHymn && (
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <Music size={20} className="mr-2" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium">Hino inicial:</p>
                                        {event.divineServiceHymnUrl ? (
                                            <a 
                                                href={event.divineServiceHymnUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:underline break-words"
                                            >
                                                {event.divineServiceHymn}
                                            </a>
                                        ) : (
                                            <p className="text-sm break-words">{event.divineServiceHymn}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {event.preacherHymn && (
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <Music size={20} className="mr-2" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium">Hino do pregador:</p>
                                        {event.preacherHymnUrl ? (
                                            <a 
                                                href={event.preacherHymnUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:underline break-words"
                                            >
                                                {event.preacherHymn}
                                            </a>
                                        ) : (
                                            <p className="text-sm break-words">{event.preacherHymn}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                            
                            {renderMusicalMessage(
                                "Mensagem musical inicial", 
                                event.divineServiceInitialMusicalMessage,
                                event.divineServiceInitialMusicalMessageUrl,
                                event.divineServiceInitialMusicalMessagePerformer
                            )}
                            
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Book size={20} className="mr-2" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium">Orador(a):</p>
                                    <p className="text-sm break-words">{event.prayer}</p>
                                    {event.sermonTheme && (
                                        <p className="text-xs text-gray-600 mt-1 italic">
                                            Tema: "{event.sermonTheme}"
                                        </p>
                                    )}
                                </div>
                            </div>
                            
                            {renderMusicalMessage(
                                "Mensagem musical final", 
                                event.divineServiceFinalMusicalMessage,
                                event.divineServiceFinalMusicalMessageUrl,
                                event.divineServiceFinalMusicalMessagePerformer
                            )}
                            
                            {event.divineServiceFinalHymn && (
                                <div className="flex items-start">
                                    <div className="flex-shrink-0 mt-1">
                                        <Music size={20} className="mr-2" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium">Hino final:</p>
                                        {event.divineServiceFinalHymnUrl ? (
                                            <a 
                                                href={event.divineServiceFinalHymnUrl} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="text-sm text-blue-600 hover:underline break-words"
                                            >
                                                {event.divineServiceFinalHymn}
                                            </a>
                                        ) : (
                                            <p className="text-sm break-words">{event.divineServiceFinalHymn}</p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    // Regular day content (existing content)
                    <div className="space-y-2">
                        {/* Hino inicial */}
                        {event.initialHymn && (
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Music size={20} className="mr-2" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium">Hino inicial:</p>
                                    {event.initialHymnUrl ? (
                                        <a 
                                            href={event.initialHymnUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline break-words"
                                        >
                                            {event.initialHymn}
                                        </a>
                                    ) : (
                                        <p className="text-sm break-words">{event.initialHymn}</p>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {/* Hino em pé */}
                        {event.standingHymn && (
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Music size={20} className="mr-2" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium">Hino em pé:</p>
                                    {event.standingHymnUrl ? (
                                        <a 
                                            href={event.standingHymnUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline break-words"
                                        >
                                            {event.standingHymn}
                                        </a>
                                    ) : (
                                        <p className="text-sm break-words">{event.standingHymn}</p>
                                    )}
                                </div>
                            </div>
                        )}
                        
                        {renderMusicalMessage(
                            "Mensagem musical inicial", 
                            event.initialMusicalMessage,
                            event.initialMusicalMessageUrl,
                            event.initialMusicalMessagePerformer
                        )}
                        
                        {/* Orador (sermão) */}
                        <div className="flex items-start">
                            <div className="flex-shrink-0 mt-1">
                                <Book size={20} className="mr-2" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium">Orador(a):</p>
                                <p className="text-sm break-words">{event.prayer}</p>
                                {event.sermonTheme && (
                                    <p className="text-xs text-gray-600 mt-1 italic">
                                        Tema: "{event.sermonTheme}"
                                    </p>
                                )}
                            </div>
                        </div>
                        
                        {renderMusicalMessage(
                            "Mensagem musical final", 
                            event.finalMusicalMessage,
                            event.finalMusicalMessageUrl,
                            event.finalMusicalMessagePerformer
                        )}
                        
                        {/* Hino final */}
                        {event.finalHymn && (
                            <div className="flex items-start">
                                <div className="flex-shrink-0 mt-1">
                                    <Music size={20} className="mr-2" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium">Hino final:</p>
                                    {event.finalHymnUrl ? (
                                        <a 
                                            href={event.finalHymnUrl} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-sm text-blue-600 hover:underline break-words"
                                        >
                                            {event.finalHymn}
                                        </a>
                                    ) : (
                                        <p className="text-sm break-words">{event.finalHymn}</p>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
