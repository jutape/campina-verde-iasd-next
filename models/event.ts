export interface EventItem {
  id?: string;
  date: string;
  prayer: string;
  sermonTheme?: string;
  
  // Regular service fields
  initialHymn?: string;
  initialHymnUrl?: string;
  standingHymn?: string;
  standingHymnUrl?: string;
  
  initialMusicalMessage?: string;
  initialMusicalMessageUrl?: string;
  initialMusicalMessagePerformer?: string;
  
  finalMusicalMessage?: string;
  finalMusicalMessageUrl?: string;
  finalMusicalMessagePerformer?: string;
  
  finalHymn?: string;
  finalHymnUrl?: string;
  
  // Sabbath School specific fields
  sabbathSchoolHymn?: string;
  sabbathSchoolHymnUrl?: string;
  sabbathSchoolAdultTeacher?: string;
  sabbathSchoolYouthTeacher?: string;
  sabbathSchoolMusicalMessage?: string;
  sabbathSchoolMusicalMessageUrl?: string;
  sabbathSchoolMusicalMessagePerformer?: string;
  
  // Divine Service specific fields
  divineServiceHymn?: string;
  divineServiceHymnUrl?: string;
  preacherHymn?: string;
  preacherHymnUrl?: string;
  
  divineServiceInitialMusicalMessage?: string;
  divineServiceInitialMusicalMessageUrl?: string; 
  divineServiceInitialMusicalMessagePerformer?: string;
  
  divineServiceFinalMusicalMessage?: string;
  divineServiceFinalMusicalMessageUrl?: string;
  divineServiceFinalMusicalMessagePerformer?: string;
  
  divineServiceFinalHymn?: string;
  divineServiceFinalHymnUrl?: string;
  
  createdAt?: string;
  updatedAt?: string;
  [key: string]: string | undefined;
}

export interface EventListResponse {
  events: EventItem[];
}

export interface EventResponse {
  event: EventItem;
}
