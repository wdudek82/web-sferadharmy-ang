export type EventSummary = {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  time: string;
  hosts?: string;
  thumbnail: string;
  href?: string;
};

export function resolveEventHref(event: Pick<EventSummary, 'id' | 'href'>): string {
  return event.href ?? `/wydarzenia/${event.id}`;
}

export const eventsData: EventSummary[] = [
  {
    id: 'guan-yin-i-sztuka-obecności-słuchanie-które-rodzi-współczucie',
    title: 'Guan Yin i sztuka obecności: Słuchanie, które rodzi współczucie',
    hosts: 'Prowadzą: Rev. Heng Sure i Ven. Jin-Wei',
    excerpt:
      'W świecie pełnym hałasu, napięć i podziałów coraz częściej pojawia się pytanie: czy naprawdę potrafimy być obecni - dla siebie, dla innych, dla świata wokół nas?',
    date: '6 czerwca (sobota)',
    time: 'start 16:30',
    thumbnail: 'images/events/guan-yin-i-sztuka-obecności-słuchanie-które-rodzi-współczucie.jpeg',
  },
  {
    id: 'dekonstruując-rzeczywistość',
    title: 'Dekonstruując Rzeczywistość: Fizyka kwantowa, czasoprzestrzeń i iluzja jaźni',
    hosts:
      'Prowadzą:\n' +
      '- prof. Bogdan Staszewski — University College Dublin\n' +
      '- dr inż. Tomasz Szczygielski — Karma Dechen Choling Center\n' +
      '- Rev. Heng Sure — Dharma Realm Buddhist University, California',
    excerpt:
      'A co jeśli wszystko, co uważasz za rzeczywistość, jest jedynie konstruktem?\n' +
      'Wyobraź sobie, że wszystko, co myślisz o czasie, przestrzeni, świecie — a nawet o sobie samym — może być dalekie od rzeczywistości.',
    date: '7 czerwca (niedziela)',
    time: '16:00-18:00',
    thumbnail: 'images/events/dekonstruując-rzeczywistość.jpeg',
  },
];
