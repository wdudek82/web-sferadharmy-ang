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
    id: 'ceremonia-osób-w-treningu-poszukiwanie-celu',
    author: 'Chin Zhi (Mingchee Tan)',
    title: 'Ceremonia osób w treningu:  Poszukiwanie celu',
    excerpt:
      '1 marca 2026 roku stałem pośrodku sali, otoczony przez rodzinę, przyjaciół i szerszą wspólnotę Dharmy, składając śluby, by zostać Trainee (Anagariką) pod przewodnictwem Sanghi prowadzonej przez Czcigodnego Mistrza Hsuan Hua, przyjmując imię Dharmy Chin Zhi (親智).',
    date: '1 marca 2026',
    time: '13:00',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/638101f1bfb9485af6a60b8f/19bf2fbf-7699-4cce-9629-1d3f78a37e45/PHOTO-2026-03-01-21-10-24.jpg',
  },
  {
    id: 'ceremonia-osób-w-treningu-odnajdywanie-pełni',
    author: 'Chin Jue (Wade Chang)',
    title: 'Ceremonia osób w treningu: odnajdywanie pełni',
    excerpt:
      'Możliwość wykonania tego kroku i przystąpienia do ceremonii Trainee w Gold Coast Dharma Realm (GCDR) miała dla mnie ogromne znaczenie. To tutaj trzy lata temu zacząłem poznawać buddyzm. To tutaj spotkałem mądrych doradców, którzy zmienili moje postrzeganie świata, tutaj nawiązałem głębsze przyjaźnie, niż kiedykolwiek uważałem za możliwe, i tutaj moja „rodzina” rozszerzyła się w sposób, którego nigdy się nie spodziewałem. Spędziłem tu wiele godzin jako wolontariusz, uczestniczyłem w niezliczonych zgromadzeniach Dharmy, a nawet mieszkałem w samym klasztorze. GCDR to nie tylko miejsce — stało się częścią mnie. Patrząc wstecz, widzę przemianę od kogoś, kto szukał spokoju na łonie natury, do kogoś, kto uczy się, że najgłębszą „dziczą” do odkrycia jest wnętrze.',
    date: '7 lutego 2026',
    time: '13:00',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/638101f1bfb9485af6a60b8f/1770489264052-MKICFSJG5QFPC6ZL6TIG/IMG_7478+%281%29.jpg?format=2500w',
  },
  {
    id: 'wybudzające-odosobnienie-refleksje-uczestniczki',
    author: '',
    title: 'Wybudzające odosobnienie: refleksje uczestniczki',
    excerpt:
      'Jednym z najbardziej poruszających momentów rekolekcji AwaKin była cicha kolacja. Goście zgromadzili się w ciszy w kamiennym kręgu, podczas gdy mnisi i wolontariusze serwowali posiłek bez słów. Już od samego początku coś świętego wypełniało przestrzeń.',
    date: '9 listopada 2025',
    time: '',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/638101f1bfb9485af6a60b8f/1762685659164-5Z0WIA5E9V7H2CBLMVBW/2025-09-06+Evening+of+Stories+Along+Bodhisattva+Path-55.jpg?format=2500w',
  },
  {
    id: 'wybudzające-odosobnienie-symfonia-szlachetnych-przyjaciół',
    author: '',
    title: 'Wybudzające odosobnienie: symfonia szlachetnych przyjaciół',
    excerpt:
      'Richie Davidson, pionier neuronauki i uważności, przypomniał nam, że współczucie nie jest nam obce. Jest wpisane w nasze „okablowanie”. Podzielił się badaniami pokazującymi, jak niemowlęta instynktownie skłaniają się ku życzliwości. Następnie Cynthia poprowadziła ucieleśnioną praktykę *qigong*, pomagając nam odczuć, jak nasze dobrostan przepływa przez nasze własne pole energii i do tych, którzy są wokół nas. Współczucie zaczyna się jako coś intymnego i cielesnego, co łączy nas z innymi.',
    date: '23 września 2025',
    time: '',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/638101f1bfb9485af6a60b8f/1758650036038-09GOZRUHHMTRME245Q4T/DSCF5125.jpg?format=2500w',
  },
  {
    id: 'dar-składany-ciała-buddhy-jałmużna',
    author: '',
    title: 'Dar składany ciału Buddhy: jałmużna',
    excerpt:
      'Wyraźnie pamiętam, jak stałem na głównej ulicy Boulder Creek, czekając, aż mnisi przejdą w rundzie jałmużny. Wtedy, z oddali, zobaczyłem ich: mnichów idących w godnej ciszy. Pochodzili z dwóch linii przekazu — trzech w ochrowych szatach tradycji Tajskiej Leśnej, dwóch w żółtych szatach i ciemnobrązowych pasach wskazań Stowarzyszenia Buddyjskiego Dharma Realm. Trzymali swoje misy jałmużne z czcią, krocząc uważnie, krok po kroku. Pojawiła się we mnie refleksja: *to była scena z czasów samego Buddy*. *Sam Budda chodził tak w rundzie jałmużny. W ten sposób Sangha utrzymywała się przez tysiąclecia.* Stało się dla mnie jasne, że gdy mnich przyjmuje pełne święcenia i zakłada szaty wskazań, staje się żywym ucieleśnieniem Buddy Śakjamuniego. Gdziekolwiek się pojawi — w jakimkolwiek kraju, w jakimkolwiek kontekście — jego obecność niesie żywy puls nauk Buddy.',
    date: '12 maja 2025',
    time: '',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/638101f1bfb9485af6a60b8f/1747112315802-M0EQAO0TR2EM2BUH9AF6/IMG_1408.jpg?format=2500w',
  },
  {
    id: 'powitanie-relikwii-ajahna-chah',
    author: '',
    title: 'Powitanie relikwii Ajahna Chah',
    excerpt:
      'Historia zaczęła się podczas obchodów 90. urodzin Ajahna Sumedho. W trakcie zgromadzenia Joseph Cappel (dawniej Ajahn Pabhakaro), który niegdyś służył jako osobisty pomocnik Ajahna Chah, ofiarował obecnym mnichom relikwie włosów Ajahna Chah. Wśród tych, którzy je otrzymali, był Czcigodny Issaro. Gdy znalazły się w jego rękach, natychmiast pojawiła się w jego sercu myśl: powinny trafić do Redwood Vihara.',
    date: '4 września 2024',
    time: '',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/638101f1bfb9485af6a60b8f/1773557134208-NMEBF6P5IQX6J68YWOSA/DC6A0394+copy+%282%29.jpg?format=2500w',
  },
];
