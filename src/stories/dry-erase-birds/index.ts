import type { Story } from "..";
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
import thumbnail from "./thumbnail.jpg";

export const story: Story = {
  id: "dry-erase-birds",
  title: "dry erase birds",
  description:
    "ב 2021 ציירתי כמה ציפורים* על לוח מחיק ואז התחלתי לכתוב על אטימולוגיה של מילים והפכתי לדמות עגולה",
  thumbnail,
  date: new Date("2021-09-11"),
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
  ],
};
