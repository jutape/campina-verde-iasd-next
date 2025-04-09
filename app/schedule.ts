/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EventItem {
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
  
  [key: string]: string | undefined;
}

export const dayNames = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
export const dayFullNames = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
export const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

// Service types based on the day of the week
export const serviceTypes = {
  // Sunday Service (0)
  0: {
    name: 'CULTO DE DOMINGO',
    order: [
      'Boas Vindas',
      'Oração',
      'Hino inicial',
      'Hino em pé',
      'Oração de Joelhos',
      'Mensagem musical inicial',
      'Sermão', // corresponds to prayer/orador
      'Mensagem musical final',
      'Oração final',
      'Hino final'
    ]
  },
  // Wednesday Service (3)
  3: {
    name: 'CULTO DE QUARTA',
    order: [
      'Boas Vindas',
      'Oração',
      'Hino inicial',
      'Hino em pé',
      'Pedidos e Agradecimentos',
      'Oração de Joelhos',
      'Livro',
      'Mensagem musical final',
      'Oração final',
      'Hino final'
    ]
  },
  // Saturday Services (6) - Both Sabbath School and Divine Service
  6: {
    name: 'CULTO DE SÁBADO',
    sabbathSchool: {
      name: 'Escola Sabatina',
      startTime: '08:50',
      endTime: '10:00',
      order: [
        'Boas vindas',
        'Oração',
        'Hino da revista',
        'Informativo mundial',
        'Sabatina',
        'Mensagem musical',
        'Oração'
      ]
    },
    divineService: {
      name: 'Culto Divino',
      startTime: '10:10',
      endTime: '12:00',
      order: [
        'Boas vindas',
        'Oração',
        'Hino inicial',
        'Vídeo de Reverência',
        'Anúncios',
        'Adoração Infantil',
        'Hino em pé',
        'Provai e vede',
        'Ofertório',
        'Oração',
        'Hino do pregador',
        'Oração de joelhos',
        'Mensagem musical inicial',
        'Sermão', // corresponds to prayer/orador
        'Mensagem musical final',
        'Oração final',
        'Hino final'
      ]
    }
  }
};

// Default service schedule for each day of the week
export const cultoSchedule = {
  0: { // Sunday
    startTime: '19:00',
    endTime: '20:00',
    description: 'Culto de Domingo',
    serviceType: serviceTypes[0]
  },
  1: { // Monday
    startTime: '',
    endTime: '',
    description: 'Não há culto neste dia.'
  },
  2: { // Tuesday
    startTime: '',
    endTime: '',
    description: 'Não há culto neste dia.'
  },
  3: { // Wednesday
    startTime: '19:00',
    endTime: '20:00',
    description: 'Culto de Quarta',
    serviceType: serviceTypes[3]
  },
  4: { // Thursday
    startTime: '',
    endTime: '',
    description: 'Não há culto neste dia.'
  },
  5: { // Friday
    startTime: '',
    endTime: '',
    description: 'Não há culto neste dia.'
  },
  6: { // Saturday
    startTime: '08:50',
    endTime: '12:00',
    description: 'Escola Sabatina e Culto Divino',
    serviceType: serviceTypes[6]
  }
};

export const events = {
  dates: [
    {
      date: '2023-11-18',
      prayer: 'Pr. Ronaldo Silva'
    },
    {
      date: '2023-11-25',
      prayer: 'Anc. João Almeida'
    }
  ] as EventItem[]
}

// Function to get service template based on the day of the week
export function getServiceTemplate(dayOfWeek: number): string[] {
  // Type-safe access to serviceTypes
  const serviceType = serviceTypes[dayOfWeek as keyof typeof serviceTypes];
  
  // If no service found for this day, return default Sunday order
  if (!serviceType) return serviceTypes[0].order;
  
  // If it's Saturday (index 6), return the divine service order with proper type checking
  if (dayOfWeek === 6 && 'divineService' in serviceType) {
    return serviceType.divineService.order;
  }
  
  // For other days (Sunday and Wednesday) which have direct order property
  if ('order' in serviceType) {
    return serviceType.order;
  }
  
  // Fallback to Sunday service if the structure is unexpected
  return serviceTypes[0].order;
}

