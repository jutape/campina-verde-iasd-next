import { Button } from "@/components/ui/button";
import { Share2, MoreVertical, Pencil, Music, Book, User } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
    DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import { EventItem } from "@/app/schedule";
import { eventQuestions } from "@/components/event-form-drawer";

interface EventOptionsProps {
    event: EventItem;
    onShare: () => void;
    onEdit?: (questionKey: keyof typeof eventQuestions) => void;
    onYouTubeSearch?: (questionKey: keyof typeof eventQuestions) => void;
    isAdmin?: boolean;
    date?: Date;
}

export default function EventOptions({ 
    event, 
    onShare, 
    onEdit, 
    onYouTubeSearch,
    isAdmin = false,
    date
}: EventOptionsProps) {
    const isSaturday = date ? date.getDay() === 6 : false;
    
    return (
        <div className="flex items-center">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={onShare}
                title="Compartilhar no WhatsApp"
                className="mr-1"
            >
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Compartilhar</span>
            </Button>
            
            {isAdmin && onEdit && onYouTubeSearch && (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Abrir menu</span>
                            <MoreVertical className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEdit('begin')}>
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Editar Orador(a)</span>
                        </DropdownMenuItem>
                        
                        <DropdownMenuSeparator />
                        
                        {isSaturday ? (
                            <>
                                <DropdownMenuLabel>Escola Sabatina</DropdownMenuLabel>
                                {/* Sabbath School options */}
                                {event.sabbathSchoolHymn ? (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('sabbathSchoolHymn')}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Editar Hino da revista</span>
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('sabbathSchoolHymn')}>
                                        <Music className="mr-2 h-4 w-4" />
                                        <span>Adicionar Hino da revista</span>
                                    </DropdownMenuItem>
                                )}
                                
                                {event.sabbathSchoolAdultTeacher ? (
                                    <DropdownMenuItem onClick={() => onEdit('sabbathSchoolAdultTeacher')}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Editar Professor - Adultos</span>
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => onEdit('sabbathSchoolAdultTeacher')}>
                                        <Book className="mr-2 h-4 w-4" />
                                        <span>Adicionar Professor - Adultos</span>
                                    </DropdownMenuItem>
                                )}
                                
                                {event.sabbathSchoolYouthTeacher ? (
                                    <DropdownMenuItem onClick={() => onEdit('sabbathSchoolYouthTeacher')}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Editar Professor - Jovens</span>
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => onEdit('sabbathSchoolYouthTeacher')}>
                                        <Book className="mr-2 h-4 w-4" />
                                        <span>Adicionar Professor - Jovens</span>
                                    </DropdownMenuItem>
                                )}
                                
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Music className="mr-2 h-4 w-4" />
                                        <span>Mensagem Musical ES</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem onClick={() => onYouTubeSearch('sabbathSchoolMusicalMessage')}>
                                                <Music className="mr-2 h-4 w-4" />
                                                <span>{event.sabbathSchoolMusicalMessage ? "Editar música" : "Adicionar música"}</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEdit('sabbathSchoolMusicalMessage')}>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>{event.sabbathSchoolMusicalMessagePerformer ? "Editar" : "Adicionar"} participante</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                
                                <DropdownMenuSeparator />
                                <DropdownMenuLabel>Culto Divino</DropdownMenuLabel>
                                
                                {event.divineServiceHymn ? (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('divineServiceHymn')}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Editar Hino inicial</span>
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('divineServiceHymn')}>
                                        <Music className="mr-2 h-4 w-4" />
                                        <span>Adicionar Hino inicial</span>
                                    </DropdownMenuItem>
                                )}
                                
                                {event.preacherHymn ? (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('preacherHymn')}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Editar Hino do pregador</span>
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('preacherHymn')}>
                                        <Music className="mr-2 h-4 w-4" />
                                        <span>Adicionar Hino do pregador</span>
                                    </DropdownMenuItem>
                                )}
                                
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Music className="mr-2 h-4 w-4" />
                                        <span>Mensagem Musical Inicial</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem onClick={() => onYouTubeSearch('divineServiceInitialMusicalMessage')}>
                                                <Music className="mr-2 h-4 w-4" />
                                                <span>{event.divineServiceInitialMusicalMessage ? "Editar música" : "Adicionar música"}</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEdit('divineServiceInitialMusicalMessage')}>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>{event.divineServiceInitialMusicalMessagePerformer ? "Editar" : "Adicionar"} participante</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Music className="mr-2 h-4 w-4" />
                                        <span>Mensagem Musical Final</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem onClick={() => onYouTubeSearch('divineServiceFinalMusicalMessage')}>
                                                <Music className="mr-2 h-4 w-4" />
                                                <span>{event.divineServiceFinalMusicalMessage ? "Editar música" : "Adicionar música"}</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEdit('divineServiceFinalMusicalMessage')}>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>{event.divineServiceFinalMusicalMessagePerformer ? "Editar" : "Adicionar"} participante</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                
                                {event.divineServiceFinalHymn ? (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('divineServiceFinalHymn')}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Editar Hino final</span>
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('divineServiceFinalHymn')}>
                                        <Music className="mr-2 h-4 w-4" />
                                        <span>Adicionar Hino final</span>
                                    </DropdownMenuItem>
                                )}
                            </>
                        ) : (
                            <>
                                {event.initialHymn ? (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('initialHymn')}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Editar Hino inicial</span>
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('initialHymn')}>
                                        <Music className="mr-2 h-4 w-4" />
                                        <span>Adicionar Hino inicial</span>
                                    </DropdownMenuItem>
                                )}
                                
                                {event.standingHymn ? (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('standingHymn')}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Editar Hino em pé</span>
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('standingHymn')}>
                                        <Music className="mr-2 h-4 w-4" />
                                        <span>Adicionar Hino em pé</span>
                                    </DropdownMenuItem>
                                )}
                                
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Music className="mr-2 h-4 w-4" />
                                        <span>Mensagem Musical Inicial</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem onClick={() => onYouTubeSearch('initialMusicalMessage')}>
                                                <Music className="mr-2 h-4 w-4" />
                                                <span>{event.initialMusicalMessage ? "Editar música" : "Adicionar música"}</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEdit('initialMusicalMessage')}>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>{event.initialMusicalMessagePerformer ? "Editar" : "Adicionar"} participante</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <Music className="mr-2 h-4 w-4" />
                                        <span>Mensagem Musical Final</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem onClick={() => onYouTubeSearch('finalMusicalMessage')}>
                                                <Music className="mr-2 h-4 w-4" />
                                                <span>{event.finalMusicalMessage ? "Editar música" : "Adicionar música"}</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onEdit('finalMusicalMessage')}>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>{event.finalMusicalMessagePerformer ? "Editar" : "Adicionar"} participante</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                
                                {event.finalHymn ? (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('finalHymn')}>
                                        <Pencil className="mr-2 h-4 w-4" />
                                        <span>Editar Hino final</span>
                                    </DropdownMenuItem>
                                ) : (
                                    <DropdownMenuItem onClick={() => onYouTubeSearch('finalHymn')}>
                                        <Music className="mr-2 h-4 w-4" />
                                        <span>Adicionar Hino final</span>
                                    </DropdownMenuItem>
                                )}
                            </>
                        )}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
}
