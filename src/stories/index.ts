export type StoryItem =
  | {
      type: "image";
      src: ImageMetadata;
      footer?: string;
      alt?: string;
      translation?: string;
    }
  | { type: "video"; src: string }
  | { type: "markdown"; text: string };

export type Story = {
  id: string;
  title: string;
  description: string;
  date: Date;
  items: StoryItem[];
  aspectRatio?: number;
  thumbnail: ImageMetadata;
};

const allStoryPromises = await Promise.all(
  Object.values(import.meta.glob("./*/index.ts")).map((importPromise) =>
    importPromise()
  )
);

export const stories = allStoryPromises.map(
  (exports) => (exports as { story: Story }).story
);
