import mdx from "@astrojs/mdx";
import { defineConfig } from "astro/config";
import path from "node:path";

// https://astro.build/config
export default defineConfig({
  integrations: [
    mdx(),
    {
      name: "add-story-collection-to-watched-files",
      hooks: {
        "astro:config:setup": ({ addWatchFile }) => {
          addWatchFile(path.resolve("./src/stories/index.ts"));
        },
      },
    },
  ],
  site: process.env.URL || "http://localhost:3000",
});
