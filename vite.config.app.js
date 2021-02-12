import vue from "@vitejs/plugin-vue";
import fonts from "vite-plugin-fonts";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  alias: {
    vue: "vue/dist/vue.esm-bundler.js",
  },
  plugins: [
    vue(),
    fonts({
      google: {
        families: [{ name: "Nunito Sans", weights: "wght@400;700" }],
      },
    }),
  ],
};
