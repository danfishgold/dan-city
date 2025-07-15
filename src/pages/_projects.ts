export type Project = {
  title: string;
  description: string;
  width: 1 | 2 | 3 | 4 | 5;
  url: string | null;
};

export const hebrewProjects: Project[] = [
  {
    title: "מפת שבילי אופניים",
    description:
      "אתר לטלפון עם מידע עדכני על שבילי אופניים בגוש דן. כמו גוגל מפות אבל יותר מהימן אבל גם פחות נוח",
    width: 3,
    url: "https://bikemap.dan.city",
  },
  {
    title: "בוט שיתוף",
    description: "ערוץ טלגרם שמודיע על מפגשי ציבור של עיריית תל אביב",
    width: 2,
    url: "/shituf-bot/",
  },
  {
    title: "שלטים טובים",
    description: "אוסף תמונות",
    width: 2,
    url: "/good-signs",
  },
  {
    title: "מילון שפת הסימנים",
    description:
      "מילון אינטרקטיבי לשפת הסימנים הישראלית. אח״א גנבו לי עליו קרדיט פעם",
    width: 3,
    url: "https://isl.danfishgold.com/",
  },
  {
    title: "מצעד ויקיפדיה",
    description: "100 ערכי ויקיפדיה עם הכי הרבה צפיות בכל יום נתון",
    width: 3,
    url: "https://wikipedia-charts.danfishgold.com",
  },
  {
    title: "שירת אימוג׳י",
    description: "מג׳נרט שירים באימוג׳י",
    width: 2,
    url: "https://emoji-poetry.danfishgold.com",
  },
  {
    title: "דפוסים",
    description: "30 דפוסים של הוקוסאי ב 30 ימים עם p5.js",
    width: 2,
    url: "https://codecember19.danfishgold.com",
  },
  {
    title: "Processing",
    description: "30 פרוייקטי אמנות גנרטיבית ב 30 ימים עם Processing",
    width: 3,
    url: "https://codecember18.danfishgold.com",
  },
  {
    title: "רכבות",
    description:
      "אפליקציית iOS שכתבתי ב 2016 כתחליף לרשמית. האפליקציה מתה וכל מה שנשאר זה האתר שעשיתי עבורה",
    width: 3,
    url: "https://files.dan.city/trains",
  },
  {
    title: "מגנטים",
    description: "דבר אינטרקטיבי מוזר שמסביר איך מרכיבים מילים בעברית",
    width: 2,
    url: "https://files.dan.city/magnets",
  },
];

export const englishProjects: Project[] = [
  {
    title: "Bike Map",
    description:
      "An up to date map of bike lanes and recommended routes in Tel Aviv. Designed for mobile",
    width: 2,
    url: "https://bikemap.dan.city",
  },
  {
    title: "Community Involvement Bot",
    description:
      "A Telegram channel that notifies about community involvement events organized by the Tel Aviv municipality",
    width: 3,
    url: "https://dan.city/shituf-bot/",
  },
  {
    title: "Code Reading Club",
    description:
      "Workshops, exercises and techniques to help you understand your code better!",
    width: 5,
    url: "https://codereading.club",
  },
  {
    title: "Sign Language Dictionary",
    description: "An interactive dictionary to help learn Sign Language (ISL)",
    width: 3,
    url: "https://isl.danfishgold.com/#en",
  },
  {
    title: "Wikipedia Charts",
    description: "The 100 most visited pages on Wikipedia on any given day",
    width: 2,
    url: "https://wikipedia-charts.danfishgold.com",
  },
  {
    title: "Emoji Poetry",
    description: "Generate poems in emoji!",
    width: 2,
    url: "https://emoji-poetry.danfishgold.com",
  },
  {
    title: "Patterns",
    description: "30 Japanese patterns recreated in p5.js",
    width: 3,
    url: "https://codecember19.danfishgold.com",
  },
  {
    title: "Magnets",
    description: "A weird interactive Hebrew linguistics explainer",
    width: 3,
    url: "https://files.dan.city/magnets",
  },
  {
    title: "Processing",
    description: "30 generative art projects in Processing",
    width: 2,
    url: "https://codecember18.danfishgold.com",
  },
  {
    title: "Trains",
    description:
      "An iOS app from 2016 showing the time table for the Israeli train. The app is dead now and all that's left is this website I made for it",
    width: 5,
    url: "https://files.dan.city/trains",
  },
];
