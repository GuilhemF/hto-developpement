import react from "@astrojs/react";
import { defineConfig } from "astro/config";

// https://astro.build/config
import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: node({
    mode: "standalone",
  }),
  integrations: [react()],
  vite: {
    build: {
      minify: true,
      sourcemap: false,
    },
    css: {
      preprocessorOptions: {
        scss: {},
      },
    },
    ssr: {
      external: ["gsap"],
    },
  },
});
