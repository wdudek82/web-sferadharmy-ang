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
    thumbnail:
      'https://scontent-ham3-1.xx.fbcdn.net/v/t39.30808-6/702990775_1435185031744073_2774750475536701450_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=75d36f&_nc_ohc=XlHfJHbe8HAQ7kNvwE5Yhsa&_nc_oc=Adpe5oWMxJqghu3pSYwcEV70JYs1W3mxY-guPqIqoHK6dWL7NUsR3QaRpD_vVHirCSg&_nc_zt=23&_nc_ht=scontent-ham3-1.xx&_nc_gid=yBz-FUrHWJbJu3ae_kaz7A&_nc_ss=7b2a8&oh=00_Af48xp3DvV37ujc1c_M9w1pCV-RYvsFA5EIBSd8ys-YXEQ&oe=6A18D212',
  },
  {
    id: 'dekonstruując-rzeczywistość',
    title: 'Dekonstruując Rzeczywistość: Fizyka kwantowa, czasoprzestrzeń i iluzja jaźni',
    hosts:
      'Prowadzą:\n' +
      'prof. Bogdan Staszewski — University College Dublin\n' +
      'dr inż. Tomasz Szczygielski — Karma Dechen Choling Center\n' +
      'Rev. Heng Sure — Dharma Realm Buddhist University, California',
    excerpt:
      'A co jeśli wszystko, co uważasz za rzeczywistość, jest jedynie konstruktem?\n' +
      'Wyobraź sobie, że wszystko, co myślisz o czasie, przestrzeni, świecie — a nawet o sobie samym — może być dalekie od rzeczywistości.',
    date: '7 czerwca (niedziela)',
    time: '16:00-18:00',
    thumbnail:
      'https://scontent-ham3-1.xx.fbcdn.net/v/t39.30808-6/704288363_1435193651743211_2537449132824782821_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=75d36f&_nc_ohc=TToh4vJnDHEQ7kNvwH0OIVu&_nc_oc=AdodDyqiG2gm3dVvJVPDG1bv2WxHoEqFr3eD8h09mLyfvZVRM5ayJ8SI1sBDtaa-pTA&_nc_zt=23&_nc_ht=scontent-ham3-1.xx&_nc_gid=omUMHQE6ThY0blqUGrbf4Q&_nc_ss=7b2a8&oh=00_Af5zAzFx_EdJP1x1Gz3BestYGWrmfH1pk_Xa8G-AqAO1gA&oe=6A18CDCC',
  },
];
