import fonts from 'vite-plugin-fonts';

import vue from '@vitejs/plugin-vue';

/**
 * @type {import('vite').UserConfig}
 */
export default {
  resolve: {
    alias: {
      vue: "vue/dist/vue.esm-bundler.js",
    },
  },
  plugins: [
    vue(),
    fonts({
      google: {
        families: [{ name: "Nunito Sans", weights: "ital,wght@0,800;1,400" }],
      },
    }),
  ],
};
