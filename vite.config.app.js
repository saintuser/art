import vue from "@vitejs/plugin-vue";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  alias: {
    vue: "vue/dist/vue.esm-bundler.js",
  },
  plugins: [vue()],
};