// Function to generate the formatted program text for WhatsApp
export function generateProgramText(event: EventItem, date: Date, includeLink: boolean = true): string {
  const dayOfWeek = date.getDay();
  const dayStr = date.getDate().toString().padStart(2, '0');
  const monthStr = (date.getMonth() + 1).toString().padStart(2, '0');
  const yearStr = date.getFullYear().toString();
  const serviceInfo = cultoSchedule[dayOfWeek as keyof typeof cultoSchedule];
  
  let text = '';
  
  // For Saturday, we have two services
  if (dayOfWeek === 6) {
    const sabbathSchool = serviceTypes[6].sabbathSchool;
    const divineService = serviceTypes[6].divineService;
    
    text = `*${serviceTypes[6].name}*\n\n`;
    text += `*${dayStr}•${monthStr} chegar ${serviceInfo.startTime} iniciar as ${sabbathSchool.startTime}*\n\n`;
    
    // Sabbath School Order with event details
    for (const item of sabbathSchool.order) {
      if (item === 'Hino da revista' && event.sabbathSchoolHymn) {
        text += `•${item} (${event.sabbathSchoolHymn})\n`;
      }
      else if (item.includes('Sabatina') && (event.sabbathSchoolAdultTeacher || event.sabbathSchoolYouthTeacher)) {
        if (event.sabbathSchoolAdultTeacher) {
          text += `•Sabatina Adulto: ${event.sabbathSchoolAdultTeacher}\n`;
        }
        if (event.sabbathSchoolYouthTeacher) {
          text += `•Sabatina Jovem: ${event.sabbathSchoolYouthTeacher}\n`;
        }
      }
      else if (item === 'Mensagem musical' && event.sabbathSchoolMusicalMessage) {
        text += `•${item} (${event.sabbathSchoolMusicalMessage})`;
        if (event.sabbathSchoolMusicalMessagePerformer) {
          text += ` - Por: ${event.sabbathSchoolMusicalMessagePerformer}`;
        }
        text += `)\n`;
      }
      else {
        text += `•${item}\n`;
      }
    }
    
    text += '\n————————————\n';
    text += `*${divineService.name} ${divineService.startTime}*\n\n`;
    
    // Divine Service Order with event details
    for (const item of divineService.order) {
      if (item === 'Sermão') {
        text += `•${item} (${event.prayer})`;
        if (event.sermonTheme) {
          text += ` - Tema: "${event.sermonTheme}"`;
        }
        text += "\n";
      }
      else if (item === 'Hino inicial' && event.divineServiceHymn) {
        text += `•${item} (${event.divineServiceHymn})\n`;
      }
      else if (item === 'Hino em pé' && event.standingHymn) {
        text += `•${item} (${event.standingHymn})\n`;
      }
      else if (item === 'Hino do pregador' && event.preacherHymn) {
        text += `•${item} (${event.preacherHymn})\n`;
      }
      else if (item === 'Mensagem musical inicial' && event.divineServiceInitialMusicalMessage) {
        text += `•Mensagem musical (${event.divineServiceInitialMusicalMessage})`;
        if (event.divineServiceInitialMusicalMessagePerformer) {
          text += ` - Por: ${event.divineServiceInitialMusicalMessagePerformer}`;
        }
        text += "\n";
      }
      else if (item === 'Mensagem musical final' && event.divineServiceFinalMusicalMessage) {
        text += `•Mensagem musical (${event.divineServiceFinalMusicalMessage})`;
        if (event.divineServiceFinalMusicalMessagePerformer) {
          text += ` - Por: ${event.divineServiceFinalMusicalMessagePerformer}`;
        }
        text += "\n";
      }
      else if (item === 'Hino final' && event.divineServiceFinalHymn) {
        text += `•${item} (${event.divineServiceFinalHymn})\n`;
      }
      else {
        text += `•${item}\n`;
      }
    }
  } 
  // For Sunday or Wednesday services
  else {
    const serviceType = serviceTypes[dayOfWeek as keyof typeof serviceTypes] || serviceTypes[0];
    
    text = `*${serviceType.name}*\n`;
    text += `*${dayStr}•${monthStr} as ${serviceInfo.startTime} até ${serviceInfo.endTime}*\n`;
    
    if ('order' in serviceType) {
      for (const item of serviceType.order) {
        if (item === 'Sermão') {
          text += `•${item} (${event.prayer})`;
          if (event.sermonTheme) {
            text += ` - Tema: "${event.sermonTheme}"`;
          }
          text += "\n";
        } 
        else if (item === 'Hino inicial' && event.initialHymn) {
          text += `•${item} (${event.initialHymn})\n`;
        }
        else if (item === 'Hino em pé' && event.standingHymn) {
          text += `•${item} (${event.standingHymn})\n`;
        }
        else if (item === 'Mensagem musical inicial' && event.initialMusicalMessage) {
          text += `•Mensagem musical (${event.initialMusicalMessage})`;
          if (event.initialMusicalMessagePerformer) {
            text += ` - Por: ${event.initialMusicalMessagePerformer}`;
          }
          text += "\n";
        }
        else if (item === 'Mensagem musical final' && event.finalMusicalMessage) {
          text += `•Mensagem musical (${event.finalMusicalMessage})`;
          if (event.finalMusicalMessagePerformer) {
            text += ` - Por: ${event.finalMusicalMessagePerformer}`;
          }
          text += "\n";
        }
        else if (item === 'Hino final' && event.finalHymn) {
          text += `•${item} (${event.finalHymn})\n`;
        }
        else {
          text += `•${item}\n`;
        }
      }
    } else {
      // Fallback if the service type doesn't have an order property
      text += `•Sermão (${event.prayer}`;
      if (event.sermonTheme) {
        text += ` - ${event.sermonTheme}`;
      }
      text += `)\n`;
      if (event.initialHymn) text += `•Hino inicial (${event.initialHymn})\n`;
      if (event.standingHymn) text += `•Hino em pé (${event.standingHymn})\n`;
      if (event.initialMusicalMessage) {
        text += `•Mensagem musical (${event.initialMusicalMessage}`;
        if (event.initialMusicalMessagePerformer) {
          text += ` - ${event.initialMusicalMessagePerformer}`;
        }
        text += `)\n`;
      }
      if (event.finalMusicalMessage) {
        text += `•Mensagem musical (${event.finalMusicalMessage}`;
        if (event.finalMusicalMessagePerformer) {
          text += ` - ${event.finalMusicalMessagePerformer}`;
        }
        text += `)\n`;
      }
      if (event.finalHymn) text += `•Hino final (${event.finalHymn})\n`;
    }
  }
  
  // Add access link to the agenda page
  if (includeLink) {
    const formattedDate = `${yearStr}-${monthStr}-${dayStr}`;
    text += `\n\n📅 Ver programação completa: https://campina-verde-iasd.vercel.app/agenda?date=${formattedDate}`;
  }
  
  return text;
}

// Function to share event on WhatsApp
export function shareOnWhatsApp(event: EventItem, date: Date): void {
  const text = generateProgramText(event, date, true);
  window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
}
