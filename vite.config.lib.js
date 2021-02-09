import vue from "@vitejs/plugin-vue";
import path from "path";

/**
 * https://vitejs.dev/config/
 * @type {import('vite').UserConfig}
 */
export default {
  plugins: [vue()],
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, "src/lib/index.js"),
      formats: ["es"],
    },
  },
};
