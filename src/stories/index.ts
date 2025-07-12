import image01 from "./paris/image01.jpg";
import image02 from "./paris/image02.jpg";
import image03 from "./paris/image03.jpg";
import image04 from "./paris/image04.jpg";
import image05 from "./paris/image05.jpg";
import image06 from "./paris/image06.jpg";
import image07 from "./paris/image07.jpg";
import image08 from "./paris/image08.jpg";
import image09 from "./paris/image09.jpg";
import image10 from "./paris/image10.jpg";
import image11 from "./paris/image11.jpg";
import image12 from "./paris/image12.jpg";
import thumbnail from "./paris/thumbnail.jpg";

export type StoryItem =
  | {
      type: "image";
      src: ImageMetadata;
      footer?: string;
      alt?: string;
      translation?: string;
    }
  | { type: "markdown"; text: string };

export type Story = {
  id: string;
  title: string;
  description: string;
  items: StoryItem[];
  aspectRatio?: number;
  thumbnail: ImageMetadata;
};

const paris: Story = {
  id: "paris",
  title: "פריז",
  description:
    "בדצמבר 2024 הציעו לחברים לשמור על חתולה בפאתי פריז והם הציעו לי להצטרף. להלן סטורי",
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

export const stories = [paris];
