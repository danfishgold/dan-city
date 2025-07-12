import { defineCollection, z } from "astro:content";
import { fileURLToPath } from "node:url";

import { type Story } from "./stories";
import { glob } from "astro/loaders";

const tsEntryType = {
  extensions: [".ts"],
  async getEntryInfo({ fileUrl }: { fileUrl: URL }) {
    const filePath = fileURLToPath(fileUrl);
    const storyFile = await import(/* @vite-ignore */ filePath);
    if ("story" in storyFile) {
      return { id: storyFile.story.id, data: storyFile.story };
    } else {
      throw new Error(`Misconfigured story file at ${filePath}`);
    }
  },
};

const originalGlob = glob({ pattern: "*/*.ts", base: "./src/stories" });

const storiesCollection = defineCollection({
  loader: {
    name: "glob-with-ts",
    load: (context) => {
      const entryTypes = new Map((context as any).entryTypes ?? {});
      entryTypes.set(".ts", tsEntryType);
      return originalGlob.load({
        ...context,
        entryTypes,
      } as any);
    },
  },
  schema: z.custom<Story>(),
});

export const collections = { stories: storiesCollection };
