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
    id: 'słuchanie-które-rodzi-współczucie',
    title: 'Słuchanie, które rodzi współczucie',
    excerpt:
      'W świecie pełnym hałasu, napięć i podziałów coraz częściej pojawia się pytanie: czy ktoś naprawdę słucha?',
    date: '6 czerwca (sobota)',
    time: 'start 16:30',
    thumbnail:
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=640&h=420',
  },
];
