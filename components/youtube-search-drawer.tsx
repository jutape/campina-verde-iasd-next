"use client";

import React, { useState, useEffect, useRef } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Youtube, Music, ExternalLink, X } from "lucide-react";
import youtubeService, { YouTubeSearchResult, YouTubeVideo } from "@/services/youtube-service";
import { toast } from "@/hooks/use-toast";

export type YouTubeSearchDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    onSelect: (video: YouTubeVideo) => void;
    title: string;
    description: string;
};

export default function YouTubeSearchDrawer({
    isOpen,
    onClose,
    onSelect,
    title,
    description,
}: YouTubeSearchDrawerProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<YouTubeSearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<YouTubeSearchResult | null>(null);
    const searchTimeout = useRef<NodeJS.Timeout | null>(null);
    const [showResults, setShowResults] = useState(false);
    const resultsContainerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Clear state when drawer closes
    useEffect(() => {
        if (!isOpen) {
            setSearchResults([]);
            setSelectedVideo(null);
            setSearchQuery("");
            setShowResults(false);
        } else {
            // Focus input when drawer opens
            setTimeout(() => {
                inputRef.current?.focus();
            }, 100);
        }
    }, [isOpen]);

    // Handle click outside results container
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (resultsContainerRef.current && !resultsContainerRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setLoading(true);
        try {
            const results = await youtubeService.searchVideos(searchQuery);
            setSearchResults(results);
            setShowResults(true);
        } catch (error) {
            console.error("Error searching videos:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleSelectVideo = (video: YouTubeSearchResult) => {
        setSelectedVideo(video);
        setShowResults(false);
    };

    const handleConfirm = () => {
        if (selectedVideo) {
            onSelect({
                id: selectedVideo.id,
                title: selectedVideo.title,
                url: youtubeService.getVideoUrl(selectedVideo.id),
            });
            onClose();
        }
    };

    const clearSelection = () => {
        setSelectedVideo(null);
        setSearchQuery("");
        setShowResults(true);
        inputRef.current?.focus();
    };

    const openVideoInNewTab = (videoId: string) => {
        window.open(youtubeService.getVideoUrl(videoId), '_blank');
    };

    return (
        <Drawer 
            open={isOpen} 
            onOpenChange={(open) => !open && onClose()}
            modal={false}
        >
            <DrawerContent className="h-[85vh] md:h-[80vh] pt-6 pb-0">
                <div className="flex flex-col h-full">
                    <div className="mx-auto w-full max-w-md px-4">
                        <DrawerHeader className="px-0 py-0 mb-4">
                            <DrawerTitle>{title}</DrawerTitle>
                            <DrawerDescription>{description}</DrawerDescription>
                        </DrawerHeader>
                    
                        <div className="relative mb-4">
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <Input
                                        ref={inputRef}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        onClick={() => setShowResults(true)}
                                        placeholder="Buscar música..."
                                        className="pr-8"
                                    />
                                    {selectedVideo && (
                                        <button
                                            className="absolute right-2 top-1/2 -translate-y-1/2"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                clearSelection();
                                            }}
                                        >
                                            <X className="h-4 w-4 text-muted-foreground" />
                                        </button>
                                    )}
                                </div>
                                <Button 
                                    onClick={handleSearch}
                                    disabled={loading || !searchQuery.trim()}
                                >
                                    {loading ? "..." : <Search className="h-4 w-4" />}
                                </Button>
                            </div>
                            
                            {/* Search results dropdown */}
                            {showResults && searchResults.length > 0 && (
                                <div 
                                    ref={resultsContainerRef}
                                    className="absolute z-50 w-full bg-background border rounded-md shadow-md mt-1 max-h-60 overflow-y-auto"
                                >
                                    {searchResults.map((video) => (
                                        <div
                                            key={video.id}
                                            className={`flex items-center gap-2 p-2 cursor-pointer hover:bg-muted transition-colors ${
                                                selectedVideo?.id === video.id ? "bg-muted" : ""
                                            }`}
                                            onClick={() => handleSelectVideo(video)}
                                        >
                                            <img
                                                src={video.thumbnail}
                                                alt=""
                                                className="w-12 h-9 object-cover rounded"
                                            />
                                            <div className="flex flex-col flex-1 min-w-0">
                                                <span className="text-sm font-medium truncate">{video.title}</span>
                                                <span className="text-xs text-muted-foreground truncate">{video.channelTitle}</span>
                                            </div>
                                            {selectedVideo?.id === video.id && (
                                                <Music className="h-4 w-4 text-primary" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Scrollable content area */}
                    <div className="flex-1 overflow-y-auto px-4 min-h-[200px]">
                        <div className="mx-auto w-full max-w-md pb-4">
                            {/* Selected video preview */}
                            {selectedVideo && (
                                <div className="border rounded-md p-3 bg-muted/10 mb-4">
                                    <div className="aspect-video relative mb-2">
                                        <img 
                                            src={selectedVideo.thumbnail.replace('default.jpg', 'hqdefault.jpg')} 
                                            alt={selectedVideo.title}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                                            <Button 
                                                variant="secondary" 
                                                size="sm" 
                                                className="opacity-90"
                                                onClick={() => openVideoInNewTab(selectedVideo.id)}
                                            >
                                                <ExternalLink className="h-4 w-4 mr-2" />
                                                Abrir vídeo
                                            </Button>
                                        </div>
                                    </div>
                                    <h3 className="text-sm font-medium line-clamp-2">{selectedVideo.title}</h3>
                                    <p className="text-xs text-muted-foreground">{selectedVideo.channelTitle}</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Fixed footer */}
                    <div className="border-t bg-background p-4 mt-auto">
                        <div className="mx-auto w-full max-w-md">
                            <div className="flex flex-col gap-2">
                                <Button 
                                    onClick={handleConfirm}
                                    disabled={!selectedVideo}
                                    className="w-full gap-2"
                                >
                                    <Youtube className="h-4 w-4" />
                                    {selectedVideo ? "Usar este vídeo" : "Selecione um vídeo"}
                                </Button>
                                <DrawerClose asChild>
                                    <Button variant="outline" className="w-full">
                                        Cancelar
                                    </Button>
                                </DrawerClose>
                            </div>
                        </div>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    );
}
