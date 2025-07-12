import type { Story } from "..";
import thumbnail from "./thumbnail.jpg";
import image01 from "./image01.jpg";
import image02 from "./image02.jpg";
import image03 from "./image03.jpg";
import image04 from "./image04.jpg";
import image05 from "./image05.jpg";
import image06 from "./image06.jpg";
import image07 from "./image07.jpg";
import image08 from "./image08.jpg";
import image09 from "./image09.jpg";
import image10 from "./image10.jpg";
import image11 from "./image11.jpg";
import image12 from "./image12.jpg";
import image13 from "./image13.jpg";
import image14 from "./image14.jpg";
import image15 from "./image15.jpg";
import image16 from "./image16.jpg";
import image17 from "./image17.jpg";
import image18 from "./image18.jpg";

export const story: Story = {
  id: "red-line",
  title: "הקו האדום",
  description:
    "ב 18 באוגוסט, 2023 הקו האדום של הרכבת הקלה בגוש דן התחיל לפעול ואני ניצלתי את ההזדמנות כדי להיות חנון.",
  date: new Date("2023-08-13"),
  thumbnail,
  items: [
    { type: "image", src: image01 },
    { type: "image", src: image02 },
    { type: "image", src: image03 },
    { type: "image", src: image04 },
    { type: "image", src: image05 },
    { type: "image", src: image06 },
    { type: "image", src: image07 },
    { type: "image", src: image08 },
    { type: "image", src: image09 },
    { type: "image", src: image10 },
    { type: "image", src: image11 },
    { type: "image", src: image12 },
    { type: "image", src: image13 },
    { type: "image", src: image14 },
    { type: "image", src: image15 },
    { type: "image", src: image16 },
    { type: "image", src: image17 },
    { type: "image", src: image18 },
  ],
};
