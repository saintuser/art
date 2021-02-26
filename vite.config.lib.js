import vue from "@vitejs/plugin-vue";
import path from "path";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/lib.js"),
      formats: ["es"],
      name: "live",
    },
  },
};
