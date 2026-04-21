export type TextSummary = {
  id: string;
  author: string;
  title: string;
  excerpt: string;
  href?: string;
  date: string;
  time: string;
  thumbnail: string;
};

export function resolveTextHref(text: Pick<TextSummary, 'id' | 'href'>): string {
  return text.href ?? `/teksty/${text.id}`;
}

export const textsData: TextSummary[] = [
  {
    id: 'trainee-ceremony-search-for-purpose',
    author: 'Chin Zhi (Mingchee Tan)',
    title: 'Trainee Ceremony: A Search for Purpose',
    excerpt:
      'On March 1st, 2026, I stood in the middle of the hall surrounded by family, friends, and the larger Dharma community making vows to become a Trainee (Anagarika) under the guidance of the Sangha led by the Ven. Master Hsuan Hua with my Dharma Name Chin Zhi (親智).',
    // href: '/teksty/trainee-ceremony-search-for-purpose',
    date: '1 marca 2026',
    time: '13:00',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/638101f1bfb9485af6a60b8f/19bf2fbf-7699-4cce-9629-1d3f78a37e45/PHOTO-2026-03-01-21-10-24.jpg',
  },
  {
    id: 'trainee-ceremony-finding-wholeness',
    author: 'Chin Jue (Wade Chang)',
    title: 'Trainee Ceremony: Finding Wholeness',
    excerpt:
      'Being able to take this step into the Trainee Ceremony at Gold Coast Dharma Realm (GCDR) meant a great deal to me. This is where I began learning about Buddhism three years ago. It is where I met wise advisors who changed how I see the world, where I developed friendships deeper than I knew possible, and where my family expanded in ways I never expected. I have spent many hours volunteering here, attended more Dharma assemblies than I can count, and even lived in the monastery itself. GCDR is not just a place; it has become part of who I am. Looking back, I can trace the transformation from someone seeking peace in the outdoors to someone learning that the deepest wilderness to explore is within.',
    date: '7 lutego 2026',
    time: '13:00',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/638101f1bfb9485af6a60b8f/1770489264052-MKICFSJG5QFPC6ZL6TIG/IMG_7478+%281%29.jpg?format=2500w',
  },
  {
    id: 'awakin-retreat-participant-reflections',
    author: '',
    title: 'Awakin Retreat: Participant Reflections',
    excerpt:
      'I have attended many retreats hosted by the ServiceSpace ecosystem, mostly as a volunteer—except for one I joined as a participant in 2015. Each retreat follows its own path yet leads to the same destination, rooted in the spirit of “Practicing love and loving the practice.”\n' +
      '\n' +
      'The AwaKin retreat at Redwood Vihara was no different, yet it was unique in its own way. We gathered in the Monastery with Rev. Heng Sure as a host and Jin-Chuan Shi and Jin-Wei Shi as volunteer anchors. Most volunteers didn’t know each other beforehand—some were from the monastery and were doing the heavy lifting, others were from ServiceSpace USA, and a few of us flew in from India as part of the ServiceSpace India crew. The way all volunteers bonded and became one source of action was inspiring to witness and be part of. ',
    date: '9 listopada 2025',
    time: '',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/638101f1bfb9485af6a60b8f/1762685659164-5Z0WIA5E9V7H2CBLMVBW/2025-09-06+Evening+of+Stories+Along+Bodhisattva+Path-55.jpg?format=2500w',
  },
  {
    id: 'awakin-retreat-a-symphony-of-noble-friends',
    author: '',
    title: 'Awakin Retreat: A Symphony of Noble Friends',
    excerpt:
      'We began with a sacred invocation in a circle of stones surrounded by redwoods. Leaders, seekers, and servants from around the world sat shoulder to shoulder, and the invitation was simple: to listen, to serve, to discover what might emerge.',
    date: '23 września 2025',
    time: '',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/638101f1bfb9485af6a60b8f/1758650036038-09GOZRUHHMTRME245Q4T/DSCF5125.jpg?format=2500w',
  },
  {
    id: 'offering-to-the-buddhas-body-alms-round',
    author: '',
    title: 'Offering to the Buddha’s Body: Alms Round',
    excerpt:
      'I vividly remember standing on the main street of Boulder Creek waiting for the monks to come by on alms round. Then, from a distance, I saw them: monks, walking in dignified silence. They came from two lineages—three in the ochre robes of the Thai Forest lineage, two in the yellow robes and dark brown precept sashes of the Dharma Realm Buddhist Association… I had a reflection: This was a scene from the Buddha’s own time. The Buddha himself walked like this on alms round. This is how the Sangha sustained itself over the millennia.',
    date: '12 maja 2025',
    time: '',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/638101f1bfb9485af6a60b8f/1747112315802-M0EQAO0TR2EM2BUH9AF6/IMG_1408.jpg?format=2500w',
  },
  {
    id: 'welcoming-Ajahn-Chahs-relics',
    author: '',
    title: 'Welcoming Ajahn Chah’s Relics',
    excerpt:
      'The story began during the 90th birthday celebration of Ajahn Sumedho. During the gathering, Joseph Cappel (formerly Ajahn Pabhakaro), who once served as Ajahn Chah’s attendant, offered relic hairs of Ajahn Chah to the monastics present. Among those receiving relics was Venerable Issaro. When they came into his hands, a thought arose immediately in his heart: these should go to Redwood Vihara.',
    date: '4 września 2024',
    time: '',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/638101f1bfb9485af6a60b8f/1773557134208-NMEBF6P5IQX6J68YWOSA/DC6A0394+copy+%282%29.jpg?format=2500w',
  },
];
