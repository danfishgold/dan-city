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
