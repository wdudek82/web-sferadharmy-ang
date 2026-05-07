export type EventSummary = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  time: string;
  thumbnail: string;
  href?: string;
};

export function resolveEventHref(event: Pick<EventSummary, 'id' | 'href'>): string {
  return event.href ?? `/wydarzenia/${event.id}`;
}

export const eventsData: EventSummary[] = [
  {
    id: 'wieczorna-medytacja',
    title: 'Wieczorna medytacja',
    excerpt: 'Regularna praktyka z krótkim wprowadzeniem i rozmową po spotkaniu.',
    date: 'Środy',
    time: '19:00',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=640&h=420',
  },
  {
    id: 'krag-uwaznosci',
    title: 'Krąg uważności',
    excerpt: 'Spotkanie wspólnoty, praca z oddechem i łagodne ćwiczenia uważności.',
    date: 'Soboty',
    time: '10:00',
    thumbnail: 'https://images.unsplash.com/photo-1528319725582-ddc096101511?auto=format&fit=crop&q=80&w=640&h=420',
  },
];
