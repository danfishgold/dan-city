import type { Story } from "..";
import thumbnail from "./thumbnail.jpg";
import image01 from "./image01.jpg";
import image02 from "./image02.jpg";
import image03 from "./image03.jpg";
import video04 from "./video04.mp4?url";
import image05 from "./image05.jpg";
import image06 from "./image06.jpg";
import image07 from "./image07.jpg";
import image08 from "./image08.jpg";
import video09 from "./video09.mp4?url";
import image10 from "./image10.jpg";

const description = `
בכריסטמס 2024 לא היה לי מה לעשות בברלין אז הלכתי לטייל ובטעות קרה דבר קסום???
`;

export const story: Story = {
  id: "carillon",
  title: "קריון",
  description,
  date: new Date("2024-12-25"),
  thumbnail,
  items: [
    {
      type: "image",
      src: image01,
      translation:
        "# happy holidays!\nit's christmas and as a german employee I get a day off (and so does the rest of berlin) so I decided to walk around tiergarten\n\n<small>that's the brandenburg gate and that's a menorah. behind me is a giant christmas tree</small>",
      alt: "שער ברנדנבורג בברלין בשעת בין ערביים סגרירית (בחורף זה אומר בסביבות 13:00). מולו עומדת חנוכיה ענקית כזאת של בית חב״ד ומסביב הרבה אנשים. כיתוב: חג שמח! היום חג המולד ובתור עובד גרמני מן המניין יש לי יום חופש (וגם לכל שאר ברלין) אז החלטתי לטייל ב tiergarten. לא בפריים: עץ חג מולד ענק",
    },
    {
      type: "image",
      src: image02,
      translation:
        "tiergaten is a massive park in the middle of berlin with a bunch of governmental offices surrounding it. the park itself is mostly trees (at least in the part I went to)\n\n<small>that's the TV tower in the background (not a government office), the dome is the reichstag, the one on the left is a bunch of parliament stuff, and there are a bunch more to the left</small>",
      alt: "טירגרטן מגובה של כמה קומות שממנו אפשר לראות הרבה עצים ומסביב כל מני מבנים גדולים. כיתוב: זה פארק ענק במרכז העיר שלידו יש כל מיני מבנים ממשלתיים. אפשר לראות את הרייכסטאג ממול, מבנה פרלמנטרי עם שם גרמני משמאל, ויש עוד מבנים ממשלתיים מחוץ לפריים מצד שמאל. ברקע מגדל הטלוויזיה (שאינו מבנה ממשלתי). בפארק עצמו יש בעיקר עצים (לפחות בחלק שאני הייתי בו טל״ח אין כפל מבצעים כיו״ב",
    },
    {
      type: "image",
      src: image03,
      translation:
        "and also this pretty weird tower\n\nat 2:00 pm I realized it was a bell tower",
      alt: "מגדל צר ומודרניסטי באמצע הפארק. מורכב מארבע תיבות צרות וגבוהות עם גג ריבועי שמכסה את כולן. כיתוב: וגם את המבנה המוזר הזה שדי בולט בנוף. בשעה 14:00 גיליתי שזה מגדל פעמונים",
    },
    {
      type: "video",
      src: video04,
      translation:
        "and at 2:02 pm I found out that it's an actual instrument\n\nevery sunday in the summer and on public holidays (like christmas) someone goes up there and plays the bells!\n\nthis time he played some chrismtas music",
    },
    {
      type: "image",
      src: image05,
      translation:
        "apparently it's called a Carillon (from french)\n\n[and then there's a joke about an israeli mall with the same name]",
      alt: "כלי נגינה שנראה כמו פסנתר אבל במקום קלידים רגילים יש ידיות אופקיות מרווחות. כיתוב: מסתבר שקוראים לזה קריון (מצרפתית: carillon). בתחתית התמונה מופיעה הגדרה מילונית לקריון, שם עצם, זכר: 1. מרכז מסחרי בקריות. 2. כלי נגינה שמורכב מסדרת פעמונים שנשלטים על ידי קלידים",
    },
    {
      type: "image",
      src: image06,
      translation:
        "the man who plays the carillon at tiergarten is called Jeffrey Bossin\n\nhe was born in 1950 and he's the one who pushed the city to build this carillon in 1987 to honor its 750th birthday. he's been playing it ever since\n\nwhen he finished his set he waved to his audience and a russian woman said to her group [in russian] “he's barely dressed!”",
      alt: "אדם מנופף לקהל מגובה של חמש קומות במעלה הקריון, מוקף בפעמונים. כיתוב: לאדם שמנגן בקריון ב tiergarten קוראים Jeffrey Bossin. הוא נולד ב 1950 ובזכותו בנו את הקריון הזה ב 1987 לציון 750 שנה לעיר ברלין והוא מנגן בו מאז. כשהוא סיים לנגן ונופף למאזינים מישהי מקבוצת האנשים שעמדו לידי אמרה ברוסית ״הוא בקושי לבוש!״",
    },
    {
      type: "image",
      src: image07,
      translation:
        "apparently she said that not because of russian stereotypes but because she actually knows him\n\nafter Jeffrey was done we invited that group of people (his friends/family/friends of family) and me (a complete stranger) to come up\n\nthe man is 74 years old and it's 187 steps!\n\nhe told us about the history of the tiergarten carillon and the instrument itself and argued with the russian woman who said the carillon in moscow is just a toy",
      alt: "גרם מדרגות מתכתי, לולייני וחשוך. כיתוב: מסתבר שהיא אמרה את זה לא סתם כי היא סטריאוטיפ אלא כי היא מכירה אותו. בסוף ההופעה הוא הזמין את קבוצת האנשים (חברים/משפחה/חברים של המשפחה שלו) ואותי (אדם זר לחלוטין) לעלות למעלה. האיש בן 74 ומדובר ב 187 מדרגות!",
    },
    {
      type: "image",
      src: image08,
      translation:
        "the heaviest bell in the tiergarten carillon weighs eight tons and to play it you need to hit the key with 8kg of force\n\nthere's no electronics, no hydraulics, it's all mechanical\n\nhe's 74 years old!!!",
      alt: "פעמון עצום בגובה של מעל מטר. ברקע עוד כמוהו וגדולים ממנו. כיתוב: הפעמון הכי כבד בקריון בטירגרטן שוקל שמונה טון וכדי לנגן עליו הוא צריך להפעיל משקל של שמונה קילו. אין אלקטרוניקה, אין הידראוליקה, הכל מכני. הוא בן 74!!!",
    },
    {
      type: "video",
      src: video09,
      translation:
        "and then he played jingle bells for us (and anyone within a mile) as an encore\n\nit was very cool",
    },
    {
      type: "image",
      src: image10,
      translation: "happy holidays!",
      alt: "שער ברנדנבורג עם החנוכיה ועץ חג המולד העצום בשעת ערב. עדיין מוצף באנשים. כיתוב: חג שמח!",
    },
  ],
};
