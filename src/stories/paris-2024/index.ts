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
  id: "paris-2024",
  title: "פריז 2024",
  description:
    "בדצמבר 2024 הציעו לחברים לשמור על חתולה בפאתי פריז והם הציעו לי להצטרף. להלן סטורי",
  date: new Date("2024-12-31"),
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
  ],
};
