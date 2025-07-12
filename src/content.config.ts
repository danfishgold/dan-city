import { defineCollection, z } from "astro:content";

import { stories, type Story } from "./stories";

const storiesCollection = defineCollection({
  loader: (): { id: string }[] => stories,
  schema: z.custom<Story>(),
});

export const collections = { stories: storiesCollection };
