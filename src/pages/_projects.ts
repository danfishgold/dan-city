type Project = {
  title: string
  description: string
  width: 1 | 2 | 3 | 4 | 5
  url: string | null
}

export const hebrewProjects: Project[] = [
  {
    title: 'מפת שבילי אופניים',
    description:
      'אתר לטלפון עם מידע עדכני על שבילי אופניים בגוש דן. כמו גוגל מפות אבל יותר מהימן אבל גם פחות נוח',
    width: 3,
    url: 'https://bikemap.dan.city',
  },
  {
    title: 'בוט שיתוף',
    description: 'ערוץ טלגרם שמודיע על מפגשי ציבור של עיריית תל אביב',
    width: 2,
    url: '/shituf-bot/',
  },
  {
    title: 'שלטים טובים',
    description: 'אוסף תמונות',
    width: 2,
    url: '/good-signs',
  },
  {
    title: 'בקרוב: מצוקת חניה',
    description: 'ניתוח זמינות החניה בחניוני הלילה של אחוזת החוף',
    width: 2,
    url: null,
  },
]

export const englishProjects: Project[] = [
  {
    title: 'Bike Map',
    description:
      'An up to date map of bike lanes and recommended routes in Tel Aviv. Designed for mobile',
    width: 2,
    url: 'https://bikemap.dan.city',
  },
  {
    title: 'Community Involvement Bot',
    description:
      'A Telegram channel that notifies about community involvement events organized by the Tel Aviv municipality',
    width: 3,
    url: 'https://dan.city/shituf-bot/',
  },
  {
    title: 'Code Reading Club',
    description:
      'Workshops, exercises and techniques to help you understand your code better!',
    width: 5,
    url: 'https://codereading.club',
  },
  {
    title: 'Sign Language Dictionary',
    description: 'An interactive dictionary to help learn Sign Language (ISL)',
    width: 3,
    url: 'https://isl.danfishgold.com/#en',
  },
  {
    title: 'Wikipedia Charts',
    description: 'The 100 most visited pages on Wikipedia on any given day',
    width: 2,
    url: 'https://wikipedia-charts.danfishgold.com',
  },
  {
    title: 'Emoji Poetry',
    description: 'Generate poems in emoji!',
    width: 2,
    url: 'https://emoji-poetry.danfishgold.com',
  },
  {
    title: 'Patterns',
    description: '30 Japanese patterns recreated in p5.js',
    width: 3,
    url: 'https://codecember19.danfishgold.com',
  },
  {
    title: 'Magnets',
    description: 'A weird interactive Hebrew linguistics explainer',
    width: 3,
    url: 'https://files.dan.city/magnets',
  },
  {
    title: 'Processing',
    description: '30 generative art projects in Processing',
    width: 2,
    url: 'https://codecember18.danfishgold.com',
  },
  {
    title: 'Trains',
    description:
      "An iOS app from 2016 showing the time table for the Israeli train. The app is dead now and all that's left is this website I made for it",
    width: 5,
    url: 'https://files.dan.city/trains',
  },
]
