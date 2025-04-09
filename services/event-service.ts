import { apiClient } from './api-client';
import { EventItem, EventListResponse, EventResponse } from '../models/event';
import { authService } from './auth-service';

class EventService {
  private events: EventItem[] = [];
  private isInitialized = false;

  // Get all events from API
  async fetchEvents(): Promise<EventItem[]> {
    try {
      // For authenticated users, get full event details
      const response = await apiClient.get<EventListResponse>('/events');
      this.events = response.events;
      this.isInitialized = true;
      return this.events;
    } catch (error) {
      console.error('Failed to fetch events:', error);
      return [];
    }
  }

  // Get all events (cached or from API)
  async getAllEvents(): Promise<EventItem[]> {
    if (!this.isInitialized || this.events.length === 0) {
      return await this.fetchEvents();
    }
    return [...this.events];
  }

  // Get an event by date
  async getEventsByDate(date: string): Promise<EventItem | null> {
    // Try to get from cache first
    const cachedEvent = this.events.find(event => event.date === date);
    if (cachedEvent) return { ...cachedEvent };
    
    try {
      // If not in cache, get from API
      const response = await apiClient.get<EventResponse>(`/events/date/${date}`);
      
      // Update local cache
      const existingIndex = this.events.findIndex(e => e.date === date);
      if (existingIndex >= 0) {
        this.events[existingIndex] = response.event;
      } else {
        this.events.push(response.event);
      }
      
      return response.event;
    } catch (error) {
      console.error(`Failed to get event for date ${date}:`, error);
      return null;
    }
  }

  // Create a new event
  async createEvent(event: EventItem): Promise<EventItem | null> {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error("Authentication required to create events");
      }
      
      const response = await apiClient.post<EventResponse>('/events', event);
      
      // Update local cache
      this.events.push(response.event);
      
      return response.event;
    } catch (error) {
      console.error('Failed to create event:', error);
      return null;
    }
  }

  // Update an existing event
  async updateEvent(date: string, eventData: Partial<EventItem>): Promise<EventItem | null> {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error("Authentication required to update events");
      }
      
      const response = await apiClient.put<EventResponse>(`/events/date/${date}`, eventData);
      
      // Update local cache
      const existingIndex = this.events.findIndex(e => e.date === date);
      if (existingIndex >= 0) {
        this.events[existingIndex] = response.event;
      } else {
        this.events.push(response.event);
      }
      
      return response.event;
    } catch (error) {
      console.error(`Failed to update event for date ${date}:`, error);
      return null;
    }
  }

  // Delete an event
  async deleteEvent(date: string): Promise<boolean> {
    try {
      if (!authService.isAuthenticated()) {
        throw new Error("Authentication required to delete events");
      }
      
      await apiClient.delete(`/events/date/${date}`);
      
      // Update local cache
      this.events = this.events.filter(e => e.date !== date);
      
      return true;
    } catch (error) {
      console.error(`Failed to delete event for date ${date}:`, error);
      return false;
    }
  }
  
  // Backward compatibility methods for local operations
  syncLocalEvents() {
    // Upload any cached local events to the server
    if (authService.isAuthenticated() && typeof window !== 'undefined') {
      try {
        const localEvents = localStorage.getItem('events');
        if (localEvents) {
          const events = JSON.parse(localEvents) as EventItem[];
          events.forEach(event => {
            this.updateEvent(event.date, event);
          });
          // Clear local storage after sync
          localStorage.removeItem('events');
        }
      } catch (e) {
        console.error('Error syncing local events:', e);
      }
    }
  }
}

export default new EventService();
