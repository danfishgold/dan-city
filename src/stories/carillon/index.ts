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
  title: "קרילון",
  description,
  date: new Date("2024-12-25"),
  thumbnail,
  items: [
    { type: "image", src: image01 },
    { type: "image", src: image02 },
    { type: "image", src: image03 },
    { type: "video", src: video04 },
    { type: "image", src: image05 },
    { type: "image", src: image06 },
    { type: "image", src: image07 },
    { type: "image", src: image08 },
    { type: "video", src: video09 },
    { type: "image", src: image10 },
  ],
};
